"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAutoMode, setIsAutoMode] = useState(true)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to determine if it's night time (between 6 PM and 6 AM)
  const isNightTime = () => {
    const currentHour = new Date().getHours()
    return currentHour >= 18 || currentHour < 6
  }

  const handleThemeChange = (theme: string) => {
    setTheme(theme)
    setIsAutoMode(theme === "system")
  }

  // If not mounted yet, show a placeholder
  if (!mounted) {
    return <div className="h-9 w-9" />
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
            {isAutoMode && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleThemeChange("light")}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("dark")}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("system")}>
            Auto ({isNightTime() ? "Dark" : "Light"})
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
