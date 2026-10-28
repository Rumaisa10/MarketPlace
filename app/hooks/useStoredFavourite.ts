// hooks/useStoredFavourites.ts
import { useEffect, useState } from "react";
import { readFavourites , writeFavourites } from "@/libs/favoriteStorage";
export default function useStoredFavourites() {
  const [ids, setIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setIds(readFavourites());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    writeFavourites(ids);
  }, [ids, loaded]);

  return { ids, setIds, loaded };
}