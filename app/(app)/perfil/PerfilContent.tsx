"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { AdminAccount } from "./AdminAccount";

export function PerfilContent({ children }: { children: React.ReactNode }) {
  const { session, ready } = useAuth();

  if (!ready) return null;

  if (session?.role === "admin") return <AdminAccount />;

  return <>{children}</>;
}
