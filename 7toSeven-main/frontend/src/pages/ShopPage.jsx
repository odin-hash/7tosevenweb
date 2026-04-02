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
    <div data-testid="shop-page" className="min-h-screen pt-32 md:pt-36 bg-white dark:bg-[#0A0A0A] transition-colors duration-500">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-16 md:mb-24 mt-12 md:mt-24 text-center md:text-left">
        <p className="font-['Impact'] text-[10px] md:text-xs uppercase tracking-[0.4em] text-black/50 dark:text-white/50 mb-4 transition-colors duration-500">
          SEASON 001
        </p>
        <h1 className="font-['Impact'] text-[clamp(4rem,8vw,6rem)] uppercase tracking-widest text-black dark:text-white leading-[0.9] transition-colors duration-500">
          COLLECTION
        </h1>
      </div>

      {/* Filters & Sorting */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-12 flex flex-wrap items-center gap-6 border-b border-black/10 dark:border-white/10 pb-6">
        <Select value={category} onValueChange={(v) => updateFilter('category', v)}>
          <SelectTrigger
            data-testid="filter-category"
            className="w-[120px] bg-transparent text-black dark:text-white text-[12px] uppercase tracking-widest font-sans font-bold rounded-none h-10 px-0 border-none shadow-none focus:ring-0"
          >
            <SelectValue placeholder="CATEGORY" />
          </SelectTrigger>
          <SelectContent className="rounded-none border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-xl">
            {CATEGORIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-black dark:text-white font-sans font-bold text-[11px] uppercase tracking-widest focus:bg-black/5 dark:focus:bg-white/5 cursor-pointer py-3 rounded-none">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sizeFilter || 'all-sizes'} onValueChange={(v) => updateFilter('size', v === 'all-sizes' ? '' : v)}>
          <SelectTrigger data-testid="filter-size" className="w-[100px] bg-transparent text-black dark:text-white text-[12px] uppercase tracking-widest font-sans font-bold rounded-none h-10 px-0 border-none shadow-none focus:ring-0">
            <SelectValue placeholder="SIZE" />
          </SelectTrigger>
          <SelectContent className="rounded-none border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-xl">
            <SelectItem value="all-sizes" className="text-black dark:text-white font-sans font-bold text-[11px] uppercase tracking-widest focus:bg-black/5 dark:focus:bg-white/5 cursor-pointer py-3 rounded-none">ALL SIZES</SelectItem>
            {SIZES.map(s => (
              <SelectItem key={s} value={s} className="text-black dark:text-white font-sans font-bold text-[11px] uppercase tracking-widest focus:bg-black/5 dark:focus:bg-white/5 cursor-pointer py-3 rounded-none">SIZE: {s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Select value={sort} onValueChange={(v) => updateFilter('sort', v)}>
            <SelectTrigger data-testid="filter-sort" className="w-[160px] bg-transparent text-black dark:text-white text-[12px] uppercase tracking-widest font-sans font-bold rounded-none h-10 px-0 border-none shadow-none focus:ring-0 flex justify-end">
              <SelectValue placeholder="SORT BY" />
            </SelectTrigger>
            <SelectContent alignment="end" className="rounded-none border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-xl">
              {SORT_OPTIONS.map(s => (
                <SelectItem key={s.value} value={s.value} className="text-black dark:text-white font-sans font-bold text-[11px] uppercase tracking-widest focus:bg-black/5 dark:focus:bg-white/5 cursor-pointer py-3 rounded-none text-right">{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6 min-h-[400px]">
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className="absolute inset-0 border-[1px] border-black/10 dark:border-white/10 rounded-full" />
              <div className="absolute inset-0 border-[1px] border-black dark:border-white rounded-full animate-[spin_1.5s_linear_infinite] border-t-transparent border-l-transparent" />
              <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full animate-pulse" />
            </div>
            {loadingSlow && (
              <div className="text-center animate-pulse">
                <p className="font-sans font-bold text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                  BOOTING SYSTEM... SPUN DOWN INSTANCE MAY TAKE 2M.
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
