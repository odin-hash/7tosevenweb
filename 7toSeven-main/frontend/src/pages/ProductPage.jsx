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

  useEffect(() => {
    setLoading(true);
    setSelectedSize('');
    setQuantity(1);
    setSelectedImage(0);
    axios.get(`${API}/products/${slug}`)
      .then(r => { setProduct(r.data.product); setRelated(r.data.related); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, quantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 pb-40">
        <div className="w-8 h-8 border-2 border-black/10 border-t-black dark:border-white/10 dark:border-t-white rounded-full animate-spin" />
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
    <div data-testid="product-page" className="min-h-screen pt-28 md:pt-32">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-4">
        <Link to="/shop" data-testid="back-to-shop" className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-black/30 dark:text-white/30 hover:text-black/60 dark:hover:text-black dark:hover:text-white/60 transition-colors duration-300">
          <ChevronLeft size={14} /> Back to Shop
        </Link>
      </div>

      {/* Product Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Left - Image Gallery */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="product-main-image"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    data-testid={`product-thumbnail-${i}`}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-1 aspect-square overflow-hidden rounded-xl transition-opacity duration-300 ${
                      selectedImage === i ? 'opacity-100 ring-1 ring-white/20' : 'opacity-30 hover:opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="py-4 lg:py-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-4">{product.collection}</p>
            <h1 data-testid="product-name" className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight text-black dark:text-white leading-[1.15]">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-5">
              <span data-testid="product-price" className="font-['Impact'] text-2xl text-black dark:text-white">{'\u20B9'}{product.price.toLocaleString('en-IN')}</span>
              {product.original_price && (
                <span className="text-sm text-black/30 dark:text-white/30 line-through">{'\u20B9'}{product.original_price.toLocaleString('en-IN')}</span>
              )}
            </div>
            <p className="text-sm text-black/40 dark:text-white/40 mt-6 leading-relaxed max-w-lg">{product.description}</p>

            {/* Size Selector */}
            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30 mb-4">
                Size {selectedSize && <span className="text-black/60 dark:text-white/60">— {selectedSize}</span>}
              </p>
              <div className="flex flex-wrap gap-2.5" data-testid="size-selector">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    data-testid={`size-option-${size}`}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center font-['Impact'] text-sm uppercase tracking-wider rounded-xl transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-black text-white dark:bg-white dark:text-[#0A0A0A]'
                        : 'bg-black/5 dark:bg-white/[0.04] text-black/40 dark:text-white/40 hover:bg-black/10 dark:hover:bg-white/[0.08] hover:text-black/70 dark:hover:text-black dark:hover:text-white/70'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30 mb-4">Quantity</p>
              <div className="flex items-center rounded-full bg-black/5 dark:bg-white/[0.04] w-fit overflow-hidden" data-testid="quantity-selector">
                <button data-testid="qty-minus" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.04] transition-colors">
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-black dark:text-white text-sm">{quantity}</span>
                <button data-testid="qty-plus" onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 flex items-center justify-center text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.04] transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-10">
              <button
                data-testid="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 font-['Impact'] text-sm uppercase tracking-[0.15em] py-4 rounded-full transition-all duration-300 ${
                  selectedSize
                    ? 'bg-black text-white dark:bg-white dark:text-[#0A0A0A] hover:bg-black/80 dark:hover:bg-white/90'
                    : 'bg-black/10 dark:bg-white/[0.06] text-black/20 dark:text-white/20 cursor-not-allowed'
                }`}
              >
                {selectedSize ? 'Add to Cart' : 'Select a Size'}
              </button>
              <button
                data-testid="wishlist-btn"
                onClick={() => setWishlisted(!wishlisted)}
                className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 ${
                  wishlisted ? 'bg-black text-white dark:bg-white dark:text-[#0A0A0A]' : 'bg-black/5 dark:bg-white/[0.04] text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-black dark:hover:text-white/70'
                }`}
              >
                <Heart size={18} strokeWidth={1.5} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Accordion */}
            <div className="mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details" className="border-black/5 dark:border-white/[0.04]">
                  <AccordionTrigger data-testid="accordion-details" className="font-['Impact'] text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-black dark:hover:text-white/70 hover:no-underline py-5">
                    Product Details
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-black/40 dark:text-white/40 leading-relaxed pb-5">{product.details}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="care" className="border-black/5 dark:border-white/[0.04]">
                  <AccordionTrigger data-testid="accordion-care" className="font-['Impact'] text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-black dark:hover:text-white/70 hover:no-underline py-5">
                    Care Instructions
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-black/40 dark:text-white/40 leading-relaxed pb-5">{product.care}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-black/5 dark:border-white/[0.04]">
                  <AccordionTrigger data-testid="accordion-shipping" className="font-['Impact'] text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-black dark:hover:text-white/70 hover:no-underline py-5">
                    Shipping & Returns
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-black/40 dark:text-white/40 leading-relaxed pb-5">
                    Free shipping on orders above {'\u20B9'}999. Standard delivery in 5-7 business days.
                    Easy returns within 7 days of delivery. Items must be unworn with tags attached.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 mt-16">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16">
            <h2 className="font-['Impact'] text-2xl md:text-3xl uppercase tracking-tight text-black dark:text-white mb-10">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
