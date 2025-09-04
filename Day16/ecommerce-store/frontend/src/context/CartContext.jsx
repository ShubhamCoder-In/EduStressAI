// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => p._id === product._id);
      if (found) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: Math.max(1, p.qty + qty) } : p
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p._id !== id));
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((p) => (p._id === id ? { ...p, qty: Math.max(1, qty) } : p))
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, p) => s + Number(p.price || 0) * Number(p.qty || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}
