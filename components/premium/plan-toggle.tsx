"use client";

import { Sparkles, User } from "lucide-react";
import { useMembership } from "@/providers/membership-provider";
import { cn } from "@/lib/utils";

/**
 * Control DE DEMO. No existe en producción: sirve para enseñar en vivo cómo
 * cambia el sitio entre un visitante free y un socio premium.
 */
export function PlanToggle({ className }: { className?: string }) {
  const { plan, setPlan, cargando } = useMembership();

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="text-muted-foreground hidden text-[11px] font-medium tracking-wide uppercase lg:inline">Demo</span>
      <div className="bg-surface flex items-center rounded-full p-0.5" role="group" aria-label="Cambiar plan de demostración">
        <button
          type="button"
          onClick={() => setPlan("free")}
          aria-pressed={plan === "free"}
          disabled={cargando}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
            plan === "free" ? "bg-background shadow-xs" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <User className="size-3.5" /> Free
        </button>
        <button
          type="button"
          onClick={() => setPlan("premium")}
          aria-pressed={plan === "premium"}
          disabled={cargando}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
            plan === "premium" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sparkles className="size-3.5" /> Premium
        </button>
      </div>
    </div>
  );
}
