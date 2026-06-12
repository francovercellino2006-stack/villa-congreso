import type { Metadata } from "next";
import { MapPin, User, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/top-bar";
import { mockHorarios } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Horarios" };

const deportes = ["Todos", "Fútbol", "Básquet", "Hockey", "Patín", "Gimnasia"];

const colorMap: Record<string, string> = {
  "Fútbol": "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  "Básquet": "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  "Hockey": "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  "Patín": "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
  "Gimnasia": "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
};

export default function HorariosPage() {
  const grouped = mockHorarios.reduce<Record<string, typeof mockHorarios>>((acc, h) => {
    if (!acc[h.deporte]) acc[h.deporte] = [];
    acc[h.deporte].push(h);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader title="Horarios" subtitle="¿Cuándo entrenás?" />

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4 scrollbar-none">
        {deportes.map((d, i) => (
          <button
            key={d}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              i === 0
                ? "bg-vc-blue text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* By sport */}
      <div className="space-y-5">
        {Object.entries(grouped).map(([deporte, horarios]) => (
          <div key={deporte}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${colorMap[deporte]?.split(" ")[0].replace("100", "500") ?? "bg-gray-400"}`} />
              <h2 className="font-semibold text-sm">{deporte}</h2>
              <span className="text-xs text-[var(--muted)]">({horarios.length} actividades)</span>
            </div>
            <div className="space-y-2">
              {horarios.map(h => (
                <Card key={h.id}>
                  <CardContent className="py-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorMap[h.deporte] ?? "bg-gray-100 text-gray-600"}`}>
                            {h.categoria}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mt-1.5">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-medium text-[var(--fg)]">{h.dias.join(" · ")}</span>
                          <span>·</span>
                          <span>{h.horario}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mt-1">
                          <User className="w-3.5 h-3.5 shrink-0" />
                          <span>{h.profesor}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mt-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{h.lugar}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
