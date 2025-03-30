import { Calculator, CreditCard, PieChart as PieChartIcon, Clock, Users } from "lucide-react"

export default function ServicesSection() {
  return (
    <section id="services" className="pt-32 pb-28 sm:py-36 md:py-32 lg:py-64">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Comprehensive financial tools to help you make informed decisions
          </p>
        </div>
        <div className="mt-10 md:mt-12 lg:mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:bg-primary/20"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">EMI Calculator</h3>
              <p className="text-muted-foreground">
                Calculate your monthly EMI for any type of loan with our accurate and easy-to-use calculator.
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:bg-primary/20"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Loan Comparison</h3>
              <p className="text-muted-foreground">
                Compare different loan options and find the best rates from various lenders.
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:bg-primary/20"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <PieChartIcon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">Financial Planning</h3>
              <p className="text-muted-foreground">
                Get personalized financial advice and planning tools to manage your loans effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 