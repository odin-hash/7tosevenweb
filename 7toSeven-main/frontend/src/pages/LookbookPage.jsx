import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { LOOKBOOK_DATA } from '@/data/mockLookbook';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import ScrambleText from '@/components/ScrambleText';

const Hotspot = ({ spot, active, setActive, addToCart }) => {
  const isActive = active === spot.id;

  return (
    <div 
      className={`absolute pointer-events-auto ${isActive ? 'z-50' : 'z-20'}`}
      style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
      onMouseEnter={() => setActive(spot.id)}
      onMouseLeave={() => setActive(null)}
      onClick={() => setActive(isActive ? null : spot.id)}
    >
      <button 
        className="relative w-12 h-12 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2 bg-white flex items-center justify-center rounded-none shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-transform duration-300 hover:scale-110 hover:bg-[#CCFF00]"
        aria-label={`View ${spot.product.name}`}
      >
         <Plus size={24} strokeWidth={3} className={`text-black transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 mb-4 w-56 bg-[#0A0A0A] border border-white/20 p-4 shadow-2xl flex flex-col items-center pointer-events-auto z-50 backdrop-blur-md group"
          >
            {/* Pointer notch */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#0A0A0A]" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-r-[9px] border-t-[9px] border-l-transparent border-r-transparent border-t-white/20 -z-10 translate-y-[1px]" />

            <Link to={`/products/${spot.product.slug}`} className="hover:opacity-75 transition-opacity duration-300 pointer-events-auto">
              {/* Added Blueprint theme styling */}
              <p className="font-['Impact'] text-white uppercase tracking-widest text-lg text-center mb-1 leading-[1.1]">
                {spot.product.name}
              </p>
              <p className="font-mono text-center text-white/40 text-[9px] tracking-widest mb-2">[v1.0] // SYST_ARCHIVE</p>
            </Link>
            <p className="font-mono text-[#CCFF00] text-[10px] tracking-widest mb-4">RS. {spot.product.price.toLocaleString('en-IN')}</p>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(spot.product, spot.product.sizes[0]);
              }}
              className="w-full bg-white hover:bg-[#CCFF00] text-black font-['Impact'] text-xs uppercase py-2.5 tracking-widest transition-colors duration-300"
            >
              <ScrambleText text={`ADD TO CART [${spot.product.sizes[0]}]`} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function LookbookPage() {
  const { addToCart } = useCart();
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-24 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <p className="font-['Impact'] text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/50 mb-4">
            SS25 &mdash; Editorial
          </p>
          <h1 className="font-['Impact'] text-[clamp(4rem,10vw,8rem)] uppercase tracking-widest text-white leading-none">
            LOOKBOOK<br/><span className="text-[#CCFF00]">001</span>
          </h1>
          <p className="mt-6 text-white/50 font-mono tracking-widest uppercase text-xs md:text-sm max-w-lg">
            Shot on location. Harsh light. Brutalist forms. 7TOSEVEN isn't worn, it's carried.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-24">
          {/* Image 1 - Full Width */}
          {LOOKBOOK_DATA[0] && (
            <div className="w-full aspect-[4/5] bg-zinc-950 overflow-hidden relative group">
              <img 
                src={LOOKBOOK_DATA[0].image} 
                alt="Lookbook 1" 
                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                loading="lazy"
              />
              {LOOKBOOK_DATA[0].hotspots.map(spot => (
                <Hotspot key={spot.id} spot={spot} active={activeHotspot} setActive={setActiveHotspot} addToCart={addToCart} />
              ))}
            </div>
          )}

          {/* Images 2 and 3 - Side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {LOOKBOOK_DATA.slice(1, 3).map((item, idx) => (
              <div key={item.id} className={`w-full flex items-center justify-center ${idx === 1 ? 'md:mt-24' : ''}`}>
                <div className="w-full aspect-[4/5] bg-zinc-950 overflow-hidden relative group">
                  <img 
                    src={item.image} 
                    alt={`Lookbook ${item.id}`} 
                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {item.hotspots.map(spot => (
                    <Hotspot key={spot.id} spot={spot} active={activeHotspot} setActive={setActiveHotspot} addToCart={addToCart} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
