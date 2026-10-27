import React from 'react'
import { Product } from './products'

type sortOption = "price-asc" | "price-desc";

export default function filterByCategory(products :Product[] , category? : string) : Product[] {
   if (!category) return products;
    return products.filter((p)=>p.category===category)
}
export function sortProduct(products: Product[], sort?: string) : Product[] {
    if (!sort) return products;
    if(sort === 'price-asc') return [...products].sort((a,b)=>a.price - b.price)
    if(sort === 'price-desc') return [...products].sort((a,b)=>b.price-a.price)   
    return products
    }

export const PAGE_SIZE = 12;

export function paginate(products: Product[], page: number) {
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;

  return {
    items: products.slice(start, start + PAGE_SIZE),
    currentPage,
    totalPages,
  };
}   