"use client";

import * as React from "react";
import { spareLeaves, pinPositions } from "@/data/spares";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Diagrama de los 10 pinos con los que quedan en pie resaltados. */
function PinDiagram({ pinos, compacto = false }: { pinos: number[]; compacto?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("w-full", compacto ? "max-w-20" : "max-w-56")} role="img" aria-label={`Pinos en pie: ${pinos.join(", ")}`}>
      <rect x="0" y="0" width="100" height="100" rx="6" className="fill-[var(--surface)]" />
      {Object.entries(pinPositions).map(([n, p]) => {
        const numero = Number(n);
        const enPie = pinos.includes(numero);
        return (
          <g key={n}>
            <circle
              cx={p.x * 100}
              cy={p.y * 100}
              r={compacto ? 7 : 6.4}
              className={enPie ? "fill-[var(--primary)]" : "fill-transparent stroke-[var(--border)]"}
              strokeWidth={1.5}
            />
            {!compacto && (
              <text
                x={p.x * 100}
                y={p.y * 100 + 2.6}
                textAnchor="middle"
                className={cn("font-mono text-[7px]", enPie ? "fill-[var(--primary-foreground)]" : "fill-[var(--muted-foreground)]")}
              >
                {n}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function SpareGuide() {
  const [activo, setActivo] = React.useState(spareLeaves[0].id);
  const leave = spareLeaves.find((l) => l.id === activo)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
      <div>
        <p className="text-muted-foreground mb-3 text-xs tracking-wide uppercase">Elige lo que te quedó parado</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
          {spareLeaves.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setActivo(l.id)}
              aria-pressed={activo === l.id}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border p-2 transition-colors",
                activo === l.id ? "border-primary bg-surface" : "hover:bg-surface"
              )}
            >
              <PinDiagram pinos={l.pinos} compacto />
              <span className="font-mono text-[11px]">{l.id}</span>
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="grid gap-6 p-5 sm:grid-cols-[minmax(0,220px)_1fr]">
          <div>
            <PinDiagram pinos={leave.pinos} />
          </div>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight">{leave.nombre}</h2>
              <Badge
                variant={leave.dificultad === "fácil" ? "positive" : leave.dificultad === "media" ? "warning" : "negative"}
                className="capitalize"
              >
                {leave.dificultad}
              </Badge>
            </div>
            <dl className="mt-4 flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs tracking-wide uppercase">Posición de parada</dt>
                <dd className="mt-0.5 font-medium">{leave.tabladeParado}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs tracking-wide uppercase">Objetivo</dt>
                <dd className="mt-0.5 font-medium">{leave.objetivo}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs tracking-wide uppercase">Consejo</dt>
                <dd className="text-muted-foreground mt-1 leading-relaxed">{leave.consejo}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
