import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

const ICON_LOGO = "/logo-icon.png";
const TYPO_LOGO = "/logo-typo.png";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative bg-gray-100 dark:bg-[#0A0A0A] overflow-hidden transition-colors duration-500">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 py-20 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {/* Brand — icon + typography logo */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3">
              <img src={ICON_LOGO} alt="7toSEVEN" className="h-5 w-auto object-contain invert dark:invert-0 transition-all duration-500" />
              <img src={TYPO_LOGO} alt="7toSEVEN" className="h-3 w-auto object-contain invert dark:invert-0 transition-all duration-500" />
            </Link>
            <p className="text-[14px] text-[#555] dark:text-[#777] mt-6 leading-loose max-w-[240px] transition-colors duration-500">
              Premium streetwear for those who refuse to conform. Designed in India.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-['Impact'] text-[12px] uppercase tracking-[0.25em] text-[#111111]/50 dark:text-white/50 mb-8 transition-colors duration-500">Shop</h4>
            <div className="space-y-5">
              <Link to="/shop?category=tees" data-testid="footer-shop-tees" className="block text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">Tees</Link>
              <Link to="/shop?category=hoodies" data-testid="footer-shop-hoodies" className="block text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">Hoodies</Link>
              <Link to="/shop?category=bottoms" data-testid="footer-shop-bottoms" className="block text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">Bottoms</Link>
              <Link to="/shop?category=accessories" data-testid="footer-shop-accessories" className="block text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">Accessories</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-['Impact'] text-[12px] uppercase tracking-[0.25em] text-[#111111]/50 dark:text-white/50 mb-8 transition-colors duration-500">Info</h4>
            <div className="space-y-5">
              <Link to="/our-story" data-testid="footer-story" className="block text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">Manifesto</Link>
              <Link to="/faq" className="block text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">FAQ</Link>
              <Link to="/shipping" className="block text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">Shipping Policy</Link>
              <Link to="/returns" className="block text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">Make a Return / Exchange</Link>
              <Link to="/terms" className="block text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">Terms & Privacy</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-['Impact'] text-[12px] uppercase tracking-[0.25em] text-[#111111]/50 dark:text-white/50 mb-8 transition-colors duration-500">Connect</h4>
            <div className="space-y-5">
              <a href="https://www.instagram.com/7tosevenofficial" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">
                <Instagram size={18} strokeWidth={1.5} /> Instagram
              </a>
              <a href="https://x.com/7tosevenoffic" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">
                <Twitter size={18} strokeWidth={1.5} /> Twitter / X
              </a>
              <a href="mailto:support@7toseven.com" className="flex items-center gap-3 text-[15px] text-[#555] hover:text-black dark:text-[#777] dark:hover:text-white transition-colors duration-300">
                support@7toseven.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-black/10 dark:border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-500">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#111111]/40 dark:text-white/20 transition-colors">&copy; 2026 7toSEVEN. All rights reserved.</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#111111]/40 dark:text-white/20 transition-colors">Relentless Evolution</p>
        </div>
      </div>
    </footer>
  );
}
