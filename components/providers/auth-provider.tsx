"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getSession, saveSession, clearSession, type AuthSession } from "@/lib/auth";

interface AuthContextValue {
  session: AuthSession | null;
  ready: boolean;
  login: (session: AuthSession) => void;
  logout: () => void;
  updateSession: (patch: Partial<AuthSession>) => void;
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  ready: false,
  login: () => {},
  logout: () => {},
  updateSession: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady]     = useState(false);

  useEffect(() => {
    setSession(getSession());
    setReady(true);
  }, []);

  function login(s: AuthSession) {
    saveSession(s);
    setSession(s);
  }

  function logout() {
    clearSession();
    setSession(null);
  }

  function updateSession(patch: Partial<AuthSession>) {
    setSession(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      saveSession(next);
      return next;
    });
  }

  return (
    <AuthContext.Provider value={{ session, ready, login, logout, updateSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
