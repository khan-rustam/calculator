import { useState, useEffect } from "react"
import { Calculator, ChevronRight, PieChart as PieChartIcon, CreditCard, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import Link from "next/link"
import { motion } from "framer-motion"

interface AmortizationEntry {
  month: number;
  principalPaid: number;
  interest: number;
  balance: number;
  payment: number;
}

interface ChartData {
  principal: number;
  interest: number;
  totalPayment: number;
  year: number;
}

interface PieChartData {
  name: string;
  value: number;
  color: string;
  percent: string;
}

interface LineChartData {
  year: number;
  principal: number;
  interest: number;
  balance: number;
  totalPaid: number;
}

export default function EMICalculatorSection() {
  const [loanAmount, setLoanAmount] = useState<number>(100000)
  const [interestRate, setInterestRate] = useState<number>(4)
  const [loanTerm, setLoanTerm] = useState<number>(8)
  const [emi, setEmi] = useState<number>(0)
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const [activeChart, setActiveChart] = useState<string>("bar")

  const COLORS = {
    principal: "#8CAD47",
    interest: "#F4A460",
    balance: "#E57373",
    background: "#F5F5F5",
    tooltipBg: "rgba(255, 255, 255, 0.95)",
  }

  useEffect(() => {
    calculateEMI()
  }, [loanAmount, interestRate, loanTerm])
  
  const calculateEMI = () => {
    try {
      const p = loanAmount || 1000
      const r = (interestRate || 1) / 12 / 100
      const n = (loanTerm || 1) * 12
      
      // Prevent calculation with extremely large values that might cause hanging
      if (p > 1000000000 || n > 1200) {
        setEmi(0)
        setTotalInterest(0)
        setTotalPayment(0)
        return
      }
      
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      const totalAmt = emi * n
      
      // Check for valid calculation results
      if (!isFinite(emi) || isNaN(emi)) {
        setEmi(0)
        setTotalInterest(0)
        setTotalPayment(0)
        return
      }
      
      setEmi(emi)
      setTotalInterest(totalAmt - p)
      setTotalPayment(totalAmt)
    } catch (error) {
      console.error("EMI calculation error:", error)
      setEmi(0)
      setTotalInterest(0)
      setTotalPayment(0)
    }
  }

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const generateAmortizationSchedule = (): AmortizationEntry[] => {
    try {
      const monthlyRate = (interestRate || 1) / 12 / 100
      const totalMonths = Math.min((loanTerm || 1) * 12, 360) // Cap at 30 years (360 months)
      const monthlyPayment = emi || 0
      
      // If we have extremely large values or invalid EMI, return empty schedule
      if (loanAmount > 1000000000 || !isFinite(monthlyPayment) || monthlyPayment === 0) {
        return []
      }
      
      let balance = loanAmount || 1000
      const schedule: AmortizationEntry[] = []
      
      for (let month = 1; month <= totalMonths; month++) {
        const interest = balance * monthlyRate
        const principalPaid = monthlyPayment - interest
        balance -= principalPaid
        
        schedule.push({
          month,
          principalPaid,
          interest,
          balance: Math.max(0, balance),
          payment: monthlyPayment,
        })
        
        // Safety - if we reach zero balance, stop calculating
        if (balance <= 0) break
      }
      
      return schedule
    } catch (error) {
      console.error("Amortization schedule calculation error:", error)
      return []
    }
  }

  const getPieChartData = (): PieChartData[] => {
    try {
      // Use fallback values if main values are invalid
      const principal = isFinite(loanAmount) ? loanAmount : 0
      const interest = isFinite(totalInterest) ? totalInterest : 0
      const total = principal + interest
      
      // Avoid division by zero
      const principalPercent = total > 0 ? (principal / total) * 100 : 0
      const interestPercent = total > 0 ? (interest / total) * 100 : 0
      
      return [
        { name: 'Principal Loan Amount', value: principal, color: COLORS.principal, percent: principalPercent.toFixed(1) },
        { name: 'Total Interest', value: interest, color: COLORS.interest, percent: interestPercent.toFixed(1) }
      ]
    } catch (error) {
      console.error("Pie chart data error:", error)
      return [
        { name: 'Principal Loan Amount', value: 0, color: COLORS.principal, percent: "0.0" },
        { name: 'Total Interest', value: 0, color: COLORS.interest, percent: "0.0" }
      ]
    }
  }

  const getBarChartData = (): ChartData[] => {
    try {
      // Cap years at 30 to prevent excessive iterations
      const years = Math.min(Math.ceil(loanTerm || 1), 30)
      const data: ChartData[] = []
      const currentYear = new Date().getFullYear()
      
      const schedule = generateAmortizationSchedule()
      
      // If schedule is empty, return empty data
      if (schedule.length === 0) {
        return Array.from({ length: years }, (_, i) => ({
          year: currentYear + i,
          principal: 0,
          interest: 0,
          totalPayment: 0
        }))
      }
      
      const monthsPerYear = 12
      
      for (let i = 0; i < years; i++) {
        const yearNum = currentYear + i
        const startMonth = i * monthsPerYear
        const endMonth = Math.min(startMonth + monthsPerYear, schedule.length)
        
        // Check if we've reached the end of the schedule
        if (startMonth >= schedule.length) {
          data.push({
            year: yearNum,
            principal: 0,
            interest: 0,
            totalPayment: 0
          })
          continue
        }
        
        const yearPayments = schedule.slice(startMonth, endMonth)
        
        const principalPaid = yearPayments.reduce((sum, month) => sum + month.principalPaid, 0)
        const interestPaid = yearPayments.reduce((sum, month) => sum + month.interest, 0)
        const totalPayment = principalPaid + interestPaid
        
        data.push({
          year: yearNum,
          principal: principalPaid,
          interest: interestPaid,
          totalPayment: totalPayment
        })
      }
      
      return data
    } catch (error) {
      console.error("Bar chart data error:", error)
      return []
    }
  }

  const getLineChartData = (): LineChartData[] => {
    try {
      const schedule = generateAmortizationSchedule()
      const yearlyData: LineChartData[] = []
      const currentYear = new Date().getFullYear()
      
      // Cap years at 30 to prevent excessive iterations
      const years = Math.min(loanTerm || 1, 30)
      
      // If schedule is empty, return empty data
      if (schedule.length === 0) {
        return Array.from({ length: Math.ceil(years) }, (_, i) => ({
          year: currentYear + i,
          principal: 0,
          interest: 0,
          balance: 0,
          totalPaid: 0
        }))
      }
      
      for (let i = 0; i < years; i++) {
        const yearNum = currentYear + i
        const monthStart = i * 12
        
        // Check if we've reached the end of the schedule
        if (monthStart >= schedule.length) {
          yearlyData.push({
            year: yearNum,
            principal: 0,
            interest: 0,
            balance: 0,
            totalPaid: 0
          })
          continue
        }
        
        const principal = schedule.slice(monthStart, monthStart + 12)
          .reduce((sum, month) => sum + month.principalPaid, 0)
        const interest = schedule.slice(monthStart, monthStart + 12)
          .reduce((sum, month) => sum + month.interest, 0)
        const balance = schedule[Math.min(monthStart + 11, schedule.length - 1)].balance
        
        yearlyData.push({
          year: yearNum,
          principal,
          interest,
          balance,
          totalPaid: principal + interest
        })
      }
      
      return yearlyData
    } catch (error) {
      console.error("Line chart data error:", error)
      return []
    }
  }

  const handleLoanAmountChange = (value: number) => {
    // Allow empty string to be entered
    if (value === 0 || value) {
      setLoanAmount(value);
    }
  }

  const handleLoanAmountBlur = () => {
    // Apply min and max constraints when input loses focus
    if (isNaN(loanAmount) || loanAmount < 1000) {
      setLoanAmount(1000);
    } else if (loanAmount > 100000000) {
      // Cap at 10 crore
      setLoanAmount(100000000);
    }
  }

  const handleInterestRateChange = (value: number) => {
    // Allow empty string to be entered
    if (value === 0 || value) {
      setInterestRate(value);
    }
  }

  const handleInterestRateBlur = () => {
    // Apply constraints when input loses focus
    if (isNaN(interestRate) || interestRate < 1) {
      setInterestRate(1);
    } else if (interestRate > 20) {
      setInterestRate(20);
    }
  }

  const handleLoanTermChange = (value: number) => {
    // Remove any validation during typing to prevent hanging
    setLoanTerm(value)
  }

  const handleLoanTermBlur = () => {
    // Apply constraints when input loses focus
    if (isNaN(loanTerm) || loanTerm < 1) {
      setLoanTerm(1);
    } else if (loanTerm > 30) {
      setLoanTerm(30);
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-32 pb-8 md:py-16 lg:py-20">
      <div className="absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-8 md:gap-12 py-10 md:py-16 lg:py-24 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mx-auto lg:mx-0">
                Simple & Accurate
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="text-primary">Calculate</span> Your EMI <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  In Seconds
                </span>
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl mx-auto lg:mx-0">
                Plan your finances with precision. Our EMI calculator helps you make informed decisions for loans,
                mortgages, and more.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/consultation">
                  Get Consultation Now <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href="/about">
                  Learn More <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Accurate Results</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">All Loan Types</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-8 lg:mt-0">
            <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">EMI Calculator</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="loan-amount" className="text-sm font-medium">
                      Loan Amount
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        id="loan-amount-input"
                        className="w-28 rounded-md border border-input bg-background px-3 py-1 text-sm"
                        value={loanAmount === 0 ? "" : loanAmount}
                        onChange={(e) => {
                          const val = e.target.value === "" ? 0 : Number(e.target.value);
                          handleLoanAmountChange(val);
                        }}
                        onBlur={handleLoanAmountBlur}
                      />
                      <span className="ml-2 text-sm font-semibold">$</span>
                    </div>
                  </div>
                  <Slider 
                    value={[Math.min(loanAmount/10000, 100)]} 
                    max={100} 
                    step={1} 
                    onValueChange={(value) => {
                      const newValue = value[0] * 10000;
                      handleLoanAmountChange(newValue);
                      // Slider changes should immediately apply minimum
                      if (newValue < 1000) handleLoanAmountBlur();
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="interest-rate" className="text-sm font-medium">
                      Interest Rate (%)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        id="interest-rate-input"
                        className="w-20 rounded-md border border-input bg-background px-3 py-1 text-sm"
                        value={interestRate === 0 ? "" : interestRate}
                        onChange={(e) => {
                          const val = e.target.value === "" ? 0 : Number(e.target.value);
                          handleInterestRateChange(val);
                        }}
                        onBlur={handleInterestRateBlur}
                      />
                      <span className="ml-2 text-sm font-semibold">%</span>
                    </div>
                  </div>
                  <Slider 
                    value={[interestRate || 1]} 
                    max={20} 
                    step={0.1} 
                    onValueChange={(value) => {
                      handleInterestRateChange(value[0]);
                      handleInterestRateBlur();
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="loan-tenure" className="text-sm font-medium">
                      Loan Tenure (Years)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        id="loan-tenure-input"
                        className="w-16 rounded-md border border-input bg-background px-3 py-1 text-sm"
                        value={loanTerm === 0 ? "" : loanTerm}
                        onChange={(e) => {
                          const val = e.target.value === "" ? 0 : Number(e.target.value);
                          handleLoanTermChange(val);
                        }}
                        onBlur={handleLoanTermBlur}
                      />
                      <span className="ml-2 text-sm font-semibold">Years</span>
                    </div>
                  </div>
                  <Slider 
                    value={[loanTerm || 1]} 
                    max={30} 
                    step={1} 
                    onValueChange={(value) => {
                      handleLoanTermChange(value[0]);
                      handleLoanTermBlur();
                    }}
                  />
                </div>
                <div className="rounded-lg bg-primary/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Monthly EMI:</span>
                    <span className="font-display text-xl font-bold text-primary">{formatAmount(Math.round(emi))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="hidden md:flex justify-center mb-12">
          <motion.div 
            className="flex flex-col items-center cursor-pointer text-primary/70 hover:text-primary transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            onClick={() => {
              const visualizationSection = document.querySelector('#emi-visualization');
              if (visualizationSection) {
                const headerOffset = 80;
                const elementPosition = visualizationSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            <span className="text-sm font-medium mb-2">Scroll for Visualizations</span>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </div>

        {/* Charts Section */}
        <div id="emi-visualization" className="pt-16 mt-10 md:mt-16 lg:mt-20 scroll-mt-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              EMI <span className="text-primary">Visualization</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Visualize your loan breakdown and payment schedule with interactive charts
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-0 sm:flex-nowrap rounded-md shadow-sm" role="group">
              <button
                onClick={() => setActiveChart("bar")}
                className={`px-4 sm:px-6 py-2 text-sm font-medium border ${
                  activeChart === "bar"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                } rounded-lg sm:rounded-none sm:rounded-l-lg`}
              >
                Bar Chart
              </button>
              <button
                onClick={() => setActiveChart("line")}
                className={`px-4 sm:px-6 py-2 text-sm font-medium border ${
                  activeChart === "line"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                } rounded-lg sm:rounded-none`}
              >
                Amortization
              </button>
              <button
                onClick={() => setActiveChart("pie")}
                className={`px-4 sm:px-6 py-2 text-sm font-medium border ${
                  activeChart === "pie"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                } rounded-lg sm:rounded-none sm:rounded-r-lg`}
              >
                Breakdown
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
            {activeChart === "bar" && (
              <div className="h-[350px] sm:h-[400px]">
                <h3 className="text-center text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Year-wise Payment Breakdown
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getBarChartData()}
                    margin={{ 
                      top: 20, 
                      right: 10, 
                      left: 10, 
                      bottom: 70 
                    }}
                    barGap={0}
                    barCategoryGap="30%"
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={{ stroke: '#E0E0E0' }}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 500, fill: '#666666' }}
                      angle={-45}
                      textAnchor="end"
                      tickMargin={25}
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      axisLine={{ stroke: '#E0E0E0' }}
                      tickLine={false}
                      tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
                      tick={{ fontSize: 10, fontWeight: 500, fill: '#666666' }}
                      width={45}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: COLORS.tooltipBg,
                        border: '1px solid #E0E0E0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: number) => formatAmount(value)}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: 40 }}
                      iconType="circle"
                      iconSize={8}
                      verticalAlign="bottom"
                      height={36}
                    />
                    <Bar 
                      name="Principal" 
                      dataKey="principal" 
                      fill={COLORS.principal}
                      radius={[4, 4, 0, 0]}
                      minPointSize={3}
                    />
                    <Bar 
                      name="Interest" 
                      dataKey="interest" 
                      fill={COLORS.interest}
                      radius={[4, 4, 0, 0]}
                      minPointSize={3}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeChart === "line" && (
              <div className="h-[350px] sm:h-[400px]">
                <h3 className="text-center text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Loan Amortization Schedule
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getLineChartData()}
                    margin={{ 
                      top: 20, 
                      right: 10, 
                      left: 10, 
                      bottom: 70 
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={{ stroke: '#E0E0E0' }}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 500, fill: '#666666' }}
                      angle={-45}
                      textAnchor="end"
                      tickMargin={25}
                      interval="preserveStartEnd"
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis 
                      axisLine={{ stroke: '#E0E0E0' }}
                      tickLine={false}
                      tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
                      tick={{ fontSize: 10, fontWeight: 500, fill: '#666666' }}
                      width={45}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: COLORS.tooltipBg,
                        border: '1px solid #E0E0E0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: number) => formatAmount(value)}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: 40 }}
                      iconType="circle"
                      iconSize={8}
                      verticalAlign="bottom"
                      height={36}
                    />
                    <Line 
                      name="Principal Paid" 
                      type="monotone" 
                      dataKey="principal" 
                      stroke={COLORS.principal} 
                      strokeWidth={2}
                      dot={{ r: 3, strokeWidth: 1, fill: "#FFFFFF" }}
                      activeDot={{ r: 5, stroke: COLORS.principal, strokeWidth: 2, fill: "#FFFFFF" }}
                    />
                    <Line 
                      name="Interest Paid" 
                      type="monotone" 
                      dataKey="interest" 
                      stroke={COLORS.interest} 
                      strokeWidth={2}
                      dot={{ r: 3, strokeWidth: 1, fill: "#FFFFFF" }}
                      activeDot={{ r: 5, stroke: COLORS.interest, strokeWidth: 2, fill: "#FFFFFF" }}
                    />
                    <Line 
                      name="Remaining Balance" 
                      type="monotone" 
                      dataKey="balance" 
                      stroke={COLORS.balance} 
                      strokeWidth={2}
                      dot={{ r: 3, strokeWidth: 1, fill: "#FFFFFF" }}
                      activeDot={{ r: 5, stroke: COLORS.balance, strokeWidth: 2, fill: "#FFFFFF" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeChart === "pie" && (
              <div className="h-[350px] sm:h-[400px]">
                <h3 className="text-center text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Break-up of Total Payment
                </h3>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={getPieChartData()}
                      cx="50%"
                      cy="45%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={0}
                      paddingAngle={1}
                      dataKey="value"
                      strokeWidth={1}
                      stroke="#FFFFFF"
                      label={({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius * 0.7;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text 
                            x={x} 
                            y={y} 
                            fill="#FFFFFF"
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="font-bold"
                            fontSize={14}
                          >
                            {`${getPieChartData()[index].percent}%`}
                          </text>
                        );
                      }}
                    >
                      {getPieChartData().map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))' }} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: COLORS.tooltipBg,
                        border: '1px solid #E0E0E0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: number) => formatAmount(value)}
                    />
                    <Legend 
                      iconType="circle"
                      iconSize={8}
                      verticalAlign="bottom"
                      height={36}
                      wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 