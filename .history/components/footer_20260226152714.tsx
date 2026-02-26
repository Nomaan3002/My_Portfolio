import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          {/* <Shield className="h-4 w-4 text-primary" /> */}
          <span className="font-mono text-xs">
            Shaik Mohammed Nomaan Ahmed
          </span>
        </div>
        <p className="text-center font-mono text-xs text-muted-foreground">
          Building Secure Networks. Protecting Digital Futures.
        </p>
      </div>
    </footer>
  )
}
