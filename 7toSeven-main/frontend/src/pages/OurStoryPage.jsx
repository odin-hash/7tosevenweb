import React from 'react';
import { Link } from 'react-router-dom';

export default function OurStoryPage() {
  return (
    <div data-testid="our-story-page" className="min-h-screen bg-black transition-colors duration-500">
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 lg:pb-32 overflow-hidden border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/50 mb-6 font-sans">
            Est. 2026
          </p>
          <h1 className="font-['Impact'] text-[clamp(4rem,10vw,8rem)] uppercase tracking-widest text-white leading-[1] drop-shadow-lg">
            MANIFESTO.
          </h1>
        </div>
      </section>

      {/* Origin */}
      <section className="py-16 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-['Impact'] text-[clamp(2.5rem,5vw,4rem)] uppercase tracking-tight text-white leading-[1] mb-6">
                BORN FROM<br/><span className="text-red-600">FRUSTRATION.</span>
              </h2>
              <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans uppercase tracking-widest max-w-lg">
                7toSEVEN was born from frustration. Frustration with fast fashion. Frustration with brands that promise quality but deliver mediocrity. We started with a single question: what if every piece of clothing you owned felt like it was made specifically for you?
              </p>
              <p className="text-sm md:text-base text-white/60 leading-relaxed mt-6 font-sans uppercase tracking-widest max-w-lg">
                Founded in 2026, we set out to create streetwear that respects both the craft and the culture. No shortcuts. No compromises. Every stitch intentional.
              </p>
            </div>
            <div className="aspect-[4/5] overflow-hidden order-1 lg:order-2 border border-white/10 bg-[#111]">
              <img src="/story_origin_gritty.png" alt="Raw Denim Frustration" fetchPriority="high" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="aspect-[4/5] overflow-hidden border border-white/10 bg-[#111]">
              <img src="/story_process_gritty.png" alt="Heavyweight process" fetchPriority="high" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
            <div className="lg:pl-8">
              <h2 className="font-['Impact'] text-[clamp(2.5rem,5vw,4rem)] uppercase tracking-tight text-white leading-[1] mb-6">
                NO<br/>COMPROMISES.
              </h2>
              <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans uppercase tracking-widest max-w-lg">
                Each garment starts as a concept, tested against one rule: would we wear this every day? We source heavyweight fabrics, test them for durability, and craft them in small batches.
              </p>
              <p className="text-sm md:text-base text-white/60 leading-relaxed mt-6 font-sans uppercase tracking-widest max-w-lg">
                We work directly with artisans in India who share our obsession with detail. From the weight of the cotton to the tension of each stitch, every element is deliberate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'HEAVYWEIGHT ONLY', text: 'Minimum 240 GSM. We don\'t do thin. Every piece has weight, substance, and presence.' },
              { title: 'NO RESTOCKS', text: 'Small batches, never restocked. When it\'s gone, it\'s gone. This isn\'t scarcity marketing. It\'s integrity.' },
              { title: 'CRAFTED IN INDIA', text: 'Designed and manufactured locally. Supporting Indian craftsmanship while building a global brand.' },
            ].map((v, i) => (
              <div key={i} className="border border-white/20 bg-[#0A0A0A] p-8 md:p-12 hover:bg-[#111] transition-colors duration-300">
                <h3 className="font-['Impact'] text-xl md:text-2xl uppercase tracking-widest text-white mb-6 drop-shadow-sm">{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-sans uppercase tracking-widest">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 text-center border-t border-white/10">
        <h2 className="font-['Impact'] text-[clamp(2.5rem,6vw,5rem)] uppercase tracking-widest text-white leading-[1]">
          IF YOU KNOW, <br className="md:hidden"/>YOU KNOW.
        </h2>
        <div className="mt-12 flex justify-center">
          <Link to="/shop" data-testid="story-shop-btn" className="inline-block bg-white text-black font-['Impact'] text-xs md:text-sm uppercase tracking-[0.2em] px-12 py-5 border-2 border-white hover:bg-white/90 hover:scale-[1.02] active:scale-95 transition-all duration-300">
            SHOP DROP
          </Link>
        </div>
      </section>
    </div>
  );
}
