"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Megaphone, Calendar, Trophy, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/avisos", label: "Avisos", icon: Megaphone },
  { href: "/calendario", label: "Agenda", icon: Calendar },
  { href: "/inicio", label: "Inicio", icon: Home },
  { href: "/eventos", label: "Eventos", icon: Trophy },
  { href: "/cuotas", label: "Cuotas", icon: CreditCard },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e3e7ef] pb-safe">
      <div className="flex h-16 items-center justify-around max-w-lg mx-auto px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 min-w-0 flex-1 py-1 rounded-xl transition-colors",
                active ? "text-vc-red" : "text-[#9399ab]"
              )}
            >
              <Icon className={cn("w-5 h-5 transition-transform", active && "scale-110")} strokeWidth={active ? 2.5 : 2} />
              <span className={cn("text-[10px] font-medium truncate", active ? "font-semibold" : "")}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
