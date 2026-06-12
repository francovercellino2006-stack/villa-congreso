import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--surface-2)] text-[var(--fg)]",
        blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
        outline: "border border-[var(--border)] text-[var(--fg)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export function categoryBadgeVariant(category: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    "Fútbol": "blue",
    "Básquet": "purple",
    "Hockey": "green",
    "Eventos": "yellow",
    "Institucional": "default",
    "Cuotas": "red",
    "Comunicados": "outline",
  };
  return map[category] ?? "default";
}
