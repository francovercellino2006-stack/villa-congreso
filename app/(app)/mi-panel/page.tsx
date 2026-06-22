"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, Send, Pin, Trash2, ChevronDown, ChevronUp, Plus,
  Users, LogIn, Megaphone, UserCog, Check, Save, Trophy, BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  mockAvisos, mockProfesores, mockComunidades, mockHorarios,
  type AvisoTipo, type ComunidadId,
} from "@/lib/mock-data";
import { useAuth } from "@/components/providers/auth-provider";

/* ── Constants ─────────────────────────────────────────── */

const deporteAComunidad: Record<string, ComunidadId> = {
  "Fútbol":   "futbol",
  "Básquet":  "basquet",
  "Hockey":   "hockey",
  "Patín":    "patin",
  "Gimnasia": "gimnasia",
};

const tipoOpciones: { value: AvisoTipo; label: string; emoji: string }[] = [
  { value: "general",      label: "General",      emoji: "📢" },
  { value: "convocatoria", label: "Convocatoria",  emoji: "📋" },
  { value: "suspensión",   label: "Suspensión",    emoji: "🚫" },
  { value: "recordatorio", label: "Recordatorio",  emoji: "⏰" },
  { value: "resultado",    label: "Resultado",     emoji: "🏆" },
];

const tipoCfg: Record<AvisoTipo, { bg: string; text: string }> = {
  general:      { bg: "bg-[#F4F6FA]",     text: "text-[#566070]"   },
  suspensión:   { bg: "bg-[#C8102E]/10",  text: "text-[#C8102E]"   },
  recordatorio: { bg: "bg-amber-50",      text: "text-amber-700"   },
  resultado:    { bg: "bg-emerald-50",    text: "text-emerald-700" },
  convocatoria: { bg: "bg-[#15803D]/10",  text: "text-[#15803D]"   },
};

function formatRelative(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? "ayer" : `hace ${days} días`;
}

/* ── Tab: Avisos ────────────────────────────────────────── */

function TabAvisos({
  profe,
  comunidad,
}: {
  profe: typeof mockProfesores[0];
  comunidad: typeof mockComunidades[0];
}) {
  const [titulo,    setTitulo]    = useState("");
  const [contenido, setContenido] = useState("");
  const [tipo,      setTipo]      = useState<AvisoTipo>("general");
  const [fijado,    setFijado]    = useState(false);
  const [publicado, setPublicado] = useState(false);
  const [formOpen,  setFormOpen]  = useState(true);

  const misAvisos  = mockAvisos.filter(a => a.profesorId === profe.id);
  const canPublish = titulo.trim().length > 0 && contenido.trim().length > 0;

  function handlePublicar() {
    if (!canPublish) return;
    setPublicado(true);
    setTitulo(""); setContenido(""); setTipo("general"); setFijado(false);
    setTimeout(() => setPublicado(false), 3000);
  }

  return (
    <div>
      {/* Compose */}
      <Card className="mb-5 overflow-hidden border-[#E8ECF4]">
        <button
          type="button"
          onClick={() => setFormOpen(o => !o)}
          aria-expanded={formOpen}
          className="w-full flex items-center justify-between p-4 hover:bg-[#F8FAFB] transition-colors"
        >
          <div className="flex items-center gap-2">
            <Plus aria-hidden="true" className={`w-4 h-4 ${comunidad.colorText}`} />
            <span className="font-semibold text-sm text-[#0D1117]">Nuevo aviso</span>
          </div>
          {formOpen
            ? <ChevronUp  aria-hidden="true" className="w-4 h-4 text-[#566070]" />
            : <ChevronDown aria-hidden="true" className="w-4 h-4 text-[#566070]" />}
        </button>

        {formOpen && (
          <div className="px-4 pb-4 space-y-3 border-t border-[#E8ECF4] pt-4">
            {/* Tipo */}
            <div>
              <p className="text-xs font-semibold text-[#566070] mb-2">Tipo de aviso</p>
              <div className="flex gap-2 flex-wrap" role="group" aria-label="Tipo de aviso">
                {tipoOpciones.map(opt => (
                  <button key={opt.value} type="button" onClick={() => setTipo(opt.value)} aria-pressed={tipo === opt.value}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                      tipo === opt.value
                        ? `${tipoCfg[opt.value].bg} ${tipoCfg[opt.value].text} border-transparent`
                        : "border-[#E8ECF4] text-[#566070] hover:text-[#0D1117] hover:border-[#C4CBD8]"
                    }`}>
                    <span aria-hidden="true">{opt.emoji}</span> {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Título */}
            <div>
              <label htmlFor="aviso-titulo" className="text-xs font-semibold text-[#566070] mb-1.5 block">
                Título <span aria-hidden="true" className="text-[#C8102E]">*</span>
              </label>
              <input id="aviso-titulo" type="text" placeholder="Ej: Entrenamiento suspendido el martes…"
                value={titulo} onChange={e => setTitulo(e.target.value)} maxLength={80} aria-required="true"
                className="w-full h-10 px-3 rounded-xl border border-[#E8ECF4] bg-white text-sm font-medium text-[#0D1117] placeholder:text-[#9AA3AF] focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                style={{ "--tw-ring-color": comunidad.color } as React.CSSProperties}
              />
              <p className="text-[10px] text-[#566070] text-right mt-1">{titulo.length}/80</p>
            </div>

            {/* Contenido */}
            <div>
              <label htmlFor="aviso-contenido" className="text-xs font-semibold text-[#566070] mb-1.5 block">
                Mensaje <span aria-hidden="true" className="text-[#C8102E]">*</span>
              </label>
              <textarea id="aviso-contenido" placeholder={`Escribí las novedades para la comunidad de ${comunidad.nombre}…`}
                value={contenido} onChange={e => setContenido(e.target.value)} rows={4} maxLength={600} aria-required="true"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8ECF4] bg-white text-sm text-[#0D1117] placeholder:text-[#9AA3AF] focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all resize-none leading-relaxed"
              />
              <p className="text-[10px] text-[#566070] text-right mt-1">{contenido.length}/600</p>
            </div>

            {/* Fijar */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div role="switch" aria-checked={fijado} tabIndex={0}
                onClick={() => setFijado(f => !f)} onKeyDown={e => e.key === " " && setFijado(f => !f)}
                className="w-10 h-5 rounded-full transition-colors relative shrink-0 cursor-pointer"
                style={{ background: fijado ? comunidad.color : "#D1D5DB" }}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${fijado ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0D1117]">Fijar aviso</p>
                <p className="text-[10px] text-[#566070]">Aparece primero y destacado en el feed</p>
              </div>
              <Pin aria-hidden="true" className={`w-4 h-4 ml-auto shrink-0 ${fijado ? comunidad.colorText : "text-[#C4CBD8]"}`} />
            </label>

            {/* Preview */}
            {(titulo || contenido) && (
              <div className="bg-[#F8FAFB] rounded-xl p-3 border border-[#E8ECF4]">
                <p className="text-[10px] text-[#566070] mb-2 font-bold uppercase tracking-wider">Vista previa</p>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className={`w-7 h-7 ${comunidad.colorBg}`}>
                    <AvatarFallback className={`text-[10px] font-bold ${comunidad.colorText}`}>{profe.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#0D1117]">{profe.name}</span>
                    <span className={`text-[10px] font-semibold ml-1.5 ${comunidad.colorText}`}>{comunidad.nombre}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${tipoCfg[tipo].bg} ${tipoCfg[tipo].text}`}>
                    {tipoOpciones.find(o => o.value === tipo)?.label}
                  </span>
                </div>
                {titulo    && <p className="text-xs font-bold text-[#0D1117] mb-1">{titulo}</p>}
                {contenido && <p className="text-xs text-[#4A5568] leading-relaxed line-clamp-3">{contenido}</p>}
              </div>
            )}

            {publicado ? (
              <div className="flex items-center justify-center gap-2 h-11 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold" role="status">
                ✓ ¡Publicado en {comunidad.nombre}!
              </div>
            ) : (
              <button type="button" onClick={handlePublicar} disabled={!canPublish}
                className="w-full h-11 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                style={{ background: canPublish ? comunidad.color : "#D1D5DB" }}>
                <Send aria-hidden="true" className="w-4 h-4" />
                Publicar en {comunidad.nombre} {comunidad.emoji}
              </button>
            )}
          </div>
        )}
      </Card>

      {/* Mis publicaciones */}
      <p className="text-[10px] font-bold text-[#566070] uppercase tracking-widest mb-3">
        Mis publicaciones ({misAvisos.length})
      </p>
      <div className="space-y-3">
        {misAvisos.map(aviso => {
          const cfg = tipoCfg[aviso.tipo];
          return (
            <Card key={aviso.id} className={`overflow-hidden border-[#E8ECF4] ${aviso.fijado ? "border-l-4" : ""}`}
              style={aviso.fijado ? { borderLeftColor: comunidad.color } : undefined}>
              <CardContent className="py-3.5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap flex-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                      {tipoOpciones.find(o => o.value === aviso.tipo)?.label}
                    </span>
                    {aviso.fijado && <Pin aria-hidden="true" className={`w-3 h-3 ${comunidad.colorText}`} />}
                    <span className={`text-[10px] font-semibold ${comunidad.colorText}`}>{aviso.deporte}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <time dateTime={aviso.fecha} className="text-[10px] text-[#566070]">{formatRelative(aviso.fecha)}</time>
                    <button type="button" aria-label={`Eliminar aviso: ${aviso.titulo}`}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#C4CBD8] hover:text-[#C8102E] transition-colors">
                      <Trash2 aria-hidden="true" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#0D1117] leading-snug">{aviso.titulo}</p>
                <p className="text-xs text-[#566070] mt-0.5">{aviso.categoria}</p>
                <p className="text-xs text-[#4A5568] mt-1.5 leading-relaxed line-clamp-2">{aviso.contenido}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ── Tab: Mi perfil ─────────────────────────────────────── */

function TabPerfil({
  profe,
  comunidad,
}: {
  profe: typeof mockProfesores[0];
  comunidad: typeof mockComunidades[0];
}) {
  const { session, updateSession } = useAuth();

  // All available categories for this sport
  const todasLasCategorias = mockHorarios
    .filter(h => h.deporte === profe.deporte)
    .map(h => h.categoria);

  // Active categories — from session override or profe default
  const [seleccionadas, setSeleccionadas] = useState<string[]>(
    session?.categoriasActivas ?? profe.categorias
  );
  const [guardado, setGuardado] = useState(false);

  // Sync when session loads
  useEffect(() => {
    if (session?.categoriasActivas) setSeleccionadas(session.categoriasActivas);
  }, [session?.categoriasActivas]);

  function toggleCategoria(cat: string) {
    setSeleccionadas(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setGuardado(false);
  }

  function handleGuardar() {
    updateSession({ categoriasActivas: seleccionadas });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2500);
  }

  const misAvisos    = mockAvisos.filter(a => a.profesorId === profe.id);
  const otrosProfes  = mockProfesores.filter(p => p.deporte === profe.deporte && p.id !== profe.id);
  const haycambios   = JSON.stringify(seleccionadas.slice().sort()) !==
                       JSON.stringify((session?.categoriasActivas ?? profe.categorias).slice().sort());

  return (
    <div className="space-y-4">

      {/* Identity card */}
      <div className={`bg-gradient-to-br ${comunidad.gradient} rounded-2xl p-5`}>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-14 h-14 ring-4 ring-white/30">
            <AvatarFallback className="bg-white/20 text-white text-lg font-black">{profe.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-black text-white leading-tight">{profe.name}</h2>
            <span className="text-xs bg-white/20 text-white/90 px-2 py-0.5 rounded-full font-medium">
              Profe activo
            </span>
          </div>
        </div>

        {/* Sport */}
        <div className="bg-white/15 rounded-xl p-3">
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Deporte asignado</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={comunidad.nombre}>{comunidad.emoji}</span>
            <div>
              <p className="text-base font-black text-white">{profe.deporte}</p>
              <p className="text-[10px] text-white/60">Asignado por la dirección del club</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Users,    value: comunidad.miembros, label: "Miembros" },
          { icon: Megaphone, value: misAvisos.length,   label: "Avisos"   },
          { icon: Trophy,   value: todasLasCategorias.length, label: "Categorías" },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="bg-white border border-[#E8ECF4] rounded-2xl p-3 text-center">
            <Icon aria-hidden="true" className={`w-4 h-4 mx-auto mb-1 ${comunidad.colorText}`} />
            <p className="text-xl font-black text-[#0D1117]">{value}</p>
            <p className="text-[10px] text-[#566070] font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Categorías */}
      <Card className="border-[#E8ECF4] overflow-hidden">
        <div className="p-4 border-b border-[#E8ECF4]">
          <div className="flex items-center gap-2">
            <UserCog aria-hidden="true" className={`w-4 h-4 ${comunidad.colorText}`} />
            <p className="text-sm font-bold text-[#0D1117]">Categorías a cargo</p>
          </div>
          <p className="text-xs text-[#566070] mt-0.5">
            Seleccioná las categorías de {profe.deporte} que tenés a cargo
          </p>
        </div>
        <div className="p-4 space-y-2">
          {todasLasCategorias.map(cat => {
            const activa    = seleccionadas.includes(cat);
            const horario   = mockHorarios.find(h => h.deporte === profe.deporte && h.categoria === cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategoria(cat)}
                aria-pressed={activa}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                  activa
                    ? `border-transparent`
                    : "border-[#E8ECF4] bg-white hover:border-[#C4CBD8]"
                }`}
                style={activa ? {
                  background: `${comunidad.color}10`,
                  borderColor: `${comunidad.color}40`,
                } : undefined}
              >
                {/* Checkbox visual */}
                <div
                  className="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all"
                  style={{
                    background:   activa ? comunidad.color : "white",
                    borderColor:  activa ? comunidad.color : "#C4CBD8",
                  }}
                >
                  {activa && <Check aria-hidden="true" className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${activa ? "text-[#0D1117]" : "text-[#4A5568]"}`}>{cat}</p>
                  {horario && (
                    <p className="text-[11px] text-[#566070] mt-0.5">
                      {horario.dias.join(", ")} · {horario.horario} · {horario.lugar}
                    </p>
                  )}
                </div>

                {activa && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                    style={{ color: comunidad.color, background: `${comunidad.color}18` }}
                  >
                    A cargo
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Save button */}
        <div className="px-4 pb-4">
          {guardado ? (
            <div className="flex items-center justify-center gap-2 h-11 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold" role="status">
              <Check aria-hidden="true" className="w-4 h-4" /> Cambios guardados
            </div>
          ) : (
            <button
              type="button"
              onClick={handleGuardar}
              disabled={!haycambios}
              className="w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-white"
              style={{ background: comunidad.color }}
            >
              <Save aria-hidden="true" className="w-4 h-4" /> Guardar cambios
            </button>
          )}
        </div>
      </Card>

      {/* Colegas */}
      {otrosProfes.length > 0 && (
        <Card className="border-[#E8ECF4]">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 aria-hidden="true" className={`w-4 h-4 ${comunidad.colorText}`} />
              <p className="text-sm font-bold text-[#0D1117]">Otros profes de {profe.deporte}</p>
            </div>
            <div className="space-y-2">
              {otrosProfes.map(p => (
                <div key={p.id} className="flex items-center gap-3">
                  <Avatar className={`w-8 h-8 ${comunidad.colorBg}`}>
                    <AvatarFallback className={`text-xs font-bold ${comunidad.colorText}`}>{p.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0D1117]">{p.name}</p>
                    <p className="text-[11px] text-[#566070] truncate">{p.categorias.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────── */

type Tab = "avisos" | "perfil";

export default function MiPanelPage() {
  const { session, ready } = useAuth();
  const [tab, setTab] = useState<Tab>("avisos");

  const profe = ready && session?.role === "profe"
    ? mockProfesores.find(p => p.id === session.profesorId) ?? mockProfesores[2]
    : null;

  const comunidadId = profe ? (deporteAComunidad[profe.deporte] ?? "futbol") : "futbol";
  const comunidad   = mockComunidades.find(c => c.id === comunidadId)!;

  if (ready && session?.role !== "profe") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-[#15803D]/10 flex items-center justify-center mb-4">
          <LogIn aria-hidden="true" className="w-8 h-8 text-[#15803D]" />
        </div>
        <h1 className="text-lg font-black text-[#0D1117] mb-1">Acceso exclusivo para profes</h1>
        <p className="text-sm text-[#566070] mb-6 max-w-xs">
          Para publicar avisos en una comunidad tenés que ingresar como profe del club.
        </p>
        <Link href="/login"
          className="h-11 px-6 bg-[#15803D] text-white rounded-2xl text-sm font-bold hover:bg-[#052E16] transition-colors flex items-center gap-2">
          <LogIn aria-hidden="true" className="w-4 h-4" /> Ir al inicio de sesión
        </Link>
      </div>
    );
  }

  if (!profe) return null;

  const tabs: { id: Tab; label: string; icon: typeof Megaphone }[] = [
    { id: "avisos", label: "Mis avisos",  icon: Megaphone },
    { id: "perfil", label: "Mi perfil",   icon: UserCog   },
  ];

  return (
    <div>
      {/* Back */}
      <div className="flex items-center gap-2 mb-4">
        <Link href="/avisos"
          className="flex items-center gap-1.5 text-sm text-[#566070] hover:text-[#0D1117] transition-colors"
          aria-label="Volver a comunidades">
          <ArrowLeft aria-hidden="true" className="w-4 h-4" /> Comunidades
        </Link>
      </div>

      {/* Profe header — compact */}
      <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-white border border-[#E8ECF4] rounded-2xl">
        <Avatar className={`w-10 h-10 ring-2 ring-[#E8ECF4] ${comunidad.colorBg}`}>
          <AvatarFallback className={`text-sm font-bold ${comunidad.colorText}`}>{profe.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#0D1117] leading-tight">{profe.name}</p>
          <p className="text-[11px] text-[#566070]">
            <span className={`font-semibold ${comunidad.colorText}`}>{comunidad.emoji} {profe.deporte}</span>
            {" · "}
            {(session?.categoriasActivas ?? profe.categorias).join(", ")}
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full shrink-0">
          Activo
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F4F6FA] rounded-2xl p-1 mb-5" role="tablist">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl text-xs font-semibold transition-all ${
              tab === id
                ? "bg-white text-[#0D1117] shadow-sm"
                : "text-[#566070] hover:text-[#0D1117]"
            }`}
          >
            <Icon aria-hidden="true" className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "avisos"
        ? <TabAvisos profe={profe} comunidad={comunidad} />
        : <TabPerfil profe={profe} comunidad={comunidad} />}
    </div>
  );
}
