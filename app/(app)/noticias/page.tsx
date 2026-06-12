import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, categoryBadgeVariant } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/top-bar";
import { mockNoticias } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Noticias" };

const categories = ["Todas", "Fútbol", "Básquet", "Hockey", "Eventos", "Cuotas", "Institucional", "Comunicados"];

export default function NoticiasPage() {
  return (
    <div>
      <PageHeader title="Noticias" subtitle="Lo que está pasando" />

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4 scrollbar-none">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              i === 0
                ? "bg-vc-blue text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pinned */}
      {mockNoticias.filter(n => n.pinned).map(noticia => (
        <Link key={noticia.id} href={`/noticias/${noticia.id}`} className="block mb-3">
          <Card className="border-vc-blue/30 hover:shadow-[var(--shadow)] transition-shadow cursor-pointer overflow-hidden">
            <div className="h-1 bg-vc-blue" />
            <CardContent className="py-4 flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vc-blue to-vc-blue/60 flex items-center justify-center shrink-0">
                <Newspaper className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={categoryBadgeVariant(noticia.category)}>{noticia.category}</Badge>
                  <Badge variant="blue" className="text-[10px]">📌 Fijado</Badge>
                </div>
                <p className="font-semibold text-sm leading-snug line-clamp-2">{noticia.title}</p>
                <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2">{noticia.excerpt}</p>
                <p className="text-[10px] text-[var(--muted)] mt-1.5">{formatDate(noticia.date)}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0 mt-1" />
            </CardContent>
          </Card>
        </Link>
      ))}

      {/* All news */}
      <div className="space-y-2">
        {mockNoticias.filter(n => !n.pinned).map(noticia => (
          <Link key={noticia.id} href={`/noticias/${noticia.id}`} className="block">
            <Card className="hover:shadow-[var(--shadow)] transition-shadow cursor-pointer">
              <CardContent className="py-3.5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] flex items-center justify-center shrink-0">
                  <Newspaper className="w-4 h-4 text-[var(--muted)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Badge variant={categoryBadgeVariant(noticia.category)} className="text-[10px] px-1.5 py-0">{noticia.category}</Badge>
                    <span className="text-[10px] text-[var(--muted)]">{formatDate(noticia.date, { day: "numeric", month: "short" })}</span>
                  </div>
                  <p className="text-sm font-semibold leading-snug line-clamp-2">{noticia.title}</p>
                  <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-1">{noticia.excerpt}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0 mt-0.5" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
