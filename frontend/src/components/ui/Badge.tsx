import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-display font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-white shadow-sm hover:bg-primary-dark",
        secondary: "border-transparent bg-ink text-white hover:bg-ink-soft",
        destructive: "border-transparent bg-red-500 text-white",
        outline: "border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary bg-transparent",
        success: "border-transparent bg-success-light text-success",
        warning: "border-transparent bg-warning-light text-warning",
        neutral: "border-transparent bg-neutral-100 text-neutral-600",
        glass: "border-white/20 bg-white/10 backdrop-blur-md text-white shadow-sm",
        "glass-dark": "border-black/5 bg-black/10 backdrop-blur-md text-ink shadow-sm",
        "glass-ink": "border-white/10 bg-ink/80 backdrop-blur-xl text-white shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
