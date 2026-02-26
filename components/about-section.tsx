"use client"

import { useEffect, useRef, useState } from "react"
import { User } from "lucide-react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-10 flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <h2 className="font-mono text-sm tracking-widest text-primary uppercase">
              About Me
            </h2>
          </div>

          <div className="glass rounded-2xl p-8 md:p-12">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              I am a highly motivated{" "}
              <span className="font-semibold text-foreground">Network Engineer</span>{" "}
              with a deep interest in{" "}
              <span className="font-semibold text-primary">Cybersecurity</span>. I
              specialize in designing secure network topologies, configuring routing and
              switching environments, and implementing firewall-based access control models.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              My long-term goal is to transition into a{" "}
              <span className="font-semibold text-foreground">
                Security Operations Center (SOC)
              </span>{" "}
              role and contribute to proactive threat monitoring and incident response. As a
              final-year Computer Science Engineering student, I bring hands-on experience in
              enterprise networking, firewall configurations, and security-focused
              infrastructure design.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
