"use client"

import Link from "next/link"
import { Menu, Home, Calculator, Briefcase, HelpCircle, Info, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("up")
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const router = useRouter()

  // Track scroll position for header appearance
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 10)
      
      // Determine scroll direction with less delay
      if (currentScrollY > lastScrollY + 5 && currentScrollY > 50) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY - 5) {
        setScrollDirection("up")
      }
      
      // Update last scroll position
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Handle navigation while keeping menu state control
  const handleNavigation = (href: string) => {
    router.push(href)
    // Close the menu after navigation
    setOpen(false)
  }

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { href: "/calculator", label: "EMI Calculator", icon: <Calculator className="h-4 w-4" /> },
    { href: "/services", label: "Services", icon: <Briefcase className="h-4 w-4" /> },
    { href: "/faq", label: "FAQ", icon: <HelpCircle className="h-4 w-4" /> },
    { href: "/about", label: "About", icon: <Info className="h-4 w-4" /> },
  ]

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-blue-50/90 to-transparent pointer-events-none" />
      
      <div className="relative w-full px-4 pt-4">
        <motion.header 
          initial={{ y: -100 }}
          animate={{ 
            y: scrollDirection === "down" ? -100 : 0,
            opacity: scrollDirection === "down" ? 0 : 1
          }}
          transition={{ 
            type: scrollDirection === "up" ? "spring" : "tween", 
            stiffness: scrollDirection === "up" ? 500 : 300, 
            damping: scrollDirection === "up" ? 20 : 30,
            duration: scrollDirection === "down" ? 0.3 : 0.1,
            opacity: { duration: 0.1 }
          }}
          className={`w-[95%] max-w-7xl mx-auto backdrop-blur-md rounded-2xl ${
            scrolled 
              ? "bg-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-blue-200/50" 
              : "bg-gradient-to-r from-white/40 to-blue-50/40 border border-white/40 shadow-[0_4px_20px_rgba(65,105,225,0.15)]"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            {/* Logo with animated gradient */}
            <Link href="/" className="flex items-center gap-1 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-lg p-1 relative"
              >
                <div className="font-display text-2xl font-bold relative z-10 flex items-center">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">EMI</span>
                  <span className="text-gray-800 ml-1">Calc</span>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ 
                    background: ["linear-gradient(to right, #4169E1, #87CEFA)", "linear-gradient(to right, #1E90FF, #6495ED)"],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden gap-1 lg:flex items-center">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="relative px-4 py-2 mx-1 group"
                >
                  <span className={`relative z-10 text-sm font-medium transition-colors flex items-center gap-1.5 ${pathname === item.href ? "text-white" : "text-gray-800 group-hover:text-white"}`}>
                    {item.icon}
                    {item.label}
                  </span>
                  
                  {/* Active and Hover Background */}
                  <span className="absolute inset-0 w-full h-full">
                    {pathname === item.href ? (
                      <motion.span 
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                      />
                    ) : (
                      <span className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-200 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full opacity-90" />
                    )}
                  </span>
                </Link>
              ))}
              
              {/* CTA Button */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="ml-4"
              >
              </motion.div>
            </nav>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="lg:hidden relative bg-white/60 border-blue-200/50 hover:bg-blue-50/60 rounded-xl shadow-sm"
                >
                  <AnimatePresence mode="wait">
                    {open ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-5 w-5 text-blue-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-5 w-5 text-blue-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] border-l border-blue-100 p-0 [&>button]:hidden bg-gradient-to-b from-white/90 to-blue-50/90 backdrop-blur-md shadow-2xl">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation links for EMI Calculator application
                </SheetDescription>
                
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-blue-100 backdrop-blur-md">
                    <div className="font-display text-xl font-bold">
                      <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">EMI</span>
                      <span className="text-gray-800 ml-1">Calc</span>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="sm" className="px-3 rounded-md hover:bg-blue-100/30 text-blue-600">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                  
                  <nav className="flex flex-col py-6 px-4 space-y-2 flex-1" aria-label="Main Navigation">
                    {navItems.map((item, index) => (
                      <motion.button 
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={`flex items-center gap-3 p-3 text-sm font-medium rounded-xl transition-all text-left overflow-hidden relative ${pathname === item.href ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md" : "hover:bg-blue-50/70 text-gray-800 border border-blue-100/50"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <span className={`flex items-center gap-3 relative z-10 ${pathname === item.href ? "text-white" : "text-blue-600"}`}>
                          {item.icon}
                          {item.label}
                        </span>
                        {pathname === item.href && (
                          <motion.div 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <ChevronRight className="h-4 w-4 text-white/80" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </nav>
                  
                  <div className="mt-auto p-4 border-t border-white/20">
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all rounded-full border border-blue-500"
                        onClick={() => handleNavigation("/calculator")}
                      >
                        <Calculator className="h-4 w-4 mr-2" />
                        Try Calculator
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.header>
      </div>
      
      <div className="w-full h-20" />
    </motion.div>
  )
}

