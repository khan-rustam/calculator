import type { Metadata } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const metadata: Metadata = {
  title: "Legal - EMI Calculator",
  description: "Legal information regarding the use of our EMI calculator services.",
}

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-primary">Legal Information</h1>
          <p className="mt-2 text-muted-foreground">Important documents regarding the use of our services</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-20 rounded-lg border bg-card p-4 shadow-sm">
              <h3 className="mb-4 font-display text-xl font-bold text-foreground">Legal Documents</h3>
              <nav className="space-y-1">
                <Link
                  href="/legal/privacy-policy"
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/legal/terms-of-service"
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/legal/disclaimer"
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Disclaimer
                </Link>
              </nav>
              <div className="mt-6 border-t border-border pt-4">
                <Link
                  href="/"
                  className="flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="md:col-span-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 