import Image from "next/image";
import { rutaPublica } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * Imagen del sitio.
 *
 * Sustituye a <Placeholder> ahora que las fotos existen, conservando su misma
 * forma de uso para que el cambio no se derrame por las páginas.
 *
 * Tres cosas que importan y que es fácil perder:
 *
 * 1. `width`/`height` siempre. El export estático corre con el optimizador de
 *    Next apagado, así que la reserva de espacio depende solo de estos valores.
 *    Sin ellos el layout salta al cargar y el CLS se dispara — que es una
 *    métrica de ranking, no un detalle estético.
 * 2. `alt` obligatorio y en español. Es accesibilidad y es lo único que un
 *    motor puede leer de una foto.
 * 3. `prioridad` solo en la imagen que domina la primera pantalla. Marcar
 *    varias con priority es peor que no marcar ninguna: compiten entre sí.
 */

/**
 * OJO con el basePath.
 *
 * Con `images: { unoptimized: true }` (obligatorio en export estático), Next NO
 * antepone el basePath a un `src` de /public: lo emite tal cual. En GitHub
 * Pages, que sirve el sitio bajo /pista300, eso deja TODAS las imágenes en 404
 * sin que nada falle en el build ni en local. Por eso el src pasa siempre por
 * `rutaPublica()`.
 */

/** Ancho real al que se sirve cada proporción, ya en pixeles de retina. */
const DIMENSIONES: Record<string, { w: number; h: number }> = {
  "21/9": { w: 1600, h: 686 },
  "16/9": { w: 1600, h: 900 },
  "4/3": { w: 1200, h: 900 },
  "1/1": { w: 800, h: 800 },
};

export function Foto({
  src,
  alt,
  ratio = "16/9",
  className,
  prioridad = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
}: {
  src: string;
  /** Descripción en español. Vacío solo si la imagen es puramente decorativa. */
  alt: string;
  ratio?: keyof typeof DIMENSIONES | string;
  className?: string;
  prioridad?: boolean;
  sizes?: string;
}) {
  const dim = DIMENSIONES[ratio] ?? DIMENSIONES["16/9"];

  return (
    <div className={cn("bg-surface relative overflow-hidden rounded-lg", className)} style={{ aspectRatio: ratio }}>
      <Image
        src={rutaPublica(src)}
        alt={alt}
        width={dim.w}
        height={dim.h}
        sizes={sizes}
        priority={prioridad}
        loading={prioridad ? undefined : "lazy"}
        className="size-full object-cover"
      />
    </div>
  );
}
