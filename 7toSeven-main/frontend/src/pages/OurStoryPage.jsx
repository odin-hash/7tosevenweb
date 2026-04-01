import React from 'react';
import { Link } from 'react-router-dom';

export default function OurStoryPage() {
  return (
    <div data-testid="our-story-page" className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 lg:pb-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-6">Est. 2026</p>
          <h1 
            className="font-['Impact'] text-5xl md:text-6xl lg:text-7xl uppercase text-black dark:text-white leading-[1.15]"
            style={{ WebkitTextStroke: '1px currentColor' }}
          >
            We Don't
            <br />
            Design For
            <br />
            The Masses
          </h1>
        </div>
      </section>

      {/* Origin */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-4">Chapter 01</p>
              <h2 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight text-black dark:text-white leading-[1.15] mb-6">
                The Origin
              </h2>
              <p className="text-sm text-black/40 dark:text-white/40 leading-relaxed">
                7toSEVEN was born from frustration. Frustration with fast fashion. Frustration with brands that promise quality but deliver mediocrity. We started with a single question: what if every piece of clothing you owned felt like it was made specifically for you?
              </p>
              <p className="text-sm text-black/40 dark:text-white/40 leading-relaxed mt-4">
                Founded in 2026, we set out to create streetwear that respects both the craft and the culture. No shortcuts. No compromises. Every stitch intentional.
              </p>
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img src="/story-origin-2.png" alt="Premium Raw Denim" fetchPriority="high" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl order-2 lg:order-1">
              <img src="/story-process-2.png" alt="Tailor working on Heavyweight process" fetchPriority="high" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-4">Chapter 02</p>
              <h2 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight text-black dark:text-white leading-[1.15] mb-6">
                The Process
              </h2>
              <p className="text-sm text-black/40 dark:text-white/40 leading-relaxed">
                Each garment starts as a concept, tested against one rule: would we wear this every day? We source heavyweight fabrics, test them for durability, and craft them in small batches.
              </p>
              <p className="text-sm text-black/40 dark:text-white/40 leading-relaxed mt-4">
                We work directly with artisans in India who share our obsession with detail. From the weight of the cotton to the tension of each stitch, every element is deliberate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Heavyweight Only', text: 'Minimum 240 GSM. We don\'t do thin. Every piece has weight, substance, and presence.' },
              { title: 'Limited Drops', text: 'Small batches, never restocked. When it\'s gone, it\'s gone. This isn\'t scarcity marketing. It\'s integrity.' },
              { title: 'Made in India', text: 'Designed and manufactured locally. Supporting Indian craftsmanship while building a global brand.' },
            ].map((v, i) => (
              <div key={i} className="glass rounded-2xl p-8 md:p-10">
                <h3 className="font-['Impact'] text-lg uppercase tracking-tight text-black dark:text-white mb-4">{v.title}</h3>
                <p className="text-sm text-black/40 dark:text-white/40 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 text-center">
        <h2 className="font-['Impact'] text-4xl md:text-5xl uppercase tracking-tighter text-black dark:text-white leading-[1.15]">
          Join The Movement
        </h2>
        <p className="text-xs text-black/30 dark:text-white/30 mt-4 max-w-md mx-auto">Not for everyone. For the ones who get it.</p>
        <Link to="/shop" data-testid="story-shop-btn" className="inline-block bg-black text-white dark:bg-white dark:text-[#0A0A0A] font-['Impact'] text-xs uppercase tracking-[0.15em] px-10 py-3.5 mt-10 rounded-full hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300">
          Shop Now
        </Link>
      </section>
    </div>
  );
}
