import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  isDev
    ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  isDev ? "connect-src 'self' wss: ws:" : "connect-src 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options",                    value: "DENY" },
  { key: "X-Content-Type-Options",             value: "nosniff" },
  { key: "X-XSS-Protection",                  value: "1; mode=block" },
  { key: "X-DNS-Prefetch-Control",             value: "on" },
  { key: "X-Permitted-Cross-Domain-Policies",  value: "none" },
  { key: "Referrer-Policy",                    value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",                 value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()" },
  { key: "Strict-Transport-Security",          value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy",            value: csp },
  { key: "Cross-Origin-Opener-Policy",         value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy",       value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy",       value: "require-corp" },
];

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
