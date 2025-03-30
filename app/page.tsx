"use client"
import HeroSection from "./Hero-Section"
import ServicesSection from "@/components/services-section"
import WhyChooseSection from "@/components/why-choose-section"
import LendersSection from "@/components/lenders-section"
import FaqSection from "@/components/faq-section"
import CallbackSection from "@/components/callback-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseSection />
      <LendersSection />
      <FaqSection />
      <CallbackSection />
    </>
  )
}

