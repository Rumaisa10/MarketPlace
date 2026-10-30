import Image from "next/image";
import type {Product} from '@/libs/products'
import Link from "next/link";
import FavouriteButton from "./FavouriteButton";
import AddToCartButton from "./AddToCartButton";
export default function ProductCard({ product }: { product: Product }) {
  return (
     <article className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md">
    <Link href={`/products/${product.id}`}>
    
      <div className="relative aspect-square bg-gray-100">
        
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2 transition group-hover:scale-105"
        />
      </div>

      <div className="space-y-1 p-3">
        <h2 className="line-clamp-2 text-sm font-medium text-gray-900">
          {product.title}
        </h2>
        <p className="text-base font-semibold text-gray-900">
          £{product.price.toFixed(2)}
        </p>
      </div>
       </Link>

      <div className="absolute right-2 top-2">
        <FavouriteButton productId={product.id} />
      </div>
      <div className="px-3 pb-3">
        <AddToCartButton productId={product.id} />
      </div>
    </article>
   
  );
}