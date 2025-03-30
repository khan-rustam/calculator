import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Calculator, Clock, CreditCard, PieChart, TrendingUp, Wallet } from "lucide-react"

interface LoanTip {
  icon: React.ElementType;
  title: string;
  description: string;
  value?: () => React.ReactNode;
}

export default function LoanTipsSection() {
  const [activeTipIndex, setActiveTipIndex] = useState(0)
  const [tipAnimation, setTipAnimation] = useState("fade-in")
  const timerRef = useRef<ReturnType<typeof setInterval>>(null)

  const [loanAmount, setLoanAmount] = useState<number>(1000000)
  const [interestRate, setInterestRate] = useState<number>(8.5)
  const [loanTerm, setLoanTerm] = useState<number>(20)
  const [emi, setEmi] = useState<number>(0)
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [totalPayment, setTotalPayment] = useState<number>(0)

  useEffect(() => {
    calculateEMI()
  }, [loanAmount, interestRate, loanTerm])

  const calculateEMI = () => {
    const principal = loanAmount
    const ratePerMonth = (interestRate / 12) / 100
    const numberOfPayments = loanTerm * 12
    
    // EMI = P × r × (1 + r)^n/((1 + r)^n - 1)
    const emiAmount = principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfPayments) / (Math.pow(1 + ratePerMonth, numberOfPayments) - 1)
    const totalAmount = emiAmount * numberOfPayments
    const totalInterestAmount = totalAmount - principal
    
    setEmi(emiAmount)
    setTotalInterest(totalInterestAmount)
    setTotalPayment(totalAmount)
  }

  const getLoanTips = (): LoanTip[] => {
    return [
      {
        icon: Calculator,
        title: "Compare Loan Options",
        description: "Always compare offers from multiple lenders to get the best interest rates and terms. Look at the APR, not just the interest rate.",
        value: () => (
          <div className="text-lg font-semibold text-primary">
            Save money by comparing
          </div>
        )
      },
      {
        icon: Clock,
        title: "Choose Right Tenure",
        description: "Longer tenure means lower EMIs but higher total interest. Shorter tenure means higher EMIs but lower total interest.",
        value: () => (
          <div className="text-lg font-semibold text-primary">
            Balance EMI vs Interest
          </div>
        )
      },
      {
        icon: CreditCard,
        title: "Check Processing Fees",
        description: "Be aware of all charges including processing fees, prepayment penalties, and late payment charges.",
        value: () => (
          <div className="text-lg font-semibold text-primary">
            Know all charges
          </div>
        )
      },
      {
        icon: PieChart,
        title: "Maintain Credit Score",
        description: "A good credit score (750+) helps you get better interest rates. Pay all EMIs on time to maintain a good score.",
        value: () => (
          <div className="text-lg font-semibold text-primary">
            Keep score above 750
          </div>
        )
      },
      {
        icon: TrendingUp,
        title: "Prepay When Possible",
        description: "Make partial prepayments whenever possible. This reduces your interest burden significantly over the loan tenure.",
        value: () => (
          <div className="text-lg font-semibold text-primary">
            Reduce interest burden
          </div>
        )
      },
      {
        icon: Wallet,
        title: "Emergency Fund",
        description: "Maintain an emergency fund of at least 6 months' EMIs to avoid defaulting during financial emergencies.",
        value: () => (
          <div className="text-lg font-semibold text-primary">
            Keep 6 months EMI ready
          </div>
        )
      }
    ]
  }

  useEffect(() => {
    const tips = getLoanTips()
    timerRef.current = setInterval(() => {
      setTipAnimation("fade-out")
      setTimeout(() => {
        setActiveTipIndex((prev) => (prev + 1) % tips.length)
        setTipAnimation("fade-in")
      }, 300)
    }, 5000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const handleTipNavigation = (index: number) => {
    setTipAnimation("fade-out")
    setTimeout(() => {
      setActiveTipIndex(index)
      setTipAnimation("fade-in")
    }, 300)
  }

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const tips = getLoanTips()
  const ActiveIcon = tips[activeTipIndex].icon

  return (
    <section id="loan-tips" className="py-10 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Loan Tips & <span className="text-primary">Information</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get valuable insights and tips to make informed decisions about your loan
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {tips.map((tip, index) => (
            <div
              key={tip.title}
              className={`relative rounded-xl border bg-card p-6 transition-all duration-300 ${
                index === activeTipIndex
                  ? "border-primary shadow-lg scale-105"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <tip.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">{tip.title}</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{tip.description}</p>
              {tip.value && (
                <div className="mt-4">
                  {tip.value()}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-2">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTipNavigation(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === activeTipIndex ? "bg-primary w-4" : "bg-gray-300"
              }`}
              aria-label={`Go to tip ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 