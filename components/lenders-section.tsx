import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function LendersSection() {
  // Array of bank information
  const banks = [
    { name: "ASB", logo: "@banks/asb.png", id: "asb" },
    { name: "ANZ", logo: "/banks/anz.png", id: "anz" },
    { name: "BNZ", logo: "/banks/bnz.png", id: "bnz" },
    { name: "Kiwibank", logo: "/banks/kiwibank.png", id: "kiwibank" },
    { name: "Westpac", logo: "/banks/westpac.png", id: "westpac" },
    { name: "TSB", logo: "/banks/tsb.png", id: "tsb" },
    { name: "SBS", logo: "/banks/sbs.png", id: "sbs" },
    { name: "The Co-operative Bank", logo: "/banks/cooperative-Bank.png", id: "cooperative" },
    { name: "AIA", logo: "/banks/aia.png", id: "aia" },
  ]

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  // Item animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 300
      }
    }
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-10 sm:py-16 md:py-20 bg-gradient-to-b from-background to-muted/40">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl mb-4">
            More lenders means <span className="text-primary">more choices</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Compare rates and options from New Zealand's leading financial institutions to find the perfect loan for your needs.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {banks.map((bank) => (
            <motion.div 
              key={bank.id}
              className="flex items-center justify-center h-24 bg-card border shadow-sm rounded-xl p-4 relative overflow-hidden"
              variants={itemVariants}
              whileHover="hover"
            >
              {/* Subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-50"></div>
              
              <div className="relative h-12 w-full z-10">
                <Image
                  src={bank.logo}
                  alt={`${bank.name} logo`}
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 h-8 w-8 bg-primary/5 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
        </motion.div>
      </div>

      {/* Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[50px] min-w-[1200px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Define a constant path string to avoid undefined issues */}
            {(() => {
              const defaultPath = "M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              return (
                <motion.path
                  d={defaultPath}
                  initial={{ d: defaultPath }}
                  animate={{ 
                    d: [
                      defaultPath,
                      "M-160 34c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z",
                      defaultPath
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  id="gentle-wave"
                />
              )
            })()}
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              className="fill-primary/5"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              className="fill-primary/10"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              className="fill-muted/20"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              className="fill-background"
            />
          </g>
        </svg>
      </div>
    </section>
  )
} 
