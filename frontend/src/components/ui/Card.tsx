import React from "react";
import { cn } from "../../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  clickable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, clickable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-neutral-200 bg-white text-neutral-950 shadow-sm transition-all duration-300",
        clickable && "hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
