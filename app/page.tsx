import getProducts, { searchProducts } from '@/libs/products'
import ProductCard from './components/ProductCard'
import { Suspense } from 'react'
import SearchBox from './components/SearchBox'
import filterByCategory, { paginate, sortProduct } from '@/libs/productFilter'
import Filters from './components/Filters'
import Pagination from './components/Pagination'
//import FavouriteList from './components/FavouriteList'
import ListingCard from './components/ListingCard'
import { getListings } from '@/libs/listings'


export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; page?: string }>;
}) {
  const { q, category, sort, page } = await searchParams;

  const query = q?.trim();
  const base = query ? await searchProducts(query) : await getProducts();
  const categories = [...new Set(base.map((p) => p.category))].sort();
  const filtered = filterByCategory(base, category);
  const sorted = sortProduct(filtered, sort);

  const requestedPage = Number.parseInt(page ?? "1", 10);
  const { items, currentPage, totalPages } = paginate(
    sorted,
    Number.isNaN(requestedPage) ? 1 : requestedPage
  );

  let listings: Awaited<ReturnType<typeof getListings>> = [];
try {
  listings = await getListings();
} catch (err) {
  console.error("Couldn't load listings:", err);
}
  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">Marketplace</h1>

      <Suspense>
        <SearchBox />
        <Filters categories={categories} />
      </Suspense>

      {items.length === 0 ? (
        <p>No products found. Try changing your search or filters.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
{listings.length > 0 && (
  <section className="mb-8">
    <h2 className="mb-3 text-xl font-semibold">Community listings</h2>
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {listings.map((l) => (
        <li key={l.id}>
          <ListingCard listing={l} />
        </li>
      ))}
    </ul>
  </section>
)}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        params={{ q: query, category, sort }}
      />
      
    </main>
    
  );
}
