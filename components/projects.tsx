"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
}

export default function Projects({ projects }: { projects: Project[] }) {
  // Use a placeholder image
  const placeholderImage = "/placeholder.svg?height=300&width=500"

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
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
              Projects
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A showcase of my recent work and projects.
            </p>
          </div>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {projects.map((project, index) => {
            // Determine the image source for each project
            const projectImageSource =
              project.image && typeof project.image === "string" ? project.image : placeholderImage

            return (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    {/* Use regular img tag instead of Next.js Image component */}
                    <img
                      src={projectImageSource || "/placeholder.svg"}
                      alt={project.title || "Project Image"}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags &&
                          Array.isArray(project.tags) &&
                          project.tags.map((tag, tagIndex) => (
                            <Badge key={`${tag}-${tagIndex}`} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.githubUrl || "#"} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

