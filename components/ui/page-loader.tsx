"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function PageLoader() {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  
  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Determine which logo to show based on theme
  const logoSrc = mounted && (resolvedTheme === "dark" || theme === "dark") 
    ? "/agie_logo_dark.png" 
    : "/agie_logo.png"
  
  // Background color based on theme
  const bgColor = mounted && (resolvedTheme === "dark" || theme === "dark")
    ? "bg-background"
    : "bg-background"
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${bgColor}`}>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center"
      >
        <img 
          src={mounted ? logoSrc : "/placeholder.svg"} 
          alt="Loading..." 
          className="h-16 w-auto"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-4 text-sm text-muted-foreground"
        >
          Loading...
        </motion.div>
      </motion.div>
    </div>
  )
} 