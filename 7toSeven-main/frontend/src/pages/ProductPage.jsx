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
        <Link to="/shop" data-testid="back-to-shop" className="inline-flex items-center gap-2 font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300">
          <ChevronLeft size={16} strokeWidth={2} /> BACK TO COLLECTION
        </Link>
      </div>

      {/* Product Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Image Gallery */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="aspect-[3/4] overflow-hidden bg-[#F9F9F9] dark:bg-[#0A0A0A]">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                data-testid="product-main-image"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 mt-6">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    data-testid={`product-thumbnail-${i}`}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 aspect-square overflow-hidden transition-all duration-300 ${
                      selectedImage === i ? 'opacity-100 ring-1 ring-black dark:ring-white' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="py-2 lg:py-10 flex flex-col justify-start">
            <div>
              <p className="font-sans font-bold text-[11px] uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-3">{product.collection}</p>
              <h1 data-testid="product-name" className="font-['Impact'] text-[3rem] md:text-[4rem] uppercase tracking-widest text-black dark:text-white leading-[0.9] mb-6">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span data-testid="product-price" className="font-sans font-bold text-2xl tracking-widest text-black dark:text-white">{'\u20B9'}{product.price.toLocaleString('en-IN')}</span>
                {product.original_price && (
                  <span className="font-sans font-bold text-sm text-black/30 dark:text-white/30 line-through tracking-widest">{'\u20B9'}{product.original_price.toLocaleString('en-IN')}</span>
                )}
              </div>
              
              <div className="w-full h-px bg-black/10 dark:bg-white/10 my-10"></div>
              
              <p className="font-sans text-sm text-black/70 dark:text-white/70 leading-relaxed max-w-lg">{product.description}</p>

              {/* Size Selector */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50">
                    SELECT SIZE {selectedSize && <span className="text-black dark:text-white">— {selectedSize}</span>}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3" data-testid="size-selector">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      data-testid={`size-option-${size}`}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center font-sans font-bold text-[13px] uppercase tracking-widest border transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                          : 'border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white hover:border-black dark:hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-10">
                <p className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-4">QUANTITY</p>
                <div className="flex items-center border border-black/10 dark:border-white/10 w-fit bg-transparent" data-testid="quantity-selector">
                  <button data-testid="qty-minus" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-14 h-14 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors border-r border-black/10 dark:border-white/10">
                    <Minus size={16} strokeWidth={2} />
                  </button>
                  <span className="w-14 font-sans font-bold text-[14px] text-center text-black dark:text-white">{quantity}</span>
                  <button data-testid="qty-plus" onClick={() => setQuantity(q => q + 1)} className="w-14 h-14 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors border-l border-black/10 dark:border-white/10">
                    <Plus size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-12 w-full max-w-lg">
                <button
                  data-testid="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 font-sans font-bold text-[12px] uppercase tracking-[0.2em] h-14 border transition-all duration-300 ${
                    selectedSize
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white'
                      : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/30 dark:text-white/30 cursor-not-allowed'
                  }`}
                >
                  {selectedSize ? 'ADD TO CART' : 'SELECT A SIZE FIRST'}
                </button>
                <button
                  data-testid="wishlist-btn"
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-14 h-14 flex items-center justify-center border transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white ${
                    wishlisted ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black' : 'border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white'
                  }`}
                >
                  <Heart size={20} strokeWidth={wishlisted ? 2 : 1.5} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Accordion */}
            <div className="mt-16 w-full max-w-lg border-t border-black/10 dark:border-white/10">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details" className="border-b border-black/10 dark:border-white/10">
                  <AccordionTrigger data-testid="accordion-details" className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-black dark:text-white hover:no-underline py-6 transition-colors duration-300">
                    PRODUCT DETAILS
                  </AccordionTrigger>
                  <AccordionContent className="text-[13px] font-sans text-black/60 dark:text-white/60 leading-relaxed pb-6 pt-2">
                    {product.details}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care" className="border-b border-black/10 dark:border-white/10">
                  <AccordionTrigger data-testid="accordion-care" className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-black dark:text-white hover:no-underline py-6 transition-colors duration-300">
                    CARE INSTRUCTIONS
                  </AccordionTrigger>
                  <AccordionContent className="text-[13px] font-sans text-black/60 dark:text-white/60 leading-relaxed pb-6 pt-2">
                    {product.care}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-b border-black/10 dark:border-white/10">
                  <AccordionTrigger data-testid="accordion-shipping" className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-black dark:text-white hover:no-underline py-6 transition-colors duration-300">
                    SHIPPING & RETURNS
                  </AccordionTrigger>
                  <AccordionContent className="text-[13px] font-sans text-black/60 dark:text-white/60 leading-relaxed pb-6 pt-2">
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
        <section className="py-16 md:py-24 bg-white dark:bg-[#0A0A0A]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16">
            <h2 className="font-['Impact'] text-3xl md:text-5xl uppercase tracking-widest text-black dark:text-white mb-16 text-center md:text-left leading-[0.9]">
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
