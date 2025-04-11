"use client"

import { useEffect, useState } from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function AutoThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Function to determine if it's night time (between 6 PM and 6 AM)
  const isNightTime = () => {
    const currentHour = new Date().getHours()
    return currentHour >= 18 || currentHour < 6
  }

  // Set the theme based on time when component mounts
  useEffect(() => {
    setMounted(true)

    // Set initial theme based on time
    const initialTheme = isNightTime() ? "dark" : "light"
    document.documentElement.classList.toggle("dark", initialTheme === "dark")

    // Check time every minute to update theme if needed
    const interval = setInterval(() => {
      const shouldBeDark = isNightTime()
      const isDark = document.documentElement.classList.contains("dark")

      // Only update if there's a mismatch
      if (shouldBeDark !== isDark) {
        document.documentElement.classList.toggle("dark", shouldBeDark)
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <NextThemeProvider {...props} forcedTheme={mounted ? (isNightTime() ? "dark" : "light") : undefined}>
      {children}
    </NextThemeProvider>
  )
}
