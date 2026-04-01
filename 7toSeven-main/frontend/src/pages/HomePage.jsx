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

  useEffect(() => {
    axios.get(`${API}/products`).then(r => setProducts(r.data.products)).catch(() => {});
    axios.get(`${API}/drop-stories`).then(r => setStories(r.data.stories)).catch(() => {});
    axios.get(`${API}/collections`).then(r => setCollections(r.data.collections)).catch(() => {});
  }, []);

  const filteredStories = stories.filter(s => s.title.toUpperCase() !== 'NOCTURNAL LOOKBOOK' && s.title.toUpperCase() !== 'ENGINEERED UTILITY');

  return (
    <div data-testid="home-page">
      {/* Hero */}
      <HeroSection />

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
      <section className="py-24 md:py-40 relative overflow-hidden transition-colors duration-500">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 text-center">
          <h2 className="font-['Impact'] text-[clamp(2.5rem,6vw,5rem)] uppercase tracking-widest text-[#111111] dark:text-white transition-colors duration-500 leading-[1.15]">
            NOT FOR
            <br />
            EVERYONE.
          </h2>
          <p className="text-xs md:text-sm text-[#111111]/50 dark:text-white/30 transition-colors duration-500 mt-6 max-w-md mx-auto leading-relaxed">
            Every piece is a statement. Every drop is limited. If you know, you know.
          </p>
        </div>
      </section>

      {/* Drop Countdown Section */}
      <DropCountdownSection />

      {/* Drop Stories (Moved to Bottom) - TEMPORARILY HIDDEN 
      {filteredStories.length > 0 && (
        <section className="py-16 md:py-24 transition-colors duration-500">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-8 text-center">
            <h2 className="font-['Impact'] text-[10px] uppercase tracking-[0.3em] text-[#111111]/40 dark:text-white/30 transition-colors duration-500">
              Drop Stories
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-[1400px] mx-auto px-6 md:px-16 pb-4" data-testid="drop-stories-grid">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="w-[140px] md:w-[160px] lg:w-[180px] group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#111111] transition-colors duration-500">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <p className="font-['Impact'] text-[10px] uppercase tracking-[0.15em] text-[#111111]/50 group-hover:text-black dark:text-white/40 dark:group-hover:text-white/60 transition-colors duration-300 mt-3 px-1 text-center">
                  {story.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      */}
    </div>
  );
}
