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

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        data-testid="cart-drawer"
        className="w-full sm:max-w-md bg-white dark:bg-[#0A0A0A] p-0 flex flex-col [&>button]:hidden border-l-2 border-black dark:border-white !z-50"
        style={{ borderRadius: 0 }}
      >
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b border-black/5 dark:border-white/[0.04]">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-['Impact'] text-lg uppercase tracking-wider text-black dark:text-white">
              Cart ({items.length})
            </SheetTitle>
            <button
              data-testid="cart-close-btn"
              onClick={() => setIsCartOpen(false)}
              className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors duration-300 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
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
              <p className="font-['Impact'] text-base uppercase tracking-wider text-black/30 dark:text-white/30">Cart is empty</p>
              <p className="text-xs text-black/20 dark:text-white/20 mt-2">Add something to get started.</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.product_id}-${item.size}`}
                  data-testid={`cart-item-${item.product_id}`}
                  className="flex gap-4 p-3 border-b border-black/10 dark:border-white/10"
                >
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-16 h-20 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-['Impact'] text-[11px] uppercase tracking-wider text-black dark:text-white truncate">
                      {item.product_name}
                    </h4>
                    <p className="text-[10px] text-black/30 dark:text-white/30 mt-0.5">Size: {item.size}</p>
                    <p className="text-xs text-black dark:text-white mt-1">{'\u20B9'}{item.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-black/20 dark:border-white/20">
                        <button
                          data-testid={`cart-qty-minus-${item.product_id}`}
                          onClick={() => updateQuantity(item.product_id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-black/50 dark:text-white/50 hover:bg-black/10 dark:hover:bg-white/[0.06] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-[11px] text-black dark:text-white">{item.quantity}</span>
                        <button
                          data-testid={`cart-qty-plus-${item.product_id}`}
                          onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-black/50 dark:text-white/50 hover:bg-black/10 dark:hover:bg-white/[0.06] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        data-testid={`cart-remove-${item.product_id}`}
                        onClick={() => removeFromCart(item.product_id, item.size)}
                        className="text-black/20 dark:text-white/20 hover:text-black/60 dark:hover:text-black dark:hover:text-white/60 transition-colors"
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
          <div className="p-6 pt-4 space-y-4 border-t border-black/5 dark:border-white/[0.04]">
            {subtotal < 899 ? (
              <p data-testid="cart-shipping-msg" className="text-[10px] text-center text-black/30 dark:text-white/30 uppercase tracking-wider">
                Add {'\u20B9'}{(899 - subtotal).toLocaleString('en-IN')} more for free shipping
              </p>
            ) : (
              <p data-testid="cart-free-shipping" className="text-[10px] text-center text-black/50 dark:text-white/50 uppercase tracking-wider">
                Free shipping unlocked
              </p>
            )}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-black/40 dark:text-white/40">
                <span>Subtotal</span>
                <span>{'\u20B9'}{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-black/40 dark:text-white/40">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `\u20B9${shipping}`}</span>
              </div>
              <div className="flex justify-between text-black dark:text-white font-['Impact'] text-sm uppercase tracking-wider pt-3 border-t border-black/5 dark:border-white/[0.04]">
                <span>Total</span>
                <span>{'\u20B9'}{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button
              data-testid="cart-checkout-btn"
              onClick={handleCheckout}
              className="w-full bg-black text-white dark:bg-white dark:text-[#0A0A0A] font-['Impact'] text-xs uppercase tracking-[0.2em] py-5 border-2 border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:text-white transition-all duration-300"
            >
              SECURE DROP
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
