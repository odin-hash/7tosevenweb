import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OurStoryPage from '@/pages/OurStoryPage';
import FAQPage from '@/pages/FAQPage';
import TermsPage from '@/pages/TermsPage';
import ShippingPolicyPage from '@/pages/ShippingPolicyPage';
import OrderConfirmedPage from '@/pages/OrderConfirmedPage';
import ReturnsExchangesPage from '@/pages/ReturnsExchangesPage';
import LookbookPage from '@/pages/LookbookPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    console.log(
      "%c7toSEVEN \n%cLooking under the hood? We like that. \nIf you're a developer exploring our code, you're awesome!",
      "color: black; background: white; font-family: sans-serif; font-size: 3em; font-weight: bolder; padding: 10px; border-radius: 5px;",
      "font-family: sans-serif; font-size: 1.2em; color: #888; font-style: italic;"
    );
  }, []);

  return (
    <div className="App bg-[#0A0A0A] text-white min-h-screen">
      <BrowserRouter>
        <ScrollToTop />
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/shipping" element={<ShippingPolicyPage />} />
              <Route path="/returns" element={<ReturnsExchangesPage />} />
              <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
              <Route path="/lookbook" element={<LookbookPage />} />
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
