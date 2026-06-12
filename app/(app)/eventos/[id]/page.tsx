import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Share2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, categoryBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockEventos } from "@/lib/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const evento = mockEventos.find(e => e.id === id);
  return { title: evento?.title ?? "Evento" };
}

export default async function EventoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const evento = mockEventos.find(e => e.id === id);
  if (!evento) notFound();

  const cuposDisp = evento.cupos ? evento.cupos - (evento.inscriptos ?? 0) : null;
  const pctFull = evento.cupos ? ((evento.inscriptos ?? 0) / evento.cupos) * 100 : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Link href="/eventos">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Button>
        </Link>
        <Button variant="ghost" size="icon-sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Header image */}
      <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-vc-blue to-vc-blue/60 flex flex-col items-center justify-center mb-5 p-5">
        <Badge variant="blue" className="bg-white/20 text-white border-0 mb-3">{evento.category}</Badge>
        <h1 className="text-2xl font-bold text-white text-center leading-tight">{evento.title}</h1>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <Card>
          <CardContent className="py-3.5 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-vc-blue shrink-0" />
            <div>
              <p className="text-[10px] text-[var(--muted)]">Fecha</p>
              <p className="text-sm font-semibold">{formatDate(evento.date, { day: "numeric", month: "short", year: "2-digit" })}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3.5 flex items-center gap-2">
            <Clock className="w-4 h-4 text-vc-blue shrink-0" />
            <div>
              <p className="text-[10px] text-[var(--muted)]">Horario</p>
              <p className="text-sm font-semibold">{evento.time} hs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent className="py-3.5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-vc-blue shrink-0" />
            <div>
              <p className="text-[10px] text-[var(--muted)]">Lugar</p>
              <p className="text-sm font-semibold">{evento.location}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card className="mb-4">
        <CardContent className="py-4">
          <h2 className="font-semibold mb-2">Descripción</h2>
          <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{evento.description}</p>
        </CardContent>
      </Card>

      {/* Cupos */}
      {evento.cupos && (
        <Card className="mb-5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-vc-blue" />
                <span className="font-semibold text-sm">Inscripciones</span>
              </div>
              <span className="text-sm text-[var(--muted)]">{evento.inscriptos}/{evento.cupos}</span>
            </div>
            <div className="h-2 bg-[var(--surface-2)] rounded-full overflow-hidden mb-1.5">
              <div
                className={`h-full rounded-full ${pctFull > 80 ? "bg-vc-red" : "bg-green-500"}`}
                style={{ width: `${pctFull}%` }}
              />
            </div>
            <p className="text-xs text-[var(--muted)]">{cuposDisp} cupos disponibles</p>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      {evento.confirmed ? (
        <div className="flex items-center justify-center gap-2 py-4 px-5 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 font-semibold">
          <CheckCircle2 className="w-5 h-5" />
          Ya confirmaste tu asistencia
        </div>
      ) : (
        <Button size="lg" className="w-full">
          <CheckCircle2 className="w-4 h-4" />
          Confirmar asistencia
        </Button>
      )}
    </div>
  );
}
