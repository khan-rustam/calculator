"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle, Clock, Shield, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

// Particle animation component
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width, height })
        canvasRef.current.width = width
        canvasRef.current.height = height
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    handleResize()

    // Initialize particles
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
    }> = []

    const particleCount = 50
    const colors = ["#4169E1", "#6495ED", "#87CEFA", "#1E90FF"]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    // Animation loop
    let animationFrameId: number

    const render = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d")
        if (ctx) {
          ctx.clearRect(0, 0, dimensions.width, dimensions.height)

          // Draw particles
          particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.speedX
            particle.y += particle.speedY

            // Boundary check
            if (particle.x < 0 || particle.x > dimensions.width) particle.speedX *= -1
            if (particle.y < 0 || particle.y > dimensions.height) particle.speedY *= -1

            // Draw particle
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle = particle.color
            ctx.globalAlpha = particle.opacity
            ctx.fill()

            // Connect particles that are close to each other
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[j].x - particle.x
              const dy = particles[j].y - particle.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 100) {
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.strokeStyle = particle.color
                ctx.globalAlpha = 0.1 * (1 - distance / 100)
                ctx.stroke()
              }
            }

            // Interact with mouse
            const dx = mousePosition.x - particle.x
            const dy = mousePosition.y - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              const forceDirectionX = dx / distance
              const forceDirectionY = dy / distance
              const force = (150 - distance) / 150

              particle.speedX += forceDirectionX * force * 0.2
              particle.speedY += forceDirectionY * force * 0.2

              // Limit speed
              const maxSpeed = 2
              const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
              if (currentSpeed > maxSpeed) {
                particle.speedX = (particle.speedX / currentSpeed) * maxSpeed
                particle.speedY = (particle.speedY / currentSpeed) * maxSpeed
              }
            }

            // Add some randomness to movement
            if (Math.random() < 0.01) {
              particle.speedX += (Math.random() - 0.5) * 0.2
              particle.speedY += (Math.random() - 0.5) * 0.2
            }
          })
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions.width, dimensions.height])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} />
}

// 3D Floating Card component
const FloatingCard = ({ children }: { children: React.ReactNode }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX
      const mouseY = e.clientY

      // Calculate rotation based on mouse position
      const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 5
      const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 5

      setRotateX(rotateX)
      setRotateY(rotateY)
    }
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)",
          opacity: Math.abs(rotateX) > 0 || Math.abs(rotateY) > 0 ? 0.6 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
    </motion.div>
  )
}

// Animated text component
const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div className={cn("flex flex-wrap justify-center", className)} variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span key={index} className="mr-2 mb-2" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Animated gradient background
const AnimatedGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />

      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(65, 105, 225, 0.4), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-0 left-0 right-0 h-[500px] opacity-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(65, 105, 225, 0.3) 0%, rgba(135, 206, 250, 0.3) 50%, rgba(65, 105, 225, 0.3) 100%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: ["-20%", "20%", "-20%"],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 left-0 h-[300px] opacity-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(135, 206, 250, 0.3) 0%, rgba(65, 105, 225, 0.3) 50%, rgba(135, 206, 250, 0.3) 100%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: ["20%", "-20%", "20%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

// Animated wave component
const WaveAnimation = () => {
  // Define a safe default path value
  const defaultPath = "M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden z-0">
      <svg
        className="absolute bottom-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <motion.path
            id="gentle-wave"
            d={defaultPath}
            initial={{ d: defaultPath }}
            animate={{
              d: [
                defaultPath,
                defaultPath,
                "M-160 34c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z",
                defaultPath,
              ],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </defs>
        <g>
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(65, 105, 225, 0.05)" />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(65, 105, 225, 0.07)" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(65, 105, 225, 0.03)" />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(65, 105, 225, 0.01)" />
        </g>
      </svg>
    </div>
  )
}

// Floating elements with 3D effect
const FloatingElement3D = ({
  size,
  color,
  initialX,
  initialY,
  duration,
  delay,
  className,
  depth = 0,
}: {
  size: number
  color: string
  initialX: number
  initialY: number
  duration: number
  delay: number
  className?: string
  depth?: number
}) => {
  return (
    <motion.div
      className={cn("absolute rounded-full opacity-30", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: initialY + "%",
        left: initialX + "%",
        zIndex: depth,
      }}
      animate={{
        x: [0, 20, -20, 10, -10, 0],
        y: [0, -30, -10, -20, 0],
        rotate: [0, 10, -10, 5, 0],
        scale: [1, 1.05, 0.95, 1.02, 1],
        z: [0, depth * 10, depth * 5, depth * 15, 0],
      }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    />
  )
}

// Glowing effect component
const GlowEffect = ({ 
  x, 
  y, 
  size = 300, 
  color = "rgba(65, 105, 225, 0.2)" 
}: { 
  x: number; 
  y: number; 
  size?: number; 
  color?: string; 
}) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x - size / 2,
        top: y - size / 2,
        background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
        zIndex: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  )
}

// Main component
export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showGlow, setShowGlow] = useState(false)
  const [typingText, setTypingText] = useState("")
  const fullText = "Financial Freedom"
  const moneyBagRef = useRef<HTMLDivElement>(null)
  const [moneyBagRotate, setMoneyBagRotate] = useState({ x: 0, y: 0 })

  // Typing effect
  useEffect(() => {
    if (typingText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypingText(fullText.slice(0, typingText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [typingText])

  useEffect(() => {
    setTypingText("")
    const timeout = setTimeout(() => {
      setTypingText("F")
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
    setShowGlow(true)
    
    // Handle money bag rotation
    if (moneyBagRef.current) {
      const rect = moneyBagRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate rotation based on mouse position relative to the center of the money bag
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 25
      const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 25
      
      setMoneyBagRotate({ x: rotateX, y: rotateY })
    }
  }

  const handleMouseLeave = () => {
    setShowGlow(false)
    setMoneyBagRotate({ x: 0, y: 0 })
  }

  // Parallax effect for scroll
  const y = useMotionValue(0)
  const parallaxY1 = useTransform(y, [0, 300], [0, -50])
  const parallaxY2 = useTransform(y, [0, 300], [0, -30])
  const parallaxY3 = useTransform(y, [0, 300], [0, -10])
  const moneyBagY = useTransform(y, [0, 300], [0, -40])

  useEffect(() => {
    const handleScroll = () => {
      y.set(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [y])

  return (
    <div
      className="w-full min-h-screen overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background elements */}
      <AnimatedGradient />
      <ParticleField />
      <WaveAnimation />

      {/* Floating 3D elements */}
      <FloatingElement3D size={100} color="#4169E1" initialX={5} initialY={20} duration={15} delay={0} depth={-2} />
      <FloatingElement3D size={150} color="#6495ED" initialX={80} initialY={10} duration={18} delay={1} depth={-1} />
      <FloatingElement3D size={80} color="#87CEFA" initialX={70} initialY={70} duration={12} delay={2} depth={-3} />
      <FloatingElement3D size={120} color="#4169E1" initialX={20} initialY={80} duration={20} delay={0.5} depth={-2} />

      {/* Mouse glow effect */}
      <AnimatePresence>{showGlow && <GlowEffect x={mousePosition.x} y={mousePosition.y} />}</AnimatePresence>

      <div className="container px-4 pt-32 pb-16 md:py-36 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 mx-auto lg:mx-0 max-w-md lg:max-w-none"
            style={{ y: parallaxY1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full flex items-center justify-center"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-medium text-sm backdrop-blur-sm bg-opacity-80">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Premium Financial Solutions</span>
              </div>
            </motion.div>

            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center"
              >
                <span className="text-blue-600 relative inline-block">
                  Unlock
                </span>{" "}
                Your <br />
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                    {typingText}
                  </span>
                  <motion.span
                    className="absolute right-0 top-0 h-full w-1 bg-blue-600"
                    animate={{
                      opacity: typingText.length < fullText.length ? [1, 0] : 0,
                    }}
                    transition={{
                      repeat: typingText.length < fullText.length ? Number.POSITIVE_INFINITY : 0,
                      duration: 0.8,
                    }}
                  />
                </span>
              </motion.h1>

              <AnimatedText
                text="Tailored loan solutions designed to help you achieve your dreams and build a secure financial future."
                className="text-lg text-gray-600 max-w-lg mx-auto text-center"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-4 pt-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative w-[70%] sm:w-auto">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden group w-full sm:w-auto" asChild>
                  <Link href="/calculator">
                    <span className="relative z-10 flex items-center">
                      Try Our Calculator
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-blue-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  </Link>
                </Button>
                <motion.div
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 opacity-70 blur-sm"
                  animate={{
                    opacity: [0.5, 0.7, 0.5],
                    scale: [0.98, 1.01, 0.98],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-auto">
                <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50 group" asChild>
                  <Link href="/consultation">
                    Get Consultation
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-wrap gap-6 pt-4 justify-center"
              style={{ y: parallaxY3 }}
            >
              {[
                { icon: <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />, text: "Competitive Rates" },
                { icon: <Clock className="h-5 w-5 text-blue-600 mr-2" />, text: "Quick Approvals" },
                { icon: <Shield className="h-5 w-5 text-blue-600 mr-2" />, text: "Secure Process" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center bg-white bg-opacity-70 backdrop-blur-sm px-3 py-2 rounded-full"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 20px rgba(65, 105, 225, 0.2)",
                  }}
                >
                  {item.icon}
                  <span className="text-sm text-gray-600">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="pt-8 hidden md:flex justify-center"
            >
              <motion.div
                className="flex items-center text-blue-600 text-sm font-medium cursor-pointer group"
                whileHover={{ x: 5 }}
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  servicesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Scroll to explore our services</span>
                <ChevronDown className="ml-2 h-4 w-4 animate-bounce" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Money Bag Image - Hidden on mobile, visible on lg screens */}
          <motion.div 
            ref={moneyBagRef}
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ 
              y: moneyBagY,
              transform: `perspective(1000px) rotateX(${moneyBagRotate.x}deg) rotateY(${moneyBagRotate.y}deg)`,
              transition: "transform 0.1s ease-out"
            }}
          >
            <div className="relative mt-12 w-[500px] h-[500px]">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
                className="w-full h-full relative"
                style={{
                  x: moneyBagRotate.y * -0.5,
                  y: moneyBagRotate.x * 0.5,
                  transition: "transform 0.05s ease-out"
                }}
              >
                <Image
                  src="/money.png"
                  alt="Money Bag"
                  width={550}
                  height={550}
                  className="object-contain"
                  priority
                />
                <motion.div
                  className="absolute inset-0"
                  style={{
                    opacity: Math.abs(moneyBagRotate.x) > 0 || Math.abs(moneyBagRotate.y) > 0 ? 0.8 : 0.3,
                  }}
                />
              </motion.div>
              
              {/* Glow effect under the money bag */}
              <motion.div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[350px] h-[70px] rounded-full bg-blue-200 opacity-20 filter blur-xl"
                animate={{
                  width: ["300px", "350px", "300px"],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

