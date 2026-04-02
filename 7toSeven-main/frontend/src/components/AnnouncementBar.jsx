import React from 'react';

export default function AnnouncementBar() {
  const textFragment1 = "BOLD. ELECTRIC. FEARLESS. \u00A0\u00A0\u2014\u00A0\u00A0 DROP ";
  const highlight = <span className="text-[#CCFF00]">001</span>;
  const textFragment2 = " NOW LIVE \u00A0\u00A0\u2014\u00A0\u00A0 FREE SHIPPING ABOVE RS. 999 \u00A0\u00A0\u2014\u00A0\u00A0 NOT FOR EVERYONE \u00A0\u00A0\u2014\u00A0\u00A0 ";
  const textBlock = <>{textFragment1}{highlight}{textFragment2}</>;

  return (
    <div
      data-testid="announcement-bar"
      className="fixed top-0 left-0 right-0 z-[60] bg-black py-2 overflow-hidden whitespace-nowrap"
    >
      <div className="animate-marquee inline-flex">
        <span className="font-['Impact'] text-[10px] uppercase tracking-[0.25em] text-white/70">
          {textBlock}{textBlock}{textBlock}{textBlock}
        </span>
      </div>
    </div>
  );
}
