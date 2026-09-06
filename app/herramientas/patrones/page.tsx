import type { Metadata } from "next";
import { oilPatterns } from "@/data/oil-patterns";
import { PageHeader } from "@/components/marketing/section-heading";
import { OilPatternViewer } from "@/components/tools/oil-pattern-viewer";
import { PremiumGate } from "@/components/premium/premium-gate";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, toolSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = metadatos({
  titulo: "Banco de patrones de aceite",
  descripcion: "Perfil de volumen, longitud, ratio y línea sugerida de los patrones de aceite más usados.",
  ruta: "/herramientas/patrones",
  keywords: ["patrones de aceite", "patrón de aceite boliche"],
});

export default function PatronesPage() {
  return (
    <>
      <JsonLd
        data={grafo(
          toolSchema("Banco de patrones de aceite", "Perfil de volumen, longitud, ratio y línea sugerida de los patrones de aceite.", "/herramientas/patrones", false),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Herramientas", ruta: "/herramientas" },
            { nombre: "Patrones", ruta: "/herramientas/patrones" },
          ])
        )}
      />
      <PageHeader
        etiqueta="Herramienta Premium"
        titulo="Banco de patrones de aceite"
        descripcion="El perfil de cada patrón, su ratio y por dónde se juega. Antes de un torneo, esto es lo primero que hay que estudiar."
      />
      <div className="container-page py-10">
        <PremiumGate
          alto="lg"
          titulo="El banco de patrones es Premium"
          descripcion="Perfil de volumen tabla por tabla, ratio y la línea sugerida para cada patrón, incluidos los de campeonato."
        >
          <div className="p-5">
            <OilPatternViewer patrones={oilPatterns} />
          </div>
        </PremiumGate>
        <p className="text-muted-foreground mt-8 max-w-3xl text-xs leading-relaxed">
          Nota del demo: los perfiles son representaciones generadas para ilustrar la herramienta. En producción se cargan
          desde las hojas oficiales de cada patrón.
        </p>
      </div>
    </>
  );
}
