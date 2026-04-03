import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

const ICON_LOGO = "/logo-icon.png";
const TYPO_LOGO = "/logo-typo.png";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative w-full bg-[#0A0A0A] overflow-hidden transition-colors duration-500">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 py-20 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {/* Brand — icon + typography logo */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3">
              <img src={ICON_LOGO} alt="7toSEVEN" className="h-5 w-auto object-contain transition-all duration-500" />
              <img src={TYPO_LOGO} alt="7toSEVEN" className="h-3 w-auto object-contain transition-all duration-500" />
            </Link>
            <p className="text-white/50 mt-6 leading-loose max-w-[240px] transition-colors duration-500">
              Premium streetwear for those who refuse to conform. Designed in India.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-['Impact']  uppercase tracking-[0.25em]  text-white/50 mb-8 transition-colors duration-500">Shop</h4>
            <div className="space-y-5">
              <Link to="/shop?category=tees" data-testid="footer-shop-tees" className="block font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">TEES</Link>
              <Link to="/shop?category=hoodies" data-testid="footer-shop-hoodies" className="block font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">HOODIES</Link>
              <Link to="/shop?category=bottoms" data-testid="footer-shop-bottoms" className="block font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">BOTTOMS</Link>
              <Link to="/shop?category=accessories" data-testid="footer-shop-accessories" className="block font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">ACCESSORIES</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-['Impact']  uppercase tracking-[0.25em]  text-white/50 mb-8 transition-colors duration-500">Info</h4>
            <div className="space-y-5">
              <Link to="/our-story" data-testid="footer-story" className="block font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">MANIFESTO</Link>
              <Link to="/faq" className="block font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">FAQ</Link>
              <Link to="/shipping" className="block font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">ORDER PROCESSING</Link>
              <Link to="/returns" className="block font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">RETURNS</Link>
              <Link to="/terms" className="block font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">TERMS & PRIVACY</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-['Impact']  uppercase tracking-[0.25em]  text-white/50 mb-8 transition-colors duration-500">Connect</h4>
            <div className="space-y-5">
              <a href="https://www.instagram.com/7tosevenofficial" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">
                <Instagram size={18} strokeWidth={1.5} /> IG
              </a>
              <a href="https://x.com/7tosevenoffic" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm text-zinc-400 hover:text-white uppercase transition-colors duration-300">
                <Twitter size={18} strokeWidth={1.5} /> X / TWITTER
              </a>
              <a href="mailto:support@7toseven.com" className="block font-mono text-sm text-zinc-400 hover:text-white break-all md:break-normal uppercase transition-colors duration-300">
                SUPPORT@7TOSEVEN.COM
              </a>
              <a href="mailto:shipping@7toseven.com" className="block font-mono text-sm text-zinc-400 hover:text-white break-all md:break-normal uppercase transition-colors duration-300">
                SHIPPING@7TOSEVEN.COM
              </a>
              <a href="mailto:legal@7toseven.com" className="block font-mono text-sm text-zinc-400 hover:text-white break-all md:break-normal uppercase transition-colors duration-300">
                LEGAL@7TOSEVEN.COM
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-500">
          <p className=" uppercase tracking-[0.2em]  text-white/20 transition-colors">&copy; 2026 7toSEVEN. All rights reserved.</p>
          <p className=" uppercase tracking-[0.2em]  text-white/20 transition-colors">Relentless Evolution</p>
        </div>
      </div>

      {/* Massive Brutalist Watermark */}
      <div className="w-full flex items-center justify-center overflow-hidden pb-4 md:pb-8 pointer-events-none select-none">
        <h1 className="font-['Syne'] text-[6vw] leading-none text-white/5 font-black whitespace-nowrap tracking-wider">
          7TOSEVEN
        </h1>
      </div>
    </footer>
  );
}
