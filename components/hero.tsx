"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Link from "next/link"
import AnimatedTitle from "@/components/ui/animated-title"

interface PersonalInfo {
  name: string
  title: string
  bio: string
  about: string
  image: string
}

export default function Hero({ personalInfo }: { personalInfo: PersonalInfo }) {
  // Default values for when personalInfo is not available
  const name = personalInfo?.name
  const title = personalInfo?.title || "Web Developer"
  const bio = personalInfo?.bio || "Welcome to my portfolio website."

  // Use a placeholder image by default
  const placeholderImage = "/placeholder.svg?height=400&width=400"

  // Titles for the animated component
  const titles = ["Frontend Developer", "Graphic Designer", "System Analyst"]

  // Determine the image source
  const imageSource =
    personalInfo?.image && typeof personalInfo.image === "string" ? personalInfo.image : placeholderImage

  return (
    <section className="w-full min-h-[90vh] flex items-center py-6 md:py-10 lg:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_350px]">
          <div className="flex flex-col justify-center space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Hi, I&apos;m &lt;{name}/&gt;</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl font-medium text-muted-foreground sm:text-2xl"> <AnimatedTitle titles={titles} interval={2500} /></h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="max-w-[600px] text-muted-foreground md:text-xl">{bio}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-2 min-[400px]:flex-row"
            >
              <Link href="/#contact">
                <Button size="lg">Contact Me</Button>
              </Link>
              <Link href="/#about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="relative aspect-square overflow-hidden rounded-full border-4 border-primary/20 w-[250px] h-[250px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px]">
              {/* Use regular img tag instead of Next.js Image component */}
              <img src={imageSource || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <Link href="/#about" className="animate-bounce">
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
              <ArrowDown className="h-5 w-5" />
              <span className="sr-only">Scroll down</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

