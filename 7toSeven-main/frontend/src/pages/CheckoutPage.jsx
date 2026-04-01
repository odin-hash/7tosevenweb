import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '@/context/CartContext';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customer_name: '', customer_email: '', customer_phone: '',
    address: '', city: '', state: '', pincode: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      // Step 1: Tell backend to generate a Razorpay order ID
      const orderPayload = {
        items: items.map(i => ({
          product_id: i.product_id, product_name: i.product_name,
          size: i.size, quantity: i.quantity, price: i.price, image: i.image,
        }))
      };

      const razorpayRes = await axios.post(`${API}/create-razorpay-order`, orderPayload);
      const { id: razorpay_order_id, amount, currency } = razorpayRes.data;

      // Step 2: Open Razorpay Payment Popup
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Passed through Vite
        amount: amount,
        currency: currency,
        name: "7toSEVEN",
        description: "Official Order Checkout",
        order_id: razorpay_order_id,
        handler: async function (response) {
          // Step 3: Send verification to backend and final database save
          setSubmitting(true);
          try {
            const res = await axios.post(`${API}/orders`, {
              ...form,
              ...orderPayload,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });
            clearCart();
            navigate(`/order-confirmed?id=${res.data.order_id}`);
          } catch (verifyErr) {
            console.error('Verification failed:', verifyErr);
            alert("Payment verification failed. Please contact support.");
            setSubmitting(false);
          }
        },
        prefill: {
          name: form.customer_name,
          email: form.customer_email,
          contact: form.customer_phone
        },
        theme: {
          color: "#000000" // Native fast black
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        console.error("Razorpay Detailed Error:", response.error);
        const errorReason = response.error.reason || response.error.description;
        alert(`Payment Initialization Failed.\nReason: ${errorReason}\nStep: ${response.error.step}`);
      });
      
      console.log("Razorpay Key Status: ", options.key ? `Loaded (${options.key.substring(0, 8)}...)` : "MISSING");
      
      rzp1.open();

    } catch (err) { 
      console.error('Razorpay initiation failed:', err); 
      alert("Checkout unavailable. Please try again.");
    } finally { 
      setSubmitting(false); // We enable the button behind the popup
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 pt-32">
        <p className="font-['Impact'] text-xl uppercase tracking-wider text-black/30 dark:text-white/30">Your cart is empty</p>
        <button onClick={() => navigate('/shop')} data-testid="checkout-empty-shop-btn" className="bg-black text-white dark:bg-white dark:text-[#0A0A0A] font-['Impact'] text-xs uppercase tracking-[0.15em] px-8 py-3.5 rounded-full hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300">
          Continue Shopping
        </button>
      </div>
    );
  }

  const inputClass = "w-full bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-white/[0.06] text-black/80 dark:text-white/80 p-4 font-['Arial'] text-sm rounded-xl focus:outline-none focus:border-black/20 dark:border-white/20 placeholder:text-black/40 dark:placeholder:text-white/20 transition-colors duration-300";

  return (
    <div data-testid="checkout-page" className="min-h-screen pt-32 md:pt-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-10">
        <p className="font-['Impact'] text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-2">Secure</p>
        <h1 className="font-['Impact'] text-4xl md:text-5xl uppercase tracking-tighter text-black dark:text-white leading-[1.1]">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Left - Form */}
            <div className="lg:col-span-3">
              <h2 className="font-['Impact'] text-sm uppercase tracking-wider text-black/60 dark:text-white/60 mb-6">Shipping Details</h2>
              <div className="space-y-4">
                <input name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="Full Name" required data-testid="checkout-name" className={inputClass} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="customer_email" type="email" value={form.customer_email} onChange={handleChange} placeholder="Email" required data-testid="checkout-email" className={inputClass} />
                  <input name="customer_phone" value={form.customer_phone} onChange={handleChange} placeholder="Phone" required data-testid="checkout-phone" className={inputClass} />
                </div>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Street Address" required data-testid="checkout-address" className={inputClass} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City" required data-testid="checkout-city" className={inputClass} />
                  <input name="state" value={form.state} onChange={handleChange} placeholder="State" required data-testid="checkout-state" className={inputClass} />
                  <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" required data-testid="checkout-pincode" className={inputClass} />
                </div>
              </div>
              <button type="submit" data-testid="checkout-submit-btn" disabled={submitting} className="w-full bg-black text-white dark:bg-white dark:text-[#0A0A0A] font-['Impact'] text-sm uppercase tracking-[0.15em] py-4 mt-10 rounded-full hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 disabled:bg-black/10 dark:disabled:bg-white/10 disabled:text-black/20 dark:disabled:text-white/20">
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-6 md:p-8 sticky top-32">
                <h2 className="font-['Impact'] text-sm uppercase tracking-wider text-black/60 dark:text-white/60 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.product_id}-${item.size}`} className="flex gap-3 pb-4 border-b border-black/5 dark:border-white/[0.04]">
                      <img src={item.image} alt={item.product_name} className="w-14 h-18 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="font-['Impact'] text-[10px] uppercase tracking-wider text-black dark:text-white truncate">{item.product_name}</p>
                        <p className="text-[10px] text-black/30 dark:text-white/30 mt-0.5">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs text-black dark:text-white whitespace-nowrap">{'\u20B9'}{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2.5 text-xs">
                  <div className="flex justify-between text-black/40 dark:text-white/40"><span>Subtotal</span><span>{'\u20B9'}{subtotal.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-black/40 dark:text-white/40"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `\u20B9${shipping}`}</span></div>
                  <div className="flex justify-between text-black dark:text-white font-['Impact'] text-base uppercase tracking-wider pt-4 border-t border-black/5 dark:border-white/[0.04]">
                    <span>Total</span><span>{'\u20B9'}{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
