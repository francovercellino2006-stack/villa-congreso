import * as React from "react";
import { cn } from "@/lib/utils";

// Cards scope CSS vars to dark text so they read correctly on the red page background
const cardVars = {
  "--fg": "#0d1117",
  "--muted": "#6b7280",
  "--fg-secondary": "#4b5568",
  "--border": "#e3e7ef",
  "--surface-2": "#f0f2f7",
} as React.CSSProperties;

export function Card({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white border border-[#e3e7ef] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] text-[#0d1117]",
        className
      )}
      style={{ ...cardVars, ...style }}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-start justify-between gap-3 p-5 pb-0", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-semibold text-base leading-tight text-[#0d1117]", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-[#6b7280]", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-2 px-5 pb-5 pt-0", className)} {...props} />;
}
