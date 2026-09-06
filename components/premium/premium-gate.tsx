"use client";

import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import { useMembership } from "@/providers/membership-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Un solo componente gobierna todo el paywall del sitio.
 * Envuelve cualquier bloque: si el plan es free, lo muestra difuminado con la
 * invitación a suscribirse; si es premium, lo deja pasar tal cual.
 */
export function PremiumGate({
  children,
  titulo = "Contenido Premium",
  descripcion = "Suscríbete para desbloquear esta sección completa.",
  alto = "md",
  className,
}: {
  children: React.ReactNode;
  titulo?: string;
  descripcion?: string;
  alto?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { esPremium, cargando } = useMembership();

  if (cargando) {
    return <div className={cn("bg-surface animate-pulse rounded-xl", alto === "sm" ? "h-40" : alto === "lg" ? "h-[28rem]" : "h-64", className)} />;
  }

  // La clase `contenido-premium` es el ancla del JSON-LD: el `hasPart` con
  // `isAccessibleForFree: false` apunta a este selector. Es lo que le dice a
  // Google que el bloque está tras el muro de pago, y lo que evita que indexar
  // el contenido completo se lea como cloaking. Tiene que estar en los dos
  // estados, porque el crawler puede ver cualquiera de los dos.
  // `contents` hace que este div no genere caja: el selector existe para el
  // JSON-LD pero el layout del contenido desbloqueado queda idéntico al que
  // había cuando esta rama devolvía un fragmento.
  if (esPremium) return <div className="contenido-premium contents">{children}</div>;

  return (
    <div className={cn("contenido-premium relative overflow-hidden rounded-xl border", className)}>
      <div
        aria-hidden
        className={cn("pointer-events-none select-none blur-[6px] saturate-50 opacity-55", alto === "sm" ? "max-h-40" : alto === "lg" ? "max-h-[28rem]" : "max-h-64", "overflow-hidden")}
      >
        {children}
      </div>
      <div className="from-background/40 via-background/85 to-background absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b px-6 text-center">
        <span className="bg-primary/12 text-primary flex size-10 items-center justify-center rounded-full">
          <Lock className="size-4" />
        </span>
        <div>
          <p className="font-semibold">{titulo}</p>
          <p className="text-muted-foreground mx-auto mt-1 max-w-sm text-sm">{descripcion}</p>
        </div>
        <Button asChild size="sm">
          <Link href="/premium">
            <Sparkles /> Ver planes
          </Link>
        </Button>
      </div>
    </div>
  );
}

/** Variante en línea: una tarjeta bloqueada dentro de una rejilla. */
export function PremiumBadgeLock({ className }: { className?: string }) {
  return (
    <span className={cn("bg-primary/12 text-primary inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", className)}>
      <Lock className="size-3" /> Premium
    </span>
  );
}
