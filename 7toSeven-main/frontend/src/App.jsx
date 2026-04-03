import React, { useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from '@/context/CartContext';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
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
import ComingSoonCategoryPage from '@/pages/ComingSoonCategoryPage';
import PageTransition from '@/components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
        <Route path="/products/:slug" element={<PageTransition><ProductPage /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
        <Route path="/our-story" element={<PageTransition><OurStoryPage /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQPage /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
        <Route path="/shipping" element={<PageTransition><ShippingPolicyPage /></PageTransition>} />
        <Route path="/returns" element={<PageTransition><ReturnsExchangesPage /></PageTransition>} />
        <Route path="/order-confirmed" element={<PageTransition><OrderConfirmedPage /></PageTransition>} />
        <Route path="/lookbook" element={<PageTransition><LookbookPage /></PageTransition>} />
        <Route path="/category/:name" element={<PageTransition><ComingSoonCategoryPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

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
        <CustomCursor />
        <Preloader />
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">
            <AnimatedRoutes />
          </main>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
