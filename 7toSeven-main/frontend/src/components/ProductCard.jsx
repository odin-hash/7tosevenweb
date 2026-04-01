import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      data-testid={`product-card-${product.slug}`}
      className="group block overflow-hidden rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-[#111111] dark:hover:bg-[#161616] transition-all duration-500"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        {product.is_new && (
          <span className="absolute top-3 left-3 bg-black/90 text-white dark:bg-white/90 dark:text-[#0A0A0A] backdrop-blur-sm font-['Impact'] text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full transition-colors duration-500">
            New
          </span>
        )}
      </div>
      <div className="p-4 md:p-5">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#666] dark:text-[#999] mb-1.5 transition-colors duration-500">
          {product.collection || product.category}
        </p>
        <h3 className="font-['Impact'] text-[13px] uppercase tracking-wider text-black dark:text-white leading-tight transition-colors duration-500">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-2.5">
          <span className="text-sm text-black dark:text-white transition-colors duration-500">{'\u20B9'}{product.price.toLocaleString('en-IN')}</span>
          {product.original_price && (
            <span className="text-[11px] text-[#888] dark:text-[#555] line-through transition-colors duration-500">
              {'\u20B9'}{product.original_price.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
