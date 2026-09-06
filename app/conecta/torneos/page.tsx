import type { Metadata } from "next";
import { tournaments } from "@/data/tournaments";
import { ciudades } from "@/data/centers";
import { PageHeader } from "@/components/marketing/section-heading";
import { TournamentBrowser } from "@/components/community/tournament-browser";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, itemListSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = metadatos({
  titulo: "Torneos",
  descripcion: "Calendario completo de torneos de boliche en México: fechas, cuotas, patrones, premios e inscripción.",
  ruta: "/conecta/torneos",
  keywords: ["torneos de boliche", "torneos de boliche en México", "calendario de torneos"],
});

export default function TorneosPage() {
  return (
    <>
      <JsonLd
        data={grafo(
          itemListSchema(
            "Torneos de boliche en México",
            tournaments.map((t) => ({ nombre: t.nombre, ruta: `/conecta/torneos/${t.slug}` }))
          ),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Conecta", ruta: "/conecta" },
            { nombre: "Torneos", ruta: "/conecta/torneos" },
          ])
        )}
      />
      <PageHeader
        etiqueta="Conecta"
        titulo="Calendario de torneos"
        descripcion="Todo lo que se juega en el país, en un solo lugar. Filtra por ciudad, formato o bolsa y revisa las reglas antes de inscribirte."
      />
      <div className="container-page py-10">
        <TournamentBrowser torneos={tournaments} ciudades={ciudades} />
      </div>
    </>
  );
}
