"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import { motion } from "framer-motion"
import { fetchPersonalInfo, fetchSkills, fetchProjects, fetchExperiences, fetchEducation } from "@/app/api/services/api"

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

export default function Home() {
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
  /* useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching data from API...")

        // Fetch personal info
        try {
          const personalInfoResponse = await fetch("http://13.61.212.73/api/personal-info/")
          console.log("Personal info response status:", personalInfoResponse.status)

          if (personalInfoResponse.ok) {
            const data = await personalInfoResponse.json()
            console.log("Personal info data:", data)

            if (data && data.length > 0) {
              // Fix image URL if needed
              const personalData = data[0]
              if (personalData.image && !personalData.image.startsWith("http")) {
                personalData.image = `http://13.61.212.73${personalData.image}`
              }
              setPersonalInfo(personalData)
            }
          } else {
            console.error("Failed to fetch personal info:", personalInfoResponse.statusText)
          }
        } catch (error) {
          console.error("Error fetching personal info:", error)
        }

        // Fetch skills
        try {
          const skillsResponse = await fetch("http://13.61.212.73/api/skills/") 
          console.log("Skills response status:", skillsResponse.status)

          if (skillsResponse.ok) {
            const data = await skillsResponse.json()
            console.log("Skills data:", data)

            if (data && data.length > 0) {
              setSkills(data)
            }
          } else {
            console.error("Failed to fetch skills:", skillsResponse.statusText)
          }
        } catch (error) {
          console.error("Error fetching skills:", error)
        }

        // Fetch projects
        try {
          const projectsResponse = await fetch("http://13.61.212.73/api/projects/")
          console.log("Projects response status:", projectsResponse.status)

          if (projectsResponse.ok) {
            const data = await projectsResponse.json()
            console.log("Projects data:", data)

            if (data && data.length > 0) {
              // Fix image URLs if needed
              const projectsData = data.map((project: Project) => {
                if (project.image && !project.image.startsWith("http")) {
                  project.image = `http://13.61.212.73${project.image}`
                }
                return project
              })
              setProjects(projectsData)
            }
          } else {
            console.error("Failed to fetch projects:", projectsResponse.statusText)
          }
        } catch (error) {
          console.error("Error fetching projects:", error)
        }

        // Fetch experiences
        try {
          const experiencesResponse = await fetch("http://13.61.212.73/api/experiences/")
          console.log("Experiences response status:", experiencesResponse.status)

          if (experiencesResponse.ok) {
            const data = await experiencesResponse.json()
            console.log("Experiences data:", data)

            if (data && data.length > 0) {
              setExperiences(data)
            }
          } else {
            console.error("Failed to fetch experiences:", experiencesResponse.statusText)
          }
        } catch (error) {
          console.error("Error fetching experiences:", error)
        }

        // Fetch education
        try {
          const educationResponse = await fetch("http://13.61.212.73/api/education/")
          console.log("Education response status:", educationResponse.status)

          if (educationResponse.ok) {
            const data = await educationResponse.json()
            console.log("Education data:", data)

            if (data && data.length > 0) {
              setEducation(data)
            }
          } else {
            console.error("Failed to fetch education:", educationResponse.statusText)
          }
        } catch (error) {
          console.error("Error fetching education:", error)
        }
      } catch (error) {
        console.error("Error in fetchData function:", error)
      }
    }

    fetchData()
  }, []) */

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Hero personalInfo={personalInfo} />
      <About personalInfo={personalInfo} experiences={experiences} education={education} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Contact email="machiyagrippa@gmail.com" />
    </motion.div>
  )
}

