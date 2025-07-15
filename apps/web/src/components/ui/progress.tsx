import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full",
        className
      )}
      style={{
        backgroundColor: "var(--muted)"
      }}
      {...props}
    >
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{ 
          width: `${Math.min(100, Math.max(0, value))}%`,
          backgroundColor: "var(--primary)"
        }}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }
