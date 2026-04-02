import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Heart, Minus, Plus, ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSlow, setLoadingSlow] = useState(false);

  useEffect(() => {
    setLoading(true);
    setLoadingSlow(false);
    setSelectedSize('');
    setQuantity(1);
    setSelectedImage(0);
    
    const slowTimeout = setTimeout(() => {
      setLoadingSlow(true);
    }, 4000);

    axios.get(`${API}/products/${slug}`)
      .then(r => { setProduct(r.data.product); setRelated(r.data.related); })
      .catch(() => {})
      .finally(() => {
        clearTimeout(slowTimeout);
        setLoading(false);
        setLoadingSlow(false);
      });
  }, [slug]);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, quantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-40 gap-8 bg-white dark:bg-[#0A0A0A] transition-colors duration-500">
        <div className="flex flex-col items-center justify-center p-16 border-[4px] border-black dark:border-white bg-[#F9F9F9] dark:bg-[#0A0A0A] gap-8">
          <div className="w-12 h-12 border-4 border-black/10 border-t-black dark:border-white/10 dark:border-t-white animate-spin" />
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
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-32">
        <p className="font-['Impact'] text-xl uppercase tracking-wider text-black/30 dark:text-white/30">Product not found</p>
        <Link to="/shop" className="text-xs text-black/30 dark:text-white/30 hover:text-black/60 dark:hover:text-black dark:hover:text-white/60 transition-colors underline">Back to shop</Link>
      </div>
    );
  }

  return (
    <div data-testid="product-page" className="min-h-screen pt-28 md:pt-32 bg-white dark:bg-[#0A0A0A] transition-colors duration-500">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-6">
        <Link to="/shop" data-testid="back-to-shop" className="inline-flex items-center gap-2 font-['Impact'] text-[12px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 bg-[#F9F9F9] dark:bg-[#0A0A0A] border-[3px] border-black/10 dark:border-white/10 px-4 py-2 hover:border-black dark:hover:border-white">
          <ChevronLeft size={16} strokeWidth={3} /> BACK TO COLLECTION
        </Link>
      </div>

      {/* Product Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Left - Image Gallery */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="aspect-[3/4] overflow-hidden border-[4px] border-black dark:border-white bg-[#F9F9F9] dark:bg-[#0A0A0A]">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02] hover:grayscale-0 grayscale"
                style={{ filter: "contrast(1.1) brightness(0.95)" }}
                data-testid="product-main-image"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    data-testid={`product-thumbnail-${i}`}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-1 aspect-square overflow-hidden border-[3px] transition-all duration-300 ${
                      selectedImage === i ? 'border-black dark:border-white opacity-100 grayscale-0' : 'border-black/20 dark:border-white/20 opacity-50 hover:opacity-100 hover:border-black/50 dark:hover:border-white/50 grayscale'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="py-4 lg:py-8 flex flex-col justify-start">
            <div className="border-[4px] border-black dark:border-white p-6 md:p-10 bg-[#F9F9F9] dark:bg-[#0A0A0A] shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
              <p className="font-['Impact'] text-[12px] uppercase tracking-[0.3em] text-black/50 dark:text-white/50 mb-4">{product.collection}</p>
              <h1 data-testid="product-name" className="font-['Impact'] text-[2.5rem] md:text-[3.5rem] uppercase tracking-wider text-black dark:text-white leading-[1] mb-6">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span data-testid="product-price" className="font-['Impact'] text-3xl text-black dark:text-white">{'\u20B9'}{product.price.toLocaleString('en-IN')}</span>
                {product.original_price && (
                  <span className="font-['Impact'] text-xl text-black/40 dark:text-white/40 line-through">{'\u20B9'}{product.original_price.toLocaleString('en-IN')}</span>
                )}
              </div>
              
              <div className="w-full h-[3px] bg-black dark:bg-white my-8 opacity-20 dark:opacity-40"></div>
              
              <p className="text-sm md:text-base text-black/70 dark:text-white/70 leading-relaxed font-bold uppercase tracking-wide">{product.description}</p>

              {/* Size Selector */}
              <div className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-['Impact'] text-[14px] uppercase tracking-[0.2em] text-black dark:text-white">
                    SELECT SIZE {selectedSize && <span className="text-black/50 dark:text-white/50">— {selectedSize}</span>}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3" data-testid="size-selector">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      data-testid={`size-option-${size}`}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center font-['Impact'] text-[16px] uppercase tracking-wider border-[3px] transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] -translate-y-1'
                          : 'border-black dark:border-white bg-[#F9F9F9] dark:bg-[#0A0A0A] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-10">
                <p className="font-['Impact'] text-[14px] uppercase tracking-[0.2em] text-black dark:text-white mb-4">QUANTITY</p>
                <div className="flex items-center border-[3px] border-black dark:border-white w-fit bg-white dark:bg-[#0A0A0A]" data-testid="quantity-selector">
                  <button data-testid="qty-minus" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-14 h-14 flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors border-r-[3px] border-black dark:border-white">
                    <Minus size={20} strokeWidth={3} />
                  </button>
                  <span className="w-14 font-['Impact'] text-xl text-center text-black dark:text-white">{quantity}</span>
                  <button data-testid="qty-plus" onClick={() => setQuantity(q => q + 1)} className="w-14 h-14 flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors border-l-[3px] border-black dark:border-white">
                    <Plus size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-10">
                <button
                  data-testid="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 font-['Impact'] text-[16px] uppercase tracking-widest py-5 border-[4px] border-black dark:border-white transition-all duration-300 ${
                    selectedSize
                      ? 'bg-black text-white dark:bg-white dark:text-black hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0_0_rgba(255,255,255,1)] hover:-translate-y-1'
                      : 'bg-[#F9F9F9] dark:bg-[#0A0A0A] text-black/30 dark:text-white/30 border-black/30 dark:border-white/30 cursor-not-allowed'
                  }`}
                >
                  {selectedSize ? 'ADD TO CART' : 'SELECT A SIZE FIRST'}
                </button>
                <button
                  data-testid="wishlist-btn"
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`min-w-[4rem] flex items-center justify-center border-[4px] border-black dark:border-white transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] ${
                    wishlisted ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-[#F9F9F9] dark:bg-[#0A0A0A] text-black dark:text-white'
                  }`}
                >
                  <Heart size={24} strokeWidth={wishlisted ? 3 : 2} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Accordion */}
            <div className="mt-12 border-[4px] border-black dark:border-white bg-[#F9F9F9] dark:bg-[#0A0A0A]">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details" className="border-b-[4px] border-black dark:border-white last:border-b-0">
                  <AccordionTrigger data-testid="accordion-details" className="font-['Impact'] text-[14px] uppercase tracking-[0.2em] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:no-underline py-6 px-6 transition-colors duration-300">
                    PRODUCT DETAILS
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-bold uppercase tracking-wide text-black/70 dark:text-white/70 leading-relaxed px-6 pb-6 pt-2">
                    {product.details}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care" className="border-b-[4px] border-black dark:border-white last:border-b-0">
                  <AccordionTrigger data-testid="accordion-care" className="font-['Impact'] text-[14px] uppercase tracking-[0.2em] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:no-underline py-6 px-6 transition-colors duration-300">
                    CARE INSTRUCTIONS
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-bold uppercase tracking-wide text-black/70 dark:text-white/70 leading-relaxed px-6 pb-6 pt-2">
                    {product.care}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-b-[4px] border-black dark:border-white last:border-b-0">
                  <AccordionTrigger data-testid="accordion-shipping" className="font-['Impact'] text-[14px] uppercase tracking-[0.2em] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:no-underline py-6 px-6 transition-colors duration-300">
                    SHIPPING & RETURNS
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-bold uppercase tracking-wide text-black/70 dark:text-white/70 leading-relaxed px-6 pb-6 pt-2">
                    FREE SHIPPING ON ORDERS ABOVE {'\u20B9'}899. STANDARD DELIVERY IN 5-7 BUSINESS DAYS.
                    EASY RETURNS WITHIN 7 DAYS OF DELIVERY. ITEMS MUST BE UNWORN WITH TAGS ATTACHED.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 mt-16 bg-[#F9F9F9] dark:bg-[#0A0A0A] border-t-[4px] border-black dark:border-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16">
            <h2 className="font-['Impact'] text-4xl md:text-5xl uppercase tracking-widest text-black dark:text-white mb-12 text-center md:text-left">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
