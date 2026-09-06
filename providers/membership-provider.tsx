"use client";

import * as React from "react";
import type { Plan } from "@/data/types";

/**
 * Membresía simulada del demo.
 *
 * En producción esto se reemplaza por la sesión real (Supabase / NextAuth) y el
 * `plan` viene del backend. La superficie del contexto se diseñó para que ese
 * cambio no toque ningún componente: siguen leyendo `plan`, `esPremium` y `usuario`.
 */

export type UsuarioDemo = {
  nombre: string;
  email: string;
  playerSlug: string;
  desde: string;
};

const USUARIO_DEMO: UsuarioDemo = {
  nombre: "Alex Sánchez",
  email: "alex@pista300.mx",
  playerSlug: "renata-ochoa",
  desde: "2025-11-02",
};

type MembershipContext = {
  plan: Plan;
  esPremium: boolean;
  sesionIniciada: boolean;
  usuario: UsuarioDemo | null;
  setPlan: (plan: Plan) => void;
  iniciarSesion: () => void;
  cerrarSesion: () => void;
  /** true hasta que se leyó localStorage: evita parpadeo y desajuste de hidratación. */
  cargando: boolean;
};

const Ctx = React.createContext<MembershipContext | null>(null);
const STORAGE_KEY = "pista300:demo-membership";

export function MembershipProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlanState] = React.useState<Plan>("free");
  const [sesionIniciada, setSesion] = React.useState(false);
  const [cargando, setCargando] = React.useState(true);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { plan?: Plan; sesion?: boolean };
        if (parsed.plan === "premium" || parsed.plan === "free") setPlanState(parsed.plan);
        if (typeof parsed.sesion === "boolean") setSesion(parsed.sesion);
      }
    } catch {
      /* localStorage puede fallar en modo privado: el demo sigue funcionando en free. */
    }
    setCargando(false);
  }, []);

  const persistir = React.useCallback((next: { plan: Plan; sesion: boolean }) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan: next.plan, sesion: next.sesion }));
    } catch {
      /* sin persistencia, el estado vive solo en memoria */
    }
  }, []);

  const setPlan = React.useCallback(
    (next: Plan) => {
      setPlanState(next);
      const sesion = next === "premium" ? true : sesionIniciada;
      setSesion(sesion);
      persistir({ plan: next, sesion });
    },
    [persistir, sesionIniciada]
  );

  const iniciarSesion = React.useCallback(() => {
    setSesion(true);
    persistir({ plan, sesion: true });
  }, [persistir, plan]);

  const cerrarSesion = React.useCallback(() => {
    setSesion(false);
    setPlanState("free");
    persistir({ plan: "free", sesion: false });
  }, [persistir]);

  const value = React.useMemo<MembershipContext>(
    () => ({
      plan,
      esPremium: plan === "premium",
      sesionIniciada,
      usuario: sesionIniciada ? USUARIO_DEMO : null,
      setPlan,
      iniciarSesion,
      cerrarSesion,
      cargando,
    }),
    [plan, sesionIniciada, setPlan, iniciarSesion, cerrarSesion, cargando]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMembership() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useMembership debe usarse dentro de <MembershipProvider>");
  return ctx;
}
