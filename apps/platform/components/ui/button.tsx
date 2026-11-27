import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Botón del design system (estilo Cargo+): etiqueta mono en mayúscula, plano,
 * esquinas chicas y hover al color de marca. Un ícono con `data-icon="inline-end"`
 * se desplaza en diagonal al pasar el mouse (como las flechas del sitio).
 */
const buttonVariants = cva(
  "group/button label inline-flex shrink-0 items-center justify-center rounded-md border border-transparent whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 active:not-aria-[haspopup]:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&_svg[data-icon=inline-end]]:transition-transform [&_svg[data-icon=inline-end]]:duration-200 hover:[&_svg[data-icon=inline-end]]:translate-x-0.5 hover:[&_svg[data-icon=inline-end]]:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-brand hover:text-brand-foreground",
        brand: "bg-brand text-brand-foreground hover:bg-primary hover:text-primary-foreground",
        outline:
          "border-foreground/20 bg-transparent hover:border-foreground hover:bg-foreground hover:text-background aria-expanded:bg-foreground aria-expanded:text-background",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-foreground hover:text-background aria-expanded:bg-foreground aria-expanded:text-background",
        ghost:
          "text-foreground/70 hover:bg-foreground/5 hover:text-foreground aria-expanded:bg-foreground/5 aria-expanded:text-foreground",
        destructive:
          "bg-destructive text-white hover:bg-destructive/85 focus-visible:ring-destructive/30",
        link: "h-auto! px-0! normal-case tracking-normal font-sans text-sm text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground",
      },
      size: {
        default: "h-9 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-6 gap-1 px-2 text-[0.625rem] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        // Para el operario en el celular: objetivos táctiles de 44px.
        lg: "h-11 gap-2 px-5 text-xs has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11 [&_svg:not([class*='size-'])]:size-4",
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
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
