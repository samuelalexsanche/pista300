import Image from "next/image";
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
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority={prioridad}
          className="object-cover"
          style={{ opacity: "var(--fondo-opacidad)" }}
        />
      </div>
      {/* Velo degradado. Denso abajo a la izquierda, donde vive el texto; se
          abre hacia arriba y a la derecha para que la foto se vea. Un velo
          plano tapa la foto entera y deja el fondo en un gris sin sentido. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, var(--fondo-velo) 0%, color-mix(in srgb, var(--fondo-velo) 82%, transparent) 45%, color-mix(in srgb, var(--fondo-velo) 55%, transparent) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, var(--fondo-velo) 0%, color-mix(in srgb, var(--fondo-velo) 60%, transparent) 45%, transparent 85%)",
        }}
      />
    </div>
  );
}
