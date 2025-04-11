import type React from "react"
import { AutoThemeProvider } from "@/components/auto-theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/ui/back-to-top"
import "./globals.css"

export const metadata = {
  title: "Personal Portfolio",
  description: "My personal portfolio website",
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
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </div>
        </AutoThemeProvider>
      </body>
    </html>
  )
}
