import type { MetadataRoute } from "next";
import { site, coloresMeta, organizacion } from "@/data/site";

/** Requerido por `output: "export"`: estos handlers se resuelven en build. */
export const dynamic = "force-static";

/**
 * Web App Manifest. No es un factor de ranking, pero sí de calidad percibida:
 * define cómo se ve el sitio al guardarse en la pantalla de inicio en móvil,
 * que es donde va a vivir para un bolichista que consulta su promedio.
 *
 * Sin `icons` todavía: no hay binarios en el proyecto (regla 6 del AGENTS.md).
 * Cuando existan, se agregan aquí y en `app/icon.png`.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.nombre} — ${site.tagline}`,
    short_name: site.nombre,
    description: site.descripcion,
    start_url: "/",
    display: "standalone",
    background_color: coloresMeta.claro,
    theme_color: coloresMeta.marca,
    lang: organizacion.idioma,
    dir: "ltr",
    categories: ["sports", "education"],
  };
}
