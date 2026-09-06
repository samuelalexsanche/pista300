import { cn } from "@/lib/utils";

/**
 * La respuesta directa, arriba del artículo.
 *
 * Por qué existe: lo que un motor generativo levanta para responder es la
 * afirmación específica y autocontenida, no el párrafo bien escrito. Este
 * bloque obliga a que cada artículo tenga una — legible fuera de contexto, sin
 * pronombres que apunten a algo anterior, con las cifras dentro.
 *
 * Sirve igual para el lector: la respuesta primero, el desarrollo después.
 */
export function AnswerBlock({ children, pregunta, className }: { children: React.ReactNode; pregunta?: string; className?: string }) {
  return (
    <div className={cn("border-primary bg-surface rounded-r-lg border-l-2 px-5 py-4", className)}>
      {pregunta && <p className="text-muted-foreground mb-1.5 text-sm font-medium">{pregunta}</p>}
      <p className="text-[17px] leading-relaxed text-pretty">{children}</p>
    </div>
  );
}
