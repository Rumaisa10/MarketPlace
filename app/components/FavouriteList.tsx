// components/FavouritesList.tsx  (the wrapper)
"use client";

import { useFavourites } from "../context/FavouritesProvider";
import FavouritesGrid from "./FavouritesGrid";

export default function FavouritesList() {
  const { loaded } = useFavourites();

  if (!loaded) return <p>Loading your favourites...</p>;

  return <FavouritesGrid />;
}