import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrop } from '@/context/DropContext';
import ScrambleText from '@/components/ScrambleText';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isDropLocked, isUnlocked } = useDrop();
  const isLocked = isDropLocked && !isUnlocked;

  return (
    <Link
      to={`/products/${product.slug}`}
      data-testid={`product-card-${product.slug}`}
      className="group block overflow-hidden border border-zinc-800 hover:border-white transition-colors duration-500 rounded-none bg-[#0A0A0A]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Flush Image Container */}
      <motion.div className="relative aspect-[4/5] overflow-hidden w-full border-b border-zinc-800 group-hover:border-white transition-colors duration-500 bg-zinc-950">
        
        {/* Default Product Image (Resting state, flat lay / ghost) */}
        <motion.img
          src={product.images?.[0] || product.image}
          alt={product.name}
          animate={{ scale: isHovered && !product.images?.[1] ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.2, 1, 0.2, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-center z-10"
          loading="lazy"
        />

        {/* Hover Lifestyle/Mood Image (Triggered strictly on hover) */}
        <AnimatePresence>
          {product.images?.length > 1 && isHovered && (
            <motion.img
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.2, 1, 0.2, 1] }}
              src={product.images[1]}
              alt={`${product.name} lifestyle`}
              className="absolute inset-0 w-full h-full object-cover object-center z-20"
              loading="lazy"
            />
          )}
        </AnimatePresence>
        
        {product.is_new && (
          <span className="absolute top-0 left-0 bg-white text-black font-['Impact'] font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 border-r border-b border-white z-30 shadow-sm">
            NEW
          </span>
        )}

        {/* Scarcity Radar Indicator */}
        {product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-black border border-white/10 flex items-center gap-2 px-3 py-1.5 z-30 rounded-none shadow-xl">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${product.stock <= 5 ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)]"}`}></div>
            <span className="text-white font-mono text-[9px] uppercase tracking-widest pt-0.5">
              {product.stock <= 5 ? "ALMOST GONE" : "LIVE"}
            </span>
          </div>
        )}

        {/* Sold Out Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-[#0A0A0A]/70 flex items-center justify-center z-30 backdrop-blur-[2px]">
            <span className="font-['Impact'] text-3xl md:text-4xl text-white/90 uppercase tracking-widest border-2 border-white/20 px-6 py-2 shadow-2xl">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Quick Add Overlay */}
        {product.stock !== 0 && !isLocked && (
          <motion.div 
            initial={false}
            animate={{ y: isHovered ? "0%" : "100%" }}
            transition={{ duration: 0.4, ease: [0.2, 1, 0.2, 1] }}
            className="absolute bottom-0 left-0 w-full m-0 h-[12%] min-h-[35px] md:min-h-[40px] bg-white/95 backdrop-blur-md flex items-center justify-center z-30 border-t border-white shadow-[0_-10px_20px_rgba(0,0,0,0.2)] md:translate-y-0"
          >
            <span className="font-['Impact'] font-bold text-[10px] md:text-xs uppercase tracking-widest text-black">
              {isHovered ? <ScrambleText text="QUICK ADD +" /> : "QUICK ADD +"}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Industrial Spec-Sheet Info Block */}
      <div className="flex flex-col sm:flex-row p-0 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800 group-hover:divide-white transition-colors duration-500">
        
        {/* Left Side: Category & Name */}
        <div className="flex-1 p-4 md:p-5 flex flex-col justify-center">
          <p className="font-['Impact'] text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/60 mb-2">
            // SYST_{product.collection?.replace(/ /g, '_') || product.category?.replace(/ /g, '_') || "CORE"}
          </p>
          <h3 className="font-['Impact'] text-lg md:text-2xl font-bold uppercase tracking-widest text-white truncate max-w-full flex items-baseline">
            {product.name}
            <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest ml-3">[v1.0]</span>
          </h3>
        </div>
        
        {/* Right Side: Pricing */}
        <div className="p-4 md:p-5 flex items-center justify-end min-w-[120px] bg-zinc-950/20">
          <div className="flex flex-col items-end">
            {product.original_price && (
              <span className="font-['Impact'] text-xs md:text-sm text-zinc-500 line-through tracking-[0.2em] mb-1">
                RS. {product.original_price.toLocaleString('en-IN')}
              </span>
            )}
            <span className={`font-['Impact'] text-lg md:text-2xl font-bold tracking-widest ${product.original_price ? 'text-[#CCFF00]' : 'text-white'}`}>
              RS. {product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
