import type { Metadata } from "next";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, categoryBadgeVariant } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/top-bar";
import { mockEventos, mockPartidos } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Calendario" };

type CalendarItem =
  | { type: "evento"; date: string; id: string; title: string; time: string; location: string; category: string }
  | { type: "partido"; date: string; id: string; local: string; visitante: string; hora: string; lugar: string; deporte: string; categoria: string };

export default function CalendarioPage() {
  const items: CalendarItem[] = [
    ...mockEventos.map(e => ({ type: "evento" as const, ...e })),
    ...mockPartidos.map(p => ({ type: "partido" as const, ...p, date: p.fecha })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  // Group by date
  const grouped = items.reduce<Record<string, CalendarItem[]>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader title="Agenda" subtitle="Partidos, torneos y eventos" />

      <div className="space-y-5">
        {Object.entries(grouped).map(([date, dayItems]) => {
          const d = new Date(date + "T00:00:00");
          const isToday = new Date().toDateString() === d.toDateString();
          return (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3 sticky top-[57px] bg-[var(--bg)] py-1 z-10">
                <div className={`flex flex-col items-center w-10 h-10 rounded-lg justify-center shrink-0 ${isToday ? "bg-vc-blue" : "bg-[var(--surface-2)]"}`}>
                  <span className={`text-base font-bold leading-none ${isToday ? "text-white" : ""}`}>{d.getDate()}</span>
                  <span className={`text-[9px] font-medium uppercase leading-none mt-0.5 ${isToday ? "text-white/80" : "text-[var(--muted)]"}`}>
                    {d.toLocaleDateString("es-AR", { month: "short" })}
                  </span>
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isToday ? "text-vc-blue" : ""}`}>
                    {isToday ? "Hoy" : d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}
                  </p>
                </div>
              </div>

              <div className="space-y-2 ml-12">
                {dayItems.map(item => (
                  <Card key={`${item.type}-${item.id}`}>
                    <CardContent className="py-3 flex items-start gap-3">
                      <div className={`w-1.5 h-full min-h-10 rounded-full self-stretch shrink-0 ${item.type === "partido" ? "bg-vc-red" : "bg-vc-blue"}`} />
                      <div className="flex-1 min-w-0">
                        {item.type === "evento" ? (
                          <>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Badge variant={categoryBadgeVariant(item.category)} className="text-[10px] px-1.5 py-0">{item.category}</Badge>
                            </div>
                            <p className="text-sm font-semibold">{item.title}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-[var(--muted)]">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.time}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Badge variant="red" className="text-[10px] px-1.5 py-0">Partido</Badge>
                              <span className="text-[10px] text-[var(--muted)]">{item.deporte} · {item.categoria}</span>
                            </div>
                            <p className="text-sm font-semibold">{item.local} vs {item.visitante}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-[var(--muted)]">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.hora}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.lugar}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
