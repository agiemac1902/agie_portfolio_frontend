"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentDateTime, setCurrentDateTime] = useState("")
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, resolvedTheme } = useTheme()

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDateTime(now.toLocaleDateString() + " " + now.toLocaleTimeString())
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Skills", path: "/#skills" },
    { name: "Projects", path: "/#projects" },
    { name: "Contact", path: "/#contact" },
  ]

  // Determine which logo to show based on theme
  const logoSrc = mounted && (resolvedTheme === "dark" || theme === "dark") ? "/agie_logo_dark.png" : "/agie_logo.png"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="flex items-center space-x-2">
            {/* Conditionally render logo based on theme */}
            {mounted ? (
              <img src={logoSrc || "/placeholder.svg"} alt="Logo" className="h-8 md:h-10 w-auto" />
            ) : (
              // Placeholder to prevent layout shift while determining theme
              <div className="h-8 md:h-10 w-10 bg-transparent" />
            )}
          </Link>
        </motion.div>

        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          <div className="text-sm text-muted-foreground mr-4">{currentDateTime}</div>
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.path ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <ModeToggle />
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <div className="text-xs text-muted-foreground">{currentDateTime}</div>
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t"
        >
          <div className="container py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`block text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.path ? "text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}
