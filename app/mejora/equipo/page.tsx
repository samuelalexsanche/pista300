import type { Metadata } from "next";
import { balls, marcas } from "@/data/balls";
import { PageHeader } from "@/components/marketing/section-heading";
import { BallComparator } from "@/components/tools/ball-comparator";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Equipo y comparador de bolas",
  descripcion: "Compara bolas de boliche por cubierta, core, RG, diferencial, gancho y precio.",
  ruta: "/mejora/equipo",
  keywords: ["comparador de bolas", "mejores bolas de boliche", "qué bola de boliche comprar"],
});

export default function EquipoPage() {
  return (
    <>
      <PageHeader
        etiqueta="Mejora"
        titulo="Comparador de bolas"
        descripcion="Filtra por condición de pista y compara hasta cuatro bolas lado a lado. Los números son los que importan: RG, diferencial y forma del movimiento."
      />
      <div className="container-page py-10">
        <BallComparator bolas={balls} marcas={marcas} />
        <p className="text-muted-foreground mt-8 max-w-3xl text-xs leading-relaxed">
          Nota del demo: las especificaciones mostradas son plausibles pero no verificadas. Antes de publicar hay que
          sustituirlas por las fichas oficiales de cada fabricante o por mediciones propias.
        </p>
      </div>
    </>
  );
}
