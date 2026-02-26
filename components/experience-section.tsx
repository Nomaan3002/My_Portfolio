"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase } from "lucide-react"

export function ExperienceSection() {
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

  const responsibilities = [
    "Designed and implemented multi-router network topologies.",
    "Configured routing protocols and VLAN segmentation.",
    "Assisted in firewall rule implementation and access control testing.",
    "Participated in real-time network monitoring and troubleshooting.",
  ]

  return (
    <section id="experience" ref={ref} className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div
          className={`mb-12 flex items-center gap-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="font-mono text-sm tracking-widest text-primary uppercase">
            Professional Experience
          </h2>
        </div>

        <div
          className={`glass rounded-2xl p-8 transition-all duration-700 md:p-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Timeline dot */}
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-3 h-full w-px bg-gradient-to-b from-primary/50 to-transparent" />
            </div>

            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-foreground">
                  Network Engineer Intern
                </h3>
                <span className="rounded-md bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                  5 Months
                </span>
              </div>
              <p className="mb-6 text-base text-primary">ALG Dataguard</p>

              <ul className="flex flex-col gap-3">
                {responsibilities.map((item, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      isVisible ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"
                    }`}
                    style={{ transitionDelay: `${400 + idx * 150}ms` }}
                  >
                    <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
