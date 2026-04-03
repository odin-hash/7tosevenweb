import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ComingSoonCategoryPage() {
  const { name } = useParams();
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4500);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="w-full bg-[#0A0A0A] min-h-[90vh] flex flex-col items-center justify-center px-6 relative overflow-hidden pt-20">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(var(--tw-colors-white, #fff) 1px, transparent 1px), linear-gradient(90deg, var(--tw-colors-white, #fff) 1px, transparent 1px)', 
          backgroundSize: '64px 64px' 
        }} 
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h4 className="font-mono text-sm tracking-[0.3em] text-zinc-500 uppercase mb-6 flex items-center gap-3">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          RESTRICTED ACCESS
        </h4>
        
        <h1 className={`font-['Syne'] text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 transition-transform ${glitch ? 'opacity-80 translate-x-2 -translate-y-1' : 'opacity-100'}`}>
          {name}
        </h1>
        
        <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest max-w-md mx-auto leading-relaxed mb-10">
          This collection is currently classified. Drops are being manufactured. Stay locked in for the release.
        </p>
        
        <div className="bg-white text-black px-8 py-3 uppercase tracking-[0.2em] text-xs font-bold font-mono mb-16 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          Coming Soon
        </div>
        
        <Link 
          to="/shop" 
          className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors border border-white/10 px-6 py-3 rounded-none hover:bg-white/5"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-300" />
          RETURN TO SHOP
        </Link>
      </div>

      {/* Massive brutalist watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.015] pointer-events-none text-[30vw] font-black font-['Syne'] uppercase">
        {name}
      </div>
    </div>
  );
}
