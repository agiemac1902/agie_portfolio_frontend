"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedTitleProps {
  titles: string[]
  interval?: number
  className?: string
}

export default function AnimatedTitle({ titles, interval = 3000, className = "" }: AnimatedTitleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length)
    }, interval)

    return () => clearInterval(timer)
  }, [titles.length, interval])

  return (
    <div className={`h-[1.5em] relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute"
        >
          {titles[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
