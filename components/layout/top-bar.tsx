"use client";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VCShield } from "@/components/vc-logo";
import { cn } from "@/lib/utils";

export function TopBar({ className }: { className?: string }) {
  return (
    <header className={cn("sticky top-0 z-40 bg-vc-red pt-safe", className)}>
      <div className="flex items-center justify-between h-14 px-4 max-w-2xl mx-auto">
        <Link href="/inicio" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
            <VCShield size={28} />
          </div>
          <div className="leading-none">
            <p className="text-white font-black text-sm tracking-tight">Villa Congreso</p>
            <p className="text-white/60 text-[10px] font-medium">Club Atlético</p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-full" />
          </button>
          <Link href="/perfil">
            <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-white/30">
              <AvatarImage src="" alt="Perfil" />
              <AvatarFallback className="bg-white/20 text-white text-xs font-semibold">MR</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
        {subtitle && <p className="text-sm text-white/60 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
