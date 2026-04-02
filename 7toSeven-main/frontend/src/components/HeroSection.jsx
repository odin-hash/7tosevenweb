import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section data-testid="hero-section" className="relative w-full min-h-[100dvh] bg-zinc-950 flex items-center pt-24 pb-16 px-6 md:px-16 lg:px-24 overflow-hidden border-b border-zinc-800">
      
      {/* Background Subtle Grain */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bg-noise {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(1%, -1%); }
        }
        .bg-grain {
          animation: bg-noise 0.4s steps(2) infinite;
        }
      `}} />
      <div 
        className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] opacity-[0.05] pointer-events-none bg-grain z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22nf%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23nf)%22/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT COLUMN: Typography & Identity */}
        <div className="flex flex-col justify-center animate-in fade-in slide-in-from-left-8 duration-1000 order-2 md:order-1 pt-8 md:pt-0">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-[#CCFF00] mb-6">
            // AUTHORIZED ACCESS
          </p>
          
          <h1 className="font-['Impact'] text-[clamp(4.5rem,14vw,10.5rem)] uppercase leading-[0.95] tracking-widest text-white drop-shadow-2xl mb-12">
            7TO<br/>SEVEN
          </h1>
          
          <p className="font-mono text-xs md:text-sm text-white/50 uppercase tracking-widest max-w-sm mb-12 border-l-2 border-[#CCFF00] pl-5 leading-relaxed">
            Embrace the chaos. Unapologetic Indian streetwear designed for the alleys, the rooftops, and the noise of the city. 
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
            {/* Harsh Brutalist Neon Button */}
            <Link
              to="/shop"
              data-testid="hero-shop-btn"
              className="group relative inline-flex items-center justify-center gap-4 bg-white text-black font-['Impact'] text-lg md:text-xl uppercase tracking-[0.2em] px-12 py-6 w-full sm:w-auto border-[3px] border-white hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:translate-x-1 hover:-translate-y-1 transition-all duration-200 rounded-none shadow-[6px_6px_0px_0px_#ffffff] hover:shadow-[-4px_4px_0px_0px_transparent]"
            >
              SHOP THE DROP
              <ArrowRight size={22} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: 4:5 Aspect Image */}
        <div className="w-full relative aspect-[4/5] border border-zinc-800 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 order-1 md:order-2 group overflow-hidden bg-black object-cover">
          <img
            src="/hero_indian_real.png"
            alt="7toSEVEN Hero"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-[1.1] transition-transform duration-[1200ms] group-hover:scale-[1.04]"
          />
          {/* Subtle vignette over the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
