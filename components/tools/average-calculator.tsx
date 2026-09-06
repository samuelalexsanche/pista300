"use client";

import * as React from "react";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { average, handicap, seriesTotal } from "@/lib/bowling";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Stat } from "@/components/marketing/stat";

const PRESETS = [
  { id: "80-220", etiqueta: "80% de 220 (USBC común)", base: 220, pct: 0.8 },
  { id: "90-210", etiqueta: "90% de 210", base: 210, pct: 0.9 },
  { id: "100-200", etiqueta: "100% de 200 (juvenil)", base: 200, pct: 1 },
  { id: "90-220", etiqueta: "90% de 220", base: 220, pct: 0.9 },
];

export function AverageCalculator() {
  const [scores, setScores] = React.useState<string[]>(["", "", ""]);
  const [preset, setPreset] = React.useState(PRESETS[0].id);

  const validos = scores.map((s) => parseInt(s, 10)).filter((n) => Number.isFinite(n) && n >= 0 && n <= 300);
  const prom = average(validos);
  const cfg = PRESETS.find((p) => p.id === preset)!;
  const hdcp = handicap(prom, cfg.base, cfg.pct);

  const actualizar = (i: number, valor: string) => {
    const limpio = valor.replace(/[^0-9]/g, "").slice(0, 3);
    setScores((prev) => prev.map((s, j) => (j === i ? limpio : s)));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <Label className="text-sm">Tus juegos</Label>
            <Button variant="ghost" size="sm" onClick={() => setScores(["", "", ""])}>
              <RotateCcw /> Reiniciar
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {scores.map((s, i) => (
              <div key={i} className="relative">
                <Input
                  value={s}
                  onChange={(e) => actualizar(i, e.target.value)}
                  inputMode="numeric"
                  placeholder="—"
                  aria-label={`Juego ${i + 1}`}
                  className="h-14 pr-9 text-center font-mono text-xl"
                />
                <span className="text-muted-foreground pointer-events-none absolute top-1 left-2 font-mono text-[10px]">J{i + 1}</span>
                {scores.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setScores((prev) => prev.filter((_, j) => j !== i))}
                    aria-label={`Quitar juego ${i + 1}`}
                    className="text-muted-foreground hover:text-destructive absolute top-1 right-1 p-1"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" className="mt-3" onClick={() => setScores((prev) => [...prev, ""])}>
            <Plus /> Agregar juego
          </Button>

          <div className="mt-6 grid gap-2">
            <Label htmlFor="preset">Fórmula de hándicap</Label>
            <Select value={preset} onValueChange={setPreset}>
              <SelectTrigger id="preset">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRESETS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.etiqueta}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Hándicap = (base − promedio) × porcentaje, truncado y nunca negativo. Si tu promedio iguala o supera la base, tu hándicap es 0.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Card>
          <CardContent className="grid grid-cols-2 gap-6 p-5">
            <Stat valor={validos.length ? prom : "—"} etiqueta="Promedio" tono="primary" detalle={`${validos.length} juegos válidos`} />
            <Stat valor={validos.length ? hdcp : "—"} etiqueta="Hándicap" detalle={cfg.etiqueta} />
            <Stat valor={validos.length ? seriesTotal(validos) : "—"} etiqueta="Total de pinos" />
            <Stat valor={validos.length ? prom + hdcp : "—"} etiqueta="Promedio con hándicap" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 text-sm leading-relaxed">
            <p className="font-medium">Cómo se usa esto en liga</p>
            <p className="text-muted-foreground mt-2">
              En una liga con hándicap, tu score de cada juego se suma al hándicap antes de compararlo con el rival. Por eso alguien
              con promedio de 140 puede ganarle a alguien de 200: la liga premia jugar por encima de tu propio nivel, no ser el mejor
              en términos absolutos.
            </p>
            <p className="text-muted-foreground mt-3">
              El promedio se recalcula cada semana con todos los juegos de la temporada, así que subirlo también baja tu hándicap.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
