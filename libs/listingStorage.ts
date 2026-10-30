import { SellFormData } from "@/app/components/SellForm";

export type Listing = SellFormData & { id: string; createdAt: string };

const KEY = "marketplace:listings";

export function readListings(): Listing[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Listing[]) : [];
  } catch {
    return [];
  }
}

export function addListing(form: SellFormData): void {
  const listing: Listing = {
    ...form,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify([listing, ...readListings()]));
}   
    
