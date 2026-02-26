"use client"

import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"

const quotes = [
  {
    text: "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards.",
    author: "Gene Spafford",
  },
  {
    text: "Security is not a product, but a process.",
    author: "Bruce Schneier",
  },
  {
    text: "In the world of cybersecurity, the paranoid survive.",
    author: "Cybersecurity Proverb",
  },
]

export function QuoteSection() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={ref} className="relative px-6 py-20">
      <div
        className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <Quote className="mx-auto mb-6 h-8 w-8 text-primary/40" />
        <div className="relative min-h-[120px]">
          {quotes.map((quote, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                idx === currentQuote ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-lg italic leading-relaxed text-muted-foreground md:text-xl text-balance">
                {`"${quote.text}"`}
              </p>
              <p className="mt-4 font-mono text-sm text-primary">
                {"- "}{quote.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
