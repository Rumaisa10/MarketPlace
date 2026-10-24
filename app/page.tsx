import React from 'react'
import getProducts, { searchProducts } from '@/libs/products'
import ProductCard from './components/ProductCard'
import { Suspense } from 'react'
import SearchBox from './components/SearchBox'
export default async function page({searchParams}:{SearchParams:Promise<{q?:string}>}) {
  const {q} = await searchParams
   const query = q?.trim();
  const products = query? await searchProducts(q) : await getProducts()
  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">Marketplace</h1>

      <Suspense>
        <SearchBox />
      </Suspense>

      {products.length === 0 ? (
        <p>No products found for "{query}".</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
