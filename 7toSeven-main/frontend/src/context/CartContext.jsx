import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('7toseven_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('7toseven_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, size, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product_id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.product_id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, {
        product_id: product.id,
        product_name: product.name,
        slug: product.slug,
        size,
        quantity,
        price: product.price,
        image: product.images[0],
      }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId, size) => {
    setItems(prev => prev.filter(i => !(i.product_id === productId && i.size === size)));
  }, []);

  const updateQuantity = useCallback((productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.product_id === productId && i.size === size ? { ...i, quantity } : i
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 899 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider value={{
      items, isCartOpen, setIsCartOpen,
      addToCart, removeFromCart, updateQuantity, clearCart,
      itemCount, subtotal, shipping, total,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
