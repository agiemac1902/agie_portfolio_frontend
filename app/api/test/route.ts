import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get the backend URL from environment variables or use the EC2 IP as fallback
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://13.61.212.73"
    
    console.log(`Testing connection to: ${backendUrl}/api/personal-info/`)

    // Send to Django backend
    const response = await fetch(`${backendUrl}/api/personal-info/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error(`Backend error (${response.status}):`, errorData)
      return NextResponse.json({ 
        error: `Backend returned ${response.status}`, 
        details: errorData,
        url: `${backendUrl}/api/personal-info/`
      }, { status: 500 })
    }

    const responseData = await response.json()
    return NextResponse.json({ 
      success: true, 
      data: responseData,
      url: `${backendUrl}/api/personal-info/`
    }, { status: 200 })
  } catch (error) {
    console.error("Error testing backend connection:", error)
    return NextResponse.json({ 
      error: "Failed to connect to backend", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
} 