import type { Metadata } from "next";
import { ranking } from "@/data/players";
import { ciudades } from "@/data/centers";
import { PageHeader } from "@/components/marketing/section-heading";
import { RankingTable, type RankingRow } from "@/components/community/ranking-table";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, itemListSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = metadatos({
  titulo: "Rankings",
  descripcion: "Ranking de la comunidad por promedio, mejor juego, mejor serie y forma reciente.",
  ruta: "/conecta/rankings",
  keywords: ["ranking de boliche", "promedios de boliche", "mejores bolichistas México"],
});

export default function RankingsPage() {
  const filas: RankingRow[] = ranking.map(({ player, stats, posicion }) => ({
    posicion,
    slug: player.slug,
    nombre: player.nombre,
    ciudad: player.ciudad,
    equipoSlug: player.equipoSlug,
    nivel: player.nivel,
    promedio: stats.promedio,
    handicap: stats.handicap,
    juegos: stats.juegos,
    mejorJuego: stats.mejorJuego,
    mejorSerie: stats.mejorSerie,
    forma: stats.forma,
  }));

  return (
    <>
      {/* El ranking ya viene ordenado por promedio: el ItemList declara ese
          orden para que un motor generativo pueda responder "quién va primero"
          sin tener que interpretar la tabla. */}
      <JsonLd
        data={grafo(
          itemListSchema(
            "Ranking de bolichistas por promedio",
            filas.map((f) => ({ nombre: f.nombre, ruta: `/conecta/jugadores/${f.slug}` }))
          ),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Conecta", ruta: "/conecta" },
            { nombre: "Rankings", ruta: "/conecta/rankings" },
          ])
        )}
      />
      <PageHeader
        etiqueta="Conecta"
        titulo="Ranking de la comunidad"
        descripcion="Promedios calculados sobre las series registradas de la temporada. Ordena por cualquier columna para ver quién está en forma."
      />
      <div className="container-page py-10">
        <RankingTable filas={filas} ciudades={ciudades} />
      </div>
    </>
  );
}
