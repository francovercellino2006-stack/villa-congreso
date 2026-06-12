import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Users, ChevronRight, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, categoryBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/top-bar";
import { mockEventos } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Eventos" };

export default function EventosPage() {
  return (
    <div>
      <PageHeader title="Eventos" subtitle="No te perdas nada" />

      <div className="space-y-3">
        {mockEventos.map(evento => {
          const fecha = new Date(evento.date + "T00:00:00");
          const day = fecha.getDate();
          const month = fecha.toLocaleDateString("es-AR", { month: "short" });
          const cuposDisp = evento.cupos ? evento.cupos - (evento.inscriptos ?? 0) : null;
          const pctFull = evento.cupos ? ((evento.inscriptos ?? 0) / evento.cupos) * 100 : 0;

          return (
            <Link key={evento.id} href={`/eventos/${evento.id}`}>
              <Card className="hover:shadow-[var(--shadow)] transition-shadow cursor-pointer overflow-hidden">
                <CardContent className="py-4 flex gap-4">
                  {/* Date badge */}
                  <div className="flex flex-col items-center justify-center w-12 h-14 rounded-xl bg-vc-blue/10 shrink-0">
                    <span className="text-xl font-bold text-vc-blue leading-none">{day}</span>
                    <span className="text-xs text-vc-blue font-medium uppercase">{month}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <Badge variant={categoryBadgeVariant(evento.category)} className="text-[10px]">{evento.category}</Badge>
                      {evento.confirmed && <Badge variant="green" className="text-[10px]">Confirmado</Badge>}
                    </div>
                    <h3 className="font-semibold text-sm leading-snug mb-1.5">{evento.title}</h3>

                    <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evento.time} hs</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{evento.location}</span>
                    </div>

                    {evento.cupos && (
                      <div className="mt-2">
                        <div className="flex justify-between text-[10px] text-[var(--muted)] mb-1">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {evento.inscriptos}/{evento.cupos} inscriptos
                          </span>
                          <span>{cuposDisp} lugares libres</span>
                        </div>
                        <div className="h-1 bg-[var(--surface-2)] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${pctFull > 80 ? "bg-vc-red" : "bg-green-500"}`}
                            style={{ width: `${pctFull}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0 mt-1" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
