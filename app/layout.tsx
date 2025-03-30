import type React from "react"
import "@/app/globals.css"
import { Poppins } from "next/font/google"
import { Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/header"
import Footer from "@/components/footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
})

export const metadata = {
  title: "EMI Calculator - Calculate Your Loan EMI in Seconds",
  description:
    "Use our EMI calculator to plan your finances with precision. Calculate EMIs for home loans, car loans, personal loans, and more.",
  generator: 'v0.dev',
  icons: {
    icon: '/dollar-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/dollar-icon.svg" />
      </head>
      <body className={`${poppins.variable} ${montserrat.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}