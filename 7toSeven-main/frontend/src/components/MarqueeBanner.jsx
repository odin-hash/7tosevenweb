import React from 'react';

export default function MarqueeBanner() {
  const text = "/// NOCTURNAL DROP 001 /// LIMITED QUANTITIES /// WORLDWIDE SHIPPING /// 7TOSEVEN \u00A0\u00A0\u00A0";
  
  return (
    <div className="w-full bg-[#CCFF00] overflow-hidden py-4 md:py-5 relative z-20 flex">
      <div className="animate-marquee inline-flex whitespace-nowrap">
        <span className="font-['Syne',sans-serif] font-black text-black text-2xl md:text-4xl uppercase tracking-[0.1em]">
          {text}{text}{text}{text}{text}{text}
        </span>
      </div>
    </div>
  );
}
