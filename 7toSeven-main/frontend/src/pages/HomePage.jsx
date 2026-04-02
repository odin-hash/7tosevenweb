import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import DropCountdownSection from '@/components/DropCountdownSection';
import ProductCard from '@/components/ProductCard';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_ICON = "/logo-icon.png";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [stories, setStories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSlow, setLoadingSlow] = useState(false);

  useEffect(() => {
    setLoading(true);
    setLoadingSlow(false);
    
    const slowTimeout = setTimeout(() => {
      setLoadingSlow(true);
    }, 4000);

    Promise.all([
      axios.get(`${API}/products`).then(r => setProducts(r.data.products)).catch(() => {}),
      axios.get(`${API}/drop-stories`).then(r => setStories(r.data.stories)).catch(() => {}),
      axios.get(`${API}/collections`).then(r => setCollections(r.data.collections)).catch(() => {})
    ]).finally(() => {
      clearTimeout(slowTimeout);
      setLoading(false);
      setLoadingSlow(false);
    });
  }, []);

  const filteredStories = stories.filter(s => s.title.toUpperCase() !== 'NOCTURNAL LOOKBOOK' && s.title.toUpperCase() !== 'ENGINEERED UTILITY');

  return (
    <div data-testid="home-page">
      {/* Hero */}
      <HeroSection />

      {/* Identity Block */}
      <section className="py-16 md:py-24 transition-colors duration-500 bg-[#E5E5E5] dark:bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 text-center">
          <div className="mx-auto max-w-3xl flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 mb-12 font-sans font-black text-sm md:text-xl tracking-[0.2em] uppercase text-[#111111]/70 dark:text-white/70 transition-colors duration-500">
              <p>For those who don’t wait.</p>
              <p>For those who don’t follow.</p>
              <p>For those who don’t fit.</p>
            </div>
            <p className="font-['Impact'] text-[clamp(2.5rem,7vw,6rem)] uppercase tracking-widest text-[#111111] dark:text-white leading-[1] transition-colors duration-500">
              7TOSEVEN isn’t worn.<br/>
              <span className="text-red-600 dark:text-red-500 drop-shadow-sm block mt-2">It’s carried.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Visual Strip */}
      <section className="py-1 bg-black overflow-hidden flex w-full relative z-10">
        <div className="flex gap-1 animate-marquee w-max">
          {[...Array(4)].map((_, groupIndex) => (
            <React.Fragment key={`group-${groupIndex}`}>
              {[1, 2, 3].map((i) => (
                <div key={`${groupIndex}-${i}`} className="w-[85vw] md:w-[45vw] h-[45vh] md:h-[65vh] flex-shrink-0 bg-[#0A0A0A]">
                  <img src={`/visual_strip_${i}.png`} alt={`Vibe 0${i}`} className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer" loading="lazy" />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <div>
              <p className="font-['Impact'] text-[10px] uppercase tracking-[0.3em] text-[#111111]/40 dark:text-white/30 transition-colors duration-500 mb-2">Curated</p>
              <h2 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight text-black dark:text-white transition-colors duration-500 leading-[1.1]">
                Featured
              </h2>
            </div>
            <Link
              to="/shop"
              data-testid="view-all-products"
              className="flex items-center gap-2 font-['Impact'] text-[10px] uppercase tracking-[0.2em] text-[#111111]/50 hover:text-black dark:text-white/40 dark:hover:text-white/70 transition-colors duration-300"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-6">
              <div className="w-8 h-8 border-2 border-[#111111]/10 border-t-[#111111] dark:border-white/10 dark:border-t-white rounded-full animate-spin" />
              {loadingSlow && (
                <div className="text-center animate-pulse">
                  <p className="font-['Impact'] text-sm uppercase tracking-widest text-[#111111]/60 dark:text-white/60 mb-1">
                    Waking Up Server...
                  </p>
                  <p className="text-xs text-[#111111]/40 dark:text-white/40 max-w-[280px] mx-auto">
                    Free hosting tiers can take up to 2 minutes to spin up. Hang tight!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Collections Editorial */}
      {collections.length > 0 && (
        <section className="py-16 md:py-24 transition-colors duration-500">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16">
            <div className="mb-10 md:mb-12">
              <p className="font-['Impact'] text-[10px] uppercase tracking-[0.3em] text-[#111111]/40 dark:text-white/30 transition-colors duration-500 mb-2">Explore</p>
              <h2 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight text-black dark:text-white transition-colors duration-500 leading-[1.1]">
                Collections
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {collections.map((col) => (
                <Link
                  to={`/shop?collection=${col.slug}`}
                  key={col.id}
                  data-testid={`collection-${col.slug}`}
                  className="relative group overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 transition-colors duration-500"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={col.image}
                      alt={col.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1.5">Collection</p>
                    <h3 className="font-['Impact'] text-xl md:text-2xl uppercase tracking-tight text-white leading-[1.15]">
                      {col.name}
                    </h3>
                    <p className="text-xs text-white/40 mt-2 max-w-[240px] leading-relaxed">{col.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand Statement */}
      <section className="py-24 md:py-40 relative overflow-hidden transition-colors duration-500 bg-[#E5E5E5] dark:bg-[#111111]">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-['Impact'] text-[clamp(2.5rem,8vw,7rem)] uppercase tracking-widest text-[#111111] dark:text-white transition-colors duration-500 leading-[1] md:ml-[10%]">
            NO RULES.
          </h2>
          <h2 className="font-['Impact'] text-[clamp(2.5rem,8vw,7rem)] uppercase tracking-widest text-[#111111] dark:text-white transition-colors duration-500 leading-[1] md:ml-[25%] opacity-50 mt-4 md:mt-6">
            NO COMFORT ZONE.
          </h2>
          <h2 className="font-['Impact'] text-[clamp(2.5rem,8vw,7rem)] uppercase tracking-widest text-red-600 dark:text-red-500 transition-colors duration-500 leading-[1] md:ml-[15%] mt-4 md:mt-6 opacity-90">
            <span className="line-through decoration-black dark:decoration-white decoration-[6px] md:decoration-[12px]">NO APOLOGIES</span>.
          </h2>
        </div>
      </section>

      {/* Drop Countdown Section */}
      <DropCountdownSection />

      {/* Lookbook / Drop Story Grid */}
      <section className="py-16 md:py-24 transition-colors duration-500 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <div>
              <p className="font-['Impact'] text-[10px] uppercase tracking-[0.3em] text-white/30 transition-colors duration-500 mb-2">Editorial</p>
              <h2 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight text-white transition-colors duration-500 leading-[1.1]">
                LOOKBOOK 001
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 lg:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
             {/* 3 images cohesive grid */}
             <div className="md:col-span-8 row-span-2 relative overflow-hidden bg-[#111]">
               <img src="/lookbook_1.png" alt="Lookbook" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:scale-[1.02] transition-all duration-700" loading="lazy" />
             </div>
             <div className="md:col-span-4 row-span-1 relative overflow-hidden bg-[#111]">
               <img src="/lookbook_2.png" alt="Lookbook" className="w-full h-full object-cover object-top grayscale opacity-90 hover:grayscale-0 hover:scale-[1.02] transition-all duration-700" loading="lazy" />
             </div>
             <div className="md:col-span-4 row-span-1 relative overflow-hidden bg-[#111]">
               <img src="/lookbook_3.png" alt="Lookbook" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:scale-[1.02] transition-all duration-700" loading="lazy" />
             </div>
          </div>
        </div>
      </section>

      {/* CTA Close */}
      <section className="py-24 md:py-40 bg-black flex flex-col items-center justify-center text-center px-6 border-t border-white/5">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="font-['Impact'] text-[clamp(2.5rem,7vw,6rem)] uppercase tracking-widest text-white leading-[1] mb-6">
            DROP 001<br/>IS LIVE.
          </h2>
          <p className="font-['Impact'] text-[clamp(1rem,3vw,2rem)] uppercase tracking-[0.2em] text-white/50 mb-12 drop-shadow-sm">
            STEP IN OR STAY BASIC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link to="/shop" className="bg-white text-black font-['Impact'] text-xs md:text-sm px-10 py-4 md:py-5 uppercase tracking-[0.2em] hover:bg-white/90 transition-all border-2 border-white hover:scale-105 active:scale-95 text-center">
              SHOP DROP
            </Link>
            <Link to="/lookbook" className="bg-transparent text-white font-['Impact'] text-xs md:text-sm px-10 py-4 md:py-5 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all border-2 border-white/30 hover:border-white hover:scale-105 active:scale-95 text-center">
              VIEW LOOKBOOK
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
