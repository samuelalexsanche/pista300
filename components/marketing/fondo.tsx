import Image from "next/image";
import { rutaPublica } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * Capa de fondo con parallax.
 *
 * Da profundidad sin robarle protagonismo al dato, que es de lo que va este
 * sitio. Tres decisiones deliberadas:
 *
 * 1. La foto va bajo un velo (`--fondo-velo`) y a opacidad reducida. El texto
 *    encima conserva su contraste en los dos temas sin tener que repetir
 *    colores en cada sección.
 * 2. `aria-hidden` y `alt=""`: es decoración. Anunciarla a un lector de
 *    pantalla sería ruido.
 * 3. El desplazamiento lo hace CSS con `animation-timeline`, no JavaScript.
 *    No hay listener de scroll. Donde no se soporta, la foto se queda quieta y
 *    la sección se ve igual de bien.
 */
export function Fondo({
  src,
  className,
  prioridad = false,
}: {
  src: string;
  className?: string;
  /** Solo para el fondo que aparece en la primera pantalla. */
  prioridad?: boolean;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="parallax-capa absolute inset-0">
        <Image
          src={rutaPublica(src)}
          alt=""
          fill
          sizes="100vw"
          priority={prioridad}
          className="object-cover"
          style={{ opacity: "var(--fondo-opacidad)" }}
        />
      </div>
      {/* Velo degradado, denso donde vive el texto y abierto hacia arriba y a
          la derecha. Los valores son tokens porque cada tema necesita una
          fuerza distinta; ver app/globals.css. */}
      <div className="absolute inset-0" style={{ background: "var(--fondo-velo-v)" }} />
      <div className="absolute inset-0" style={{ background: "var(--fondo-velo-h)" }} />
    </div>
  );
}
