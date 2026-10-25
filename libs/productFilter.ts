import React from 'react'
import { Product } from './products'

type sortOption = "price-asc" | "price-desc";

export default function filterByCategory(products :Product[] , category? : string) : Product[] {
   if (!category) return products;
    return products.filter((p)=>p.category===category)
}
export function sortProduct(products: Product[], sort?: string) : Product[] {
    if(sort === 'price-asc') return [...products].sort((a,b)=>a.price - b.price)
    if(sort === 'price-desc') return [...products].sort((a,b)=>b.price-a.price)   
    return products
    }