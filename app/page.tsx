"use client"

import { useEffect, useState, Suspense } from "react"
import { usePageTransition } from "@/hooks/use-page-transition"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import { motion } from "framer-motion"
import { fetchPersonalInfo, fetchSkills, fetchProjects, fetchExperiences, fetchEducation } from "@/app/api/services/api"
import { StructuredData } from "./structured-data"

// Define interfaces for the data types
interface PersonalInfo {
  name: string
  title: string
  bio: string
  about: string
  image: string
}

interface Skill {
  id?: number
  name: string
  level: number
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
}

interface Experience {
  id?: number
  company: string
  position: string
  start_date: string
  end_date: string
  description: string
  technologies: string[]
}

interface Education {
  id?: number
  institution: string
  degree: string
  field_of_study: string
  start_date: string
  end_date: string
  description: string
}

// Create a separate component for the page content
function HomeContent() {
  // Use the page transition hook
  usePageTransition()

  // Default data
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "John Doe",
    title: "Full Stack Developer",
    bio: "I'm a passionate developer with experience in building web applications using modern technologies.",
    about: "I'm a passionate developer with experience in building web applications using modern technologies.",
    image: "/placeholder.svg?height=400&width=400",
  })

  const [skills, setSkills] = useState<Skill[]>([
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Django", level: 80 },
    { name: "Python", level: 85 },
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 80 },
    { name: "HTML/CSS", level: 95 },
    { name: "Tailwind CSS", level: 90 },
  ])

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform built with Next.js and Django.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Next.js", "Django", "PostgreSQL", "Tailwind CSS"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A task management application with user authentication and real-time updates.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A personal portfolio website built with Next.js and Django.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Next.js", "Django", "Framer Motion", "Tailwind CSS"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ])

  // New state for experiences and education
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])

  // Fetch data from API with proper error handling
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching data from API...")

        // Fetch personal info
        try {
          const data = await fetchPersonalInfo()
          if (data) {
            setPersonalInfo(data)
          }
        } catch (error) {
          console.error("Error fetching personal info:", error)
        }

        // Fetch skills
        try {
          const data = await fetchSkills()
          if (data && data.length > 0) {
            setSkills(data)
          }
        } catch (error) {
          console.error("Error fetching skills:", error)
        }

        // Fetch projects
        try {
          const data = await fetchProjects()
          if (data && data.length > 0) {
            setProjects(data)
          }
        } catch (error) {
          console.error("Error fetching projects:", error)
        }

        // Fetch experiences
        try {
          const data = await fetchExperiences()
          if (data && data.length > 0) {
            setExperiences(data)
          }
        } catch (error) {
          console.error("Error fetching experiences:", error)
        }

        // Fetch education
        try {
          const data = await fetchEducation()
          if (data && data.length > 0) {
            setEducation(data)
          }
        } catch (error) {
          console.error("Error fetching education:", error)
        }
      } catch (error) {
        console.error("Error in fetchData function:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Add structured data for SEO */}
      <StructuredData 
        personalInfo={personalInfo} 
        skills={skills} 
        projects={projects} 
      />
      
      <Hero personalInfo={personalInfo} />
      <About personalInfo={personalInfo} experiences={experiences} education={education} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Contact email="machiyagrippa@gmail.com" />
    </motion.div>
  )
}

// Main page component with Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}

