import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function OrderConfirmedPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      axios.get(`${API}/orders/${orderId}`)
        .then(r => setOrder(r.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else { setLoading(false); }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 pb-40">
        <div className="relative flex items-center justify-center w-12 h-12">
          <div className="absolute inset-0   border-white/10 rounded-full" />
          <div className="absolute inset-0   border-white rounded-full animate-spin " />
          <div className="w-2 h-2  bg-white rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div data-testid="order-confirmed-page" className="min-h-screen pt-32 md:pt-40">
      <div className="max-w-[650px] mx-auto px-6 md:px-10 pb-24">
        {/* Success */}
        <div className="text-center mb-16 pt-8 pb-12   border-white/10 transition-colors duration-500">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-8   bg-white text-black rounded-full shadow-lg">
            <CheckCircle2 size={32} strokeWidth={2.5} />
          </div>
          <h1 className="font-['Impact']  uppercase tracking-widest  text-white leading-[0.9]">
            ORDER CONFIRMED
          </h1>
          <p className="font-sans font-bold uppercase tracking-[0.3em]  md:text-xs  text-white/40 mt-6">THANK YOU FOR YOUR PURCHASE.</p>
        </div>

        {order && (
          <div className=" bg-[#0A0A0A]/50 p-6 md:p-10 transition-colors duration-500">
            {/* Order ID */}
            <div className="pb-8   border-white/10 flex items-center gap-4">
              <Package size={20} strokeWidth={2} className=" text-white/50" />
              <div>
                <p className="font-sans font-bold  uppercase tracking-[0.2em]  text-white/40">ORDER ID</p>
                <p data-testid="order-id" className="font-['Impact']  uppercase tracking-widest  text-white">#{order.order_id}</p>
              </div>
            </div>

            {/* Items */}
            <div className="py-8   border-white/10">
              <p className="font-sans font-bold  uppercase tracking-[0.2em]  text-white/40 mb-6">ITEMS</p>
              <div className="space-y-6">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <div className="flex items-center gap-6">
                      <img src={item.image} alt={item.product_name} className="w-16 h-20 object-cover group-hover:opacity-80 transition-opacity" />
                      <div>
                        <p className="font-['Impact']  md:text-base uppercase tracking-widest  text-white">{item.product_name}</p>
                        <p className="font-sans font-bold  tracking-[0.2em] mt-1  text-white/40 uppercase">SIZE: {item.size} / QTY: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-sans font-bold  md:text-xs tracking-widest  text-white/60">{'\u20B9'}{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="py-8   border-white/10">
              <p className="font-sans font-bold  uppercase tracking-[0.2em]  text-white/40 mb-4">SHIPPING TO</p>
              <p className=" font-sans font-bold uppercase tracking-[0.2em]  text-white/50 leading-loose max-w-sm">
                {order.customer_name}<br />
                {order.address}<br />
                {order.city}, {order.state} - {order.pincode}<br />
                {order.customer_phone}
              </p>
            </div>

            {/* Total */}
            <div className="pt-8 space-y-4 font-sans font-bold uppercase tracking-[0.2em]  md:text-xs  text-white/50">
              <div className="flex justify-between"><span>SUBTOTAL</span><span>{'\u20B9'}{order.subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>SHIPPING</span><span>{order.shipping === 0 ? 'FREE' : `\u20B9${order.shipping}`}</span></div>
              <div className="flex justify-between font-['Impact']  uppercase tracking-widest  text-white pt-6   border-white/10 mt-6">
                <span>TOTAL</span><span>{'\u20B9'}{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 mt-16">
          <Link 
            to="/shop" 
            data-testid="order-continue-shopping" 
            className="flex-1 flex items-center justify-center gap-3   bg-white text-[#0A0A0A] font-sans font-bold  md:text-xs uppercase tracking-[0.2em] py-5 border  border-white hover:opacity-80 transition-opacity"
          >
            CONTINUE SHOPPING <ArrowRight size={16} strokeWidth={2} />
          </Link>
          <Link 
            to="/" 
            data-testid="order-back-home" 
            className="flex-1 flex items-center justify-center gap-3 bg-transparent  text-white font-sans font-bold  md:text-xs uppercase tracking-[0.2em] py-5 border  border-white   hover:bg-white hover:text-black transition-colors duration-300"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
