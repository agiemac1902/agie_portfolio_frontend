"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useLoading } from "@/components/providers/loading-provider"

export function usePageTransition() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setIsLoading } = useLoading()
  
  useEffect(() => {
    // Show loader when pathname or search params change
    setIsLoading(true)
    
    // Hide loader after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Show loader for 1 second during transitions
    
    return () => clearTimeout(timer)
  }, [pathname, searchParams, setIsLoading])
} 