'use client'

import React, { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import { useRouter, useSearchParams } from "next/navigation";
export default function SearchBox() {
     const searchParams = useSearchParams();
    const router =  useRouter()
    const [input,setInput] = useState('')
    const debounce = useDebounce(input,300)
    useEffect(()=>{
        const q = debounce.trim()
         if (q === (searchParams.get("q") ?? "")) return;
       router.replace(q ? `/?q=${encodeURIComponent(q)}` : "/");

    })
  return (
   <div role="search" className="mb-4">
      <label htmlFor="search" className="mb-1 block text-sm font-medium">
        Search products
      </label>
      <input
        id="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-2"
      />
    </div>
  )
}
