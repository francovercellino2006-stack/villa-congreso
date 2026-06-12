import type { Metadata } from "next";
import { Users, Clock, MapPin, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/top-bar";
import { mockHorarios } from "@/lib/mock-data";
import { getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Entrenadores" };

const entrenadores = [
  { id: "1", name: "Carlos Medina", deporte: "Fútbol", categorias: ["Infantil Sub-10"], alumnos: 18, activo: true },
  { id: "2", name: "Lucas Ferreyra", deporte: "Fútbol", categorias: ["Pre-infante Sub-8"], alumnos: 14, activo: true },
  { id: "3", name: "Diego Paredes", deporte: "Fútbol", categorias: ["Juvenil Sub-17", "Primera División"], alumnos: 34, activo: true },
  { id: "4", name: "Alejandro Ruiz", deporte: "Básquet", categorias: ["Infantil Sub-12", "Juvenil Sub-16"], alumnos: 28, activo: true },
  { id: "5", name: "Valentina Sosa", deporte: "Hockey", categorias: ["Damas (todas)"], alumnos: 22, activo: true },
  { id: "6", name: "Sofía Carrizo", deporte: "Patín", categorias: ["Niñas/os"], alumnos: 16, activo: true },
  { id: "7", name: "Marina Torres", deporte: "Gimnasia", categorias: ["Adultos"], alumnos: 30, activo: true },
];

const colorMap: Record<string, string> = {
  "Fútbol": "blue",
  "Básquet": "purple",
  "Hockey": "green",
  "Patín": "default",
  "Gimnasia": "yellow",
};

export default function EntrenadoresPage() {
  return (
    <div>
      <PageHeader title="Entrenadores" subtitle="Cuerpo técnico del club" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <Card>
          <CardContent className="py-3 text-center">
            <p className="text-2xl font-bold text-vc-blue">{entrenadores.length}</p>
            <p className="text-[10px] text-[var(--muted)]">Entrenadores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 text-center">
            <p className="text-2xl font-bold text-vc-blue">{mockHorarios.length}</p>
            <p className="text-[10px] text-[var(--muted)]">Actividades</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 text-center">
            <p className="text-2xl font-bold text-vc-blue">{entrenadores.reduce((s, e) => s + e.alumnos, 0)}</p>
            <p className="text-[10px] text-[var(--muted)]">Alumnos</p>
          </CardContent>
        </Card>
      </div>

      {/* Coaches list */}
      <div className="space-y-3">
        {entrenadores.map(coach => {
          const horarios = mockHorarios.filter(h => h.profesor === coach.name);
          return (
            <Card key={coach.id}>
              <CardContent className="py-4 flex items-start gap-3">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarFallback className="text-sm">{getInitials(coach.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="font-semibold text-sm">{coach.name}</p>
                      <Badge variant={(colorMap[coach.deporte] ?? "default") as any} className="text-[10px] mt-0.5">{coach.deporte}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                      <Users className="w-3.5 h-3.5" />
                      <span>{coach.alumnos}</span>
                    </div>
                  </div>
                  {horarios.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {horarios.map(h => (
                        <div key={h.id} className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>{h.dias.join("/").slice(0, 3)} · {h.horario} · {h.lugar}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
