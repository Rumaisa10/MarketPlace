"use client";

import { useFavourites } from "../context/FavouritesProvider";

export default function FavouriteButton({ productId }: { productId: number }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const active = isFavourite(productId);

  return (
    <button
      type="button"
      onClick={() => toggleFavourite(productId)}
      aria-pressed={active}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      className="rounded-full bg-white/90 p-2 text-lg leading-none shadow focus:outline-none focus:ring-2 focus:ring-gray-900"
    >
      {active ? "❤" : "♡"}
    </button>
  );
}