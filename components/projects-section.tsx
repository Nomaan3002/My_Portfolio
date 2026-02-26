"use client"

import { useEffect, useRef, useState } from "react"
import { FolderGit2, Server, ShieldCheck } from "lucide-react"

const projects = [
  {
    title: "ASA Firewall LAN-to-DMZ Secure Access Lab",
    icon: ShieldCheck,
    description: [
      "Implemented controlled communication between internal LAN and DMZ network.",
      "Enforced access policies through firewall rules.",
    ],
    tags: ["Cisco ASA", "Firewall", "DMZ", "Access Control"],
  },
  {
    title: "Multi-Router Enterprise Network Simulation",
    icon: Server,
    description: [
      "Built and configured 5-router topology.",
      "Implemented static routing and IP planning.",
      "Simulated enterprise-level network environment.",
    ],
    tags: ["Routing", "Enterprise", "Network Design", "IP Planning"],
  },
]

export function ProjectsSection() {
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
    <section id="projects" ref={ref} className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-12 flex items-center gap-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <FolderGit2 className="h-5 w-5 text-primary" />
          <h2 className="font-mono text-sm tracking-widest text-primary uppercase">
            Projects
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`glass group rounded-2xl p-8 transition-all duration-700 hover:border-primary/30 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <project.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              </div>

              <ul className="mb-6 flex flex-col gap-2">
                {project.description.map((desc, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-3">
                    <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
