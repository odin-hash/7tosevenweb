import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      data-testid={`product-card-${product.slug}`}
      className="group block overflow-hidden border border-zinc-800 hover:border-white transition-colors duration-500 rounded-none bg-[#0A0A0A]"
    >
      {/* Flush Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden w-full border-b border-zinc-800 group-hover:border-white transition-colors duration-500 bg-zinc-950">
        
        {/* Default Product Image (Resting state, flat lay / ghost) */}
        <img
          src={product.images?.[0] || product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center z-10 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] ${!product.images?.[1] ? 'group-hover:scale-[1.05]' : ''}`}
          loading="lazy"
        />

        {/* Hover Lifestyle/Mood Image (Triggered strictly on hover) */}
        {product.images?.length > 1 && (
          <img
            src={product.images[1]}
            alt={`${product.name} lifestyle`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] opacity-0 group-hover:opacity-100 group-hover:scale-[1.05] z-20"
            loading="lazy"
          />
        )}
        
        {product.is_new && (
          <span className="absolute top-0 left-0 bg-white text-black font-['Impact'] font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 border-r border-b border-white z-30 shadow-sm">
            NEW
          </span>
        )}

        {/* Scarcity Radar Indicator */}
        <div className="absolute top-2 right-2 bg-black border border-white/10 flex items-center gap-2 px-3 py-1.5 z-30 rounded-none shadow-xl">
          <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]"></div>
          <span className="text-white font-mono text-[9px] uppercase tracking-widest pt-0.5">
            LIMITED RUN
          </span>
        </div>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-white/95 backdrop-blur-md flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] z-30 border-t border-white shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
          <span className="font-['Impact'] font-bold text-xs md:text-sm uppercase tracking-widest text-black">
            QUICK ADD +
          </span>
        </div>
      </div>

      {/* Industrial Spec-Sheet Info Block */}
      <div className="flex flex-col sm:flex-row p-0 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800 group-hover:divide-white transition-colors duration-500">
        
        {/* Left Side: Category & Name */}
        <div className="flex-1 p-3 flex flex-col justify-center">
          <p className="font-['Impact'] text-[9px] uppercase tracking-[0.2em] text-white/50 mb-1">
            // {product.collection || product.category || "CORE"}
          </p>
          <h3 className="font-['Impact'] text-xs font-bold uppercase tracking-widest text-white truncate max-w-[150px] md:max-w-[200px]">
            {product.name}
          </h3>
        </div>
        
        {/* Right Side: Pricing */}
        <div className="p-3 flex items-center justify-end min-w-[80px] bg-zinc-950/20">
          <div className="flex flex-col items-end">
            {product.original_price && (
              <span className="font-['Impact'] text-[9px] text-zinc-600 line-through tracking-widest mb-0.5">
                RS. {product.original_price.toLocaleString('en-IN')}
              </span>
            )}
            <span className={`font-['Impact'] text-xs font-bold tracking-widest ${product.original_price ? 'text-[#CCFF00]' : 'text-white'}`}>
              RS. {product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
