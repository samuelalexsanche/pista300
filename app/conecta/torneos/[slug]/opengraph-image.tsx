import { tournaments, tournamentBySlug, formatoLabel } from "@/data/tournaments";
import { formatMoney } from "@/lib/format";
import { imagenOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

/**
 * Tarjeta social del torneo. Lleva la bolsa y el cupo porque son los dos datos
 * que deciden si alguien abre el enlace cuando se comparte en un grupo.
 */
export const alt = "Torneo en Pista300";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Requerido por `output: "export"`: la imagen se rasteriza en build. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return tournaments.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = tournamentBySlug(slug);
  if (!t) return imagenOg({ titulo: "Torneo no encontrado" });

  return imagenOg({
    etiqueta: `Torneo ${formatoLabel[t.formato]}`,
    titulo: t.nombre,
    bajada: t.ciudad,
    metricas: [
      { valor: formatMoney(t.bolsaGarantizada), etiqueta: "Bolsa garantizada" },
      { valor: String(t.cupo), etiqueta: "Cupo" },
      { valor: `$${t.cuota}`, etiqueta: "Inscripción" },
    ],
  });
}
