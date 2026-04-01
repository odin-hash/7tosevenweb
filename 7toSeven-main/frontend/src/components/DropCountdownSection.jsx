import React, { useEffect, useState } from 'react';
import { useCountdown } from '@/hooks/useCountdown';

// Set target date 1 month from now for testing
const TARGET_DATE = new Date();
TARGET_DATE.setMonth(TARGET_DATE.getMonth() + 1);
const TARGET_STR = TARGET_DATE.toISOString();

export default function DropCountdownSection() {
  const { days, hours, minutes, seconds, milliseconds, isExpired } = useCountdown(TARGET_STR);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (isExpired) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="py-10 md:py-20 transition-colors duration-500 relative overflow-hidden" data-testid="drop-countdown">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] dark:opacity-[0.02]">
        <h3 className="font-['Impact'] text-[10rem] md:text-[15vw] uppercase tracking-tighter whitespace-nowrap text-black dark:text-white">
          THE DROP
        </h3>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-16 text-center relative z-10">
        <p className="font-['Impact'] text-[11px] md:text-xs uppercase tracking-[0.4em] text-black/50 dark:text-white/40 mb-8 md:mb-12">
          Next Drop In
        </p>

        {/* All times strictly in one single line without wrapping */}
        <div className="flex flex-nowrap justify-center items-end gap-x-1 sm:gap-x-3 md:gap-x-8">
          
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="font-['Impact'] text-xl sm:text-4xl md:text-6xl lg:text-8xl text-black dark:text-white leading-none tracking-tighter w-[2ch] mx-auto text-center">
              {mounted ? pad(days) : '00'}
            </span>
            <span className="font-['Impact'] text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1 md:mt-2">Days</span>
          </div>

          <span className="font-['Impact'] text-base sm:text-2xl md:text-4xl lg:text-6xl text-black/20 dark:text-white/20 pb-3 sm:pb-5 md:pb-8 lg:pb-12 shrink-0">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="font-['Impact'] text-xl sm:text-4xl md:text-6xl lg:text-8xl text-black dark:text-white leading-none tracking-tighter w-[2ch] mx-auto text-center">
              {mounted ? pad(hours) : '00'}
            </span>
            <span className="font-['Impact'] text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1 md:mt-2">Hours</span>
          </div>

          <span className="font-['Impact'] text-base sm:text-2xl md:text-4xl lg:text-6xl text-black/20 dark:text-white/20 pb-3 sm:pb-5 md:pb-8 lg:pb-12 shrink-0">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="font-['Impact'] text-xl sm:text-4xl md:text-6xl lg:text-8xl text-black dark:text-white leading-none tracking-tighter w-[2ch] mx-auto text-center">
              {mounted ? pad(minutes) : '00'}
            </span>
            <span className="font-['Impact'] text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1 md:mt-2">Mins</span>
          </div>

          <span className="font-['Impact'] text-base sm:text-2xl md:text-4xl lg:text-6xl text-black/20 dark:text-white/20 pb-3 sm:pb-5 md:pb-8 lg:pb-12 shrink-0">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="font-['Impact'] text-xl sm:text-4xl md:text-6xl lg:text-8xl text-black dark:text-white leading-none tracking-tighter w-[2ch] mx-auto text-center">
              {mounted ? pad(seconds) : '00'}
            </span>
            <span className="font-['Impact'] text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1 md:mt-2">Secs</span>
          </div>

          <span className="font-['Impact'] text-base sm:text-2xl md:text-4xl lg:text-6xl text-black/20 dark:text-white/20 pb-3 sm:pb-5 md:pb-8 lg:pb-12 shrink-0">.</span>

          {/* Milliseconds */}
          <div className="flex flex-col items-center">
            <span className="font-['Impact'] text-base sm:text-3xl md:text-5xl lg:text-7xl text-black/60 dark:text-white/60 leading-none tracking-tighter w-[2ch] mx-auto text-left">
              {mounted ? pad(milliseconds) : '00'}
            </span>
            <span className="font-['Impact'] text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1 md:mt-2 opacity-0 select-none">MS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
