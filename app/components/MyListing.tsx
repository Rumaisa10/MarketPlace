// app/components/MyListings.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readListings, type Listing } from "@/libs/listingStorage";

export default function MyListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setListings(readListings());
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading your listings...</p>;

  if (listings.length === 0) {
    return (
      <div>
        <p>You havent listed anything yet.</p>
        <Link href="/sell" className="underline">Sell an item</Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <li key={l.id} className="rounded-xl border border-gray-200 p-4">
          <h2 className="font-medium">{l.title}</h2>
          <p className="text-sm text-gray-600">{l.category}</p>
          <p className="font-semibold">£{l.price.toFixed(2)}</p>
          <p className="mt-2 line-clamp-2 text-sm">{l.description}</p>
        </li>
      ))}
    </ul>
  );
}