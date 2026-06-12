"use client";
import { useState } from "react";
import Link from "next/link";
import { Pin, ChevronDown, ChevronUp, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/layout/top-bar";
import { mockAvisos, mockProfesores, type AvisoTipo } from "@/lib/mock-data";

const deportes = ["Todos", "Fútbol", "Básquet", "Hockey", "Patín", "Gimnasia"];

const tipoCfg: Record<AvisoTipo, { label: string; color: string }> = {
  general:      { label: "General",      color: "bg-[var(--surface-2)] text-[var(--fg)]" },
  suspensión:   { label: "Suspendido",   color: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" },
  recordatorio: { label: "Recordatorio", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400" },
  resultado:    { label: "Resultado",    color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" },
  convocatoria: { label: "Convocatoria", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" },
};

const deporteColor: Record<string, string> = {
  "Fútbol":   "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  "Básquet":  "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  "Hockey":   "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  "Patín":    "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
  "Gimnasia": "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
};

function formatRelative(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "ayer";
  return `hace ${days} días`;
}

function AvisoCard({ aviso }: { aviso: typeof mockAvisos[0] }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = tipoCfg[aviso.tipo];
  const short = aviso.contenido.length > 140;
  const texto = !short || expanded ? aviso.contenido : aviso.contenido.slice(0, 140) + "…";
  const profe = mockProfesores.find(p => p.id === aviso.profesorId);

  return (
    <Card className={aviso.fijado ? "border-vc-blue/40" : ""}>
      {aviso.fijado && <div className="h-0.5 bg-vc-blue rounded-t-[14px]" />}
      <CardContent className="py-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-9 h-9 shrink-0">
            <AvatarFallback className="text-xs">{profe?.initials ?? "??"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-semibold">{aviso.profesorName}</span>
              {aviso.fijado && <Pin className="w-3 h-3 text-vc-blue shrink-0" />}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${deporteColor[aviso.deporte] ?? ""}`}>
                {aviso.deporte}
              </span>
              <span className="text-[10px] text-[var(--muted)]">·</span>
              <span className="text-[10px] text-[var(--muted)]">{aviso.categoria}</span>
              <span className="text-[10px] text-[var(--muted)]">·</span>
              <span className="text-[10px] text-[var(--muted)]">{formatRelative(aviso.fecha)}</span>
            </div>
          </div>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${cfg.color}`}>
            {cfg.label}
          </span>
        </div>

        {/* Content */}
        <p className="text-sm font-semibold mb-1.5">{aviso.titulo}</p>
        <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{texto}</p>
        {short && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-1 text-xs text-vc-blue font-medium mt-2"
          >
            {expanded ? <><ChevronUp className="w-3 h-3" /> Ver menos</> : <><ChevronDown className="w-3 h-3" /> Ver más</>}
          </button>
        )}
      </CardContent>
    </Card>
  );
}

export default function AvisosPage() {
  const [filtro, setFiltro] = useState("Todos");

  const filtrados = mockAvisos
    .filter(a => filtro === "Todos" || a.deporte === filtro)
    .sort((a, b) => {
      if (a.fijado !== b.fijado) return a.fijado ? -1 : 1;
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });

  return (
    <div>
      <PageHeader
        title="Avisos"
        subtitle="Lo que publicaron los profes"
        action={
          <Link
            href="/mi-panel"
            className="flex items-center gap-1.5 bg-vc-blue text-white text-xs font-semibold px-3 h-8 rounded-full hover:bg-vc-blue-hover transition-colors"
          >
            <Megaphone className="w-3.5 h-3.5" /> Mi panel
          </Link>
        }
      />

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
        {deportes.map(d => (
          <button
            key={d}
            onClick={() => setFiltro(d)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filtro === d
                ? "bg-vc-blue text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Feed */}
      {filtrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Megaphone className="w-10 h-10 text-[var(--muted)] mb-3" />
          <p className="text-sm font-medium">Acá no hay nada todavía</p>
          <p className="text-xs text-[var(--muted)] mt-1">Cuando los profes publiquen algo, va a aparecer acá.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtrados.map(aviso => (
            <AvisoCard key={aviso.id} aviso={aviso} />
          ))}
        </div>
      )}
    </div>
  );
}
