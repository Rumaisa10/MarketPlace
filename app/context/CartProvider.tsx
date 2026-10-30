'use client'
import React, { useContext, useRef, useState } from 'react'
import { createContext } from 'react';
import useStoredCart from '../hooks/useStoredCart';

type CartContextValue = {
  loaded: boolean;
  isOnCart: (id: number) => boolean;
  addToCart: (id: number) => void;
  cartIds: number[];
    removeFromCart: (id: number) => void
  clearCart: () => void
};


const cartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(cartContext);
  if (!ctx) throw new Error("useFavourites must be used inside FavouritesProvider");
  return ctx;
}


export default function CartProvider({children} : { children: React.ReactNode }) {
     
    const { cartIds, setCartIds, loaded  } = useStoredCart();
    

    const isOnCart = (id: number) => cartIds.includes(id);

    
  const addToCart = (id: number) =>
    setCartIds((prev) => (prev.includes(id) ? prev : [...prev, id]))

  const removeFromCart = (id: number) =>
    setCartIds((prev) => prev.filter((x) => x !== id))

  const clearCart = () => setCartIds([])

  return (
    <cartContext.Provider value={{ cartIds, loaded, isOnCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </cartContext.Provider>
  )
}
