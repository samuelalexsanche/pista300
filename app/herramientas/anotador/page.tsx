import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/section-heading";
import { Scoresheet } from "@/components/tools/scoresheet";
import { PremiumGate } from "@/components/premium/premium-gate";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, toolSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = metadatos({
  titulo: "Anotador de partida",
  descripcion: "Anotador de boliche frame a frame con puntuación real y análisis de la serie.",
  ruta: "/herramientas/anotador",
  keywords: ["anotador de boliche", "cómo se anota en boliche", "hoja de puntuación boliche"],
});

export default function AnotadorPage() {
  return (
    <>
      <JsonLd
        data={grafo(
          toolSchema("Anotador de partida", "Anotador de boliche frame a frame con puntuación real y análisis de la serie.", "/herramientas/anotador", false),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Herramientas", ruta: "/herramientas" },
            { nombre: "Anotador", ruta: "/herramientas/anotador" },
          ])
        )}
      />
      <PageHeader
        etiqueta="Herramienta Premium"
        titulo="Anotador y análisis"
        descripcion="Captura el juego tiro a tiro. La puntuación se calcula con las reglas reales, incluidas las bonificaciones del décimo frame, y al cerrar el juego obtienes el análisis."
      />
      <div className="container-page py-10">
        <PremiumGate
          alto="lg"
          titulo="El anotador es Premium"
          descripcion="Captura tus juegos, guarda el historial y obtén el análisis de strikes, repuestos y pinos perdidos."
        >
          <div className="p-5">
            <Scoresheet />
          </div>
        </PremiumGate>
      </div>
    </>
  );
}
