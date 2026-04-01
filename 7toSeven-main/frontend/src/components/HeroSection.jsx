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
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
        {/* Single master transparent PNG perfectly aligned and CSS styled for mode */}
        <img
          src="/hero-image-transparent.png"
          alt="7toSEVEN Drop 001"
          fetchPriority="high"
          className="w-full h-full object-cover object-center transition-all duration-700 dark:brightness-75 dark:contrast-125"
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/40 transition-colors duration-500 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F9F9] via-[#F9F9F9]/40 to-transparent dark:from-[#0A0A0A] dark:via-[#0A0A0A]/20 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F9F9]/90 via-[#F9F9F9]/20 to-transparent dark:from-[#0A0A0A]/80 dark:via-transparent transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end w-full h-full px-6 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto">
        <div className="animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <p className="font-['Impact'] text-[10px] md:text-xs uppercase tracking-[0.4em] text-black/50 dark:text-white/50 mb-6">
            SS25 &mdash; Drop 001
          </p>
          <h1 className="font-['Impact'] text-[clamp(2.5rem,8vw,7rem)] uppercase leading-[1.1] md:leading-[1.2] tracking-widest text-[#111111] dark:text-white drop-shadow-md dark:drop-shadow-2xl transition-colors duration-500">
            BOLD.
            <br />
            ELECTRIC.
            <br />
            FEARLESS.
          </h1>
          <p className="font-['Impact'] text-xs md:text-sm uppercase tracking-[0.25em] text-black/60 dark:text-white/40 mt-4 md:mt-6 transition-colors duration-500">
            Relentless Evolution
          </p>
          <Link
            to="/shop"
            data-testid="hero-shop-btn"
            className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-[#0A0A0A] font-['Impact'] text-xs md:text-sm uppercase tracking-[0.15em] px-6 py-3 md:px-8 md:py-3.5 mt-8 hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 group"
          >
            Shop the Drop
            <ArrowRight size={15} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F9F9F9] to-transparent dark:from-[#0A0A0A] pointer-events-none transition-colors duration-500" />
    </section>
  );
}
