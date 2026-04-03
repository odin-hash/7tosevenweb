import React from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, shipping, total } = useCart();
  const navigate = useNavigate();
  const [touchStartX, setTouchStartX] = React.useState(null);
  const [touchEndX, setTouchEndX] = React.useState(null);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance < -50) { // Right swipe
      setIsCartOpen(false);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        data-testid="cart-drawer"
        className="w-full sm:max-w-md bg-zinc-950 p-0 flex flex-col [&>button]:hidden border-0 border-l border-zinc-800 !z-50 rounded-none transform transition-transform"
        style={{ borderRadius: 0 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <SheetHeader className="p-6 pb-4   border-white/[0.04]">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-['Impact'] text-2xl uppercase tracking-widest text-[#CCFF00]">
              INVENTORY MANIFEST <span className="text-white/50 text-sm">({items.length})</span>
            </SheetTitle>
            <button
              data-testid="cart-close-btn"
              onClick={() => setIsCartOpen(false)}
              className=" text-white/40  hover:text-white transition-colors duration-300 w-8 h-8 flex items-center justify-center rounded-full  hover:bg-white/5"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
          <SheetDescription className="sr-only">Shopping cart contents</SheetDescription>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-10">
              <p className="font-['Impact']  uppercase tracking-widest text-2xl text-white/30">MANIFEST EMPTY</p>
              <p className="font-mono text-xs uppercase tracking-widest text-white/20 mt-4 border border-white/10 px-6 py-2">SCAN NEW ITEMS</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.product_id}-${item.size}`}
                  data-testid={`cart-item-${item.product_id}`}
                  className="flex gap-4 p-3   border-white/10"
                >
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-16 h-20 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-mono text-sm uppercase tracking-widest font-bold text-white truncate break-words whitespace-normal">
                      {item.product_name}
                    </h4>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#CCFF00] mt-1">SIZE: // {item.size}</p>
                    <p className="font-mono text-xs font-bold text-white mt-3 pb-2 border-b border-white/10">RS. {item.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border  border-white/20 shrink-0">
                        <button
                          data-testid={`cart-qty-minus-${item.product_id}`}
                          onClick={() => updateQuantity(item.product_id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center  text-white/50  hover:bg-white/[0.06] transition-colors shrink-0 p-0"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 font-mono text-xs text-center text-white shrink-0 p-0">{item.quantity}</span>
                        <button
                          data-testid={`cart-qty-plus-${item.product_id}`}
                          onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center  text-white/50  hover:bg-white/[0.06] transition-colors shrink-0 p-0"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        data-testid={`cart-remove-${item.product_id}`}
                        onClick={() => removeFromCart(item.product_id, item.size)}
                        className="text-white/50 hover:text-red-500 transition-colors duration-300"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 pt-4 space-y-4 border-t border-zinc-800 bg-[#050505]">
            {subtotal < 899 ? (
              <p data-testid="cart-shipping-msg" className="font-mono text-[9px] text-[#CCFF00] uppercase tracking-widest">
                // ADD RS. {(899 - subtotal).toLocaleString('en-IN')} FOR SECURE SHIPPING //
              </p>
            ) : (
              <p data-testid="cart-free-shipping" className="font-mono text-[9px] text-[#CCFF00] uppercase tracking-widest">
                // FREIGHT CLEARED // FREE SHIPPING //
              </p>
            )}
            <div className="space-y-3 font-mono text-[10px] uppercase tracking-widest">
              <div className="flex justify-between text-white/50">
                <span>SUBTOTAL</span>
                <span>RS. {subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>SHIPPING</span>
                <span>{shipping === 0 ? 'CLEARED' : `RS. ${shipping}`}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm tracking-widest pt-4 border-t border-white/10">
                <span>TOTAL</span>
                <span>RS. {total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button
              data-testid="cart-checkout-btn"
              onClick={handleCheckout}
              className="w-full bg-white text-black font-['Impact'] text-xl uppercase tracking-widest py-5 border-2 border-transparent hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black active:bg-[#CCFF00] transition-all duration-300 rounded-none shadow-[4px_4px_0px_0px_rgba(204,255,0,0.5)] hover:shadow-[0px_0px_0px_0px_rgba(204,255,0,0)] hover:translate-y-[4px] hover:translate-x-[4px] mt-4"
            >
              SECURE DROP
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
