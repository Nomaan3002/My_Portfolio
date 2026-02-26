"use client"

import { useEffect, useRef, useState } from "react"
import { Award, CheckCircle2 } from "lucide-react"

const certifications = [
  { name: "CCNA (Trained)", issuer: "Cisco" },
  { name: "Fortinet NSE 1 to NSE 4 Certified", issuer: "Fortinet" },
  { name: "Google Cybersecurity Professional Certificate", issuer: "Google" },
  { name: "NETGEAR AV Certification - Level 1", issuer: "NETGEAR" },
]

export function CertificationsSection() {
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
    <section id="certifications" ref={ref} className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div
          className={`mb-12 flex items-center gap-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Award className="h-5 w-5 text-primary" />
          <h2 className="font-mono text-sm tracking-widest text-primary uppercase">
            Certifications
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, idx) => (
            <div
              key={cert.name}
              className={`glass group flex items-start gap-4 rounded-xl p-6 transition-all duration-700 hover:border-primary/30 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{cert.name}</h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  Issued by {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
