import React, { useEffect, Suspense, lazy } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from '@/context/CartContext';
import { DropProvider } from '@/context/DropContext';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
const HomePage = lazy(() => import('@/pages/HomePage'));
const ShopPage = lazy(() => import('@/pages/ShopPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const OurStoryPage = lazy(() => import('@/pages/OurStoryPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const ShippingPolicyPage = lazy(() => import('@/pages/ShippingPolicyPage'));
const OrderConfirmedPage = lazy(() => import('@/pages/OrderConfirmedPage'));
const ReturnsExchangesPage = lazy(() => import('@/pages/ReturnsExchangesPage'));
const LookbookPage = lazy(() => import('@/pages/LookbookPage'));
const ArchivePage = lazy(() => import('@/pages/ArchivePage'));
const ComingSoonCategoryPage = lazy(() => import('@/pages/ComingSoonCategoryPage'));
import PageTransition from '@/components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Suspense fallback={<Preloader />}>
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
          <Route path="/archive" element={<PageTransition><ArchivePage /></PageTransition>} />
          <Route path="/category/:name" element={<PageTransition><ComingSoonCategoryPage /></PageTransition>} />
        </Routes>
      </Suspense>
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
      <DropProvider>
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
      </DropProvider>
    </div>
  );
}

export default App;
