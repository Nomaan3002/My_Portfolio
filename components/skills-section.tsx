"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, ShieldCheck, Wrench, Cloud } from "lucide-react"

interface SkillBarProps {
  label: string
  delay: number
  isVisible: boolean
}

function SkillBar({ label, delay, isVisible }: SkillBarProps) {
  const randomWidth = 70 + Math.floor(label.length * 1.5 % 25)
  return (
    <div
      className="transition-all duration-700"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm text-foreground">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{randomWidth}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${randomWidth}%` : "0%",
            transitionDelay: `${delay + 200}ms`,
          }}
        />
      </div>
    </div>
  )
}

const skillCategories = [
  {
    title: "Networking",
    icon: Code2,
    skills: ["TCP/IP", "Subnetting", "Static & Dynamic Routing", "VLAN & Trunking", "Network Topology Design"],
  },
  {
    title: "Security",
    icon: ShieldCheck,
    skills: ["Firewall Configuration (ASA)", "Network Segmentation", "Basic SIEM Concepts", "Log Analysis", "Incident Response Fundamentals"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["EVE-NG", "Cisco Packet Tracer", "GNS3", "Wireshark"],
  },
  {
    title: "Cloud Exposure",
    icon: Cloud,
    skills: ["Microsoft Azure (SOC Lab Practice)"],
  },
]

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-12 flex items-center gap-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Code2 className="h-5 w-5 text-primary" />
          <h2 className="font-mono text-sm tracking-widest text-primary uppercase">
            Skills & Expertise
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((cat, catIdx) => (
            <div
              key={cat.title}
              className={`glass rounded-2xl p-6 transition-all duration-700 md:p-8 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${catIdx * 150}ms` }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-col gap-4">
                {cat.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skill}
                    label={skill}
                    delay={catIdx * 150 + skillIdx * 100}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
