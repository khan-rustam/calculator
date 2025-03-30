import Image from "next/image"
import { ChevronRight, Award, Target, Users, TrendingUp, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 to-background py-16 md:py-20">
        <div className="absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl"></div>

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Our Story
                </div>
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Simplifying <span className="text-primary">Financial</span> Decisions Since 2015
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                  We're on a mission to make financial planning accessible to everyone through simple, accurate, and
                  reliable tools.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/services">
                    Our Services <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <Link href="/consultation">
                    Get Consultation <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Team working together"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our <span className="text-primary">Mission</span> & Vision
            </h2>
            <p className="mt-4 text-muted-foreground">
              We're dedicated to empowering individuals with the tools they need to make informed financial decisions.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-lg">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10"></div>
              <div className="relative">
                <Target className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-4 font-display text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To democratize financial planning by providing accessible, accurate, and easy-to-use tools that help
                  people understand and manage their financial commitments with confidence.
                </p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Make complex financial calculations simple</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Provide transparent and accurate information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Help users make informed financial decisions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-lg">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10"></div>
              <div className="relative">
                <TrendingUp className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-4 font-display text-2xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground">
                  To create a world where everyone has the knowledge and tools to achieve financial freedom,
                  regardless of their background or financial literacy level.
                </p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Become the most trusted financial calculator platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Expand our tools to cover all aspects of financial planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Educate and empower 10 million users by 2030</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              These principles guide everything we do and every decision we make.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group flex flex-col items-center rounded-2xl border bg-card p-8 text-center transition-all hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in everything we do, from the accuracy of our calculations to the user
                experience of our platform.
              </p>
            </div>

            <div className="group flex flex-col items-center rounded-2xl border bg-card p-8 text-center transition-all hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Integrity</h3>
              <p className="text-muted-foreground">
                We operate with complete transparency and honesty, ensuring our users can trust the information and
                tools we provide.
              </p>
            </div>

            <div className="group flex flex-col items-center rounded-2xl border bg-card p-8 text-center transition-all hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Accessibility</h3>
              <p className="text-muted-foreground">
                We believe financial tools should be accessible to everyone, regardless of their financial background
                or expertise.
              </p>
            </div>

            <div className="group flex flex-col items-center rounded-2xl border bg-card p-8 text-center transition-all hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v4" />
                  <path d="m6.8 14-3.5 2" />
                  <path d="m20.7 14-3.5 2" />
                  <path d="M6.8 10 3.3 8" />
                  <path d="m20.7 10-3.5-2" />
                  <path d="m9 22 3-8 3 8" />
                  <path d="M8 6h8" />
                  <path d="M12 6v8" />
                </svg>
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously innovate to provide the most advanced and user-friendly financial tools in the
                industry.
              </p>
            </div>

            <div className="group flex flex-col items-center rounded-2xl border bg-card p-8 text-center transition-all hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m7.5 12 3 3 6-6" />
                </svg>
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Reliability</h3>
              <p className="text-muted-foreground">
                Our users can depend on our tools to provide accurate and consistent results they can trust for
                important financial decisions.
              </p>
            </div>

            <div className="group flex flex-col items-center rounded-2xl border bg-card p-8 text-center transition-all hover:shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Efficiency</h3>
              <p className="text-muted-foreground">
                We value your time and strive to provide quick, efficient tools that deliver results instantly without
                compromising accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Meet Our <span className="text-primary">Leadership</span> Team
            </h2>
            <p className="mt-4 text-muted-foreground">
              The passionate individuals behind our mission to simplify financial planning.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Rajesh Kumar",
                role: "Founder & CEO",
                bio: "With over 15 years of experience in fintech, Rajesh founded EMI Calculator with a vision to make financial planning accessible to everyone.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Priya Sharma",
                role: "Chief Technology Officer",
                bio: "Priya leads our technology team, ensuring our calculators are accurate, fast, and user-friendly across all devices.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Amit Patel",
                role: "Head of Financial Advisory",
                bio: "A certified financial planner with expertise in loan products, Amit ensures our tools provide the most relevant information.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Neha Gupta",
                role: "Chief Marketing Officer",
                bio: "Neha brings our tools to millions of users through innovative marketing strategies and educational content.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Vikram Singh",
                role: "Head of Customer Success",
                bio: "Vikram leads our customer support team, ensuring users get the help they need to make informed financial decisions.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Ananya Reddy",
                role: "Product Manager",
                bio: "Ananya works closely with users to understand their needs and translate them into features that make financial planning easier.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="mt-4 text-muted-foreground">From a simple idea to India's most trusted EMI calculator.</p>
          </div>

          <div className="relative mt-16">
            <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border"></div>

            {[
              {
                year: "2015",
                title: "The Beginning",
                description:
                  "EMI Calculator was founded with a simple mission: to help people understand their loan commitments better.",
              },
              {
                year: "2017",
                title: "Expanding Our Tools",
                description:
                  "We expanded our calculator suite to include home loans, car loans, personal loans, and more specialized financial tools.",
              },
              {
                year: "2019",
                title: "1 Million Users",
                description:
                  "We celebrated our first major milestone: helping over 1 million users make informed financial decisions.",
              },
              {
                year: "2020",
                title: "Mobile App Launch",
                description:
                  "We launched our mobile app, making our tools accessible on-the-go for users across India.",
              },
              {
                year: "2022",
                title: "Financial Education Initiative",
                description:
                  "We started our financial literacy program, offering free resources to help users understand complex financial concepts.",
              },
              {
                year: "2023",
                title: "5 Million Users",
                description:
                  "We reached 5 million users and expanded our services to include personalized financial recommendations.",
              },
            ].map((milestone, index) => (
              <div
                key={index}
                className={`relative mb-12 ${index % 2 === 0 ? "ml-auto pl-8 md:pl-0 md:pr-8 md:text-right" : "mr-auto pr-8 md:pl-8 md:pr-0 md:text-left"} w-full md:w-1/2`}
              >
                <div className="absolute left-0 top-3 h-4 w-4 rounded-full border-4 border-background bg-primary md:left-1/2 md:-translate-x-1/2"></div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                  <span className="inline-block rounded bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {milestone.year}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold">{milestone.title}</h3>
                  <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              What Our <span className="text-primary">Users</span> Say
            </h2>
            <p className="mt-4 text-muted-foreground">
              Don't just take our word for it. Here's what people who use our tools have to say.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Arjun Mehta",
                location: "Mumbai",
                quote:
                  "The EMI calculator helped me plan my home loan perfectly. I could see exactly how different down payments and tenures would affect my monthly payments.",
              },
              {
                name: "Sneha Reddy",
                location: "Bangalore",
                quote:
                  "As a first-time car buyer, I was confused about loan options. This tool made it so easy to understand what I could afford and how interest rates impact my EMI.",
              },
              {
                name: "Rahul Sharma",
                location: "Delhi",
                quote:
                  "I've used many EMI calculators, but this one stands out for its accuracy and additional features like prepayment analysis. Highly recommended!",
              },
              {
                name: "Meera Joshi",
                location: "Pune",
                quote:
                  "The education loan calculator helped my daughter and me plan her overseas education. The detailed breakdown of interest and principal was very helpful.",
              },
              {
                name: "Karthik Nair",
                location: "Chennai",
                quote:
                  "I use this calculator for all my financial planning. It's simple, accurate, and helps me make better decisions about my loans and investments.",
              },
              {
                name: "Anjali Singh",
                location: "Hyderabad",
                quote:
                  "The instant callback feature connected me with a financial expert who answered all my questions about home loan refinancing. Excellent service!",
              },
            ].map((testimonial, index) => (
              <div key={index} className="relative rounded-2xl border bg-card p-6 shadow-sm">
                <div className="mb-4 text-4xl text-primary">"</div>
                <p className="mb-4 text-muted-foreground">{testimonial.quote}</p>
                <div className="mt-auto">
                  <p className="font-display font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border bg-card p-8 shadow-lg md:flex-row md:p-12">
            <div className="max-w-md space-y-4">
              <h2 className="font-display text-3xl font-bold tracking-tight">Ready to plan your finances?</h2>
              <p className="text-muted-foreground">
                Use our EMI calculator to make informed decisions about your loans and financial commitments.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/calculator">
                  Try Our Calculator <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href="/consultation">
                  Get Consultation <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

