#!/usr/bin/env npx tsx
/**
 * Seed content tables with mock data.
 * Run AFTER migration-002-content.sql is executed in Supabase.
 *
 * npx tsx supabase/seed-content.ts
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

const envPath = join(process.cwd(), ".env.local");
const envRaw = readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
for (const line of envRaw.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq > 0) env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
}

const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(URL, KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function seed() {
  console.log("🏟️  Seed content tables\n");

  // ── Noticias ──────────────────────────────────────────
  console.log("📰 Noticias...");
  const { error: e1 } = await supabase.from("noticias").upsert([
    { title: "Gran victoria del equipo de fútbol mayor", excerpt: "El plantel de primera división logró una importante victoria de 3-1 ante Deportivo Norte en el torneo regional.", content: "...", category: "Fútbol", pinned: true, created_at: "2026-06-10T12:00:00Z" },
    { title: "Cuotas junio disponibles", excerpt: "Ya están disponibles las cuotas de junio. El vencimiento es el día 15. Recordamos que pueden abonar online.", content: "...", category: "Cuotas", pinned: false, created_at: "2026-06-08T12:00:00Z" },
    { title: "Torneo de básquet infantil este sábado", excerpt: "El sábado 14 de junio se realizará el torneo interno de básquet categorías sub-12 y sub-14 en el gimnasio del club.", content: "...", category: "Básquet", pinned: false, created_at: "2026-06-07T12:00:00Z" },
    { title: "Renovación del campo de hockey", excerpt: "Se inician las obras de renovación del campo de hockey. Durante el período de obra los entrenamientos se realizarán en el campo auxiliar.", content: "...", category: "Hockey", pinned: false, created_at: "2026-06-05T12:00:00Z" },
    { title: "Asamblea anual de socios", excerpt: "Se convoca a todos los socios a la asamblea anual ordinaria que tendrá lugar el próximo 20 de junio a las 19:00 hs.", content: "...", category: "Institucional", pinned: false, created_at: "2026-06-03T12:00:00Z" },
  ], { onConflict: "id" });
  console.log(e1 ? `   ✗ ${e1.message}` : "   ✅ 5 noticias");

  // ── Eventos ───────────────────────────────────────────
  console.log("🎉 Eventos...");
  const { error: e2 } = await supabase.from("eventos").upsert([
    { title: "Torneo de Fútbol Infantil", date: "2026-06-14", time: "09:00", location: "Cancha Principal", description: "Torneo interno de fútbol categorías sub-10 y sub-12", category: "Fútbol", cupos: 40, inscriptos: 35 },
    { title: "Cena Anual del Club", date: "2026-06-20", time: "21:00", location: "Salón Social", description: "Cena de fin de temporada con premios y reconocimientos", category: "Eventos", cupos: 200, inscriptos: 148 },
    { title: "Asamblea Anual de Socios", date: "2026-06-20", time: "19:00", location: "Sala de Reuniones", description: "Asamblea anual ordinaria de socios", category: "Institucional" },
    { title: "Torneo de Básquet Sub-14", date: "2026-06-28", time: "10:00", location: "Gimnasio", description: "Torneo interclubs categoría sub-14", category: "Básquet", cupos: 60, inscriptos: 22 },
  ], { onConflict: "id" });
  console.log(e2 ? `   ✗ ${e2.message}` : "   ✅ 4 eventos");

  // ── Horarios ──────────────────────────────────────────
  console.log("📅 Horarios...");
  const { error: e3 } = await supabase.from("horarios").upsert([
    { deporte: "Fútbol", categoria: "Infantil (Sub-10)", profesor: "Carlos Medina", dias: ["Martes", "Jueves"], horario: "16:00 - 17:30", lugar: "Cancha de fútbol 1" },
    { deporte: "Fútbol", categoria: "Pre-infante (Sub-8)", profesor: "Lucas Ferreyra", dias: ["Lunes", "Miércoles"], horario: "15:30 - 17:00", lugar: "Cancha de fútbol 2" },
    { deporte: "Fútbol", categoria: "Juvenil (Sub-17)", profesor: "Diego Paredes", dias: ["Lunes", "Miércoles", "Viernes"], horario: "18:00 - 19:30", lugar: "Cancha de fútbol 1" },
    { deporte: "Fútbol", categoria: "Primera División", profesor: "Diego Paredes", dias: ["Martes", "Jueves", "Sábado"], horario: "19:30 - 21:00", lugar: "Cancha de fútbol 1" },
    { deporte: "Básquet", categoria: "Infantil (Sub-12)", profesor: "Alejandro Ruiz", dias: ["Lunes", "Miércoles"], horario: "16:00 - 17:30", lugar: "Gimnasio" },
    { deporte: "Básquet", categoria: "Juvenil (Sub-16)", profesor: "Alejandro Ruiz", dias: ["Martes", "Jueves"], horario: "17:30 - 19:00", lugar: "Gimnasio" },
    { deporte: "Hockey", categoria: "Damas (todas)", profesor: "Valentina Sosa", dias: ["Lunes", "Miércoles", "Viernes"], horario: "17:00 - 18:30", lugar: "Campo de hockey" },
    { deporte: "Patín", categoria: "Niñas/os", profesor: "Sofía Carrizo", dias: ["Martes", "Sábado"], horario: "10:00 - 11:30", lugar: "Pista de patín" },
    { deporte: "Gimnasia", categoria: "Adultos", profesor: "Marina Torres", dias: ["Lunes", "Miércoles", "Viernes"], horario: "08:00 - 09:00", lugar: "Salón polivalente" },
  ], { onConflict: "id" });
  console.log(e3 ? `   ✗ ${e3.message}` : "   ✅ 9 horarios");

  // ── Partidos ──────────────────────────────────────────
  console.log("⚽ Partidos...");
  const { error: e4 } = await supabase.from("partidos").upsert([
    { deporte: "Fútbol", categoria: "Primera División", local: "Deportivo Patagones", visitante: "Deportivo Norte", fecha: "2026-06-15", hora: "16:00", lugar: "Cancha Principal" },
    { deporte: "Básquet", categoria: "Sub-16", local: "Deportivo Patagones", visitante: "Club Roca", fecha: "2026-06-14", hora: "10:00", lugar: "Gimnasio" },
    { deporte: "Hockey", categoria: "Damas", local: "Deportivo Patagones", visitante: "Atlético Viedma", fecha: "2026-06-21", hora: "11:00", lugar: "Campo de hockey" },
  ], { onConflict: "id" });
  console.log(e4 ? `   ✗ ${e4.message}` : "   ✅ 3 partidos");

  // ── Avisos ────────────────────────────────────────────
  console.log("📢 Avisos...");
  const { error: e5 } = await supabase.from("avisos").upsert([
    { autor_name: "Diego Paredes", comunidad_id: "futbol", deporte: "Fútbol", categoria: "Primera División", tipo: "convocatoria", titulo: "Convocatoria para el partido del domingo", contenido: "Chicos, el domingo jugamos contra Deportivo Norte. Concentración a las 14:30 en el vestuario. Traigan botines de campo, medias negras y camiseta blanca.", fijado: true, created_at: "2026-06-11T10:30:00Z" },
    { autor_name: "Carlos Medina", comunidad_id: "futbol", deporte: "Fútbol", categoria: "Infantil Sub-10", tipo: "recordatorio", titulo: "Torneo este sábado — recordatorio", contenido: "El sábado 14 es el torneo interno. Encuentro a las 8:45 en la puerta del club. Cada chico tiene que traer botines, canilleras y agua.", fijado: false, created_at: "2026-06-10T09:00:00Z" },
    { autor_name: "Diego Paredes", comunidad_id: "futbol", deporte: "Fútbol", categoria: "Juvenil Sub-17", tipo: "general", titulo: "Planificación del segundo semestre", contenido: "A partir de julio arrancamos con la preparación para el torneo regional. Vamos a sumar un entrenamiento táctico los sábados.", fijado: false, created_at: "2026-06-06T11:00:00Z" },
    { autor_name: "Lucas Ferreyra", comunidad_id: "futbol", deporte: "Fútbol", categoria: "Pre-infante Sub-8", tipo: "resultado", titulo: "¡Los chicos ganaron el amistoso!", contenido: "Los peques estuvieron increíbles hoy. Ganamos 4 a 2. ¡Felicitaciones!", fijado: false, created_at: "2026-06-05T18:30:00Z" },
    { autor_name: "Alejandro Ruiz", comunidad_id: "basquet", deporte: "Básquet", categoria: "Juvenil Sub-16", tipo: "resultado", titulo: "¡Ganamos! — 58 a 44 contra Club Cipolletti", contenido: "Gran partido del equipo! El sábado vienen Club Roca. Entrenamiento doble el jueves.", fijado: true, created_at: "2026-06-09T21:00:00Z" },
    { autor_name: "Alejandro Ruiz", comunidad_id: "basquet", deporte: "Básquet", categoria: "Infantil Sub-12", tipo: "convocatoria", titulo: "Torneo interclubs Sub-12 — 28 de junio", contenido: "El 28 de junio jugamos el torneo interclubs Sub-12 en el gimnasio.", fijado: false, created_at: "2026-06-08T16:00:00Z" },
    { autor_name: "Valentina Sosa", comunidad_id: "hockey", deporte: "Hockey", categoria: "Damas (todas)", tipo: "suspensión", titulo: "Entrenamiento del miércoles suspendido", contenido: "Por las obras en el campo de hockey, el entrenamiento del miércoles queda suspendido. Retomamos el viernes.", fijado: false, created_at: "2026-06-10T18:00:00Z" },
    { autor_name: "Valentina Sosa", comunidad_id: "hockey", deporte: "Hockey", categoria: "Damas (todas)", tipo: "general", titulo: "Inicio de obras en el campo — cronograma", contenido: "Las obras de renovación durarán aproximadamente 3 semanas. Durante ese período entrenaremos en el campo auxiliar.", fijado: true, created_at: "2026-06-07T09:00:00Z" },
    { autor_name: "Sofía Carrizo", comunidad_id: "patin", deporte: "Patín", categoria: "Niñas/os", tipo: "recordatorio", titulo: "Traigan las patinas afiladas el sábado", contenido: "El próximo sábado vamos a trabajar con ejercicios en velocidad.", fijado: false, created_at: "2026-06-07T16:00:00Z" },
    { autor_name: "Marina Torres", comunidad_id: "gimnasia", deporte: "Gimnasia", categoria: "Adultos", tipo: "general", titulo: "Nuevo horario de verano desde julio", contenido: "A partir del 1° de julio el horario pasa a ser de 8:30 a 9:30.", fijado: false, created_at: "2026-06-08T12:00:00Z" },
  ], { onConflict: "id" });
  console.log(e5 ? `   ✗ ${e5.message}` : "   ✅ 10 avisos");

  console.log("\n✅ ¡Seed completo!");
}

seed().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
