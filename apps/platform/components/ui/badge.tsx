import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Chip del design system: mono mayúscula, esquinas chicas. Las variantes
 * success / warning / info / destructive se usan para estados operativos
 * (ver components/brand/status-badge.tsx).
 */
const badgeVariants = cva(
  "group/badge label inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-sm border border-transparent px-2 text-[0.625rem] whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-brand",
        secondary: "bg-foreground/[0.07] text-foreground/75 [a]:hover:bg-foreground/[0.12]",
        outline: "border-foreground/15 text-foreground/75 [a]:hover:border-foreground",
        brand: "bg-brand/12 text-brand",
        info: "bg-info/12 text-info",
        success: "bg-success/12 text-success",
        warning: "bg-warning/14 text-warning",
        destructive: "bg-destructive/10 text-destructive",
        ghost: "text-foreground/60 hover:bg-foreground/5",
        link: "text-brand underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
