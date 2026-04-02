import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <section data-testid="hero-section" className="relative w-full min-h-[100dvh] flex flex-col pt-32 bg-[#0A0A0A] overflow-hidden">
      
      {/* Inline Styles for Animated Grain */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes film-grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(-2%, -2%); }
          40% { transform: translate(2%, 2%); }
          50% { transform: translate(-1%, 2%); }
          60% { transform: translate(1%, -1%); }
          70% { transform: translate(2%, 1%); }
          80% { transform: translate(-2%, 1%); }
          90% { transform: translate(1%, -2%); }
        }
        .animate-grain {
          animation: film-grain 0.6s steps(2) infinite;
        }
      `}} />

      {/* Background Image Container */}
      <div className="absolute inset-0 bg-black">
        <img
          src="/hero_indian_real.png"
          alt="7toSEVEN Drop 001"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70 grayscale contrast-125"
        />
        
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t to-transparent from-[#0A0A0A] via-[#0A0A0A]/60" />
      </div>

      {/* Animated Static Grain Overlay */}
      <div 
        className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] opacity-[0.15] mix-blend-overlay pointer-events-none animate-grain z-20"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Content Container - Asymmetrical Layout */}
      <div className="relative z-30 flex pl-6 md:pl-16 pr-6 md:pr-16 lg:px-24 pb-16 h-full max-w-[1400px] mx-auto w-full flex-grow">
        
        {/* Top Right Secondary Paragraph */}
        <div className="absolute top-8 right-6 md:right-16 lg:right-24 max-w-[280px] md:max-w-xs text-right animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
          <p className="font-['Impact'] uppercase tracking-[0.2em] text-[#CCFF00] mb-2 text-sm">
            // AUTHORIZED ACCESS
          </p>
          <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed uppercase tracking-wider border-r-2 border-[#CCFF00] pr-4">
            Embrace the chaos. Unapologetic Indian streetwear designed for the alleys, the rooftops, and the noise of the city. 
          </p>
        </div>

        {/* Bottom Left Main Heading & Brutalist Call to Actions */}
        <div className="mt-auto animate-in fade-in slide-in-from-left-8 duration-1000 w-full">
          <p className="font-['Impact'] md:text-sm uppercase tracking-[0.4em] text-white/50 mb-4 inline-block bg-white/10 px-2 py-1 backdrop-blur-sm">
            DROP 001
          </p>
          
          <h1 className="font-['Impact'] text-[clamp(3.5rem,10vw,9rem)] uppercase leading-[0.9] tracking-widest text-white drop-shadow-2xl">
            BUILT<br/>
            DIFFERENT.<br/>
            WORN<br/>
            FEARLESS.
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start gap-6 mt-12 w-full max-w-lg">
            {/* Harsh Brutalist Neon Button */}
            <Link
              to="/shop"
              data-testid="hero-shop-btn"
              className="group relative inline-flex items-center justify-center gap-3 bg-transparent text-white font-['Impact'] text-sm md:text-base uppercase tracking-[0.2em] px-10 py-5 w-full sm:w-auto border-[3px] border-white hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:translate-x-1 hover:-translate-y-1 transition-all duration-200 shadow-none hover:shadow-[-6px_6px_0px_#ffffff]"
            >
              SHOP THE DROP
              <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <Link
              to="/lookbook"
              className="inline-flex items-center justify-center gap-3 bg-black/60 border border-white/20 text-white font-['Impact'] text-xs md:text-sm uppercase tracking-[0.2em] px-8 py-5 hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto backdrop-blur-md"
            >
              LOOKBOOK
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t to-transparent from-[#0A0A0A] pointer-events-none z-20" />
    </section>
  );
}
