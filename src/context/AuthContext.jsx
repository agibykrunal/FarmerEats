//ok it is at top of all
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
    setCart([]);
  }

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i.name === product.name);
      if (existing) {
        return prev.map(i => i.name === product.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(name) {
    setCart(prev => {
      const existing = prev.find(i => i.name === name);
      if (existing && existing.qty > 1) {
        return prev.map(i => i.name === name ? { ...i, qty: i.qty - 1 } : i);
      }
      return prev.filter(i => i.name !== name);
    });
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.rawPrice, 0);

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
