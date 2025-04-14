"use client"

import { useEffect } from "react"
import Script from "next/script"

interface StructuredDataProps {
  personalInfo: {
    name: string
    title: string
    bio: string
    image: string
  }
  skills: Array<{
    name: string
    level: number
  }>
  projects: Array<{
    title: string
    description: string
    image: string
    tags: string[]
    demoUrl: string
    githubUrl: string
  }>
}

export function StructuredData({ personalInfo, skills, projects }: StructuredDataProps) {
  useEffect(() => {
    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      description: personalInfo.bio,
      image: personalInfo.image,
      url: "https://www.agiemachiya.me",
      sameAs: [
        "https://github.com/agiemac1902",
        "https://www.linkedin.com/in/agrippa-machiya-045978202/",
        "https://twitter.com/agiemachiya",
      ],
      knowsAbout: skills.map(skill => skill.name),
      makesOffer: projects.map(project => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.description,
          image: project.image,
          applicationCategory: "WebApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
      })),
    }

    // Add the structured data to the page
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [personalInfo, skills, projects])

  return null
} 