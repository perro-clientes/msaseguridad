import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full px-3 py-2.5 text-base placeholder:text-foreground/35 md:text-sm rounded-md border border-transparent bg-foreground/[0.05] transition-colors outline-none hover:bg-foreground/[0.07] focus-visible:border-foreground focus-visible:bg-card disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:bg-card",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
