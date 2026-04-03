import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Heart, Minus, Plus, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Zap, RefreshCw, Shield } from 'lucide-react';
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
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

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
      .catch(() => { })
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
                    className={`w-20 aspect-square overflow-hidden transition-all duration-300 ${selectedImage === i ? 'opacity-100 ring-1 ring-black ring-white' : 'opacity-50 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="py-2 lg:py-10 flex flex-col justify-start w-full max-w-lg">

            {/* Header */}
            <p className="font-sans font-bold uppercase tracking-[0.3em] text-white/40 mb-4 text-xs">{product.collection}</p>
            <h1 data-testid="product-name" className="font-['Impact'] md:text-[4rem] text-4xl uppercase tracking-widest text-white leading-[1] mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span data-testid="product-price" className="font-sans font-bold tracking-widest text-white">{'\u20B9'}{product.price.toLocaleString('en-IN')}</span>
              {product.original_price && (
                <span className="font-sans font-bold text-white/30 line-through tracking-widest">{'\u20B9'}{product.original_price.toLocaleString('en-IN')}</span>
              )}
            </div>

            {/* Short Identity Text */}
            <p className="font-sans text-white/60 leading-relaxed text-sm line-clamp-3 mt-6 mb-8">
              {product.description}
            </p>

            {/* Model & Fit Info */}
            <div className="flex flex-col gap-5 mb-8 border border-white/10 p-5 bg-black/40">
              <div className="font-mono text-[10px] text-white/50 bg-white/5 p-3 uppercase tracking-widest flex items-center justify-between">
                <span>[ SPEC ] MODEL: 6'1" | 165LBS | WEARING: L</span>
                <span className="text-[#CCFF00]">FIT: BOXY / OVERSIZED</span>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between font-mono text-[10px] text-white/40 tracking-widest uppercase px-1">
                  <span>Tight</span>
                  <span className="text-white">True To Size</span>
                  <span>Boxy</span>
                </div>
                <div className="relative w-full h-1 bg-white/10">
                  <div className="absolute top-1/2 left-[80%] w-2 h-4 bg-white -translate-x-1/2 -translate-y-1/2 border border-black shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="font-sans font-bold uppercase tracking-[0.2em] text-white/50 text-sm">
                  SELECT SIZE {selectedSize && <span className="text-white">— {selectedSize}</span>}
                  {product.stock <= 5 && product.stock > 0 && <span className="text-red-500 ml-3">· ONLY {product.stock} LEFT</span>}
                  {product.stock === 0 && <span className="text-red-500 ml-3">· SOLD OUT</span>}
                </p>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="font-sans font-bold uppercase tracking-[0.1em] text-white/40 hover:text-white transition-colors underline text-xs"
                >
                  SIZE GUIDE
                </button>
              </div>
              <div className="flex flex-wrap gap-3" data-testid="size-selector">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    data-testid={`size-option-${size}`}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center font-sans font-bold uppercase tracking-widest border transition-all duration-300 ${selectedSize === size
                        ? 'border-white bg-white text-black'
                        : 'border-white/10 text-white hover:border-white'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA & Quantity Group */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-10 z-10 w-full">
              <div className="flex items-center border border-white/10 bg-transparent h-14 shrink-0 w-max sm:w-auto self-start sm:self-auto" data-testid="quantity-selector">
                <button data-testid="qty-minus" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-14 h-full flex items-center justify-center text-white/50 hover:text-white transition-colors border-r border-white/10 shrink-0 p-0">
                  <Minus size={16} strokeWidth={2} />
                </button>
                <span className="w-14 h-full flex items-center justify-center font-sans font-bold text-white shrink-0 p-0">{quantity}</span>
                <button data-testid="qty-plus" onClick={() => setQuantity(q => q + 1)} className="w-14 h-full flex items-center justify-center text-white/50 hover:text-white transition-colors border-l border-white/10 shrink-0 p-0">
                  <Plus size={16} strokeWidth={2} />
                </button>
              </div>

              <div className="flex w-full gap-4">
                <button
                  data-testid="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!selectedSize || product.stock === 0}
                  className={`flex-1 font-sans font-bold rounded-none uppercase tracking-[0.2em] h-14 border transition-all duration-300 ${product.stock === 0
                      ? 'border-red-500/50 bg-red-500/10 text-red-500 cursor-not-allowed'
                      : selectedSize
                        ? 'border-white bg-white text-black hover:bg-white/90'
                        : 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
                    }`}
                >
                  {product.stock === 0 ? 'SOLD OUT' : selectedSize ? 'ADD TO CART' : 'SELECT SIZE'}
                </button>
                <button
                  data-testid="wishlist-btn"
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-14 h-14 shrink-0 flex items-center justify-center rounded-none border transition-all duration-300 hover:bg-white hover:text-black hover:border-white ${wishlisted ? 'border-white bg-white text-black' : 'border-white/10 text-white'
                    }`}
                >
                  <Heart size={20} strokeWidth={wishlisted ? 2 : 1.5} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Trust Section */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-white/10 py-6 mb-10">
              <div className="flex flex-col items-center justify-center text-center gap-2">
                <Zap size={20} className="text-white/60" />
                <span className="font-sans text-[10px] uppercase tracking-widest text-white/50">FAST DISPATCH</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2 border-l border-r border-white/10">
                <RefreshCw size={20} className="text-white/60" />
                <span className="font-sans text-[10px] uppercase tracking-widest text-white/50">7-DAY RETURNS</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2">
                <Shield size={20} className="text-white/60" />
                <span className="font-sans text-[10px] uppercase tracking-widest text-white/50">SECURE CHECKOUT</span>
              </div>
            </div>

            {/* Product Details (Bullets) */}
            <div className="mb-8">
              <h3 className="font-sans font-bold uppercase tracking-[0.2em] text-white/50 mb-4 text-xs">DETAILS</h3>
              <ul className="space-y-3">
                {product.details?.split('\n').filter(line => line.trim()).map((line, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-white/70 text-sm">
                    <span className="mt-2 w-1 h-1 bg-white/40 inline-block rounded-full shrink-0"></span>
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Care */}
            {product.care && (
              <div>
                <h3 className="font-sans font-bold uppercase tracking-[0.2em] text-white/50 mb-4 text-xs">CARE</h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed">{product.care}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complete The Look */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 border-t border-white/10 mt-12 bg-[#0A0A0A]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16">
            <h2 className="font-['Impact'] md:text-5xl text-4xl uppercase tracking-widest text-white mb-12 md:text-left leading-[0.9]">
              COMPLETE THE LOOK
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {related.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
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
                className="max-h-full max-w-full object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          {product.images.length > 1 && (
            <>
              <button onClick={handlePrevImage} className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50"><ChevronLeft size={48} strokeWidth={1} /></button>
              <button onClick={handleNextImage} className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50"><ChevronRight size={48} strokeWidth={1} /></button>
            </>
          )}
        </div>
      )}

      {/* Sizing Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-white/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto brutal-scrollbar relative">
            <div className="sticky top-0 bg-[#0A0A0A] border-b border-white/10 p-6 flex justify-between items-center z-10">
              <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-white">SIZING GUIDE</h2>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="p-6 md:p-10">
              <p className="font-mono text-white/50 text-xs tracking-widest uppercase mb-8">
                All measurements are in INCHES. Tolerance +/- 0.5". Garments are measured flat.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-4 font-mono text-[#CCFF00] tracking-widest text-xs font-bold uppercase">SIZE</th>
                      <th className="py-4 font-mono text-white tracking-widest text-xs font-bold uppercase">CHEST</th>
                      <th className="py-4 font-mono text-white tracking-widest text-xs font-bold uppercase">LENGTH</th>
                      <th className="py-4 font-mono text-white tracking-widest text-xs font-bold uppercase">SHOULDER</th>
                      <th className="py-4 font-mono text-white tracking-widest text-xs font-bold uppercase">SLEEVE</th>
                    </tr>
                  </thead>
                  <tbody className="font-sans text-sm text-white/70">
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-4 font-bold text-white">S</td>
                      <td className="py-4">22.5</td>
                      <td className="py-4">27.0</td>
                      <td className="py-4">20.5</td>
                      <td className="py-4">9.0</td>
                    </tr>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors bg-white/5">
                      <td className="py-4 font-bold text-white">M</td>
                      <td className="py-4">23.5</td>
                      <td className="py-4">28.0</td>
                      <td className="py-4">21.5</td>
                      <td className="py-4">9.5</td>
                    </tr>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-4 font-bold text-white">L</td>
                      <td className="py-4">24.5</td>
                      <td className="py-4">29.0</td>
                      <td className="py-4">22.5</td>
                      <td className="py-4">10.0</td>
                    </tr>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors bg-white/5">
                      <td className="py-4 font-bold text-white">XL</td>
                      <td className="py-4">25.5</td>
                      <td className="py-4">30.0</td>
                      <td className="py-4">23.5</td>
                      <td className="py-4">10.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-10 font-sans text-white/50 text-xs border-t border-white/10 pt-6">
                <p className="mb-2"><strong className="text-white">CHEST:</strong> Measured 1" below armpit straight across.</p>
                <p className="mb-2"><strong className="text-white">LENGTH:</strong> Measured from highest point of shoulder to bottom hem.</p>
                <p className="mb-2"><strong className="text-white">SHOULDER:</strong> Measured from shoulder seam to shoulder seam.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
