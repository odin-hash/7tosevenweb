import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      data-testid={`product-card-${product.slug}`}
      className="group block overflow-hidden rounded-none border-[3px] border-black dark:border-white bg-[#F9F9F9] dark:bg-[#0A0A0A] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden border-b-[3px] border-black dark:border-white">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] grayscale group-hover:grayscale-0"
          loading="lazy"
        />
        {product.is_new && (
          <span className="absolute top-3 left-3 bg-black text-white dark:bg-white dark:text-black font-['Impact'] text-[10px] uppercase tracking-[0.2em] px-3 py-1 border-2 border-black dark:border-white">
            New
          </span>
        )}
      </div>
      <div className="p-4 md:p-5 flex flex-col justify-between bg-white dark:bg-[#0A0A0A] transition-colors duration-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50 dark:text-white/50 group-hover:text-white/70 dark:group-hover:text-black/70 mb-2 transition-colors duration-300">
            {product.collection || product.category}
          </p>
          <h3 className="font-['Impact'] text-[14px] md:text-[16px] uppercase tracking-widest text-black dark:text-white group-hover:text-white dark:group-hover:text-black leading-tight transition-colors duration-300">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <span className="font-['Impact'] text-lg text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300">{'\u20B9'}{product.price.toLocaleString('en-IN')}</span>
          {product.original_price && (
            <span className="text-[12px] text-black/50 dark:text-white/50 group-hover:text-white/50 dark:group-hover:text-black/50 line-through font-bold transition-colors duration-300">
              {'\u20B9'}{product.original_price.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

