'use client'

import { useCart } from "../context/CartProvider";

export default function AddToCartButton({ productId }: { productId: number }) {
    const { isOnCart, addToCart } = useCart();
    const active = isOnCart(productId);
   
  
    return (
    <button
      type="button"
      onClick={() => addToCart(productId)}
      aria-pressed={active}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      className="rounded-full bg-white/90 p-2 text-lg leading-none shadow focus:outline-none focus:ring-2 focus:ring-gray-900"
    >
      {active ? "Already Added" : "Add to Cart"}
    </button>
  )
}


