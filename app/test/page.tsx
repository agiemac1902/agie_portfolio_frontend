"use client"

import { useEffect, useState } from "react"
import { fetchPersonalInfo, fetchSkills, fetchProjects, fetchExperiences, fetchEducation } from "@/app/api/services/api"

export default function TestPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)
  const [testResult, setTestResult] = useState<any>(null)

  useEffect(() => {
    async function testApi() {
      try {
        setLoading(true)
        setError(null)
        
        // Test direct API call
        const personalInfo = await fetchPersonalInfo()
        setData(personalInfo)
        
        // Test Next.js API route
        const testResponse = await fetch('/api/test')
        const testData = await testResponse.json()
        setTestResult(testData)
        
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
        setLoading(false)
      }
    }
    
    testApi()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {data && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Personal Info (Direct API Call)</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
      
      {testResult && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Test API Route Result</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
} 