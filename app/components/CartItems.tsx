// app/components/CartItems.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartProvider";
import { getProductDetails, type ProductDetail } from "@/libs/products";

export default function CartItems() {
  const { cartIds, removeFromCart } = useCart();
  const [initialIds] = useState(cartIds); // snapshot, never changes
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;

    Promise.all(initialIds.map((id) => getProductDetails(id)))
      .then((results) => {
        if (!ignore) {
          setProducts(results.filter((p): p is ProductDetail => p !== null));
        }
      })
      .catch(() => {
        if (!ignore) setError(true);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [initialIds]);

  const items = products.filter((p) => cartIds.includes(p.id));
  const total = items.reduce((sum, p) => sum + p.price, 0);

  if (loading) return <p>Loading your cart...</p>;

  if (error) return <p role="alert">Couldnt load your cart. Please refresh.</p>;

  if (items.length === 0) {
    return (
      <div>
        <p>Your cart is empty.</p>
        <Link href="/" className="underline">Browse products</Link>
      </div>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <li key={p.id} className="rounded-xl border border-gray-200 p-4">
            <h2 className="font-medium">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="font-semibold">£{p.price.toFixed(2)}</p>
            <button
              type="button"
              onClick={() => removeFromCart(p.id)}
              aria-label={`Remove ${p.title} from cart`}
              className="mt-2 text-sm underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-lg font-semibold">Total: £{total.toFixed(2)}</p>
    </div>
  );
}