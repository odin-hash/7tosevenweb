import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const lookbookRef = useRef(null);

  const scrollLookbook = (direction) => {
    if (lookbookRef.current) {
      lookbookRef.current.scrollBy({ left: direction === 'left' ? -600 : 600, behavior: 'smooth' });
    }
  };
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
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-4xl flex flex-col items-center"
          >
            <p className="font-['Impact'] text-4xl md:text-6xl lg:text-7xl uppercase tracking-widest text-white leading-tight transition-colors duration-500">
              NOT FOR EVERYONE.<br/>
              <span className="text-red-500 drop-shadow-sm block mt-2">NEVER WAS.</span>
            </p>
          </motion.div>
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
              <p className="font-['Impact'] text-xs md:text-sm uppercase tracking-[0.3em]  text-white/30 transition-colors duration-500 mb-2">Curated</p>
              <h2 className="font-['Impact'] text-4xl md:text-5xl uppercase tracking-tight  text-white transition-colors duration-500 leading-[1.1]">
                Featured
              </h2>
            </div>
            <Link
              to="/shop"
              data-testid="view-all-products"
              className="flex items-center gap-2 font-['Impact'] text-sm md:text-base uppercase tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              View All <ArrowRight size={16} />
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
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 max-w-5xl mx-auto"
            >
              {products.slice(0, 4).map((product) => (
                <motion.div 
                  key={product.id} 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Collections Editorial */}
      {collections.length > 0 && (
        <section className="py-16 md:py-24 transition-colors duration-500">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16">
            <div className="mb-10 md:mb-12">
              <p className="font-['Impact'] text-xs md:text-sm uppercase tracking-[0.3em]  text-white/30 transition-colors duration-500 mb-2">Explore</p>
              <h2 className="font-['Impact'] text-4xl md:text-5xl uppercase tracking-tight  text-white transition-colors duration-500 leading-[1.1]">
                Collections
              </h2>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            >
              {collections.map((col) => (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  key={col.id}
                  className="h-full block"
                >
                  <Link
                    to={`/shop?collection=${col.slug}`}
                    data-testid={`collection-${col.slug}`}
                    className="relative group overflow-hidden rounded-none bg-[#111111] transition-colors duration-500 block h-full"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={col.image}
                        alt={col.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Collection</p>
                      <h3 className="font-['Impact'] text-2xl md:text-3xl uppercase tracking-tight text-white leading-[1.15]">
                        {col.name}
                      </h3>
                      <p className="text-sm text-white/40 mt-3 max-w-[260px] leading-relaxed">{col.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}





      {/* Lookbook / Drop Story Film Strip */}
      <section className="py-16 md:py-24 transition-colors duration-500 bg-black relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <p className="font-['Impact'] text-xs md:text-sm uppercase tracking-[0.3em] text-white/30 transition-colors duration-500 mb-2">Editorial</p>
              <h2 className="font-['Impact'] text-4xl md:text-5xl uppercase tracking-tight text-white transition-colors duration-500 leading-[1.1]">
                LOOKBOOK PREVIEW
              </h2>
            </div>
          </div>
        </div>

        <div className="relative w-full group">
          {/* Desktop Navigation Arrows */}
          <button 
            onClick={() => scrollLookbook('left')} 
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white text-black font-mono font-bold w-14 h-14 items-center justify-center rounded-none shadow-xl border-2 border-black hover:bg-black hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors"
            aria-label="Scroll left"
          >
            {'<-'}
          </button>
          <button 
            onClick={() => scrollLookbook('right')} 
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white text-black font-mono font-bold w-14 h-14 items-center justify-center rounded-none shadow-xl border-2 border-black hover:bg-black hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors"
            aria-label="Scroll right"
          >
            {'->'}
          </button>

          {/* Edge-to-edge horizontal scroll container */}
          <div 
            ref={lookbookRef}
            className="flex gap-4 md:gap-6 w-full overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-16 pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {/* 
              Hide Webkit scrollbar directly inline to ensure film strip look 
              without needing tailwind config overrides 
            */}
            <style dangerouslySetInnerHTML={{__html: `
              div::-webkit-scrollbar { display: none; }
            `}} />

            {['/lookbook_1.png', '/lookbook_2.png', '/lookbook_3.png', '/visual_strip_2.png'].map((src, idx) => (
              <div key={idx} className="flex-none w-[75vw] md:w-[22vw] aspect-[4/5] snap-center bg-[#111] overflow-hidden">
                <img 
                  src={src} 
                  alt={`Lookbook Archive 00${idx + 1}`} 
                  className="h-full w-full object-cover object-center grayscale-[0.8] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-200 ease-in cursor-grab active:cursor-grabbing" 
                  loading="lazy" 
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Persistent overlay text */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20 pointer-events-none">
            <p className="bg-white text-black font-mono text-sm md:text-base tracking-widest uppercase rounded-none px-5 py-3 shadow-lg">
              <span className="md:hidden">SWIPE</span><span className="hidden md:inline">SCROLL</span> TO EXPLORE [→]
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Origin Anchor */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-10 bg-black flex flex-col items-center justify-center text-center px-4 md:px-6 border-t border-white/5 overflow-hidden w-full">
        <h2 
          className="text-[clamp(2rem,7vw,9.5rem)] font-black uppercase text-white/90 leading-tight whitespace-nowrap w-full"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          MADE FOR INDIAN STREETS.
        </h2>
      </section>

      {/* UGC / Community Grid */}
      <section className="pt-16 pb-24 md:pt-32 md:pb-32 bg-black border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <p className="font-['Impact'] text-xs md:text-sm uppercase tracking-[0.4em] text-[#CCFF00] mb-4">
                // FIELD_TESTING
              </p>
              <h2 className="font-['Impact'] text-5xl md:text-7xl uppercase tracking-widest text-white leading-[0.9]">
                COMMUNITY
              </h2>
            </div>
            <Link to="/archive" className="font-sans font-bold text-sm md:text-base uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors underline pb-2">
              ENTER ARCHIVE
            </Link>
          </div>
        </div>

        <div className="w-full px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 pb-8">
            {[
              '/visual_strip_2.png',
              '/lookbook_1.png', 
              '/product_model_1.png', 
              '/lookbook_3.png', 
              '/visual_strip_1.png',
              '/lookbook_2.png'
            ].map((src, i) => (
              <motion.div 
                key={i} 
                initial="rest"
                whileHover="hover"
                animate="rest"
                className={`relative aspect-[4/5] overflow-hidden bg-zinc-950 cursor-pointer ${i % 2 !== 0 ? 'lg:-translate-y-8' : ''}`}
              >
                <motion.img 
                  src={src} 
                  alt={`Community UGC 00${i + 1}`} 
                  variants={{
                    rest: { filter: "grayscale(100%)", opacity: 0.6, scale: 1.02 },
                    hover: { filter: "grayscale(0%)", opacity: 1, scale: 1.1, mixBlendMode: "normal" }
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full h-full object-cover mix-blend-luminosity"
                  loading="lazy"
                />
                <motion.div 
                  variants={{
                    rest: { opacity: 0, y: 10 },
                    hover: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent"
                >
                  <p className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-1.5">[{new Date().getFullYear()}]</p>
                  <p className="font-['Impact'] text-base md:text-lg text-white tracking-widest uppercase">@user_unknown_0{i + 1}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Close */}
      <section className="pt-8 pb-24 md:pt-10 md:pb-40 bg-black flex flex-col items-center justify-center text-center px-6">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="font-['Impact'] text-[clamp(2.5rem,7vw,6rem)] uppercase tracking-widest text-white leading-[1] mb-6">
            DROP <span className="text-[#CCFF00]">001</span><br/>IS LIVE.
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
