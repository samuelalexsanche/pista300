import { cn } from "@/lib/utils";

/**
 * El triángulo de 10 pinos es el motivo estructural de la marca.
 * Se usa como marca de agua del hero y como icono de sección.
 */
export function PinTriangle({ className, filas = 4 }: { className?: string; filas?: number }) {
  const puntos: { x: number; y: number; i: number }[] = [];
  let i = 0;
  for (let f = 0; f < filas; f++) {
    const cantidad = filas - f;
    for (let p = 0; p < cantidad; p++) {
      puntos.push({ x: 50 + (p - (cantidad - 1) / 2) * 18, y: 14 + f * 22, i: i++ });
    }
  }
  return (
    <svg viewBox="0 0 100 100" className={cn("size-full", className)} aria-hidden focusable="false">
      {puntos.map((p) => (
        <circle key={p.i} cx={p.x} cy={p.y} r="6" className="fill-current" opacity={0.18 + (p.i % 5) * 0.08} />
      ))}
    </svg>
  );
}
