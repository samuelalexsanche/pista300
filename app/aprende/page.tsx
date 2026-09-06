import type { Metadata } from "next";
import { Suspense } from "react";
import { articles, categoriasEnUso } from "@/data/articles";
import { PageHeader } from "@/components/marketing/section-heading";
import { ArticleBrowserParams } from "@/components/content/article-browser-params";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, itemListSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = metadatos({
  titulo: "Aprende",
  descripcion: "Artículos, tips y tutoriales de boliche: desde las reglas hasta la lectura de pista.",
  ruta: "/aprende",
  keywords: ["artículos de boliche", "aprender boliche", "tips de boliche"],
});

export default function AprendePage() {
  return (
    <>
      <JsonLd
        data={grafo(
          itemListSchema(
            "Biblioteca de artículos de boliche",
            articles.map((a) => ({ nombre: a.titulo, ruta: `/aprende/${a.slug}` }))
          ),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Aprende", ruta: "/aprende" },
          ])
        )}
      />
      <PageHeader
        etiqueta="Aprende"
        titulo="Biblioteca de la comunidad"
        descripcion="Todo lo que se publica en Pista300, ordenado por tema y por nivel. Sin relleno: cada artículo resuelve un problema concreto."
      />
      <div className="container-page py-10">
        {/* El filtro por categoría se lee de la URL en el cliente para que esta
            página se pueda prerenderizar. Ver ArticleBrowserParams. */}
        <Suspense fallback={<div className="bg-surface h-96 animate-pulse rounded-xl" />}>
          <ArticleBrowserParams articulos={articles} categorias={categoriasEnUso} />
        </Suspense>
      </div>
    </>
  );
}
