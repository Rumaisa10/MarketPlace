"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "marketplace:favourites";

type FavouritesContextValue = {
  isFavourite: (id: number) => boolean;
  toggleFavourite: (id: number) => void;
};

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used inside FavouritesProvider");
  return ctx;
}

export default function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  const [loaded,setLoaded] = useState(false)

  useEffect(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw)
      {
        const parsed : unknown =JSON.parse(raw)
        if(Array.isArray(parsed) && parsed.every((x)=>typeof x === 'number'))
        {
          setIds(parsed)
        }
      }
     
    }
     catch {
        
      }
     setLoaded(true)
  },[])

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // storage full or blocked: ignore
    }
  }, [ids, loaded]);
  const isFavourite = (id: number) => ids.includes(id);

  const toggleFavourite = (id: number) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

      
  return (
    <FavouritesContext.Provider value={{ isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}