"use client";

import * as React from "react";
import type { OilPattern } from "@/data/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stat, StatStrip } from "@/components/marketing/stat";
import { cn } from "@/lib/utils";

/** Perfil de volumen de aceite por tabla, dibujado como área. */
function PatternProfile({ perfil, longitud }: { perfil: number[]; longitud: number }) {
  const maximo = Math.max(...perfil, 1);
  const ancho = 100;
  const alto = 46;
  const puntos = perfil
    .map((v, i) => `${((i / (perfil.length - 1)) * ancho).toFixed(2)},${(alto - (v / maximo) * alto).toFixed(2)}`)
    .join(" ");

  return (
    <figure>
      <svg viewBox={`0 0 ${ancho} ${alto}`} className="w-full" role="img" aria-label={`Perfil de volumen de aceite, patrón de ${longitud} pies`}>
        <defs>
          <linearGradient id="oil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-2)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--chart-2)" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" y1={alto * g} x2={ancho} y2={alto * g} stroke="var(--border)" strokeWidth="0.3" strokeDasharray="1 1.5" />
        ))}
        <polygon points={`0,${alto} ${puntos} ${ancho},${alto}`} fill="url(#oil)" />
        <polyline points={puntos} fill="none" stroke="var(--chart-2)" strokeWidth="0.8" />
      </svg>
      <figcaption className="text-muted-foreground mt-2 flex justify-between font-mono text-[10px]">
        <span>Tabla 1 (izq.)</span>
        <span>Tabla 20 (centro)</span>
        <span>Tabla 39 (der.)</span>
      </figcaption>
    </figure>
  );
}

export function OilPatternViewer({ patrones }: { patrones: OilPattern[] }) {
  const [activo, setActivo] = React.useState(patrones[0].slug);
  const p = patrones.find((x) => x.slug === activo)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_1fr] lg:items-start">
      <nav aria-label="Patrones de aceite" className="flex flex-col gap-1.5">
        {patrones.map((x) => (
          <button
            key={x.slug}
            type="button"
            onClick={() => setActivo(x.slug)}
            aria-pressed={activo === x.slug}
            className={cn(
              "flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors",
              activo === x.slug ? "border-primary bg-surface" : "hover:bg-surface"
            )}
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{x.nombre}</span>
              <span className="text-muted-foreground text-xs capitalize">{x.dificultad}</span>
            </span>
            <span className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">{x.longitud}′</span>
          </button>
        ))}
      </nav>

      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">{p.nombre}</h2>
            <Badge variant={p.dificultad === "casa" ? "secondary" : p.dificultad === "sport" ? "warning" : "negative"} className="capitalize">
              {p.dificultad}
            </Badge>
          </div>

          <PatternProfile perfil={p.perfil} longitud={p.longitud} />

          <StatStrip className="mt-6">
            <Stat valor={`${p.longitud}′`} etiqueta="Longitud" />
            <Stat valor={`${p.volumen} ml`} etiqueta="Volumen" />
            <Stat valor={p.ratio} etiqueta="Ratio centro:orilla" />
            <Stat valor={p.dificultad} etiqueta="Categoría" className="capitalize" />
          </StatStrip>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="bg-surface rounded-lg border p-4">
              <p className="text-primary font-mono text-[10px] tracking-widest uppercase">Línea sugerida</p>
              <p className="mt-1.5 text-sm leading-relaxed">{p.linea}</p>
            </div>
            <div className="bg-surface rounded-lg border p-4">
              <p className="text-primary font-mono text-[10px] tracking-widest uppercase">Cómo se juega</p>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{p.descripcion}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
