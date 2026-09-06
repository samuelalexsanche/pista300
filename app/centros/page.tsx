import type { Metadata } from "next";
import { centers, ciudades } from "@/data/centers";
import { PageHeader } from "@/components/marketing/section-heading";
import { CenterBrowser } from "@/components/community/center-browser";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, centerSchema, itemListSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = metadatos({
  titulo: "Boliches",
  descripcion: "Directorio de boliches en México: líneas, servicios, pro shop y ligas activas.",
  ruta: "/centros",
  keywords: ["boliches en México", "boliche cerca de mí", "centros de boliche"],
});

export default function CentrosPage() {
  return (
    <>
      {/* Cada boliche se marca como BowlingAlley con su dirección: es lo que
          permite aparecer en búsquedas locales del tipo "boliche en Zapopan". */}
      <JsonLd
        data={grafo(
          itemListSchema("Boliches en México", centers.map((c) => ({ nombre: c.nombre, ruta: "/centros" }))),
          ...centers.map((c) => centerSchema(c)),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Boliches", ruta: "/centros" },
          ])
        )}
      />
      <PageHeader
        etiqueta="Conecta"
        titulo="Encuentra un boliche"
        descripcion="Dónde jugar, dónde hay pro shop y dónde hay liga abierta. El directorio que la comunidad mantiene."
      />
      <div className="container-page py-10">
        <CenterBrowser centros={centers} ciudades={ciudades} />
      </div>
    </>
  );
}
