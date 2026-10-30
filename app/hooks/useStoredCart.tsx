// hooks/useStoredFavourites.ts
import { useEffect, useState } from "react";
import { readCart , writeCart } from "@/libs/cartListing";

export default function useStoredCart() {
  const [cartIds, setCartIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCartIds(readCart());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    writeCart(cartIds);
  }, [cartIds, loaded]);

  return { cartIds, setCartIds, loaded };
}