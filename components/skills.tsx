"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Skill {
  name: string
  level: number
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const categories = [
    {
      name: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      name: "Backend",
      skills: ["Python", "Django", "Node.js", "Express", "PostgreSQL", "MongoDB"],
    },
    {
      name: "Tools",
      skills: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"],
    },
  ]

  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
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
              Skills
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Expertise</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A showcase of my technical skills and proficiency levels.
            </p>
          </div>
        </motion.div>
        <div className="grid gap-12 px-4 md:px-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold">Technical Skills</h3>
            <div className="grid gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium">{skill.name}</h4>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold">Skill Categories</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-4">{category.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

