import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
  
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground", 
    destructive: "border-transparent bg-destructive text-destructive-foreground",
    outline: "text-foreground border-border"
  }

  return (
    <div 
      className={cn(baseStyles, variants[variant], className)} 
      style={{
        backgroundColor: variant === "default" ? "var(--primary)" :
                        variant === "secondary" ? "var(--secondary)" :
                        variant === "destructive" ? "var(--destructive)" : "transparent",
        color: variant === "default" ? "var(--primary-foreground)" :
               variant === "secondary" ? "var(--secondary-foreground)" :
               variant === "destructive" ? "var(--destructive-foreground)" :
               "var(--foreground)",
        borderColor: variant === "outline" ? "var(--border)" : "transparent"
      }}
      {...props} 
    />
  )
}

export { Badge }
