"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PersonalInfo {
  name: string
  title: string
  bio: string
  about: string
  image: string
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

interface AboutProps {
  personalInfo: PersonalInfo
  experiences: Experience[]
  education: Education[]
}

export default function About({ personalInfo, experiences, education }: AboutProps) {
  // Default values
  const name = personalInfo?.name

  const about = personalInfo?.about || "About Me"

  // Use a placeholder image
  const placeholderImage = "/placeholder.svg?height=400&width=400"

  // Determine the image source
  const imageSource =
    personalInfo?.image && typeof personalInfo.image === "string" ? personalInfo.image : placeholderImage

  // Default experiences if none are provided
  const defaultExperiences: Experience[] = [
    {
      company: "Tech Company",
      position: "Senior Developer",
      start_date: "2020 - 05 - 12",
      end_date: "2020 - 05 - 12",
      description: "Working on full-stack web applications using React, Next.js, and Django.",
      technologies: ["Wordpress", "Pyhton"]
    },
    {
      company: "Tech Company",
      position: "Senior Developer",
      start_date: "2020 - 05 - 12",
      end_date: "2020 - 05 - 12",
      description: "Working on full-stack web applications using React, Next.js, and Django.",
      technologies: ["Wordpress", "Pyhton"]
    },
    {
      company: "Tech Company",
      position: "Senior Developer",
      start_date: "2020 - 05 - 12",
      end_date: "2020 - 05 - 12",
      description: "Working on full-stack web applications using React, Next.js, and Django.",
      technologies: ["Wordpress", "Pyhton"]
    },
  ]

  // Default education if none is provided
  const defaultEducation: Education[] = [
    {
      institution: "Harare Institute of Technology",
      degree: "Bachelor in Computer Science",
      field_of_study: "ICT",
      start_date: "2014 - 2016",
      end_date: "2014 - 2016",
      description: "Bachelor in Computer Science"
    },
    {
      institution: "Harare Institute of Technology",
      degree: "Bachelor in Computer Science",
      field_of_study: "ICT",
      start_date: "2014 - 2016",
      end_date: "2014 - 2016",
      description: "Bachelor in Computer Science"
    },
  ]

  // Use provided data or fall back to defaults
  const experiencesToShow = experiences && experiences.length > 0 ? experiences : defaultExperiences
  const educationToShow = education && education.length > 0 ? education : defaultEducation

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1 text-sm">
              About Me
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Background</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Learn more about my experience, education, and skills.
            </p>
          </div>
        </motion.div>
        <div className="grid gap-12 px-4 md:px-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-8 md:grid-cols-2"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">About Me</h3>
              <p className="text-muted-foreground">{personalInfo?.about}</p>
            </div>
            <div className="flex items-center justify-center">
              {/* Use regular img tag instead of Next.js Image component */}
              <img
                src={imageSource || "/placeholder.svg"}
                alt={name}
                className="rounded-lg object-cover w-full max-w-[400px] h-auto"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">Experience</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {experiencesToShow.map((exp, index) => (
                <Card key={exp.id || index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <h4 className="font-bold">{exp.position}</h4>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} | {exp.start_date} - {exp.end_date || "Present"}
                      </p>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">Education</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {educationToShow.map((edu, index) => (
                <Card key={edu.id || index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <h4 className="font-bold">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution} | {edu.start_date} - {edu.end_date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

