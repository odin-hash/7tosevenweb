import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Heart, Minus, Plus, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

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

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLightboxOpen]);

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = () => {
    setZoomLevel(1);
    setIsLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, quantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-40 gap-8  bg-[#0A0A0A] transition-colors duration-500">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative flex items-center justify-center w-12 h-12">
            <div className="absolute inset-0   border-white/10 rounded-full" />
            <div className="absolute inset-0   border-white rounded-full animate-spin " />
            <div className="w-2 h-2  bg-white rounded-full animate-pulse" />
          </div>
          {loadingSlow && (
            <div className="text-center animate-pulse mt-4">
              <p className="font-sans font-bold  md:text-[12px] uppercase tracking-[0.3em]  text-white/60 mb-2">
                ESTABLISHING SECURE CONNECTION...
              </p>
              <p className="font-sans  md:text-[10px] tracking-[0.2em] uppercase  text-white/40 max-w-[280px] mx-auto">
                ACCESSING 7TOSEVEN ARCHIVES
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
        <p className="font-['Impact']  uppercase tracking-wider  text-white/30">Product not found</p>
        <Link to="/shop" className="  text-white/30  hover:text-black hover:text-white/60 transition-colors underline">Back to shop</Link>
      </div>
    );
  }

  return (
    <div data-testid="product-page" className="min-h-screen pt-28 md:pt-32  bg-[#0A0A0A] transition-colors duration-500">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-6">
        <Link to="/shop" data-testid="back-to-shop" className="inline-flex items-center gap-2 font-sans font-bold  uppercase tracking-[0.2em]  text-white/50  hover:text-white transition-colors duration-300">
          <ChevronLeft size={16} strokeWidth={2} /> BACK TO COLLECTION
        </Link>
      </div>

      {/* Product Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Image Gallery */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="group relative aspect-[3/4] overflow-hidden bg-[#0A0A0A] cursor-zoom-in" onClick={openLightbox}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                data-testid="product-main-image"
              />
              {/* Image Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
                  >
                    <ChevronLeft size={20} strokeWidth={2} />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
                  >
                    <ChevronRight size={20} strokeWidth={2} />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 mt-6">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    data-testid={`product-thumbnail-${i}`}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 aspect-square overflow-hidden transition-all duration-300 ${
                      selectedImage === i ? 'opacity-100 ring-1 ring-black ring-white' : 'opacity-50 hover:opacity-100'
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
              <p className="font-sans font-bold uppercase tracking-[0.3em] text-white/40 mb-4">{product.collection}</p>
              <h1 data-testid="product-name" className="font-['Impact'] md:text-[4rem] text-4xl uppercase tracking-widest text-white leading-[1] mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span data-testid="product-price" className="font-sans font-bold tracking-widest text-white">{'\u20B9'}{product.price.toLocaleString('en-IN')}</span>
                {product.original_price && (
                  <span className="font-sans font-bold text-white/30 line-through tracking-widest">{'\u20B9'}{product.original_price.toLocaleString('en-IN')}</span>
                )}
              </div>
              
              <div className="w-full h-px  bg-white/10 my-10"></div>
              
              <p className="font-sans   text-white/70 leading-relaxed max-w-lg">{product.description}</p>

              {/* Size Selector */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-sans font-bold  uppercase tracking-[0.2em]  text-white/50">
                    SELECT SIZE {selectedSize && <span className=" text-white">— {selectedSize}</span>}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3" data-testid="size-selector">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      data-testid={`size-option-${size}`}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center font-sans font-bold  uppercase tracking-widest border transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-black   border-white bg-white text-black'
                          : 'border-black/10 border-white/10   text-white  hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-10">
                <p className="font-sans font-bold  uppercase tracking-[0.2em]  text-white/50 mb-4">QUANTITY</p>
                <div className="flex items-center border border-white/10 w-fit bg-transparent" data-testid="quantity-selector">
                  <button data-testid="qty-minus" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-14 h-14 flex items-center justify-center text-white/50 hover:text-white transition-colors border-r border-white/10">
                    <Minus size={16} strokeWidth={2} />
                  </button>
                  <span className="w-14 h-14 flex items-center justify-center font-sans font-bold text-white">{quantity}</span>
                  <button data-testid="qty-plus" onClick={() => setQuantity(q => q + 1)} className="w-14 h-14 flex items-center justify-center text-white/50 hover:text-white transition-colors border-l border-white/10">
                    <Plus size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-800 flex gap-4 w-full md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto md:p-0 md:bg-transparent md:backdrop-blur-none md:border-none md:mt-12 md:max-w-lg">
                <button
                  data-testid="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 font-sans font-bold rounded-none uppercase tracking-[0.2em] h-14 border transition-all duration-300 ${
                    selectedSize
                      ? 'border-white bg-white text-black hover:bg-black hover:text-white'
                      : 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {selectedSize ? 'ADD TO CART' : 'SELECT SIZE'}
                </button>
                <button
                  data-testid="wishlist-btn"
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-14 h-14 flex items-center justify-center rounded-none border transition-all duration-300 hover:bg-white hover:text-black hover:border-white ${
                    wishlisted ? 'border-white bg-white text-black' : 'border-white/10 text-white'
                  }`}
                >
                  <Heart size={20} strokeWidth={wishlisted ? 2 : 1.5} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Accordion */}
            <div className="mt-16 w-full max-w-lg   border-white/10">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details" className="  border-white/10">
                  <AccordionTrigger data-testid="accordion-details" className="font-sans font-bold  uppercase tracking-[0.2em]  text-white hover:no-underline py-6 transition-colors duration-300">
                    PRODUCT DETAILS
                  </AccordionTrigger>
                  <AccordionContent className=" font-sans  text-white/60 leading-relaxed pb-6 pt-2">
                    {product.details}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care" className="  border-white/10">
                  <AccordionTrigger data-testid="accordion-care" className="font-sans font-bold  uppercase tracking-[0.2em]  text-white hover:no-underline py-6 transition-colors duration-300">
                    CARE INSTRUCTIONS
                  </AccordionTrigger>
                  <AccordionContent className=" font-sans  text-white/60 leading-relaxed pb-6 pt-2">
                    {product.care}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="  border-white/10">
                  <AccordionTrigger data-testid="accordion-shipping" className="font-sans font-bold  uppercase tracking-[0.2em]  text-white hover:no-underline py-6 transition-colors duration-300">
                    SHIPPING & RETURNS
                  </AccordionTrigger>
                  <AccordionContent className=" font-sans  text-white/60 leading-relaxed pb-6 pt-2">
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
        <section className="py-16 md:py-24  bg-[#0A0A0A]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16">
            <h2 className="font-['Impact']  md:text-5xl uppercase tracking-widest  text-white mb-16  md:text-left leading-[0.9]">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur-sm flex flex-col items-center justify-center">
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
            <div className="font-sans font-bold uppercase tracking-[0.2em] text-white/50 text-sm">
              {selectedImage + 1} / {product.images.length}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={(e) => { e.stopPropagation(); setZoomLevel(Math.max(1, zoomLevel - 0.5)); }} className="text-white/50 hover:text-white transition-colors" disabled={zoomLevel <= 1}>
                <ZoomOut size={28} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setZoomLevel(Math.min(3, zoomLevel + 0.5)); }} className="text-white/50 hover:text-white transition-colors" disabled={zoomLevel >= 3}>
                <ZoomIn size={28} />
              </button>
              <button onClick={closeLightbox} className="text-white/50 hover:text-white transition-colors ml-4 sm:ml-8">
                <X size={36} />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative w-full h-[90vh] flex items-center justify-center overflow-auto" onClick={closeLightbox}>
            <div 
              className={`relative transition-transform duration-300 ease-out ${zoomLevel > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => prev === 1 ? 2 : 1); }}
            >
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          {product.images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-md z-50 rounded-full"
              >
                <ChevronLeft size={28} strokeWidth={2} />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-md z-50 rounded-full"
              >
                <ChevronRight size={28} strokeWidth={2} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
