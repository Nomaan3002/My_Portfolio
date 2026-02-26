"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ChevronDown, Linkedin, Mail } from "lucide-react"

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const numericTarget = parseInt(target)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const duration = 2000
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            setCount(Math.floor(progress * numericTarget))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [numericTarget])

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-3xl font-bold text-primary md:text-4xl">
        {count}
        {suffix}
      </p>
    </div>
  )
}

const stats = [
  { value: "5", suffix: "+", label: "Months Industry Experience" },
  { value: "8", suffix: "K+", label: "LinkedIn Followers & Connections" },
  { value: "6", suffix: "+", label: "Certifications Earned" },
]

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Content */}
        <div
          className={`flex-1 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">
            Network Engineer & Cybersecurity Enthusiast
          </p>
          <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Building Secure &{" "}
            <span className="text-primary">Scalable</span>{" "}
            Network Infrastructures
          </h1>
          <p className="mb-4 text-base italic text-primary/80 md:text-lg">
            Passionate about building secure, scalable, and resilient network infrastructures.
          </p>
          <p className="mb-4 text-lg text-muted-foreground text-pretty">
            Shaik Mohammed Noman Ahmed
          </p>
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base text-pretty">
            CCNA Trained | Fortinet NSE 1-4 Certified | Google Cybersecurity Certified
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-all hover:border-primary/50"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right - Profile Photo */}
        <div
          className={`flex flex-shrink-0 items-center justify-center transition-all delay-300 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            {/* Outer Glow Ring */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-60 blur-md animate-pulse-glow" />
            {/* Gradient Border */}
            <div className="relative rounded-full bg-gradient-to-br from-primary via-accent to-primary p-[3px]">
              <div className="rounded-full bg-background p-[3px]">
                <Image
                  // src="/images/profile.jpg"
                  src="/images/noman-image.png"
                  alt="Shaik Mohammed Noman Ahmed - Network Engineer"
                  width={260}
                  height={260}
                  className="h-48 w-48 rounded-full object-cover md:h-60 md:w-60"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Stats */}
      <div
        className={`mx-auto mt-16 grid w-full max-w-3xl grid-cols-3 gap-6 transition-all delay-500 duration-700 md:gap-10 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center md:p-6">
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-xs text-muted-foreground md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="mt-12 flex animate-bounce flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll to About section"
      >
        <span className="text-xs">Scroll Down</span>
        <ChevronDown className="h-5 w-5" />
      </a>
    </section>
  )
}
