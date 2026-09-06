import { players, playerBySlug, playerStats, ranking } from "@/data/players";
import { imagenOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

/**
 * Tarjeta social del jugador: promedio, hándicap y mejor juego.
 * Es la imagen que se ve cuando alguien presume su perfil en un grupo.
 */
export const alt = "Perfil de jugador en Pista300";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Requerido por `output: "export"`: la imagen se rasteriza en build. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = playerBySlug(slug);
  if (!p) return imagenOg({ titulo: "Jugador no encontrado" });

  const s = playerStats(p);
  const posicion = ranking.find((r) => r.player.slug === p.slug)?.posicion;

  return imagenOg({
    etiqueta: posicion ? `#${posicion} del ranking` : "Jugador",
    titulo: p.nombre,
    bajada: `${p.ciudad} · mano ${p.mano} · desde ${p.desdeAnio}`,
    metricas: [
      { valor: String(s.promedio), etiqueta: "Promedio" },
      { valor: String(s.handicap), etiqueta: "Hándicap" },
      { valor: String(p.mejorJuego), etiqueta: "Mejor juego" },
    ],
  });
}
