import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/section-heading";
import { SpareGuide } from "@/components/tools/spare-guide";
import { PremiumGate } from "@/components/premium/premium-gate";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, toolSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = metadatos({
  titulo: "Guía de repuestos",
  descripcion: "Diagrama interactivo de repuestos y splits con posición de parada, objetivo y consejo.",
  ruta: "/herramientas/repuestos",
  keywords: ["repuestos de boliche", "cómo tirar splits", "spare boliche"],
});

export default function RepuestosPage() {
  return (
    <>
      <JsonLd
        data={grafo(
          toolSchema("Guía de repuestos", "Diagrama interactivo de repuestos y splits con posición de parada, objetivo y consejo.", "/herramientas/repuestos", false),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Herramientas", ruta: "/herramientas" },
            { nombre: "Repuestos", ruta: "/herramientas/repuestos" },
          ])
        )}
      />
      <PageHeader
        etiqueta="Herramienta Premium"
        titulo="Guía de repuestos"
        descripcion="Elige lo que te quedó parado y obtén dónde pararte, a dónde apuntar y qué evitar. Convertir repuestos es lo que más rápido sube un promedio."
      />
      <div className="container-page py-10">
        <PremiumGate
          alto="lg"
          titulo="La guía completa es Premium"
          descripcion="Incluye todos los splits y la lógica detrás de cada tiro, no solo los repuestos fáciles."
        >
          <div className="p-5">
            <SpareGuide />
          </div>
        </PremiumGate>
      </div>
    </>
  );
}
