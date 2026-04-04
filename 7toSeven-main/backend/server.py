from fastapi import FastAPI, APIRouter, HTTPException, Request
from pydantic import BaseModel
from typing import List, Optional
import os
import logging
import uuid
from datetime import datetime, timezone
import razorpay
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

SUPABASE_URL = os.environ.get('SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY', '')

# Initialize Supabase Python Client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', '')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', '')

# Initialize Razorpay Client
razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)) if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET else None

app = FastAPI()
api_router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)

# ── PYDANTIC MODELS ────────────────────────────────────────────────
class OrderItemModel(BaseModel):
    product_id: str
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
def root():
    return {"message": "7toSEVEN API (Supabase + Razorpay)", "status": "running"}

@api_router.get("/products")
def get_products(category: Optional[str] = None):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
        
    try:
        # Fetch products and powerfully join with the new inventory table
        query = supabase.table('products').select('*, inventory(size, stock_count)')
        if category and category != "all":
            query = query.ilike("category", f"%{category}%")
            
        response = query.execute()
        
        products = []
        for p in response.data:
            inventory = p.get('inventory', [])
            total_stock = sum(item.get('stock_count', 0) for item in inventory)
            
            # Map available sizes array for easy frontend consumption
            available_sizes = [item.get('size') for item in inventory if item.get('stock_count', 0) > 0]
            
            products.append({
                **p,
                "stock": total_stock, 
                "inventory": inventory, 
                "sizes": available_sizes
            })
            
        return {"products": products, "total": len(products)}
    except Exception as e:
        logger.error(f"Error fetching products: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch products")

@api_router.get("/products/{slug}")
def get_product(slug: str):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
        
    try:
        response = supabase.table('products').select('*, inventory(size, stock_count)').eq('slug', slug).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Product not found")
            
        p = response.data[0]
        inventory = p.get('inventory', [])
        total_stock = sum(item.get('stock_count', 0) for item in inventory)
        available_sizes = [item.get('size') for item in inventory if item.get('stock_count', 0) > 0]
        
        product_data = {
            **p,
            "stock": total_stock,
            "inventory": inventory,
            "sizes": available_sizes
        }
        
        # Related products fallback
        try:
            related_res = supabase.table('products').select('*, inventory(size, stock_count)').neq('id', p['id']).ilike('category', p.get('category', '')).limit(4).execute()
            related = related_res.data
        except:
            related = []
            
        return {"product": product_data, "related": related}
    except Exception as e:
        logger.error(f"Error fetching product: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching product")

@api_router.post("/create-razorpay-order")
def create_razorpay_order(req: RazorpayOrderRequest):
    if not razorpay_client:
        raise HTTPException(status_code=500, detail="Razorpay is not configured on the backend.")
        
    # Security: Calculate total entirely on the backend to prevent frontend tampering
    subtotal = sum(item.price * item.quantity for item in req.items)
    shipping_fee = 0 if subtotal >= 899 else 99
    total = subtotal + shipping_fee
    
    import json
    try:
        # We compress the cart into notes so the webhook can recover it if client disconnects
        compact_cart = [{"id": i.product_id, "sz": i.size, "q": i.quantity} for i in req.items]
        order_data = {
            "amount": int(total * 100), # Razorpay expects the amount in paise (1 INR = 100 paise)
            "currency": "INR",
            "receipt": f"rcpt_{uuid.uuid4().hex[:8]}",
            "notes": {
                "cart_data": json.dumps(compact_cart)[:254]
            }
        }
        rzp_order = razorpay_client.order.create(data=order_data)
        
        return {
            "id": rzp_order["id"], 
            "amount": rzp_order["amount"], 
            "currency": rzp_order["currency"]
        }
    except Exception as e:
        logger.error(f"Razorpay order creation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to create Razorpay Order")

@api_router.post("/verify-payment")
def verify_payment(req: OrderCreate):
    if not supabase or not razorpay_client:
        raise HTTPException(status_code=500, detail="Backend misconfigured")
        
    try:
        # 1. Verify Razorpay Signature
        params_dict = {
            'razorpay_order_id': req.razorpay_order_id,
            'razorpay_payment_id': req.razorpay_payment_id,
            'razorpay_signature': req.razorpay_signature
        }
        # Throws SignatureVerificationError if invalid
        razorpay_client.utility.verify_payment_signature(params_dict)
        
        # 2. Calculate Final Total (Anti-tamper)
        subtotal = sum(item.price * item.quantity for item in req.items)
        shipping_fee = 0 if subtotal >= 899 else 99
        total = subtotal + shipping_fee
        
        # 3. Insert core order record
        order_res = supabase.table('orders').insert({
            'razorpay_order_id': req.razorpay_order_id,
            'razorpay_payment_id': req.razorpay_payment_id,
            'customer_name': req.customer_name,
            'customer_email': req.customer_email,
            'customer_phone': req.customer_phone,
            'address': req.address,
            'city': req.city,
            'state': req.state,
            'pincode': req.pincode,
            'total_amount': total,
            'status': 'PAID'
        }).execute()
        
        order_id = order_res.data[0]['id']
        
        # 4. Insert Order Items & Decrement Inventory
        for item in req.items:
            supabase.table('order_items').insert({
                'order_id': order_id,
                'product_id': item.product_id,
                'size': item.size,
                'quantity': item.quantity,
                'price': item.price
            }).execute()
            
            # Fetch current stock to decrement safely
            inv_res = supabase.table('inventory').select('stock_count').eq('product_id', item.product_id).eq('size', item.size).execute()
            if inv_res.data:
                current_stock = inv_res.data[0].get('stock_count', 0)
                new_stock = max(0, current_stock - item.quantity)
                supabase.table('inventory').update({'stock_count': new_stock}).eq('product_id', item.product_id).eq('size', item.size).execute()
        
        return {"status": "success", "order_id": order_id}
        
    except razorpay.errors.SignatureVerificationError:
        logger.error("Razorpay Signature Invalid")
        raise HTTPException(status_code=400, detail="Invalid Payment Signature")
    except Exception as e:
        logger.error(f"Fulfillment failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Fulfillment Failed")

@api_router.post("/webhook/razorpay")
async def razorpay_webhook(request: Request):
    if not supabase or not razorpay_client:
        return {"status": "ignored"}
        
    try:
        body_bytes = await request.body()
        body_str = body_bytes.decode('utf-8')
        signature = request.headers.get("x-razorpay-signature")
        webhook_secret = os.environ.get('RAZORPAY_WEBHOOK_SECRET', '')
        
        # Verify signature if secret is mapped
        if webhook_secret and signature:
            razorpay_client.utility.verify_webhook_signature(body_str, signature, webhook_secret)
        
        payload = await request.json()
        event_type = payload.get("event")
        
        if event_type in ["order.paid", "payment.captured"]:
            payment_entity = payload.get('payload', {}).get('payment', {}).get('entity', {})
            order_id = payment_entity.get('order_id')
            
            if order_id:
                # Check if this order has already been processed by the client
                existing = supabase.table('orders').select('id').eq('razorpay_order_id', order_id).execute()
                
                if not existing.data:
                    import json
                    logger.warning(f"Failsafe inserting missing order payload: {order_id}")
                    
                    order_res = supabase.table('orders').insert({
                        'razorpay_order_id': order_id,
                        'razorpay_payment_id': payment_entity.get('id'),
                        'customer_email': payment_entity.get('email', 'unknown'),
                        'customer_phone': payment_entity.get('contact', '0000000000'),
                        'customer_name': 'WEBHOOK_RECOVERY',
                        'address': 'PENDING',
                        'city': 'PENDING',
                        'state': 'PENDING',
                        'pincode': '000000',
                        'total_amount': payment_entity.get('amount', 0) / 100,
                        'status': 'PAID_FAILSAFE'
                    }).execute()
                    
                    db_order_id = order_res.data[0]['id']
                    
                    # Decrypt injected cart notes to decrement safely
                    notes = payment_entity.get('notes', {})
                    if 'cart_data' in notes:
                        try:
                            cart = json.loads(notes['cart_data'])
                            for item in cart:
                                supabase.table('order_items').insert({
                                    'order_id': db_order_id,
                                    'product_id': item['id'],
                                    'size': item['sz'],
                                    'quantity': item['q'],
                                    'price': 0 
                                }).execute()
                                
                                inv_res = supabase.table('inventory').select('stock_count').eq('product_id', item['id']).eq('size', item['sz']).execute()
                                if inv_res.data:
                                    current_stock = inv_res.data[0].get('stock_count', 0)
                                    supabase.table('inventory').update({'stock_count': max(0, current_stock - item['q'])}).eq('product_id', item['id']).eq('size', item['sz']).execute()
                        except:
                            pass
                            
        return {"status": "success"}

    except Exception as e:
        logger.error(f"Webhook processing error: {e}")
        return {"status": "ignored"}

@api_router.post("/waitlist")
def join_waitlist(data: dict):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
        
    email_or_phone = data.get('email_or_phone')
    if not email_or_phone:
        raise HTTPException(status_code=400, detail="Email or phone is required")
        
    try:
        # Insert into the waitlist table we created in the schema
        supabase.table('waitlist').insert({"email_or_phone": email_or_phone}).execute()
        return {"status": "success", "message": "Added to waitlist"}
    except Exception as e:
        logger.error(f"Waitlist insert error: {e}")
        raise HTTPException(status_code=500, detail="Could not add to waitlist")

@api_router.get("/orders/{order_id}")
def get_order(order_id: str):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
        
    try:
        # Fetch the order and join with order_items
        order_res = supabase.table('orders').select('*, order_items(*)').eq('id', order_id).execute()
        
        if not order_res.data:
            raise HTTPException(status_code=404, detail="Order not found")
            
        order_data = order_res.data[0]
        
        # Hydrate product details for the receipt (like name and image)
        hydrated_items = []
        for item in order_data.get('order_items', []):
            product_res = supabase.table('products').select('name, image_url').eq('id', item['product_id']).execute()
            if product_res.data:
                item['product_name'] = product_res.data[0]['name']
                item['image'] = product_res.data[0]['image_url']
            hydrated_items.append(item)
            
        order_data['items'] = hydrated_items
        return {"order": order_data}
        
    except Exception as e:
        logger.error(f"Error fetching order {order_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching order")

@api_router.get("/collections")
def get_collections():
    if not supabase: return {"collections": []}
    try:
        res = supabase.table('collections').select('*').execute()
        return {"collections": res.data}
    except:
        return {"collections": []}

@api_router.get("/drop-stories")
def get_drop_stories():
    return {
        "stories": [
            {"id": "ds_1", "title": "NOCTURNAL LOOKBOOK", "image": "/drop-stories/nocturnal_lookbook_v2.png"},
            {"id": "ds_2", "title": "ENGINEERED UTILITY", "image": "/drop-stories/engineered_utility.png"}
        ]
    }

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
