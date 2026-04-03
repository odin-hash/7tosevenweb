import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ICON_LOGO = "/logo-icon.png";

export default function Navbar() {
  const { setIsCartOpen, itemCount, isCartOpen } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-700 ease-in-out border-b ${
          scrolled 
            ? 'bg-[#0A0A0A]/90 border-white/10 backdrop-blur-md shadow-sm' 
            : 'bg-transparent border-transparent backdrop-blur-none'
        }`}
        style={{ borderRadius: '0px' }}
      >
        <div className="flex items-center justify-between px-5 md:px-8 h-14 md:h-16">
          {/* Left — Icon logo (lightning bolt) */}
          <Link to="/" data-testid="nav-logo" className="shrink-0 flex items-center">
            <img src={ICON_LOGO} alt="7toSEVEN" className="h-4 sm:h-5 md:h-6 w-auto object-contain transition-all duration-500" />
          </Link>

          {/* Center — Links (desktop) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link to="/shop" data-testid="nav-shop-link" className="font-['Impact']  uppercase tracking-[0.2em]   text-white/60 hover:text-white transition-colors duration-300">
              SHOP
            </Link>
            <Link to="/our-story" data-testid="nav-story-link" className="font-['Impact']  uppercase tracking-[0.2em]   text-white/60 hover:text-white transition-colors duration-300">
              MANIFESTO
            </Link>
            <Link to="/lookbook" data-testid="nav-lookbook-link" className="font-['Impact'] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300">
              LOOKBOOK
            </Link>
          </div>

          {/* Right — Icons */}
          <div className="flex items-center gap-2 md:gap-5">

            <button data-testid="nav-cart-btn" onClick={() => setIsCartOpen(true)} className="text-white/60 hover:text-white transition-colors duration-300 relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2">
              <ShoppingBag size={19} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-white text-[#0A0A0A] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 text-[10px]">
                  {itemCount}
                </span>
              )}
            </button>
            <button data-testid="nav-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/60 hover:text-white transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center p-2">
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[45]  bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10" data-testid="mobile-menu">
          <button 
            onClick={() => setMobileOpen(false)} 
            className="absolute top-5 right-5 md:top-6 md:right-8 text-white/60 hover:text-[#CCFF00] transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] p-2"
            aria-label="Close Mobile Menu"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          <Link to="/shop" data-testid="mobile-shop" className="font-['Impact']  uppercase tracking-wider   text-white/80 hover:text-[#CCFF00] transition-colors text-2xl min-h-[44px] flex items-center">SHOP</Link>
          <Link to="/our-story" data-testid="mobile-story" className="font-['Impact']  uppercase tracking-wider   text-white/80 hover:text-[#CCFF00] transition-colors text-2xl min-h-[44px] flex items-center">MANIFESTO</Link>
          <Link to="/lookbook" data-testid="mobile-lookbook" className="font-['Impact']  uppercase tracking-wider   text-white/80 hover:text-[#CCFF00] transition-colors text-2xl min-h-[44px] flex items-center">LOOKBOOK</Link>
        </div>
      )}
    </>
  );
}
