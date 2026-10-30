'use client'

import { useEffect, useState } from "react";
import { useFavourites } from "../context/FavouritesProvider"
import { getProductDetails, ProductDetail } from "@/libs/products";
import Link from "next/link";
import ProductCard from "./ProductCard";


export default function FavouritesGrid() {
  const { ids } = useFavourites();
  const [initialIds] = useState(ids); // snapshot, never changes
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

  const visible = products.filter((p) => ids.includes(p.id));
         console.log({ ids, initialIds, products: products.length });
  if (loading) return <p>Loading products...</p>;

  if (error) {
    return <p role="alert">Couldnt load your favourites. Please refresh.</p>;
  }

  if (visible.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="mb-2">You havent saved any favourites yet.</p>
        <Link href="/" className="underline">Browse products</Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {visible.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}