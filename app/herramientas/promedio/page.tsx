import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/section-heading";
import { AverageCalculator } from "@/components/tools/average-calculator";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, toolSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = metadatos({
  titulo: "Calculadora de promedio y hándicap",
  descripcion: "Calcula tu promedio de boliche y tu hándicap con las fórmulas más usadas en México.",
  ruta: "/herramientas/promedio",
  keywords: ["calculadora de promedio boliche", "cómo se calcula el hándicap", "promedio de boliche"],
});

export default function PromedioPage() {
  return (
    <>
      <JsonLd
        data={grafo(
          toolSchema("Calculadora de promedio y hándicap", "Calcula tu promedio de boliche y tu hándicap con las fórmulas de la USBC.", "/herramientas/promedio", true),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Herramientas", ruta: "/herramientas" },
            { nombre: "Promedio", ruta: "/herramientas/promedio" },
          ])
        )}
      />
      <PageHeader
        etiqueta="Herramienta gratuita"
        titulo="Promedio y hándicap"
        descripcion="Captura tus juegos y obtén el promedio truncado y el hándicap según la fórmula de tu liga. Es la herramienta abierta de Pista300."
      />
      <div className="container-page py-10">
        <AverageCalculator />
      </div>
    </>
  );
}
