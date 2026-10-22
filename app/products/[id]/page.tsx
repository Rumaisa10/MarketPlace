import { getProductDetails } from '@/libs/products'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';


export default async function Detailspage({params}: {params : Promise < {id : string}>}) {
    const {id} = await params
    console.log(id)
    const numericId = Number(id);
    console.log(numericId)
    if (!Number.isInteger(numericId) || numericId < 1) notFound();
    
    const product = await getProductDetails(numericId)
    if (!product) notFound();
  return (
    <main className="mx-auto max-w-5xl p-4">
      <Link href="/" className="text-sm text-gray-600 hover:underline">
        ← Back to products
      </Link>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="relative aspect-square rounded-xl bg-gray-100">
          <Image
            src={product.images[0] ?? product.thumbnail}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-4"
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-xl font-semibold">£{product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-600">
            {product.category}
            {product.brand ? ` · ${product.brand}` : ""}
          </p>
          <p className="text-gray-800">{product.description}</p>
        </div>
      </div>
    </main>
  )
}
