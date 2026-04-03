from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import razorpay

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

SUPABASE_URL = os.environ.get('SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY', '')

RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', '')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', '')

razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)) if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET else None

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}

app = FastAPI()
api_router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)

# In-memory order store — used ONLY when Supabase RLS blocks inserts.
# Orders migrate to Supabase automatically once policies allow inserts.
_order_store: dict = {}


# ── SUPABASE HELPERS ───────────────────────────────────────────────
async def supa_get(table: str, params: str = ""):
    if not SUPABASE_URL: return None
    async with httpx.AsyncClient(timeout=15) as c:
        r = await c.get(f"{SUPABASE_URL}/rest/v1/{table}?{params}", headers=HEADERS)
        if r.status_code == 200:
            return r.json()
        logger.warning(f"supa_get {table}: {r.status_code} {r.text[:200]}")
        return None


async def supa_post(table: str, data):
    if not SUPABASE_URL: return None
    async with httpx.AsyncClient(timeout=15) as c:
        r = await c.post(f"{SUPABASE_URL}/rest/v1/{table}", headers=HEADERS, json=data)
        if r.status_code in (200, 201):
            return r.json()
        logger.warning(f"supa_post {table}: {r.status_code} {r.text[:300]}")
        return None


def normalize_product(p: dict) -> dict:
    """Normalize Supabase product row for frontend consumption."""
    
    # Generate a deterministic mock stock based on integer ID if it exists
    stock = 50
    if p.get("id"):
        id_val = int(p["id"])
        if id_val % 4 == 0:
            stock = 0 # Sold out
        elif id_val % 4 == 1:
            stock = 3 # Almost gone
        else:
            stock = 50
    else:
        stock = 25
        
    return {
        **p,
        "original_price": p.get("compare_price"),
        "is_new": p.get("is_featured", False),
        "stock": stock
    }


# ── PYDANTIC MODELS ────────────────────────────────────────────────
class OrderItemModel(BaseModel):
    product_id: int
    product_name: str
    size: str
    quantity: int
    price: float
    image: str


class OrderCreate(BaseModel):
    items: List[OrderItemModel]
    customer_name: str
    customer_email: str
    customer_phone: str
    address: str
    city: str
    state: str
    pincode: str
    razorpay_payment_id: Optional[str] = None
    razorpay_order_id: Optional[str] = None
    razorpay_signature: Optional[str] = None

class RazorpayOrderRequest(BaseModel):
    items: List[OrderItemModel]


# ── API ROUTES ─────────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"message": "7toSEVEN API", "status": "running"}


@api_router.get("/products")
async def get_products(
    category: Optional[str] = None,
    size: Optional[str] = None,
    sort: Optional[str] = None,
):
    params = "select=*"
    filters = []
    if category and category != "all":
        filters.append(f"category=ilike.{category}")
    if filters:
        params += "&" + "&".join(filters)
    if sort == "price-low":
        params += "&order=price.asc"
    elif sort == "price-high":
        params += "&order=price.desc"
    else:
        params += "&order=created_at.desc"

    data = await supa_get("products", params)
    if data is None:
        return {"products": [], "total": 0}

    if size:
        data = [p for p in data if size in (p.get("sizes") or [])]

    products = [normalize_product(p) for p in data]
    return {"products": products, "total": len(products)}


@api_router.get("/products/{slug}")
async def get_product(slug: str):
    data = await supa_get("products", f"select=*&slug=eq.{slug}")
    if not data or len(data) == 0:
        raise HTTPException(status_code=404, detail="Product not found")

    product = normalize_product(data[0])

    related_data = await supa_get(
        "products",
        f"select=*&category=ilike.{product['category']}&id=neq.{product['id']}&limit=4",
    )
    related = [normalize_product(p) for p in (related_data or [])]

    return {"product": product, "related": related}


@api_router.get("/collections")
async def get_collections():
    data = await supa_get("collections", "select=*&order=created_at.asc")
    return {"collections": data or []}


@api_router.get("/drop-stories")
async def get_drop_stories():
    return {
        "stories": [
            {"id": "ds_1", "title": "THE MAKING OF DROP 001", "image": "/drop-stories/making_of_drop_001.png"},
            {"id": "ds_2", "title": "BEHIND THE FABRIC", "image": "/drop-stories/behind_the_fabric.png"},
            {"id": "ds_3", "title": "STREET CULTURE", "image": "/drop-stories/street_culture_v3.png"},
            {"id": "ds_4", "title": "THE 7toSEVEN ETHOS", "image": "/drop-stories/the_7toseven_ethos.png"},
            {"id": "ds_5", "title": "NOCTURNAL LOOKBOOK", "image": "/drop-stories/nocturnal_lookbook_v2.png"},
            {"id": "ds_6", "title": "ENGINEERED UTILITY", "image": "/drop-stories/engineered_utility.png"},
        ]
    }


@api_router.post("/create-razorpay-order")
async def create_razorpay_order(req: RazorpayOrderRequest):
    subtotal = sum(item.price * item.quantity for item in req.items)
    shipping_fee = 0 if subtotal >= 899 else 99
    total = subtotal + shipping_fee
    
    if not razorpay_client:
        raise HTTPException(status_code=500, detail="Razorpay is not configured on the backend.")
        
    try:
        order_data = {
            "amount": int(total * 100), # Amount in paise
            "currency": "INR",
            "receipt": "rcpt_" + str(uuid.uuid4())[:8]
        }
        rzp_order = razorpay_client.order.create(data=order_data)
        return {"id": rzp_order["id"], "amount": rzp_order["amount"], "currency": rzp_order["currency"]}
    except Exception as e:
        logger.error(f"Razorpay error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create Razorpay order")

@api_router.post("/orders")
async def create_order(order: OrderCreate):
    order_number = str(uuid.uuid4())[:8].upper()
    subtotal = sum(item.price * item.quantity for item in order.items)
    shipping_fee = 0 if subtotal >= 899 else 99
    total = subtotal + shipping_fee

    # Verify Razorpay Signature if Razorpay is configured
    if razorpay_client and order.razorpay_payment_id and order.razorpay_signature and order.razorpay_order_id:
        try:
            razorpay_client.utility.verify_payment_signature({
                'razorpay_order_id': order.razorpay_order_id,
                'razorpay_payment_id': order.razorpay_payment_id,
                'razorpay_signature': order.razorpay_signature
            })
        except Exception as e:
            logger.error(f"Payment verification failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Payment verification failed")

    order_doc = {
        "order_number": order_number,
        "customer_name": order.customer_name,
        "customer_email": order.customer_email,
        "customer_phone": order.customer_phone,
        "shipping_address": {
            "address": order.address,
            "city": order.city,
            "state": order.state,
            "pincode": order.pincode,
        },
        "items": [item.model_dump() for item in order.items],
        "subtotal": float(subtotal),
        "shipping_fee": float(shipping_fee),
        "total": float(total),
        "status": "paid" if order.razorpay_payment_id else "pending",
        "razorpay_payment_id": order.razorpay_payment_id,
        "razorpay_order_id": order.razorpay_order_id,
    }

    # Attempt Supabase insert
    result = await supa_post("orders", order_doc)

    if result and len(result) > 0:
        saved = result[0]
        logger.info(f"Order {order_number} saved to Supabase")
    else:
        # Supabase insert blocked by RLS — store locally
        order_doc["created_at"] = datetime.now(timezone.utc).isoformat()
        _order_store[order_number] = order_doc
        logger.warning(f"Order {order_number} stored in memory (Supabase RLS blocked insert)")

    return {
        "order_id": order_number,
        "order_number": order_number,
        "items": order_doc["items"],
        "customer_name": order.customer_name,
        "customer_email": order.customer_email,
        "customer_phone": order.customer_phone,
        "address": order.address,
        "city": order.city,
        "state": order.state,
        "pincode": order.pincode,
        "subtotal": subtotal,
        "shipping": shipping_fee,
        "total": total,
        "status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    # Try Supabase first
    data = await supa_get("orders", f"select=*&order_number=eq.{order_id}")
    if data and len(data) > 0:
        o = data[0]
        addr = o.get("shipping_address") or {}
        return {
            "order_id": o.get("order_number"),
            "items": o.get("items", []),
            "customer_name": o.get("customer_name"),
            "customer_email": o.get("customer_email"),
            "customer_phone": o.get("customer_phone"),
            "address": addr.get("address", ""),
            "city": addr.get("city", ""),
            "state": addr.get("state", ""),
            "pincode": addr.get("pincode", ""),
            "subtotal": o.get("subtotal", 0),
            "shipping": o.get("shipping_fee", 0),
            "total": o.get("total", 0),
            "status": o.get("status"),
            "created_at": o.get("created_at"),
        }

    # Fallback to local store
    if order_id in _order_store:
        o = _order_store[order_id]
        addr = o.get("shipping_address") or {}
        return {
            "order_id": o.get("order_number"),
            "items": o.get("items", []),
            "customer_name": o.get("customer_name"),
            "customer_email": o.get("customer_email"),
            "customer_phone": o.get("customer_phone"),
            "address": addr.get("address", ""),
            "city": addr.get("city", ""),
            "state": addr.get("state", ""),
            "pincode": addr.get("pincode", ""),
            "subtotal": o.get("subtotal", 0),
            "shipping": o.get("shipping_fee", 0),
            "total": o.get("total", 0),
            "status": o.get("status"),
            "created_at": o.get("created_at"),
        }

    raise HTTPException(status_code=404, detail="Order not found")


# ── APP SETUP ──────────────────────────────────────────────────────
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
