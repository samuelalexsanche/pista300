import { site } from "@/data/site";
import { imagenOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { players } from "@/data/players";
import { tournaments } from "@/data/tournaments";
import { articles } from "@/data/articles";

/** Imagen Open Graph por defecto. La heredan todas las rutas sin una propia. */
export const alt = `${site.nombre} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Requerido por `output: "export"`: la imagen se rasteriza en build. */
export const dynamic = "force-static";

export default function Image() {
  return imagenOg({
    titulo: "La comunidad del boliche mexicano",
    bajada: "Aprende, mejora y compite. Torneos, ligas, rankings y herramientas de análisis.",
    metricas: [
      { valor: String(players.length), etiqueta: "Jugadores" },
      { valor: String(tournaments.length), etiqueta: "Torneos" },
      { valor: String(articles.length), etiqueta: "Artículos" },
    ],
  });
}
