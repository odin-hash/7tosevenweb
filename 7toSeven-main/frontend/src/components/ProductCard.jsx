import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      data-testid={`product-card-${product.slug}`}
      className="group block overflow-hidden transition-all duration-500"
    >
      {/* Borderless Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9] dark:bg-[#0A0A0A]">
        <img
          src={
            [
              '/product_model_1.png',
              '/product_model_2.png'
            ][(product.name?.charCodeAt(0) || 0) % 2]
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        {product.is_new && (
          <span className="absolute top-4 left-4 bg-white/90 text-black backdrop-blur-sm font-['Impact'] text-[10px] uppercase tracking-[0.2em] px-3 py-1">
            NEW
          </span>
        )}
      </div>

      {/* Sleek Typography Underneath */}
      <div className="pt-4 flex flex-col justify-between">
        <div>
          <p className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-1.5 transition-colors duration-300">
            {product.collection || product.category}
          </p>
          <h3 className="font-['Impact'] text-[16px] md:text-[18px] uppercase tracking-widest text-black dark:text-white leading-tight">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="font-sans font-bold text-sm tracking-widest text-black/80 dark:text-white/80">{'\u20B9'}{product.price.toLocaleString('en-IN')}</span>
          {product.original_price && (
            <span className="font-sans text-[11px] text-black/40 dark:text-white/40 line-through tracking-widest">
              {'\u20B9'}{product.original_price.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
