"use client"
import { useState } from 'react'
import { Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

export default function CallbackSection() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const form = e.currentTarget
      const formData = {
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value || 'No message'
      }

      // Convert to URLSearchParams for form submission
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        params.append(key, value);
      });

      const response = await fetch('https://script.google.com/macros/s/AKfycbx2y7IYsoS-v8aHqK1x6cgCXqZ3pggBkqtaNX2ciqz5Sc1X0hIB1D7FtLqYulwGi-cI/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })

      // Add a slight delay to ensure the request has time to process
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success message and reset form
      console.log('Showing success toast');
      toast.success('Request submitted successfully! We will call you shortly.', {
        duration: 5000, // 5 seconds
      });
      form.reset()
    } catch (error: any) {
      console.log('Showing error toast', error);
      
      // Show more specific error message based on error type
      let errorMessage = 'Failed to submit request. Please try again.';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Connection error: Unable to reach our server. Please check your internet connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, {
        duration: 5000, // 5 seconds
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="pt-32 pb-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container px-2 md:px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Phone className="mr-1 h-3 w-3" /> Expert Assistance
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Get an <span className="text-primary">Instant Callback</span> from Our Financial Experts
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Have questions about your loan or EMI calculations? Our financial experts are ready to help you make
                informed decisions.
              </p>
            </div>

            <div className="space-y-4 rounded-xl bg-primary/5 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">Quick Response</h3>
                  <p className="text-muted-foreground">Get a callback within 30 minutes during business hours</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">Expert Advice</h3>
                  <p className="text-muted-foreground">Personalized guidance from financial specialists</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">No Obligation</h3>
                  <p className="text-muted-foreground">Free consultation with no commitment required</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border bg-card shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-primary/10 opacity-50"></div>
              <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-primary/10 blur-2xl"></div>

              <div className="relative p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold">Request a Callback</h3>
                <p className="mt-2 text-muted-foreground">Fill in your details and we'll call you back</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      className="border-muted-foreground/20" 
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      className="border-muted-foreground/20" 
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Your Query (Optional)
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="I need help with..."
                      className="min-h-[100px] border-muted-foreground/20"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                          Submitting...
                        </span>
                      ) : (
                        'Request Callback'
                      )}
                    </Button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <a href="/legal/privacy-policy" className="underline underline-offset-2">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/legal/terms-of-service" className="underline underline-offset-2">
                      Terms of Service
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}