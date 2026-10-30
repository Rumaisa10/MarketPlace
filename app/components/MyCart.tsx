// app/components/MyCart.tsx
"use client";

import { useCart } from "../context/CartProvider";
import CartItems from "./CartItems";
export default function MyCart() {
  const { loaded } = useCart();

  if (!loaded) return <p>Loading your cart...</p>;

  return <CartItems />;
}