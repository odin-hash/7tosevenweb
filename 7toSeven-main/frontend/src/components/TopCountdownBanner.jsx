import React from 'react';
import { useCountdown } from '@/hooks/useCountdown';

// Set a target date 1 month from now for testing
// In production, this would be fetched from API
const TARGET_DATE = new Date();
TARGET_DATE.setMonth(TARGET_DATE.getMonth() + 1);
const TARGET_STR = TARGET_DATE.toISOString();

export default function TopCountdownBanner() {
  const { days, hours, minutes, seconds, milliseconds, isExpired } = useCountdown(TARGET_STR);

  if (isExpired) return null;

  // Format with leading zeros
  const pad = (n) => String(n).padStart(2, '0');
  
  const timerStr = `${pad(days)}D : ${pad(hours)}H : ${pad(minutes)}M : ${pad(seconds)}S : ${pad(milliseconds)}MS`;
  const bannerText = `\u00A0\u00A0\u2014\u00A0\u00A0 "THE DROP" \u00A0\u00A0\u2014\u00A0\u00A0 ${timerStr} `;
  
  // Repeats for marquee
  const repeatedText = [...Array(10)].map(() => bannerText).join('');

  return (
    <div
      data-testid="top-countdown"
      className="fixed top-0 left-0 right-0 z-[60] bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-black/10 dark:border-white/10 py-1.5 overflow-hidden whitespace-nowrap pointer-events-none"
    >
      {/* CSS diagonal stripes transparent background for warning aesthetic */}
      <div 
        className="absolute inset-0 opacity-5 dark:opacity-[0.03]" 
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)'
        }} 
      />
      <div className="animate-marquee inline-flex relative z-10">
        <span className="font-['Impact'] text-[10px] md:text-xs uppercase tracking-[0.25em] text-black dark:text-white">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
