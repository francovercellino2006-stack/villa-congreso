"use client";
import Image from "next/image";
import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "./LogoutButton";

export function AdminAccount() {
  return (
    <div className="animate-fade-in space-y-4">
      <Card className="overflow-hidden border-0 shadow-[0_4px_20px_0_rgb(21_128_61/0.12)]">
        <div className="h-20 bg-gradient-to-br from-[#15803D] via-[#0F6B30] to-[#052E16]" />
        <CardContent className="pt-0 -mt-10 pb-5">
          <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg mb-3">
            <AvatarFallback className="bg-[#15803D] text-white text-xl font-black">
              <Shield className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-black text-[#0D1117]">Administrador</h1>
          <p className="text-sm text-[#566070] mt-0.5">Panel de gestión del club</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-bold text-white bg-[#15803D] px-2.5 py-1 rounded-full">
              Admin
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4">
          <p className="text-[10px] font-bold text-[#566070] uppercase tracking-wider mb-3">Accesos rápidos</p>
          <div className="space-y-2">
            <a href="/admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F4F6FA] transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#15803D]/8 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#15803D]" />
              </div>
              <span className="text-sm font-semibold text-[#0D1117]">Ir al panel de administración</span>
            </a>
          </div>
        </CardContent>
      </Card>

      <LogoutButton />
    </div>
  );
}
