import React from 'react'
import getProducts from '@/libs/products'
import ProductCard from './components/ProductCard'

export default async function page() {
  const products = await getProducts()
  return (
     <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">Marketplace</h1>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </main>
  )
}
