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
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-10 md:mb-16">
        <div className="border-[4px] border-black dark:border-white p-8 md:p-16 relative overflow-hidden bg-[#F9F9F9] dark:bg-[#0A0A0A] group">
          {/* Subtle noise/grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transition-opacity duration-500 group-hover:opacity-10 dark:group-hover:opacity-[0.15]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="font-['Impact'] text-[12px] md:text-[14px] uppercase tracking-[0.4em] text-black dark:text-white mb-4 transition-colors duration-500">The Collection</p>
            <h1 className="font-['Impact'] text-[clamp(4rem,10vw,8rem)] uppercase tracking-widest text-black dark:text-white leading-[0.9] transition-colors duration-500 hover:scale-[1.02] transform duration-500">
              DROP 001
            </h1>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-12 flex flex-wrap items-center gap-4">
        <Select value={category} onValueChange={(v) => updateFilter('category', v)}>
          <SelectTrigger
            data-testid="filter-category"
            className="w-[160px] bg-white dark:bg-[#0A0A0A] text-black dark:text-white text-[12px] uppercase tracking-widest font-['Impact'] rounded-none h-12 px-5 border-[3px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors focus:ring-0"
          >
            <SelectValue placeholder="CATEGORY" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-[3px] border-black dark:border-white bg-white dark:bg-[#0A0A0A] shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]">
            {CATEGORIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-black dark:text-white font-['Impact'] text-[12px] uppercase tracking-widest focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black rounded-none cursor-pointer py-3">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sizeFilter || 'all-sizes'} onValueChange={(v) => updateFilter('size', v === 'all-sizes' ? '' : v)}>
          <SelectTrigger data-testid="filter-size" className="w-[140px] bg-white dark:bg-[#0A0A0A] text-black dark:text-white text-[12px] uppercase tracking-widest font-['Impact'] rounded-none h-12 px-5 border-[3px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors focus:ring-0">
            <SelectValue placeholder="SIZE" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-[3px] border-black dark:border-white bg-white dark:bg-[#0A0A0A] shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]">
            <SelectItem value="all-sizes" className="text-black dark:text-white font-['Impact'] text-[12px] uppercase tracking-widest focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black rounded-none cursor-pointer py-3">ALL SIZES</SelectItem>
            {SIZES.map(s => (
              <SelectItem key={s} value={s} className="text-black dark:text-white font-['Impact'] text-[12px] uppercase tracking-widest focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black rounded-none cursor-pointer py-3">SIZE: {s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Select value={sort} onValueChange={(v) => updateFilter('sort', v)}>
            <SelectTrigger data-testid="filter-sort" className="w-[190px] bg-white dark:bg-[#0A0A0A] text-black dark:text-white text-[12px] uppercase tracking-widest font-['Impact'] rounded-none h-12 px-5 border-[3px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors focus:ring-0">
              <SelectValue placeholder="SORT BY" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-[3px] border-black dark:border-white bg-white dark:bg-[#0A0A0A] shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]">
              {SORT_OPTIONS.map(s => (
                <SelectItem key={s.value} value={s.value} className="text-black dark:text-white font-['Impact'] text-[12px] uppercase tracking-widest focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black rounded-none cursor-pointer py-3">{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-8 border-[4px] border-black dark:border-white bg-[#F9F9F9] dark:bg-[#0A0A0A]">
            <div className="w-12 h-12 border-4 border-black/10 border-t-black dark:border-white/10 dark:border-t-white rounded-full animate-spin" />
            {loadingSlow && (
              <div className="text-center animate-pulse">
                <p className="font-['Impact'] text-[14px] md:text-[18px] uppercase tracking-widest text-black dark:text-white mb-2">
                  BOOTING SYSTEM...
                </p>
                <p className="font-['Impact'] text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-black/60 dark:text-white/60 max-w-[280px] mx-auto">
                  SERVER SPIN UP MAY TAKE 2 MINS. HOLD FAST.
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
