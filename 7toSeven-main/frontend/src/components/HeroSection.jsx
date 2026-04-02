import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function HeroSection() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <section data-testid="hero-section" className="relative w-full min-h-[100dvh] flex flex-col justify-end pt-32 bg-white dark:bg-[#0A0A0A] transition-colors duration-500">
      {/* Background Image Container */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        <img
          src="/hero_streetwear.png"
          alt="7toSEVEN Drop 001"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F9F9] via-[#F9F9F9]/20 to-transparent dark:from-[#0A0A0A] dark:via-[#0A0A0A]/40 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end w-full h-full px-6 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto">
        <div className="animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <p className="font-['Impact'] text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/70 dark:text-white/50 mb-6 drop-shadow-md">
            SS25 &mdash; Drop 001
          </p>
          <h1 className="font-['Impact'] text-[clamp(2.5rem,8vw,7rem)] uppercase leading-[1.1] md:leading-[1.2] tracking-widest text-white drop-shadow-2xl transition-colors duration-500">
            BUILT
            <br />
            DIFFERENT.
            <br />
            WORN
            <br />
            FEARLESS.
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
            <Link
              to="/shop"
              data-testid="hero-shop-btn"
              className="inline-flex items-center justify-center gap-3 bg-white text-black font-['Impact'] text-xs md:text-sm uppercase tracking-[0.15em] px-8 py-4 hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 group w-full sm:w-auto"
            >
              SHOP DROP
              <ArrowRight size={15} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/lookbook"
              className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white font-['Impact'] text-xs md:text-sm uppercase tracking-[0.15em] px-8 py-3.5 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 w-full sm:w-auto backdrop-blur-sm"
            >
              VIEW LOOKBOOK
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F9F9F9] to-transparent dark:from-[#0A0A0A] pointer-events-none transition-colors duration-500" />
    </section>
  );
}
