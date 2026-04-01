import React from 'react';

export default function AnnouncementBar() {
  const text = "BOLD. ELECTRIC. FEARLESS. \u00A0\u00A0\u2014\u00A0\u00A0 DROP 001 NOW LIVE \u00A0\u00A0\u2014\u00A0\u00A0 FREE SHIPPING ABOVE \u20B9999 \u00A0\u00A0\u2014\u00A0\u00A0 NOT FOR EVERYONE \u00A0\u00A0\u2014\u00A0\u00A0 ";

  return (
    <div
      data-testid="announcement-bar"
      className="fixed top-0 left-0 right-0 z-[60] bg-black/5 dark:bg-white/[0.03] backdrop-blur-sm py-2 overflow-hidden whitespace-nowrap"
    >
      <div className="animate-marquee inline-flex">
        <span className="font-['Impact'] text-[10px] uppercase tracking-[0.25em] text-black/40 dark:text-white/40">
          {text}{text}{text}{text}
        </span>
      </div>
    </div>
  );
}
