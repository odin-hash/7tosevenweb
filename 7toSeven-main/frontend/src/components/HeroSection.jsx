import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section data-testid="hero-section" className="relative w-full min-h-[100dvh] bg-zinc-950 flex flex-col items-center justify-center p-6 md:p-16 overflow-hidden border-b border-zinc-800">
      
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          src="/hero_custom.png.jpg"
          alt="7toSEVEN Hero"
          fetchPriority="high"
          className="w-full h-full object-cover object-center animate-in fade-in zoom-in-105 duration-1000"
        />
        {/* Gritty vignette / darkening overlay so text punches through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center h-full pt-32 pb-12">
        
        {/* Foreground Typography */}
        <div className="flex flex-col flex-1 items-center justify-center mt-[-2dvh] md:mt-[-10dvh] px-4 w-full overflow-hidden">
          <h1 className="font-['Impact'] text-[25vw] sm:text-[20vw] md:text-8xl lg:text-[10rem] uppercase leading-[1] md:leading-[0.9] tracking-tighter text-white/30 text-center break-words w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
            7TO<br className="md:hidden" />SEVEN
          </h1>
        </div>

        {/* BOTTOM: Action Area */}
        <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 w-full max-w-sm md:max-w-none mt-4 md:mt-8 pb-8">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-[#CCFF00] mb-6 border border-[#CCFF00]/30 px-6 py-2 bg-black/60 backdrop-blur-md">
            // AUTHORIZED ACCESS 001
          </p>
          
          <Link
            to="/shop"
            data-testid="hero-shop-btn"
            className="group relative inline-flex items-center justify-center gap-4 bg-white text-black font-['Impact'] text-xl md:text-2xl uppercase tracking-[0.2em] px-14 py-6 w-full md:w-auto border-[3px] border-white hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:translate-x-1 hover:-translate-y-1 transition-all duration-200 rounded-none shadow-[6px_6px_0px_0px_#000000] hover:shadow-[-6px_6px_0px_0px_rgba(0,0,0,0.8)]"
          >
            SHOP THE DROP
            <ArrowRight size={26} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
