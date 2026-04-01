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

  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const sizeFilter = searchParams.get('size') || '';

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (sort) params.set('sort', sort);
    if (sizeFilter) params.set('size', sizeFilter);
    axios.get(`${API}/products?${params.toString()}`)
      .then(r => setProducts(r.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
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
        <p className="font-['Impact'] text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-2">Browse</p>
        <h1 className="font-['Impact'] text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-black dark:text-white leading-[1.1]">
          Shop
        </h1>
        <p className="text-xs text-black/30 dark:text-white/30 mt-2">{products.length} Products</p>
      </div>

      {/* Filters */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-8 flex flex-wrap items-center gap-3">
        <Select value={category} onValueChange={(v) => updateFilter('category', v)}>
          <SelectTrigger
            data-testid="filter-category"
            className="w-[140px] glass text-black/60 dark:text-white/60 text-[10px] uppercase tracking-wider font-['Impact'] rounded-full h-9 px-4 border-black/10 dark:border-white/[0.06]"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="glass rounded-xl border-black/10 dark:border-white/[0.06]">
            {CATEGORIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-black/60 dark:text-white/60 text-xs uppercase tracking-wider focus:bg-black/5 dark:focus:bg-white/[0.04] focus:text-black dark:focus:text-white rounded-lg cursor-pointer">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sizeFilter || 'all-sizes'} onValueChange={(v) => updateFilter('size', v === 'all-sizes' ? '' : v)}>
          <SelectTrigger data-testid="filter-size" className="w-[120px] glass text-black/60 dark:text-white/60 text-[10px] uppercase tracking-wider font-['Impact'] rounded-full h-9 px-4 border-black/10 dark:border-white/[0.06]">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent className="glass rounded-xl border-black/10 dark:border-white/[0.06]">
            <SelectItem value="all-sizes" className="text-black/60 dark:text-white/60 text-xs uppercase tracking-wider focus:bg-black/5 dark:focus:bg-white/[0.04] focus:text-black dark:focus:text-white rounded-lg cursor-pointer">All Sizes</SelectItem>
            {SIZES.map(s => (
              <SelectItem key={s} value={s} className="text-black/60 dark:text-white/60 text-xs uppercase tracking-wider focus:bg-black/5 dark:focus:bg-white/[0.04] focus:text-black dark:focus:text-white rounded-lg cursor-pointer">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Select value={sort} onValueChange={(v) => updateFilter('sort', v)}>
            <SelectTrigger data-testid="filter-sort" className="w-[170px] glass text-black/60 dark:text-white/60 text-[10px] uppercase tracking-wider font-['Impact'] rounded-full h-9 px-4 border-black/10 dark:border-white/[0.06]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="glass rounded-xl border-black/10 dark:border-white/[0.06]">
              {SORT_OPTIONS.map(s => (
                <SelectItem key={s.value} value={s.value} className="text-black/60 dark:text-white/60 text-xs uppercase tracking-wider focus:bg-black/5 dark:focus:bg-white/[0.04] focus:text-black dark:focus:text-white rounded-lg cursor-pointer">{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-24">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-black/10 border-t-black dark:border-white/10 dark:border-t-white rounded-full animate-spin" />
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
