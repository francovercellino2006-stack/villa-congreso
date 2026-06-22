import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Deportivo Patagones", template: "%s · Deportivo Patagones" },
  description: "La plataforma del Club Social y Deportivo Patagones de Carmen de Patagones, Buenos Aires, Argentina",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Dep. Patagones" },
  other: {
    /* ISO 3166-1 alpha-2 + ISO 3166-2 subdivision */
    "geo.region":    "AR-B",
    "geo.placename": "Carmen de Patagones, Buenos Aires",
    "geo.position":  "-40.7986;-62.9761",
    "ICBM":          "-40.7986, -62.9761",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#13151f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-link">Ir al contenido principal</a>
        {children}
      </body>
    </html>
  );
}
