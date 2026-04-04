import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '@/context/CartContext';

const API = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/api`;

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customer_name: '', customer_email: '', customer_phone: '',
    address: '', city: '', state: '', pincode: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const resLoad = await loadRazorpayScript();
      if (!resLoad) {
        alert("Razorpay SDK failed to load. Are you online?");
        setSubmitting(false);
        return;
      }
      
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
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Passed through Vite
        amount: amount,
        currency: currency,
        name: "7toSEVEN",
        description: "Official Order Checkout",
        order_id: razorpay_order_id,
        handler: async function (response) {
          // Step 3: Send verification to backend and final database save
          setSubmitting(true);
          try {
            const res = await axios.post(`${API}/verify-payment`, {
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 pt-32 pb-40  bg-[#0A0A0A] transition-colors duration-500">
        <div className="flex flex-col items-center text-center">
          <p className="font-['Impact']  uppercase tracking-widest  text-white mb-8">CART IS EMPTY</p>
          <button onClick={() => navigate('/shop')} data-testid="checkout-empty-shop-btn" className="  bg-white text-[#0A0A0A] font-sans font-bold  uppercase tracking-[0.2em] px-10 py-4 border  border-white   hover:bg-transparent hover:text-white transition-all duration-300">
            RETURN TO COLLECTION
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-zinc-900 border border-zinc-500 text-white px-4 py-4 font-sans font-bold uppercase tracking-widest text-[11px] md:text-xs rounded-none focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder:text-zinc-400 transition-all duration-300";

  return (
    <div data-testid="checkout-page" className="min-h-screen pt-32 md:pt-36  bg-[#0A0A0A] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-16">
        <div className="  border-white/10 pb-8">
          <p className="font-sans font-bold  md:text-xs uppercase tracking-[0.4em]  text-white/50 mb-4">SECURE</p>
          <h1 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight text-white leading-[1.1]">CHECKOUT</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Left - Form */}
            <div className="lg:col-span-3">
              <h2 className="font-['Impact']  md:text-2xl uppercase tracking-widest  text-white mb-8">SHIPPING DETAILS</h2>
              <div className="space-y-6">
                <input name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="FULL NAME" required data-testid="checkout-name" className={inputClass} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input name="customer_email" type="email" value={form.customer_email} onChange={handleChange} placeholder="EMAIL" required data-testid="checkout-email" className={inputClass} />
                  <input name="customer_phone" value={form.customer_phone} onChange={handleChange} placeholder="PHONE" required data-testid="checkout-phone" className={inputClass} />
                </div>
                <input name="address" value={form.address} onChange={handleChange} placeholder="STREET ADDRESS" required data-testid="checkout-address" className={inputClass} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input name="city" value={form.city} onChange={handleChange} placeholder="CITY" required data-testid="checkout-city" className={inputClass} />
                  <input name="state" value={form.state} onChange={handleChange} placeholder="STATE" required data-testid="checkout-state" className={inputClass} />
                  <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="PINCODE" required data-testid="checkout-pincode" className={inputClass} />
                </div>
              </div>
              <button type="submit" data-testid="checkout-submit-btn" disabled={submitting} className="w-full bg-white text-[#0A0A0A] font-sans font-bold md:text-sm uppercase tracking-[0.2em] py-5 mt-16 border-2 border-transparent hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black active:bg-[#CCFF00] active:text-black transition-all duration-300 rounded-none shadow-[4px_4px_0px_0px_rgba(204,255,0,0.5)] hover:shadow-[0px_0px_0px_0px_rgba(204,255,0,0)] hover:translate-y-[4px] hover:translate-x-[4px] disabled:opacity-50 disabled:hover:-translate-y-[0px] disabled:hover:-translate-x-[0px] disabled:hover:shadow-[4px_4px_0px_0px_rgba(204,255,0,0.5)] disabled:hover:bg-white disabled:hover:text-[#0A0A0A]">
                {submitting ? 'PROCESSING...' : 'CONFIRM & PAY'}
              </button>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-2">
              <div className=" bg-[#0A0A0A]/50 p-6 md:p-10 sticky top-32 transition-colors duration-500">
                <h2 className="font-['Impact']  md:text-2xl uppercase tracking-widest  text-white mb-8   border-white/10 pb-4">ORDER SUMMARY</h2>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.product_id}-${item.size}`} className="flex gap-6 pb-6   border-white/10 last:border-0 hover:opacity-80 transition-opacity">
                      <img src={item.image} alt={item.product_name} className="w-20 h-24 object-cover" />
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="mb-2">
                          <p className="font-['Impact']  uppercase tracking-widest  text-white leading-tight">{item.product_name}</p>
                          <p className="font-sans font-bold   text-white/40 tracking-[0.2em] mt-1 uppercase">SIZE: {item.size} / QTY: {item.quantity}</p>
                        </div>
                        <p className="font-sans font-bold  tracking-widest  text-white/60 whitespace-nowrap">{'\u20B9'}{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-4 font-sans font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                  <div className="flex justify-between text-white/50"><span>SUBTOTAL</span><span>{'\u20B9'}{subtotal.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-white/50"><span>SHIPPING</span><span>{shipping === 0 ? 'FREE' : `\u20B9${shipping}`}</span></div>
                  <div className="flex justify-between items-end pt-6 border-t border-white/10 mt-6">
                    <span className="font-['Impact'] text-xl md:text-2xl text-white tracking-widest leading-none uppercase">TOTAL</span>
                    <span className="font-sans font-bold text-lg md:text-xl text-white tracking-widest leading-none">{'\u20B9'}{total.toLocaleString('en-IN')}</span>
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
