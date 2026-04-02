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
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 pt-32 pb-40 bg-white dark:bg-[#0A0A0A] transition-colors duration-500">
        <div className="flex flex-col items-center text-center">
          <p className="font-['Impact'] text-[clamp(2.5rem,5vw,4rem)] uppercase tracking-widest text-black dark:text-white mb-8">CART IS EMPTY</p>
          <button onClick={() => navigate('/shop')} data-testid="checkout-empty-shop-btn" className="bg-black text-white dark:bg-white dark:text-[#0A0A0A] font-sans font-bold text-[11px] uppercase tracking-[0.2em] px-10 py-4 border border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all duration-300">
            RETURN TO COLLECTION
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-transparent border-b border-black/20 dark:border-white/20 text-black dark:text-white pb-3 pt-4 font-sans font-bold uppercase tracking-widest text-[11px] md:text-xs rounded-none focus:outline-none focus:border-black dark:focus:border-white placeholder:text-black/30 dark:placeholder:text-white/30 transition-all duration-300";

  return (
    <div data-testid="checkout-page" className="min-h-screen pt-32 md:pt-36 bg-white dark:bg-[#0A0A0A] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-16">
        <div className="border-b border-black/10 dark:border-white/10 pb-8">
          <p className="font-sans font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] text-black/50 dark:text-white/50 mb-4">SECURE</p>
          <h1 className="font-['Impact'] text-[clamp(3.5rem,8vw,6rem)] uppercase tracking-widest text-black dark:text-white leading-[0.9]">CHECKOUT</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Left - Form */}
            <div className="lg:col-span-3">
              <h2 className="font-['Impact'] text-xl md:text-2xl uppercase tracking-widest text-black dark:text-white mb-8">SHIPPING DETAILS</h2>
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
              <button type="submit" data-testid="checkout-submit-btn" disabled={submitting} className="w-full bg-black text-white dark:bg-white dark:text-[#0A0A0A] font-sans font-bold text-[11px] md:text-xs uppercase tracking-[0.2em] py-5 mt-16 border border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors duration-300 disabled:opacity-50">
                {submitting ? 'PROCESSING...' : 'CONFIRM & PAY'}
              </button>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-[#F9F9F9] dark:bg-[#0A0A0A]/50 p-6 md:p-10 sticky top-32 transition-colors duration-500">
                <h2 className="font-['Impact'] text-xl md:text-2xl uppercase tracking-widest text-black dark:text-white mb-8 border-b border-black/10 dark:border-white/10 pb-4">ORDER SUMMARY</h2>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.product_id}-${item.size}`} className="flex gap-6 pb-6 border-b border-black/10 dark:border-white/10 last:border-0 hover:opacity-80 transition-opacity">
                      <img src={item.image} alt={item.product_name} className="w-20 h-24 object-cover" />
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="mb-2">
                          <p className="font-['Impact'] text-base uppercase tracking-widest text-black dark:text-white leading-tight">{item.product_name}</p>
                          <p className="font-sans font-bold text-[10px] text-black/40 dark:text-white/40 tracking-[0.2em] mt-1 uppercase">SIZE: {item.size} / QTY: {item.quantity}</p>
                        </div>
                        <p className="font-sans font-bold text-xs tracking-widest text-black/60 dark:text-white/60 whitespace-nowrap">{'\u20B9'}{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-4 font-sans font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                  <div className="flex justify-between text-black/50 dark:text-white/50"><span>SUBTOTAL</span><span>{'\u20B9'}{subtotal.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-black/50 dark:text-white/50"><span>SHIPPING</span><span>{shipping === 0 ? 'FREE' : `\u20B9${shipping}`}</span></div>
                  <div className="flex justify-between text-black dark:text-white font-['Impact'] text-2xl uppercase tracking-widest pt-6 border-t border-black/10 dark:border-white/10 mt-6">
                    <span>TOTAL</span><span>{'\u20B9'}{total.toLocaleString('en-IN')}</span>
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
