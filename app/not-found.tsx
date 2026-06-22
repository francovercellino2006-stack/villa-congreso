import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#F4F6FA] px-6 text-center">
      <Image
        src="/escudo.png"
        alt="Escudo Deportivo Patagones"
        width={72}
        height={70}
        className="mb-6 opacity-40"
      />
      <h1 className="text-6xl font-black text-[#0D1117] mb-2">404</h1>
      <p className="text-lg font-bold text-[#0D1117] mb-1">Página no encontrada</p>
      <p className="text-sm text-[#566070] mb-8 max-w-xs">
        El contenido que buscás no existe o fue movido.
      </p>
      <Link
        href="/inicio"
        className="h-11 px-6 bg-[#15803D] text-white rounded-xl text-sm font-bold hover:bg-[#052E16] transition-colors flex items-center justify-center"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
