import type { Metadata } from "next";
import Link from "next/link";
import {
  Newspaper, Calendar, Trophy, CreditCard, Clock, Users,
  ChevronRight, TrendingUp, AlertCircle, CheckCircle2, Megaphone
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, categoryBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockUser, mockNoticias, mockEventos, mockCuotas, mockPartidos, mockAvisos, mockProfesores, type AvisoTipo } from "@/lib/mock-data";
import { formatDate, formatShortDate, formatCurrency, getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Inicio" };

const quickLinks = [
  { href: "/noticias", label: "Noticias", icon: Newspaper, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  { href: "/avisos", label: "Avisos", icon: Megaphone, color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" },
  { href: "/horarios", label: "Horarios", icon: Clock, color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
  { href: "/cuotas", label: "Cuotas", icon: CreditCard, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
  { href: "/calendario", label: "Agenda", icon: Calendar, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
  { href: "/perfil", label: "Mi Perfil", icon: Users, color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400" },
];

const tipoCfg: Record<AvisoTipo, { label: string; color: string }> = {
  general:      { label: "General",      color: "bg-[var(--surface-2)] text-[var(--fg)]" },
  suspensión:   { label: "Suspendido",   color: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" },
  recordatorio: { label: "Recordatorio", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400" },
  resultado:    { label: "Resultado",    color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" },
  convocatoria: { label: "Convocatoria", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" },
};

function CuotaStatusCard() {
  const status = mockCuotas.status;
  const pendiente = mockCuotas.historial.find(c => c.estado === "pendiente");

  const colors = {
    "al-dia":    { bg: "bg-green-50 border-green-200",  icon: CheckCircle2, iconColor: "text-green-600", label: "Estás al día con la cuota ✓" },
    "por-vencer":{ bg: "bg-yellow-50 border-yellow-200",icon: AlertCircle,  iconColor: "text-yellow-600",label: "La cuota está por vencer" },
    "deuda":     { bg: "bg-red-50 border-red-200",      icon: AlertCircle,  iconColor: "text-red-600",   label: "Tenés una cuota sin pagar" },
  };

  const cfg = colors[status];
  const Icon = cfg.icon;

  return (
    <Link href="/cuotas">
      <Card className={`${cfg.bg} cursor-pointer hover:opacity-90 transition-opacity`}>
        <CardContent className="flex items-center gap-3 py-4">
          <Icon className={`w-5 h-5 shrink-0 ${cfg.iconColor}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{cfg.label}</p>
            {pendiente && (
              <p className="text-xs text-[var(--muted)]">
                {pendiente.mes} · Vence {formatDate(pendiente.vencimiento, { day: "numeric", month: "long" })}
              </p>
            )}
          </div>
          {pendiente && (
            <p className="text-sm font-bold text-vc-blue shrink-0">{formatCurrency(pendiente.monto)}</p>
          )}
          <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0" />
        </CardContent>
      </Card>
    </Link>
  );
}

export default function InicioPage() {
  const proximoEvento = mockEventos[0];
  const proximoPartido = mockPartidos[0];
  const noticiaDestacada = mockNoticias.find(n => n.pinned) ?? mockNoticias[0];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <p className="text-sm text-white/60">¡Hola,</p>
        <h1 className="text-2xl font-bold tracking-tight">{mockUser.name.split(" ")[0]}! 👋</h1>
      </div>

      {/* Cuota status */}
      <CuotaStatusCard />

      {/* Quick links */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">¿Qué querés ver?</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickLinks.map(({ href, label, icon: Icon, color }) => (
            <Link key={href} href={href}>
              <Card className="hover:shadow-[var(--shadow)] transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center gap-2 py-4 px-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">{label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Próximos partidos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">¡A la cancha!</h2>
          <Link href="/calendario" className="text-xs text-white/70 font-medium">Ver todo</Link>
        </div>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col items-center gap-0.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-vc-blue flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VC</span>
                </div>
                <span className="text-xs font-semibold truncate max-w-20 text-center">{proximoPartido.local.replace("Villa Congreso", "Villa C.")}</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-[var(--muted)]">{proximoPartido.categoria}</span>
                <div className="bg-[var(--surface-2)] rounded-lg px-3 py-1.5">
                  <span className="text-base font-bold">VS</span>
                </div>
                <span className="text-xs text-[var(--muted)]">{formatShortDate(proximoPartido.fecha)} · {proximoPartido.hora}</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center">
                  <span className="text-xs font-bold">{proximoPartido.visitante.split(" ").map(w => w[0]).slice(0,2).join("")}</span>
                </div>
                <span className="text-xs font-semibold truncate max-w-20 text-center">{proximoPartido.visitante}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Última novedad destacada */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Lo nuevo</h2>
          <Link href="/noticias" className="text-xs text-white/70 font-medium">Ver todo</Link>
        </div>
        <Link href={`/noticias/${noticiaDestacada.id}`}>
          <Card className="hover:shadow-[var(--shadow)] transition-shadow cursor-pointer">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vc-blue to-vc-blue/60 flex items-center justify-center shrink-0">
                  <Newspaper className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={categoryBadgeVariant(noticiaDestacada.category)}>{noticiaDestacada.category}</Badge>
                    <span className="text-xs text-[var(--muted)]">{formatShortDate(noticiaDestacada.date)}</span>
                  </div>
                  <p className="font-semibold text-sm leading-snug line-clamp-2">{noticiaDestacada.title}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0 mt-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Próximo evento */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">No te lo pierdas</h2>
          <Link href="/eventos" className="text-xs text-white/70 font-medium">Ver todo</Link>
        </div>
        <Link href={`/eventos/${proximoEvento.id}`}>
          <Card className="hover:shadow-[var(--shadow)] transition-shadow cursor-pointer overflow-hidden">
            <div className="bg-gradient-to-r from-vc-blue to-vc-blue/80 p-4">
              <Badge variant="blue" className="bg-white/20 text-white border-0 mb-2">{proximoEvento.category}</Badge>
              <h3 className="text-white font-bold text-lg leading-tight">{proximoEvento.title}</h3>
              <p className="text-white/70 text-sm mt-1">
                {formatDate(proximoEvento.date, { weekday: "long", day: "numeric", month: "long" })} · {proximoEvento.time}
              </p>
            </div>
            <CardContent className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
                <Calendar className="w-4 h-4" />
                <span>{proximoEvento.location}</span>
              </div>
              {proximoEvento.cupos && (
                <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                  <Users className="w-3.5 h-3.5" />
                  <span>{proximoEvento.inscriptos}/{proximoEvento.cupos}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent news */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Y también...</h2>
        </div>
        <div className="space-y-2">
          {mockNoticias.slice(1, 4).map(noticia => (
            <Link key={noticia.id} href={`/noticias/${noticia.id}`}>
              <Card className="hover:shadow-[var(--shadow)] transition-shadow cursor-pointer">
                <CardContent className="py-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge variant={categoryBadgeVariant(noticia.category)} className="text-[10px] px-1.5 py-0">{noticia.category}</Badge>
                      <span className="text-[10px] text-[var(--muted)]">{formatShortDate(noticia.date)}</span>
                    </div>
                    <p className="text-sm font-medium leading-snug line-clamp-1">{noticia.title}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Avisos recientes de profes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Los profes avisaron</h2>
          <Link href="/avisos" className="text-xs text-white/70 font-medium">Ver todo</Link>
        </div>
        <div className="space-y-2">
          {mockAvisos.slice(0, 3).map(aviso => {
            const profe = mockProfesores.find(p => p.id === aviso.profesorId);
            const cfg = tipoCfg[aviso.tipo];
            return (
              <Link key={aviso.id} href="/avisos">
                <Card className="hover:shadow-[var(--shadow)] transition-shadow cursor-pointer">
                  <CardContent className="py-3 flex items-start gap-3">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className="text-xs">{profe?.initials ?? "??"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                        <span className="text-[10px] font-semibold">{aviso.profesorName}</span>
                        <span className="text-[10px] text-[var(--muted)]">·</span>
                        <span className={`text-[10px] font-medium px-1.5 py-0 rounded-full ${cfg.color}`}>{cfg.label}</span>
                      </div>
                      <p className="text-sm font-medium leading-snug line-clamp-1">{aviso.titulo}</p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{aviso.deporte} · {aviso.categoria}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0 mt-0.5" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
