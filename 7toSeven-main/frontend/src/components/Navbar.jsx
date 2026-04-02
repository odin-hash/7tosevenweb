import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Sun, Moon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from 'next-themes';

const ICON_LOGO = "/logo-icon.png";

export default function Navbar() {
  const { setIsCartOpen, itemCount, isCartOpen } = useCart();
  const location = useLocation();
  const { theme, setTheme, resolvedTheme } = useTheme();
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

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <nav
        data-testid="navbar"
        className={`fixed top-4 left-4 right-4 md:left-8 md:right-8 z-40 transition-all duration-700 ease-in-out border ${
          scrolled 
            ? 'bg-white/70 dark:bg-[#0A0A0A]/70 border-black/10 dark:border-white/10 backdrop-blur-2xl backdrop-saturate-[180%] shadow-sm' 
            : 'bg-transparent border-transparent backdrop-blur-none backdrop-saturate-100'
        }`}
        style={{ borderRadius: '0px' }}
      >
        <div className="flex items-center justify-between px-5 md:px-8 h-14 md:h-16">
          {/* Left — Icon logo (lightning bolt) */}
          <Link to="/" data-testid="nav-logo" className="shrink-0 flex items-center">
            <img src={ICON_LOGO} alt="7toSEVEN" className={`h-4 sm:h-5 md:h-6 lg:h-7 w-auto object-contain transition-all duration-500 ${resolvedTheme !== 'dark' ? 'invert' : ''}`} />
          </Link>

          {/* Center — Links (desktop) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link to="/shop" data-testid="nav-shop-link" className="font-['Impact'] text-[11px] uppercase tracking-[0.2em] text-[#111111]/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors duration-300">
              SHOP
            </Link>
            <Link to="/our-story" data-testid="nav-story-link" className="font-['Impact'] text-[11px] uppercase tracking-[0.2em] text-[#111111]/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors duration-300">
              MANIFESTO
            </Link>
          </div>

          {/* Right — Icons */}
          <div className="flex items-center gap-4 md:gap-5">
            {mounted && (
              <div className="relative flex items-center justify-center group" title="Switch to Dark Mode">
                {/* Subtle pulsing indicator to draw attention */}
                <span className="absolute inline-flex h-[130%] w-[130%] rounded-full bg-black/10 dark:bg-white/10 opacity-75 group-hover:animate-ping animate-pulse"></span>
                <button onClick={toggleTheme} className="relative z-10 text-[#111]/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-all duration-300 bg-[#111]/5 dark:bg-white/10 p-1.5 rounded-full">
                  {resolvedTheme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
                </button>
              </div>
            )}

            <button data-testid="nav-cart-btn" onClick={() => setIsCartOpen(true)} className="text-[#111]/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors duration-300 relative">
              <ShoppingBag size={19} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-black text-white dark:bg-white dark:text-[#0A0A0A] text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">
                  {itemCount}
                </span>
              )}
            </button>
            <button data-testid="nav-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#111]/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors duration-300">
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[45] bg-[#F9F9F9]/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10" data-testid="mobile-menu">
          <Link to="/shop" data-testid="mobile-shop" className="font-['Impact'] text-4xl uppercase tracking-wider text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors">SHOP</Link>
          <Link to="/our-story" data-testid="mobile-story" className="font-['Impact'] text-4xl uppercase tracking-wider text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors">MANIFESTO</Link>
          <Link to="/lookbook" data-testid="mobile-lookbook" className="font-['Impact'] text-4xl uppercase tracking-wider text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors">LOOKBOOK</Link>
        </div>
      )}
    </>
  );
}
