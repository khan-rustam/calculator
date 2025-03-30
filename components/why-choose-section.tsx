import { Calculator, Clock, Users } from "lucide-react"

export default function WhyChooseSection() {
  return (
    <section id="why-choose-us" className="pt-32 pb-10 sm:py-16 md:py-24 lg:py-48">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why Choose Our <span className="text-primary">EMI Calculator</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our calculator provides accurate and reliable results to help you plan your finances better.
          </p>
        </div>
        <div className="mt-10 md:mt-12 lg:mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:bg-primary/20"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Accurate Calculations</h3>
              <p className="text-muted-foreground">
                Our EMI calculator uses precise formulas to give you the most accurate results for your loan planning.
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:bg-primary/20"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Instant Results</h3>
              <p className="text-muted-foreground">
                Get immediate calculations without waiting. Our tool provides real-time updates as you adjust parameters.
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:bg-primary/20"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Expert Support</h3>
              <p className="text-muted-foreground">
                Our financial experts are available to help you understand your EMI calculations and loan options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 