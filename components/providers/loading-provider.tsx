"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { PageLoader } from "@/components/ui/page-loader"

type LoadingContextType = {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulate initial loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show loader for 2 seconds
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <PageLoader />}
      {children}
    </LoadingContext.Provider>
  )
} 