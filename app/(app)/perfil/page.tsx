import type { Metadata } from "next";
import { Shield, Trophy, Dumbbell, Mail, Phone, Calendar, Settings, LogOut, ChevronRight, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/layout/top-bar";
import { mockUser, mockCuotas } from "@/lib/mock-data";
import { formatDate, getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Mi Perfil" };

export default function PerfilPage() {
  return (
    <div>
      <PageHeader title="Mi perfil" />

      {/* Profile header */}
      <Card className="mb-4 overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-vc-blue to-vc-blue/70" />
        <CardContent className="pt-0 -mt-10 pb-5">
          <div className="flex items-end justify-between mb-4">
            <Avatar className="w-20 h-20 ring-4 ring-[var(--surface)] ring-offset-0">
              <AvatarImage src="" alt={mockUser.name} />
              <AvatarFallback className="text-xl">{getInitials(mockUser.name)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Editar</Button>
          </div>
          <h2 className="text-xl font-bold">{mockUser.name}</h2>
          <p className="text-sm text-[var(--muted)]">Nº Socio: {mockUser.socioNumber}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="blue">{mockUser.category}</Badge>
            {mockUser.sports.map(s => (
              <Badge key={s} variant="default">{s}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member card */}
      <Card className="mb-4 bg-gradient-to-br from-vc-blue via-vc-blue/90 to-vc-blue/70 border-0">
        <CardContent className="py-5">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/60 text-xs">Club Atlético</p>
              <p className="text-white font-bold text-lg leading-tight">Villa Congreso</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-white font-black text-sm">VC</span>
            </div>
          </div>
          <p className="text-white font-bold text-xl tracking-wider mb-1">{mockUser.name}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-[10px] uppercase">Socio</p>
              <p className="text-white font-semibold">#{mockUser.socioNumber}</p>
            </div>
            <div>
              <p className="text-white/60 text-[10px] uppercase">Miembro desde</p>
              <p className="text-white font-semibold">{formatDate(mockUser.joinedAt, { year: "numeric", month: "long" })}</p>
            </div>
            <div>
              <p className="text-white/60 text-[10px] uppercase">Estado</p>
              <p className="text-green-300 font-semibold">Al día ✓</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings links */}
      <Card className="mb-4">
        <CardContent className="py-0 divide-y divide-[var(--border)]">
          {[
            { icon: CreditCard, label: "Mis cuotas", href: "/cuotas" },
            { icon: Trophy, label: "Mis eventos", href: "/eventos" },
            { icon: Settings, label: "Ajustes", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} className="flex items-center gap-3 py-4 hover:bg-[var(--surface-2)] transition-colors -mx-5 px-5">
              <Icon className="w-5 h-5 text-[var(--muted)]" />
              <span className="text-sm font-medium flex-1">{label}</span>
              <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
            </a>
          ))}
        </CardContent>
      </Card>

      <Button variant="ghost" className="w-full text-danger justify-start gap-2">
        <LogOut className="w-4 h-4" /> Salir de la app
      </Button>
    </div>
  );
}
