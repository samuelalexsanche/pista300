"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import type { Article, CategoriaArticulo } from "@/data/types";
import { ArticleBrowser } from "./article-browser";

/**
 * Lee `?categoria=` del cliente en vez de recibirlo como `searchParams` del
 * servidor.
 *
 * Por qué: leer `searchParams` en la página la vuelve dinámica, y una ruta
 * dinámica no se puede prerenderizar. `/aprende` es la portada de la biblioteca
 * y es de las páginas que más importa que el crawler reciba ya renderizada,
 * así que el filtro se resuelve en el cliente y el HTML sale estático.
 *
 * Debe montarse dentro de un <Suspense>: es requisito de `useSearchParams`.
 */
export function ArticleBrowserParams({ articulos, categorias }: { articulos: Article[]; categorias: CategoriaArticulo[] }) {
  const params = useSearchParams();
  const categoria = params.get("categoria") ?? "todas";

  // La `key` fuerza a reiniciar el estado interno cuando cambia la categoría
  // de la URL (los enlaces del menú apuntan a ?categoria=…).
  return <ArticleBrowser key={categoria} articulos={articulos} categorias={categorias} categoriaInicial={categoria} />;
}
