import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import MarqueeBanner from '@/components/MarqueeBanner';
import DropCountdownSection from '@/components/DropCountdownSection';
import ProductCard from '@/components/ProductCard';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_ICON = "/logo-icon.png";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [stories, setStories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      axios.get(`${API}/products`).then(r => setProducts(r.data.products)).catch(() => {}),
      axios.get(`${API}/drop-stories`).then(r => setStories(r.data.stories)).catch(() => {}),
      axios.get(`${API}/collections`).then(r => setCollections(r.data.collections)).catch(() => {})
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  const filteredStories = stories.filter(s => s.title.toUpperCase() !== 'NOCTURNAL LOOKBOOK' && s.title.toUpperCase() !== 'ENGINEERED UTILITY');

  return (
    <div data-testid="home-page">
      {/* Hero */}
      <HeroSection />

      {/* Harsh Loop Marquee */}
      <MarqueeBanner />

      {/* Identity Block */}
      <section className="py-16 md:py-24 transition-colors duration-500  bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 text-center">
          <div className="mx-auto max-w-3xl flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 mb-12 font-sans font-black  md:text-xl tracking-[0.2em] uppercase  text-white/70 transition-colors duration-500">
              <p>For those who don’t wait.</p>
              <p>For those who don’t follow.</p>
              <p>For those who don’t fit.</p>
            </div>
            <p className="font-['Impact'] text-[clamp(2.5rem,7vw,6rem)] uppercase tracking-widest  text-white leading-[1] transition-colors duration-500">
              NOT FOR EVERYONE.<br/>
              <span className=" text-red-500 drop-shadow-sm block mt-2">NEVER WAS.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Visual Strip */}
      <section className="py-1 bg-black overflow-hidden flex w-full relative z-10">
        <div className="flex gap-1 animate-marquee w-max">
          {[...Array(4)].map((_, groupIndex) => (
            <React.Fragment key={`group-${groupIndex}`}>
              {[1, 2, 3, 4].map((i) => (
                <div key={`${groupIndex}-${i}`} className="w-[85vw] md:w-[45vw] h-[45vh] md:h-[65vh] flex-shrink-0 bg-[#0A0A0A]">
                  <img src={`/visual_strip_${i}.png`} alt={`Look 0${i}`} className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer" loading="lazy" />
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
              <p className="font-['Impact'] text-[10px] uppercase tracking-[0.3em]  text-white/30 transition-colors duration-500 mb-2">Curated</p>
              <h2 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight  text-white transition-colors duration-500 leading-[1.1]">
                Featured
              </h2>
            </div>
            <Link
              to="/shop"
              data-testid="view-all-products"
              className="flex items-center gap-2 font-['Impact']  uppercase tracking-[0.2em]   text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-6">
              <div className="relative flex items-center justify-center w-12 h-12">
                <div className="absolute inset-0   border-white/10 rounded-full" />
                <div className="absolute inset-0   border-white rounded-full animate-spin " />
                <div className="w-2 h-2  bg-white rounded-full animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
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
              <p className="font-['Impact'] text-[10px] uppercase tracking-[0.3em]  text-white/30 transition-colors duration-500 mb-2">Explore</p>
              <h2 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight  text-white transition-colors duration-500 leading-[1.1]">
                Collections
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {collections.map((col) => (
                <Link
                  to={`/shop?collection=${col.slug}`}
                  key={col.id}
                  data-testid={`collection-${col.slug}`}
                  className="relative group overflow-hidden rounded-none bg-[#111111] transition-colors duration-500"
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
      <section className="pt-20 pb-28 md:pt-32 md:pb-40 relative overflow-hidden bg-zinc-950">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col w-full gap-4 md:gap-8">
          <h2 className="font-['Impact'] text-[clamp(2.5rem,8vw,6.5rem)] uppercase tracking-tight text-white leading-none text-left w-full">
            NO RULES IN
          </h2>
          <h2 className="font-['Impact'] text-[clamp(2.5rem,8vw,6.5rem)] uppercase tracking-tight text-white leading-none text-center w-full">
            THE ZONE
          </h2>
          <h2 className="font-['Impact'] text-[clamp(2.5rem,8vw,6.5rem)] uppercase tracking-tight text-[#CCFF00] leading-none text-right w-full">
            NO APOLOGIES
          </h2>
        </div>
      </section>



      {/* Lookbook / Drop Story Film Strip */}
      <section className="py-16 md:py-24 transition-colors duration-500 bg-black relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <p className="font-['Impact'] text-[10px] uppercase tracking-[0.3em] text-white/30 transition-colors duration-500 mb-2">Editorial</p>
              <h2 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight text-white transition-colors duration-500 leading-[1.1]">
                LOOKBOOK PREVIEW
              </h2>
            </div>
          </div>
        </div>

        <div className="relative w-full group">
          {/* Edge-to-edge horizontal scroll container */}
          <div 
            className="flex w-full overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {/* 
              Hide Webkit scrollbar directly inline to ensure film strip look 
              without needing tailwind config overrides 
            */}
            <style dangerouslySetInnerHTML={{__html: `
              div::-webkit-scrollbar { display: none; }
            `}} />

            {['/lookbook_1.png', '/lookbook_2.png', '/lookbook_3.png'].map((src, idx) => (
              <div key={idx} className="flex-none h-[80vh] snap-center bg-[#111]">
                <img 
                  src={src} 
                  alt={`Lookbook Archive 00${idx + 1}`} 
                  className="h-full w-auto max-w-none object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-grab active:cursor-grabbing" 
                  loading="lazy" 
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Persistent overlay text */}
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 pointer-events-none mix-blend-difference">
            <p className="font-mono text-[10px] md:text-xs text-white uppercase tracking-[0.3em] border border-white/20 p-3 bg-black/10 backdrop-blur-md">
              DRAG TO EXPLORE [→]
            </p>
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
            YOU’RE EITHER IN. OR INVISIBLE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link to="/shop" className="bg-white text-black font-['Impact'] text-xs md:text-sm px-10 py-4 md:py-5 uppercase tracking-[0.2em] hover:bg-white/90 transition-all border-2 border-white rounded-none hover:scale-105 active:scale-95 text-center">
              SHOP DROP
            </Link>
            <Link to="/lookbook" className="bg-transparent text-white font-['Impact'] text-xs md:text-sm px-10 py-4 md:py-5 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all border-2 border-white rounded-none hover:border-white hover:scale-105 active:scale-95 text-center">
              VIEW LOOKBOOK
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
