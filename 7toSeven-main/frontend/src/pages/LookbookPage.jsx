import React from 'react';

export default function LookbookPage() {
  return (
    <div className="bg-black min-h-screen pt-32 pb-24 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="mb-16 md:mb-24 text-center md:text-left animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="font-['Impact'] text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/50 mb-4">
            SS25 &mdash; Editorial
          </p>
          <h1 className="font-['Impact'] text-[clamp(3rem,8vw,6rem)] uppercase tracking-widest text-white leading-[1]">
            LOOKBOOK<br/>001
          </h1>
          <p className="mt-6 text-white/50 font-sans tracking-widest uppercase text-sm max-w-lg">
            Shot on location. Harsh light. Brutalist forms. 7TOSEVEN isn't worn, it's carried.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-24">
          {/* Image 1 - Full Width */}
          <div className="w-full aspect-[4/5] bg-[#111] overflow-hidden">
            <img 
              src="/lookbook_1.png" 
              alt="Lookbook Shot 1" 
              className="w-full h-full object-cover object-center grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-[1.02]"
              loading="lazy"
            />
          </div>

          {/* Images 2 and 3 - Side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            <div className="w-full aspect-[4/5] bg-[#111] overflow-hidden">
              <img 
                src="/lookbook_2.png" 
                alt="Lookbook Shot 2" 
                className="w-full h-full object-cover object-center grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="w-full aspect-[4/5] bg-[#111] overflow-hidden md:mt-24">
              <img 
                src="/lookbook_3.png" 
                alt="Lookbook Shot 3" 
                className="w-full h-full object-cover object-center grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
