'use client'
import { useEffect, useState } from 'react'

export default function useDebounce<T>(value:T,delay=300):T {
    const [debounce,setDebounce] = useState(value)

    useEffect(()=>{
        const timer = setTimeout(() => {
            setDebounce(value)
        }, delay);
        return () => clearTimeout(timer)
    },[value,delay])
  return debounce
}
