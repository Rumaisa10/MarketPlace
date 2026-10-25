'use client'

import React from 'react'
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';


export default function Filters({categories}: {categories : string[]}) {
     const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

    function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
     <div className="mb-4 flex flex-wrap gap-4">
      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium">
          Category
        </label>
        <select
          id="category"
          value={searchParams.get("category") ?? ""}
          onChange={(e) => updateParam("category", e.target.value)}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sort" className="mb-1 block text-sm font-medium">
          Sort by
        </label>
        <select
          id="sort"
          value={searchParams.get("sort") ?? ""}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>
    </div>
  )
}
