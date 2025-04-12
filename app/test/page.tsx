"use client"

import { useState, useEffect } from "react"
import { fetchPersonalInfo, fetchSkills, fetchProjects, fetchExperiences, fetchEducation } from "../api/services/api"

export default function TestPage() {
  const [personalInfo, setPersonalInfo] = useState<any>(null)
  const [skills, setSkills] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [experiences, setExperiences] = useState<any[]>([])
  const [education, setEducation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch all data in parallel
        const [personalInfoData, skillsData, projectsData, experiencesData, educationData] = await Promise.all([
          fetchPersonalInfo(),
          fetchSkills(),
          fetchProjects(),
          fetchExperiences(),
          fetchEducation()
        ])
        
        setPersonalInfo(personalInfoData)
        setSkills(skillsData)
        setProjects(projectsData)
        setExperiences(experiencesData)
        setEducation(educationData)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      {loading && <p>Loading data...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Personal Info</h2>
            <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
              {JSON.stringify(personalInfo, null, 2)}
            </pre>
          </div>
          
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
              {JSON.stringify(skills, null, 2)}
            </pre>
          </div>
          
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
              {JSON.stringify(projects, null, 2)}
            </pre>
          </div>
          
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Experiences</h2>
            <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
              {JSON.stringify(experiences, null, 2)}
            </pre>
          </div>
          
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
              {JSON.stringify(education, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
} 