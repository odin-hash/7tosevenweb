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
        <div className="w-8 h-8 border-2 border-black/10 border-t-black dark:border-white/10 dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div data-testid="order-confirmed-page" className="min-h-screen pt-32 md:pt-40">
      <div className="max-w-[650px] mx-auto px-6 md:px-10 pb-24">
        {/* Success */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/[0.04] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} strokeWidth={1} className="text-black dark:text-white" />
          </div>
          <h1 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tighter text-black dark:text-white leading-[1.15]">
            Order Confirmed
          </h1>
          <p className="text-sm text-black/40 dark:text-white/40 mt-3">Thank you for shopping with 7toSEVEN.</p>
        </div>

        {order && (
          <div className="glass rounded-2xl overflow-hidden">
            {/* Order ID */}
            <div className="p-6 border-b border-black/5 dark:border-white/[0.04] flex items-center gap-3">
              <Package size={16} strokeWidth={1.5} className="text-black/40 dark:text-white/40" />
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30">Order ID</p>
                <p data-testid="order-id" className="font-['Impact'] text-lg uppercase tracking-wider text-black dark:text-white">#{order.order_id}</p>
              </div>
            </div>

            {/* Items */}
            <div className="p-6 border-b border-black/5 dark:border-white/[0.04]">
              <p className="text-[9px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30 mb-4">Items</p>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.product_name} className="w-10 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="font-['Impact'] text-[10px] uppercase tracking-wider text-black dark:text-white">{item.product_name}</p>
                        <p className="text-[10px] text-black/30 dark:text-white/30">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-xs text-black dark:text-white">{'\u20B9'}{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="p-6 border-b border-black/5 dark:border-white/[0.04]">
              <p className="text-[9px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30 mb-2">Shipping To</p>
              <p className="text-sm text-black/40 dark:text-white/40 leading-relaxed">
                {order.customer_name}<br />
                {order.address}<br />
                {order.city}, {order.state} - {order.pincode}<br />
                {order.customer_phone}
              </p>
            </div>

            {/* Total */}
            <div className="p-6 space-y-2">
              <div className="flex justify-between text-xs text-black/40 dark:text-white/40"><span>Subtotal</span><span>{'\u20B9'}{order.subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between text-xs text-black/40 dark:text-white/40"><span>Shipping</span><span>{order.shipping === 0 ? 'FREE' : `\u20B9${order.shipping}`}</span></div>
              <div className="flex justify-between font-['Impact'] text-base uppercase tracking-wider text-black dark:text-white pt-3 border-t border-black/5 dark:border-white/[0.04]">
                <span>Total</span><span>{'\u20B9'}{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-10">
          <Link to="/shop" data-testid="order-continue-shopping" className="flex-1 flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-[#0A0A0A] font-['Impact'] text-xs uppercase tracking-[0.15em] py-3.5 rounded-full hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300">
            Continue Shopping <ArrowRight size={14} />
          </Link>
          <Link to="/" data-testid="order-back-home" className="flex-1 flex items-center justify-center gap-2 glass text-black dark:text-white font-['Impact'] text-xs uppercase tracking-[0.15em] py-3.5 rounded-full hover:bg-black/10 dark:hover:bg-white/[0.06] transition-all duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
