import { ExternalLink } from "lucide-react";
import type { Fuente } from "@/data/types";

/**
 * Fuentes del artículo.
 *
 * Citar fuentes es una de las tres intervenciones que la investigación de GEO
 * mide como más efectivas para ser citado, junto con incluir estadísticas y
 * atribuir las citas textuales. La razón es la misma en los tres casos: dan
 * algo verificable. Una afirmación sin respaldo se diluye en el resumen.
 */
export function SourcesList({ fuentes }: { fuentes: Fuente[] }) {
  if (!fuentes.length) return null;

  return (
    <section className="mt-12 border-t pt-6">
      <h2 className="text-sm font-semibold">Fuentes</h2>
      <ol className="mt-3 flex flex-col gap-2.5">
        {fuentes.map((f, i) => (
          <li key={f.url} className="flex gap-3 text-sm leading-relaxed">
            <span className="text-muted-foreground font-mono text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary inline-flex items-center gap-1 font-medium underline underline-offset-2"
              >
                {f.titulo}
                <ExternalLink className="size-3 shrink-0" aria-hidden />
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
              <span className="text-muted-foreground">
                {" "}
                — {f.organizacion}
                {f.anio ? <span className="font-mono tabular-nums"> {f.anio}</span> : null}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
