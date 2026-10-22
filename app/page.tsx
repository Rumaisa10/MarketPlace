import React from 'react'
import getProducts from '@/Utility'
import Image from 'next/image'

export default async function page() {
  const products = await getProducts()
  return (
    <>
    <h1 className="bg-red-500 p-4" >Product list</h1>
     <ul className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <li key={p.id} className="rounded-lg border p-3">
          <h2 className="font-medium">{p.title}</h2>
          <p className="text-sm text-gray-600">£{p.price}</p>
          <Image src={p.thumbnail} alt='product-image' height={300} width={300}></Image>
        </li>
      ))}
    </ul>
    </>
  )
}
