"use client";

import * as React from "react";
import { RotateCcw, Undo2, Wand2 } from "lucide-react";
import { emptyFrames, scoreGame, maxPins, type Frame } from "@/lib/bowling";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreStrip } from "@/components/community/score-strip";
import { Stat } from "@/components/marketing/stat";
import { cn } from "@/lib/utils";

/** ¿Está terminado este frame? */
function frameCompleto(frame: Frame, index: number): boolean {
  if (index < 9) return frame[0] === 10 || frame.length >= 2;
  const [a, b] = frame;
  if (frame.length < 2) return false;
  const bonus = a === 10 || (a ?? 0) + (b ?? 0) === 10;
  return bonus ? frame.length >= 3 : true;
}

/** Posición actual del anotador: [frame, tiro] o null si el juego terminó. */
function posicionActual(frames: Frame[]): [number, number] | null {
  for (let i = 0; i < 10; i++) {
    if (!frameCompleto(frames[i], i)) return [i, frames[i].length];
  }
  return null;
}

export function Scoresheet() {
  const [frames, setFrames] = React.useState<Frame[]>(emptyFrames);
  const pos = posicionActual(frames);
  const resultado = scoreGame(frames);
  const terminado = pos === null;

  const registrar = (pinos: number) => {
    if (!pos) return;
    const [f, t] = pos;
    setFrames((prev) => prev.map((frame, i) => (i === f ? [...frame, pinos] : frame)));
    void t;
  };

  const deshacer = () => {
    setFrames((prev) => {
      const copia = prev.map((f) => [...f]);
      for (let i = 9; i >= 0; i--) {
        if (copia[i].length > 0) {
          copia[i].pop();
          break;
        }
      }
      return copia;
    });
  };

  const ejemplo = () => setFrames([[10], [9, 1], [8, 1], [10], [10], [7, 3], [9, 0], [10], [8, 2], [10, 9, 1]]);

  const max = pos ? maxPins(frames[pos[0]], pos[1], pos[0] === 9) : 0;
  const juegos = resultado.frames.filter((f) => f.type !== "incomplete").length;
  const pctStrikes = juegos ? Math.round((resultado.strikes / Math.max(1, juegos)) * 100) : 0;
  const repuestosPosibles = resultado.spares + resultado.opens;
  const pctRepuestos = repuestosPosibles ? Math.round((resultado.spares / repuestosPosibles) * 100) : 0;

  return (
    // min-w-0: deja que la hoja de anotación active su propio scroll
    // horizontal en vez de empujar la página entera en móvil.
    <div className="flex min-w-0 flex-col gap-6">
      <Card className="min-w-0">
        <CardContent className="min-w-0 p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {terminado ? (
                <Badge variant="positive">Juego terminado</Badge>
              ) : (
                <Badge variant="secondary" className="tnum">
                  Frame {pos[0] + 1} · tiro {pos[1] + 1}
                </Badge>
              )}
              {resultado.total === 300 && <Badge>¡Juego perfecto!</Badge>}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" size="sm" onClick={ejemplo}>
                <Wand2 /> Cargar ejemplo
              </Button>
              <Button variant="ghost" size="sm" onClick={deshacer} disabled={frames.every((f) => f.length === 0)}>
                <Undo2 /> Deshacer
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setFrames(emptyFrames())}>
                <RotateCcw /> Reiniciar
              </Button>
            </div>
          </div>

          <ScoreStrip frames={frames} />

          <div className="mt-6">
            <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">
              {terminado ? "Reinicia para capturar otro juego" : "¿Cuántos pinos derribaste?"}
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 11 }, (_, n) => n).map((n) => {
                const habilitado = !terminado && n <= max;
                return (
                  <Button
                    key={n}
                    variant={n === 10 ? "default" : n === max && n !== 0 ? "secondary" : "outline"}
                    disabled={!habilitado}
                    onClick={() => registrar(n)}
                    className={cn("min-w-11 font-mono", !habilitado && "opacity-40")}
                    aria-label={n === 10 ? "Strike, 10 pinos" : `${n} pinos`}
                  >
                    {n === 10 ? "X" : n}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <Stat valor={resultado.total} etiqueta="Total" tono="primary" detalle={terminado ? "juego cerrado" : "asegurado hasta ahora"} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <Stat valor={`${resultado.strikes}`} etiqueta="Strikes" detalle={`${pctStrikes}% de los frames`} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <Stat valor={`${pctRepuestos}%`} etiqueta="Repuestos convertidos" detalle={`${resultado.spares} de ${repuestosPosibles}`} tono={pctRepuestos >= 70 ? "positive" : "neutral"} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <Stat valor={resultado.missedPins} etiqueta="Pinos perdidos" detalle={`${resultado.opens} frames abiertos`} tono={resultado.opens > 3 ? "negative" : "neutral"} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5 text-sm leading-relaxed">
          <p className="font-medium">Lectura rápida</p>
          <p className="text-muted-foreground mt-2">{diagnostico(resultado.strikes, resultado.spares, resultado.opens, resultado.total, terminado)}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function diagnostico(strikes: number, spares: number, opens: number, total: number, terminado: boolean): string {
  if (!terminado) return "Captura el juego completo para ver el análisis. El total mostrado es lo que ya está asegurado, sin las bonificaciones pendientes.";
  if (total === 300) return "Juego perfecto: doce strikes seguidos. No hay nada que analizar, solo que lo enmarques.";
  if (opens === 0) return "Cero frames abiertos. Este es el juego que sostiene un promedio alto: aunque no caigan muchos strikes, no estás regalando pinos.";
  if (opens >= 4) return `${opens} frames abiertos es lo que está costando el juego. Antes de buscar más strikes, trabaja los repuestos: cada abierto convertido vale entre 10 y 20 pinos en el marcador final.`;
  if (strikes >= 6 && spares < 2) return "Muchos strikes y pocos repuestos convertidos: tu primer tiro está bien pero el segundo no. Una bola de plástico y el sistema 3-6-9 arreglan justo esto.";
  return `${strikes} strikes y ${spares} repuestos con ${opens} ${opens === 1 ? "abierto" : "abiertos"}. Estás en un juego de liga normal; el siguiente salto viene de cerrar esos abiertos.`;
}
