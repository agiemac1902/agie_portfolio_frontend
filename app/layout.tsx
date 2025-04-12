import type React from "react"
import { AutoThemeProvider } from "@/components/auto-theme-provider"
import { LoadingProvider } from "@/components/providers/loading-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/ui/back-to-top"
import "./globals.css"

export const metadata = {
  title: "Agrippa Machiya | Web Developer & Software Engineer",
  description: "Professional web developer and mobile app developer specializing in creating responsive, user-friendly applications. Expert in front-end and back-end development.",
  keywords: "graphic designer, web developer, software engineer, mobile app developer, web designer, graphic designer, front-end developer, back-end developer, full-stack developer, UI/UX designer, React developer, Next.js developer, TypeScript developer",
  authors: [{ name: "Agrippa Machiya" }],
  creator: "Agrippa Machiya",
  publisher: "Agrippa Machiya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Agrippa Machiya | Web Developer & Software Engineer",
    description: "Professional web developer and mobile app developer specializing in creating responsive, user-friendly applications.",
    url: "https://www.agiemachiya.me",
    siteName: "Agrippa Machiya | Web Developer & Software Engineer",
    images: [
      {
        url: "/agie_logo.png",
        width: 800,
        height: 600,
        alt: "Agrippa Machiya - Web Developer & Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agrippa Machiya | Web Developer & Software Engineer",
    description: "Professional web developer, software engineer, and mobile app developer specializing in creating responsive, user-friendly applications.",
    images: ["/agie_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: '/agie_fav.png',
    apple: '/agie_fav.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-courier">
        <AutoThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LoadingProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <BackToTop />
            </div>
          </LoadingProvider>
        </AutoThemeProvider>
      </body>
    </html>
  )
}
