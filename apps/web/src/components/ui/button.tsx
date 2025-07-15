import * as React from "react"
import { Slot as SlotPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        outline: "",
        secondary: "",
        ghost: "",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? SlotPrimitive.Slot : "button"

  const getVariantStyles = () => {
    switch (variant) {
      case "default":
        return {
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
          "--hover-bg": "var(--primary-hover, var(--primary))",
          "--focus-ring": "var(--ring)",
        }
      case "destructive":
        return {
          backgroundColor: "var(--destructive)",
          color: "var(--destructive-foreground)",
          "--hover-bg": "var(--destructive-hover, var(--destructive))",
          "--focus-ring": "var(--destructive)",
        }
      case "outline":
        return {
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          borderColor: "var(--border)",
          "--hover-bg": "var(--accent)",
          "--hover-color": "var(--accent-foreground)",
          "--focus-ring": "var(--ring)",
        }
      case "secondary":
        return {
          backgroundColor: "var(--secondary)",
          color: "var(--secondary-foreground)",
          "--hover-bg": "var(--secondary-hover, var(--secondary))",
          "--focus-ring": "var(--ring)",
        }
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: "var(--foreground)",
          "--hover-bg": "var(--accent)",
          "--hover-color": "var(--accent-foreground)",
          "--focus-ring": "var(--ring)",
        }
      case "link":
        return {
          backgroundColor: "transparent",
          color: "var(--primary)",
          "--focus-ring": "var(--ring)",
        }
      default:
        return {
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
          "--focus-ring": "var(--ring)",
        }
    }
  }

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        variant === "outline" && "border",
        "shadow-sm transition-all duration-200 hover:opacity-90"
      )}
      style={getVariantStyles()}
      {...props}
    />
  )
}

export { Button, buttonVariants }
