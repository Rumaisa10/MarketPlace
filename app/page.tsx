import getProducts, { searchProducts } from '@/libs/products'
import ProductCard from './components/ProductCard'
import { Suspense } from 'react'
import SearchBox from './components/SearchBox'
import filterByCategory, { sortProduct } from '@/libs/productFilter'
import Filters from './components/Filters'


export default async function page({searchParams}:{SearchParams:Promise<{q?:string; category?:string ; sort?:string}>}) {
 
   const {q , category , sort} = await searchParams
   const query = q?.trim();
   const base = query? await searchProducts(query) : await getProducts()
    const categories = [...new Set(base.map((p) => p.category))].sort();
   const filtered = filterByCategory(base , category)
   const products = sortProduct(filtered , sort)
   
  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">Marketplace</h1>

      <Suspense>
        <SearchBox />
        <Filters categories={categories} />
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
