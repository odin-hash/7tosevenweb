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
      .catch(() => { })
      .finally(() => {
        setLoading(false);
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
    <div data-testid="shop-page" className="min-h-screen pt-32 md:pt-36  bg-[#0A0A0A] transition-colors duration-500">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-16 md:mb-24 mt-12 md:mt-24 text-center md:text-left">
        <p className="font-['Impact']  md:text-xs uppercase tracking-[0.4em]  text-white/50 mb-4 transition-colors duration-500">
          SEASON 001
        </p>
        <h1 className="font-['Impact'] text-5xl md:text-7xl lg:text-9xl uppercase tracking-widest text-white leading-[0.9] transition-colors duration-500">
          COLLECTION
        </h1>
      </div>

      {/* Filters & Sorting */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-12 flex flex-wrap items-center gap-6   border-white/10 pb-6">
        <Select value={category} onValueChange={(v) => updateFilter('category', v)}>
          <SelectTrigger
            data-testid="filter-category"
            className="w-[120px] bg-transparent  text-white  uppercase tracking-widest font-sans font-bold rounded-none h-10 px-0 border-none shadow-none focus:ring-0"
          >
            <SelectValue placeholder="CATEGORY" />
          </SelectTrigger>
          <SelectContent className="rounded-none border  border-white/10  bg-[#0A0A0A] shadow-xl">
            {CATEGORIES.map(c => (
              <SelectItem key={c.value} value={c.value} className=" text-white font-sans font-bold  uppercase tracking-widest  focus:bg-white/5 cursor-pointer py-3 rounded-none">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sizeFilter || 'all-sizes'} onValueChange={(v) => updateFilter('size', v === 'all-sizes' ? '' : v)}>
          <SelectTrigger data-testid="filter-size" className="w-[100px] bg-transparent  text-white  uppercase tracking-widest font-sans font-bold rounded-none h-10 px-0 border-none shadow-none focus:ring-0">
            <SelectValue placeholder="SIZE" />
          </SelectTrigger>
          <SelectContent className="rounded-none border  border-white/10  bg-[#0A0A0A] shadow-xl">
            <SelectItem value="all-sizes" className=" text-white font-sans font-bold  uppercase tracking-widest  focus:bg-white/5 cursor-pointer py-3 rounded-none">ALL SIZES</SelectItem>
            {SIZES.map(s => (
              <SelectItem key={s} value={s} className=" text-white font-sans font-bold  uppercase tracking-widest  focus:bg-white/5 cursor-pointer py-3 rounded-none">SIZE: {s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Select value={sort} onValueChange={(v) => updateFilter('sort', v)}>
            <SelectTrigger data-testid="filter-sort" className="w-[160px] bg-transparent  text-white  uppercase tracking-widest font-sans font-bold rounded-none h-10 px-0 border-none shadow-none focus:ring-0 flex justify-end">
              <SelectValue placeholder="SORT BY" />
            </SelectTrigger>
            <SelectContent alignment="end" className="rounded-none border  border-white/10  bg-[#0A0A0A] shadow-xl">
              {SORT_OPTIONS.map(s => (
                <SelectItem key={s.value} value={s.value} className=" text-white font-sans font-bold  uppercase tracking-widest  focus:bg-white/5 cursor-pointer py-3 rounded-none ">{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6 min-h-[400px]">
            <div className="relative flex items-center justify-center w-12 h-12">
              <div className="absolute inset-0   border-white/10 rounded-full" />
              <div className="absolute inset-0   border-white rounded-full animate-spin " />
              <div className="w-2 h-2  bg-white rounded-full animate-pulse" />
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <p className="font-['Impact']  uppercase tracking-wider  text-white/30">No products found</p>
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
