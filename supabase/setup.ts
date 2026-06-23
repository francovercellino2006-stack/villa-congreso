#!/usr/bin/env npx tsx
/**
 * Setup completo de Supabase para Deportivo Patagones.
 * Ejecutar: npx tsx supabase/setup.ts
 *
 * 1. Crea las tablas (profiles, cuotas, audit_log)
 * 2. Crea usuarios demo (admin, socios, profe)
 * 3. Inserta cuotas de ejemplo
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

// ── Load env ────────────────────────────────────────────
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

if (!URL || !KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
  process.exit(1);
}

const supabase = createClient(URL, KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── Demo users ──────────────────────────────────────────
const USERS = [
  {
    email: "admin@dp.ar",
    password: "Admin1234!",
    meta: { role: "admin", name: "Administración Club" },
    extra: {},
  },
  {
    email: "socio1@dp.ar",
    password: "Demo1234!",
    meta: { role: "socio", name: "Martín Rodríguez" },
    extra: { socio_number: "1234", category: "Socio Activo", sports: ["Fútbol", "Básquet"] },
  },
  {
    email: "socio2@dp.ar",
    password: "Demo1234!",
    meta: { role: "socio", name: "Florencia García" },
    extra: { socio_number: "1235", category: "Socia Activa", sports: ["Hockey"] },
  },
  {
    email: "socio3@dp.ar",
    password: "Demo1234!",
    meta: { role: "socio", name: "Lucas Pérez" },
    extra: { socio_number: "1236", category: "Socio Activo", sports: ["Básquet"] },
  },
  {
    email: "socio4@dp.ar",
    password: "Demo1234!",
    meta: { role: "socio", name: "Ana Martínez" },
    extra: { socio_number: "1237", category: "Socia Activa", sports: ["Patín", "Gimnasia"] },
  },
  {
    email: "socio5@dp.ar",
    password: "Demo1234!",
    meta: { role: "socio", name: "Carlos Romero" },
    extra: { socio_number: "1238", category: "Socio Activo", sports: ["Fútbol"] },
  },
  {
    email: "socio6@dp.ar",
    password: "Demo1234!",
    meta: { role: "socio", name: "Valentina López" },
    extra: { socio_number: "1239", category: "Socia Activa", sports: ["Hockey", "Gimnasia"] },
  },
  {
    email: "socio7@dp.ar",
    password: "Demo1234!",
    meta: { role: "socio", name: "Tomás Fernández" },
    extra: { socio_number: "1240", category: "Socio Activo", sports: [] as string[] },
  },
  {
    email: "profe1@dp.ar",
    password: "Demo1234!",
    meta: { role: "profe", name: "Diego Paredes" },
    extra: { profe_deporte: "Fútbol", profe_initials: "DP", profe_mock_id: "profe-1" },
  },
];

// ── Step 1: Create tables ───────────────────────────────
async function createTables() {
  console.log("📋 Paso 1: Verificando tablas...");

  const { error } = await supabase.from("profiles").select("id").limit(1);

  if (error?.code === "42P01") {
    console.log("   Creando tablas...");
    const schema = readFileSync(join(process.cwd(), "supabase/schema.sql"), "utf-8");

    const res = await fetch(`${URL}/rest/v1/rpc/`, {
      method: "POST",
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "exec_sql", args: { sql: schema } }),
    });

    if (!res.ok) {
      console.log("");
      console.log("   ⚠️  No se pudieron crear las tablas automáticamente.");
      console.log("   Hacé esto manualmente (una sola vez):");
      console.log("");
      console.log("   1. Abrí: https://supabase.com/dashboard");
      console.log("   2. Seleccioná tu proyecto");
      console.log("   3. Andá a SQL Editor");
      console.log("   4. Pegá todo el contenido de supabase/schema.sql");
      console.log("   5. Click en 'Run'");
      console.log("   6. Volvé a ejecutar: npx tsx supabase/setup.ts");
      console.log("");
      process.exit(1);
    }
    console.log("   ✅ Tablas creadas");
  } else {
    console.log("   ✅ Tablas ya existen");
  }
}

// ── Step 2: Create users ────────────────────────────────
async function createUsers() {
  console.log("\n👥 Paso 2: Creando usuarios...");

  const createdIds: Record<string, string> = {};

  for (const u of USERS) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: u.meta,
    });

    if (error) {
      if (error.message.includes("already been registered")) {
        const { data: listData } = await supabase.auth.admin.listUsers();
        const existing = listData?.users?.find((usr: { email?: string }) => usr.email === u.email);
        if (existing) {
          createdIds[u.email] = existing.id;
          await supabase.from("profiles").upsert({
            id: existing.id,
            role: u.meta.role,
            name: u.meta.name,
            ...u.extra,
          });
          console.log(`   ✓ ${u.email} (ya existía — perfil actualizado)`);
        }
      } else {
        console.error(`   ✗ ${u.email}: ${error.message}`);
      }
    } else if (data?.user) {
      createdIds[u.email] = data.user.id;
      // Trigger should create profile, but we update with extra fields
      await supabase.from("profiles").upsert({
        id: data.user.id,
        role: u.meta.role,
        name: u.meta.name,
        ...u.extra,
      });
      console.log(`   ✓ ${u.email} creado (${u.meta.role})`);
    }
  }

  return createdIds;
}

// ── Step 3: Seed cuotas ─────────────────────────────────
async function seedCuotas(ids: Record<string, string>) {
  console.log("\n💰 Paso 3: Creando cuotas...");

  const now = new Date();
  const mes = now.toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);

  const venc = new Date(now.getFullYear(), now.getMonth(), 15);
  const vencimiento = venc.toISOString().split("T")[0];

  const cuotas = [
    { socio: "socio1@dp.ar", monto: 8500, estado: "pendiente", deporte: "Fútbol" },
    { socio: "socio2@dp.ar", monto: 8000, estado: "pagado",    deporte: "Hockey" },
    { socio: "socio3@dp.ar", monto: 8000, estado: "pendiente", deporte: "Básquet" },
    { socio: "socio4@dp.ar", monto: 7500, estado: "vencida",   deporte: "Patín" },
    { socio: "socio5@dp.ar", monto: 8500, estado: "pagado",    deporte: "Fútbol" },
    { socio: "socio6@dp.ar", monto: 8000, estado: "pagado",    deporte: "Hockey" },
  ];

  let inserted = 0;
  for (const c of cuotas) {
    const socioId = ids[c.socio];
    if (!socioId) continue;

    // Check if cuota already exists for this month
    const { data: existing } = await supabase
      .from("cuotas")
      .select("id")
      .eq("socio_id", socioId)
      .eq("mes", mesCapitalizado)
      .limit(1);

    if (existing && existing.length > 0) continue;

    const { error } = await supabase.from("cuotas").insert({
      socio_id: socioId,
      mes: mesCapitalizado,
      monto: c.monto,
      estado: c.estado,
      vencimiento,
      deporte: c.deporte,
      ...(c.estado === "pagado" && { pagado_at: new Date().toISOString() }),
    });

    if (!error) inserted++;
    else console.error(`   ✗ Cuota ${c.socio}: ${error.message}`);
  }

  console.log(`   ✅ ${inserted} cuotas creadas para ${mesCapitalizado}`);
}

// ── Run ─────────────────────────────────────────────────
async function main() {
  console.log("🏟️  Setup Deportivo Patagones\n");

  await createTables();
  const ids = await createUsers();
  await seedCuotas(ids);

  console.log("\n" + "─".repeat(50));
  console.log("✅ ¡Setup completo!\n");
  console.log("Credenciales:");
  console.log("  Admin:  admin@dp.ar    / Admin1234!");
  console.log("  Socio:  socio1@dp.ar   / Demo1234!");
  console.log("  Profe:  profe1@dp.ar   / Demo1234!");
  console.log("\nAbrí la app y logueate con esas credenciales.");
  console.log("");
}

main().catch(err => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
