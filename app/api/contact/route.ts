// app/api/contact/route.ts
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate the request
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get the backend URL from environment variables or use the EC2 IP as fallback
    const backendUrl = process.env.BACKEND_URL || "http://13.61.212.73"
    
    console.log(`Sending contact form data to: ${backendUrl}/api/contact/`)

    // Send to Django backend
    const response = await fetch(`${backendUrl}/api/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error(`Backend error (${response.status}):`, errorData)
      throw new Error(`Backend returned ${response.status}: ${errorData}`)
    }

    const responseData = await response.json()
    return NextResponse.json(responseData, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ 
      error: "Failed to send message", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}