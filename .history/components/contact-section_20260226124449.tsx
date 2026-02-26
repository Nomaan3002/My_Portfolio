"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, MapPin, Linkedin, Send } from "lucide-react"

export function ContactSection() {
const [isVisible, setIsVisible] = useState(false)
const ref = useRef<HTMLElement>(null)
const [loading, setLoading] = useState(false)
// const [status, setStatus] = useState("")
const [formStatus, setFormStatus] = useState<"" | "success" | "error" >("")

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)
  setFormStatus("")

  const formData = new FormData(e.target as HTMLFormElement)

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/Nomaan03atwork@gmail.com",
      {
        method: "POST",
        body: formData,
      }
    )

    if (response.ok) {
      setFormStatus("success")
      (e.target as HTMLFormElement).reset()
    } else {
      setFormStatus("error")
    }
  } catch {
    setFormStatus("error")
  }

  setLoading(false)
}

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
    <section id="contact" ref={ref} className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div
          className={`mb-12 flex items-center gap-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Mail className="h-5 w-5 text-primary" />
          <h2 className="font-mono text-sm tracking-widest text-primary uppercase">
            Get in Touch
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Info */}
          <div
            className={`glass rounded-2xl p-8 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="mb-6 text-xl font-semibold text-foreground">
              {"Let's Connect"}
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              {"I'm always open to discussing network engineering, cybersecurity, or new opportunities. Feel free to reach out."}
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">Hyderabad, India</p>
                </div>
              </div>

              <a
                // href="https://linkedin.com"
                href="https://www.linkedin.com/in/nomaan-ahmed-990960298/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg transition-colors hover:bg-secondary/50 -mx-2 px-2 py-2"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Linkedin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">LinkedIn</p>
                  <p className="text-sm font-medium text-primary">Connect with me</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`glass rounded-2xl p-8 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}> */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* <form
              action="https://formsubmit.co/Nomaan03atwork@gmail.com"
              method="POST"
              className="flex flex-col gap-5"
            > */}
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Your message..."
                  className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              {/* Hidden fields – yahin add karo */}
<input type="hidden" name="_subject" value="New Portfolio Message!" />
<input type="hidden" name="_captcha" value="false" />
<input type="hidden" name="_template" value="table" />

<button
  type="submit"
  disabled={loading}
  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
>
  {loading ? "Sending..." : "Send Message"}
</button>
{formStatus === "success" && (
  <p className="text-sm text-green-500">
    Message sent successfully!
  </p>
)}

{formStatus === "error" && (
  <p className="text-sm text-red-500">
    Something went wrong. Please try again.
  </p>
)}

              {/* <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
