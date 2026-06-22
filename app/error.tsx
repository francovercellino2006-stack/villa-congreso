"use client";
import { useEffect } from "react";
import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    /* ISO/IEC 27001 §8.16 — registrar eventos de fallo sin exponer detalles al usuario */
    console.error("[GlobalError]", error.digest ?? "unknown");
  }, [error]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#F4F6FA] px-6 text-center">
      <Image
        src="/escudo.png"
        alt="Escudo Deportivo Patagones"
        width={72}
        height={70}
        className="mb-6 opacity-40"
      />
      <h1 className="text-xl font-black text-[#0D1117] mb-1">Algo salió mal</h1>
      <p className="text-sm text-[#566070] mb-8 max-w-xs">
        Ocurrió un error inesperado. Por favor intentá de nuevo.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="h-11 px-6 bg-[#15803D] text-white rounded-xl text-sm font-bold hover:bg-[#052E16] transition-colors"
        >
          Reintentar
        </button>
        <a
          href="/inicio"
          className="h-11 px-6 border border-[#E8ECF4] bg-white text-[#4A5568] rounded-xl text-sm font-semibold hover:bg-[#F0F3FA] transition-colors flex items-center"
        >
          Ir al inicio
        </a>
      </div>
    </div>
  );
}
