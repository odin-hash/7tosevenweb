import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    // Check if session storage has the preloader flag
    const isDone = sessionStorage.getItem('preloader_done');
    if (isDone) {
      setLoading(false);
      return;
    }

    // Fast counter effect up to 99
    let currentCount = 0;
    const countTimer = setInterval(() => {
      // Rapid jump
      currentCount += Math.floor(Math.random() * 4) + 1;
      if (currentCount >= 99) {
        currentCount = 99;
        clearInterval(countTimer);
      }
      setCount(currentCount);
    }, 25);

    // Exact 1.8s slide up trigger
    const slideOutTimer = setTimeout(() => {
      setIsSliding(true);
      
      // Fully clear from DOM after slide out animation completes
      setTimeout(() => {
        sessionStorage.setItem('preloader_done', 'true');
        setLoading(false);
      }, 900); 
    }, 1800);

    return () => {
      clearInterval(countTimer);
      clearTimeout(slideOutTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[999] bg-zinc-950 flex flex-col items-center justify-center transition-transform duration-[800ms] ${
        isSliding ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes text-glitch {
          0% { opacity: 1; transform: translate(0); }
          20% { opacity: 0.8; transform: translate(-2px, 1px); }
          40% { opacity: 1; transform: translate(-1px, -1px); }
          60% { opacity: 0.9; transform: translate(2px, 2px); }
          80% { opacity: 1; transform: translate(1px, -1px); }
          100% { opacity: 1; transform: translate(0); }
        }
        .animate-glitch {
          animation: text-glitch 0.3s steps(2) infinite;
        }
      `}} />

      <div className="relative flex flex-col items-center px-6 text-center">
         <div className="font-mono text-[6rem] md:text-[10rem] font-black text-white leading-none tracking-tighter mb-4 animate-pulse">
           {count.toString().padStart(2, '0')}
         </div>
         <div className="font-mono text-xs md:text-sm text-[#CCFF00] uppercase tracking-[0.4em] font-bold animate-glitch mt-4">
           SYSTEM READY // DROP <span className="text-[#CCFF00]">001</span>
         </div>
      </div>
    </div>
  );
}
