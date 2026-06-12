import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Newspaper, Share2 } from "lucide-react";
import { Badge, categoryBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockNoticias } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const noticia = mockNoticias.find(n => n.id === id);
  return { title: noticia?.title ?? "Noticia" };
}

export default async function NoticiaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const noticia = mockNoticias.find(n => n.id === id);
  if (!noticia) notFound();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Link href="/noticias">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Button>
        </Link>
        <Button variant="ghost" size="icon-sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="w-full h-48 rounded-xl bg-gradient-to-br from-vc-blue to-vc-blue/60 flex items-center justify-center mb-5">
        <Newspaper className="w-16 h-16 text-white/50" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Badge variant={categoryBadgeVariant(noticia.category)}>{noticia.category}</Badge>
        <span className="text-sm text-[var(--muted)]">{formatDate(noticia.date)}</span>
      </div>

      <h1 className="text-2xl font-bold leading-tight mb-3">{noticia.title}</h1>
      <p className="text-[var(--fg-secondary)] leading-relaxed">{noticia.excerpt}</p>
      <p className="text-[var(--fg-secondary)] leading-relaxed mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  );
}
