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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {products.slice(0, 4).map((product, index) => {
                
                // Top-Left Massive Editorial Piece
                if (index === 0) {
                  return (
                    <div key={product.id} className="sm:col-span-2 lg:col-span-2 sm:row-span-2 relative group overflow-hidden border border-zinc-800 hover:border-white transition-colors duration-500 bg-[#0A0A0A] flex flex-col justify-end aspect-square lg:aspect-auto min-h-[450px]">
                      <Link to={`/products/${product.slug}`} className="block absolute inset-0 w-full h-full">
                        <img 
                          src="/lookbook_1.png" 
                          className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-[1.05]" 
                          alt={product.name} 
                        />
                        
                        <div className="absolute top-4 left-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest px-3 py-1.5 z-20">
                          FEATURED / 01
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8 border-t border-transparent group-hover:border-white z-10 transition-colors">
                            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#CCFF00] mb-2">// HEAVYWEIGHT // {product.collection || "CORE"}</p>
                            <h3 className="font-['Impact'] text-3xl md:text-5xl uppercase tracking-widest text-white leading-[1.1] mb-6 max-w-sm">{product.name}</h3>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-end border-t border-zinc-800 pt-5 gap-4">
                               <span className="font-mono text-xl md:text-2xl font-bold tracking-widest text-white">RS. {product.price.toLocaleString('en-IN')}</span>
                               <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest bg-white text-black font-bold px-6 py-3 hover:bg-[#CCFF00] transition-colors border border-transparent inline-block text-center">QUICK ADD +</span>
                            </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
                
                // Bottom-Right Panoramic Piece
                if (index === 3) {
                  return (
                    <div key={product.id} className="sm:col-span-2 lg:col-span-2 relative group overflow-hidden border border-zinc-800 hover:border-white transition-colors duration-500 bg-[#0A0A0A] flex flex-col sm:flex-row min-h-[300px]">
                        <Link to={`/products/${product.slug}`} className="flex w-full h-full flex-col sm:flex-row">
                          <div className="w-full sm:w-1/2 relative overflow-hidden border-b sm:border-b-0 sm:border-r border-zinc-800 group-hover:border-white transition-colors duration-500 min-h-[200px]">
                            <img src="/lookbook_2.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-[1.05] grayscale contrast-125" alt={product.name} />
                          </div>
                          <div className="w-full sm:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-[#0A0A0A]">
                              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">// LATEST ADDITION</p>
                              <h3 className="font-['Impact'] text-xl md:text-2xl uppercase tracking-widest text-white leading-[1.1] mb-6">{product.name}</h3>
                              <span className="font-mono text-sm md:text-base font-bold tracking-widest text-[#CCFF00] mb-8">RS. {product.price.toLocaleString('en-IN')}</span>
                              
                              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest border border-white text-white font-bold px-6 py-3 hover:bg-white hover:text-black transition-colors w-max">EXPLORE ITEM</span>
                          </div>
                        </Link>
                    </div>
                  );
                }

                // Standard Cards (Index 1 & 2)
                return (
                  <div key={product.id} className="sm:col-span-1 lg:col-span-1 h-full">
                    <ProductCard product={product} />
                  </div>
                );
              })}
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
      <section className="py-24 md:py-40 relative overflow-hidden transition-colors duration-500  bg-[#111111]">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-['Impact'] text-[clamp(3.5rem,10vw,9rem)] uppercase tracking-tight  text-white transition-colors duration-500 leading-[0.85] md:ml-[5%] relative z-10 hover:scale-[1.02] transform transition-transform">
            NO RULES.
          </h2>
          <h2 className="font-['Impact'] text-[clamp(3.5rem,10vw,9rem)] uppercase tracking-tight  text-white transition-colors duration-500 leading-[0.85] ml-[15%] md:ml-[20%] opacity-70 -mt-6 md:-mt-12 relative z-20 hover:scale-[1.02] transform transition-transform">
            NO COMFORT ZONE.
          </h2>
          <h2 className="font-['Impact'] text-[clamp(3.5rem,10vw,9rem)] uppercase tracking-tight  text-red-500 transition-colors duration-500 leading-[0.85] ml-[5%] md:ml-[10%] -mt-6 md:-mt-12 opacity-90 relative z-30  drop-shadow-[4px_4px_0_rgba(255,255,255,0.1)] hover:scale-[1.02] transform transition-transform">
            <span className="line-through  decoration-white  md:decoration-[16px]">NO APOLOGIES</span>.
          </h2>
        </div>
      </section>



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
