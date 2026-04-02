import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'tees', label: 'Tees' },
  { value: 'hoodies', label: 'Hoodies' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'accessories', label: 'Accessories' },
];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSlow, setLoadingSlow] = useState(false);

  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const sizeFilter = searchParams.get('size') || '';

  useEffect(() => {
    setLoading(true);
    setLoadingSlow(false);
    
    const slowTimeout = setTimeout(() => {
      setLoadingSlow(true);
    }, 4000); // 4 seconds before showing warning message
    
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (sort) params.set('sort', sort);
    if (sizeFilter) params.set('size', sizeFilter);
    axios.get(`${API}/products?${params.toString()}`)
      .then(r => setProducts(r.data.products))
      .catch(() => {})
      .finally(() => {
        clearTimeout(slowTimeout);
        setLoading(false);
        setLoadingSlow(false);
      });
  }, [category, sort, sizeFilter]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all' && value !== '') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div data-testid="shop-page" className="min-h-screen pt-32 md:pt-36">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-10 md:mb-16">
        <p className="font-['Impact'] text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-2">The Collection</p>
        <h1 className="font-['Impact'] text-[clamp(3rem,6vw,5rem)] uppercase tracking-widest text-black dark:text-white leading-[1.1]">
          DROP 001
        </h1>
      </div>

      {/* Filters */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-8 flex flex-wrap items-center gap-3">
        <Select value={category} onValueChange={(v) => updateFilter('category', v)}>
          <SelectTrigger
            data-testid="filter-category"
            className="w-[140px] bg-transparent text-black dark:text-white text-[10px] uppercase tracking-wider font-['Impact'] rounded-none h-10 px-4 border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="rounded-none border border-black/20 dark:border-white/20 bg-white dark:bg-[#0A0A0A]">
            {CATEGORIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-black/60 dark:text-white/60 text-xs uppercase tracking-wider focus:bg-black/5 dark:focus:bg-white/[0.04] focus:text-black dark:focus:text-white rounded-none cursor-pointer">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sizeFilter || 'all-sizes'} onValueChange={(v) => updateFilter('size', v === 'all-sizes' ? '' : v)}>
          <SelectTrigger data-testid="filter-size" className="w-[120px] bg-transparent text-black dark:text-white text-[10px] uppercase tracking-wider font-['Impact'] rounded-none h-10 px-4 border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent className="rounded-none border border-black/20 dark:border-white/20 bg-white dark:bg-[#0A0A0A]">
            <SelectItem value="all-sizes" className="text-black/60 dark:text-white/60 text-xs uppercase tracking-wider focus:bg-black/5 dark:focus:bg-white/[0.04] focus:text-black dark:focus:text-white rounded-none cursor-pointer">All Sizes</SelectItem>
            {SIZES.map(s => (
              <SelectItem key={s} value={s} className="text-black/60 dark:text-white/60 text-xs uppercase tracking-wider focus:bg-black/5 dark:focus:bg-white/[0.04] focus:text-black dark:focus:text-white rounded-none cursor-pointer">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Select value={sort} onValueChange={(v) => updateFilter('sort', v)}>
            <SelectTrigger data-testid="filter-sort" className="w-[170px] bg-transparent text-black dark:text-white text-[10px] uppercase tracking-wider font-['Impact'] rounded-none h-10 px-4 border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-none border border-black/20 dark:border-white/20 bg-white dark:bg-[#0A0A0A]">
              {SORT_OPTIONS.map(s => (
                <SelectItem key={s.value} value={s.value} className="text-black/60 dark:text-white/60 text-xs uppercase tracking-wider focus:bg-black/5 dark:focus:bg-white/[0.04] focus:text-black dark:focus:text-white rounded-none cursor-pointer">{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="w-8 h-8 border-2 border-black/10 border-t-black dark:border-white/10 dark:border-t-white rounded-full animate-spin" />
            {loadingSlow && (
              <div className="text-center animate-pulse">
                <p className="font-['Impact'] text-sm uppercase tracking-widest text-[#111111]/60 dark:text-white/60 mb-1">
                  Waking Up Server...
                </p>
                <p className="text-xs text-[#111111]/40 dark:text-white/40 max-w-[280px] mx-auto">
                  Free hosting tiers can take up to 2 minutes to spin up. Hang tight!
                </p>
              </div>
            )}
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <p className="font-['Impact'] text-lg uppercase tracking-wider text-black/30 dark:text-white/30">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
