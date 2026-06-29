import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Pin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, categoryBadgeVariant } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/top-bar";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Noticias" };
export const revalidate = 60;

const categoryGradient: Record<string, string> = {
  "Fútbol":        "from-[#15803D] to-[#22C55E]",
  "Básquet":       "from-[#1d4ed8] to-[#3b82f6]",
  "Hockey":        "from-[#0d9488] to-[#14b8a6]",
  "Patín":         "from-[#7c3aed] to-[#a78bfa]",
  "Gimnasia":      "from-[#059669] to-[#34d399]",
  "Institucional": "from-[#4A5568] to-[#718096]",
  "Cuotas":        "from-[#d97706] to-[#f59e0b]",
  "Eventos":       "from-[#15803D] to-[#22C55E]",
};

export default async function NoticiasPage() {
  const supabase = createAdminClient();
  const { data: noticias } = await supabase
    .from("noticias")
    .select("*")
    .order("created_at", { ascending: false });

  const all    = noticias ?? [];
  const pinned = all.filter((n: any) => n.pinned);
  const rest   = all.filter((n: any) => !n.pinned);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Noticias" subtitle="Lo que está pasando en el club" />

      {all.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm font-semibold text-[#0D1117]">No hay noticias todavía</p>
          <p className="text-xs text-[#566070] mt-1">Cuando se publiquen novedades aparecerán acá.</p>
        </div>
      )}

      {/* Pinned — big card */}
      {pinned.map((noticia: any) => (
        <Link key={noticia.id} href={`/noticias/${noticia.id}`} className="block mb-4">
          <Card className="overflow-hidden hover:shadow-[0_6px_24px_0_rgb(0_0_0/0.10)] transition-shadow">
            <div className={`h-44 bg-gradient-to-br ${categoryGradient[noticia.category] ?? "from-[#15803D] to-[#22C55E]"} relative flex flex-col justify-end p-4`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-white/25 text-white border-0 text-[10px]">{noticia.category}</Badge>
                  <span className="flex items-center gap-1 text-[10px] text-white/70 font-medium">
                    <Pin aria-hidden="true" className="w-3 h-3" /> Destacado
                  </span>
                </div>
                <h3 className="text-white font-bold text-base leading-snug line-clamp-2">{noticia.title}</h3>
              </div>
            </div>
            <CardContent className="py-3.5">
              <p className="text-sm text-[#4A5568] line-clamp-2 leading-relaxed">{noticia.excerpt}</p>
              <div className="flex items-center justify-between mt-2.5">
                <time dateTime={noticia.created_at} className="text-[11px] text-[#566070]">
                  {formatDate(noticia.created_at, { day: "numeric", month: "long", year: "numeric" })}
                </time>
                <span className="text-xs text-[#15803D] font-semibold" aria-hidden="true">Leer más →</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}

      {/* Rest of news */}
      <div className="space-y-3">
        {rest.map((noticia: any) => (
          <Link key={noticia.id} href={`/noticias/${noticia.id}`} className="block">
            <Card className="overflow-hidden hover:shadow-[0_4px_16px_0_rgb(0_0_0/0.07)] transition-shadow">
              <CardContent className="py-0 flex gap-0">
                <div className={`w-1.5 bg-gradient-to-b ${categoryGradient[noticia.category] ?? "from-[#15803D] to-[#22C55E]"} rounded-l-2xl shrink-0`} />
                <div className="flex items-start gap-3 p-4 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryGradient[noticia.category] ?? "from-[#15803D] to-[#22C55E]"} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={categoryBadgeVariant(noticia.category)} className="text-[10px] px-1.5 py-0">{noticia.category}</Badge>
                      <time dateTime={noticia.created_at} className="text-[10px] text-[#566070]">{formatDate(noticia.created_at, { day: "numeric", month: "short" })}</time>
                    </div>
                    <p className="text-sm font-bold text-[#0D1117] leading-snug line-clamp-2">{noticia.title}</p>
                    <p className="text-xs text-[#566070] mt-0.5 line-clamp-1">{noticia.excerpt}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6B7A8D] shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
