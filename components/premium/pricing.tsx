"use client";

import * as React from "react";
import { Check, Minus, Sparkles } from "lucide-react";
import type { MembershipPlan } from "@/data/types";
import { useMembership } from "@/providers/membership-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Pricing({ planes }: { planes: MembershipPlan[] }) {
  const { plan: planActual, setPlan } = useMembership();
  const [anual, setAnual] = React.useState(true);

  return (
    <div>
      <div className="mb-8 flex items-center justify-center gap-3">
        <Label htmlFor="ciclo" className="text-sm font-normal">
          Mensual
        </Label>
        <Switch id="ciclo" checked={anual} onCheckedChange={setAnual} aria-label="Cambiar a facturación anual" />
        <Label htmlFor="ciclo" className="text-sm font-normal">
          Anual
        </Label>
        <Badge variant="positive">2 meses gratis</Badge>
      </div>

      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        {planes.map((p) => {
          const activo = planActual === p.id;
          const precio = anual ? p.precioAnual : p.precioMensual;
          return (
            <div
              key={p.id}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                p.destacado ? "border-primary bg-card shadow-sm" : "bg-card"
              )}
            >
              {p.destacado && (
                <Badge className="absolute -top-2.5 left-6 gap-1">
                  <Sparkles className="size-3" /> Recomendado
                </Badge>
              )}
              <h3 className="text-lg font-semibold">{p.nombre}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{p.descripcion}</p>
              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-semibold tabular-nums">${precio.toLocaleString("es-MX")}</span>
                <span className="text-muted-foreground text-sm">MXN {precio === 0 ? "" : anual ? "/ año" : "/ mes"}</span>
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {p.beneficios.map((b) => (
                  <li key={b.texto} className={cn("flex gap-2.5 text-sm", !b.incluido && "text-muted-foreground")}>
                    {b.incluido ? <Check className="text-positive mt-0.5 size-4 shrink-0" /> : <Minus className="mt-0.5 size-4 shrink-0 opacity-50" />}
                    <span className={cn(!b.incluido && "line-through opacity-70")}>{b.texto}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-7 w-full"
                size="lg"
                variant={p.destacado ? "default" : "outline"}
                disabled={activo}
                onClick={() => setPlan(p.id)}
              >
                {activo ? "Tu plan actual" : p.id === "premium" ? "Hacerme Premium" : "Volver a Comunidad"}
              </Button>
              {p.id === "premium" && (
                <p className="text-muted-foreground mt-3 text-center text-xs">Demo: el cambio de plan es instantáneo y no cobra nada.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
