// app/context/FavouritesProvider.tsx
"use client";

import { createContext, useContext, useRef, useState } from "react";
import useStoredFavourites from "../hooks/useStoredFavourite";
import { saveFavourite } from "@/libs/favouritesApi";

type FavouritesContextValue = {
  loaded: boolean;
  isFavourite: (id: number) => boolean;
  toggleFavourite: (id: number) => void;
  ids: number[]
};


const FavouritesContext = createContext<FavouritesContextValue | null>(null);

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used inside FavouritesProvider");
  return ctx;
}

export default function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const { ids, setIds, loaded } = useStoredFavourites();
   const [error, setError] = useState<string | null>(null);
   const pending = useRef<Set<number>>(new Set());

  const isFavourite = (id: number) => ids.includes(id);

  const toggleFavourite = async (id: number) => {
    if(pending.current.has(id)) return 
    pending.current.add(id);
     setError(null);
     
      const on = !ids.includes(id);   
    setIds((prev) =>                             
    on ? [...prev, id] : prev.filter((x) => x !== id)
  );

  try {
    await saveFavourite(id, on);                
  } catch {
    setIds((prev) =>                        
      on ? prev.filter((x) => x !== id) : prev.includes(id) ? prev : [...prev, id]
    );
    setError("Couldn't update favourites. Try again.");
  } finally {
    pending.current.delete(id);               
  }
  }
  return (
    <FavouritesContext.Provider value={{ ids, loaded, isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
