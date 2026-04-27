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
        "rounded-rent border border-neutral-200 bg-white text-neutral-950 shadow-sm",
        clickable && "transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
