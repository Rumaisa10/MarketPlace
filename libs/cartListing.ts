

const STORAGE_KEY = "marketplace:Cart_listings";

export function readCart(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "number")) {
      return parsed;
    }
  } catch {
    // bad data or blocked storage
  }
  return [];
}

export function writeCart(ids: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // storage full or blocked
  }
}