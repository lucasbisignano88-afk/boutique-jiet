import React, { useState, useEffect, useRef, useContext, createContext } from 'react'
import { JIE } from './data.js'

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

export const getProduct = (id) => JIE.products.find((p) => p.id === id);
export const getUniverse = (id) => JIE.universes.find((u) => u.id === id);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("jie_cart") || "[]"); } catch { return []; }
  });
  const [route, setRoute] = useState(() => {
    try { return JSON.parse(localStorage.getItem("jie_route") || "null") || { name: "home" }; }
    catch { return { name: "home" }; }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => { localStorage.setItem("jie_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("jie_route", JSON.stringify(route)); }, [route]);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const navigate = (r) => {
    setRoute(typeof r === "string" ? { name: r } : r);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const addToCart = (id, qty = 1, openDrawer = false) => {
    setCart((c) => {
      const found = c.find((l) => l.id === id);
      if (found) return c.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...c, { id, qty }];
    });
    const p = getProduct(id);
    showToast(`« ${p ? p.name : "Article"} » ajouté au panier`);
    if (openDrawer) setDrawerOpen(true);
  };
  const setQty = (id, qty) =>
    setCart((c) => (qty <= 0 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l))));
  const removeFromCart = (id) => setCart((c) => c.filter((l) => l.id !== id));
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const cartLines = cart.map((l) => ({ ...l, product: getProduct(l.id) })).filter((l) => l.product);
  const cartSubtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);

  const value = {
    cart, cartLines, cartCount, cartSubtotal,
    addToCart, setQty, removeFromCart, clearCart,
    route, navigate,
    drawerOpen, openCart: () => setDrawerOpen(true), closeCart: () => setDrawerOpen(false),
    toast, showToast,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
