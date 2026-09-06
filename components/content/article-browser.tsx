"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { Article, CategoriaArticulo, Nivel } from "@/data/types";
import { categoriaLabel } from "@/data/articles";
import { ArticleCard } from "./article-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/marketing/empty-state";
import { cn } from "@/lib/utils";

const niveles: (Nivel | "todos")[] = ["todos", "principiante", "intermedio", "avanzado", "competitivo"];

export function ArticleBrowser({
  articulos,
  categorias,
  categoriaInicial = "todas",
}: {
  articulos: Article[];
  categorias: CategoriaArticulo[];
  categoriaInicial?: string;
}) {
  const [q, setQ] = React.useState("");
  const [categoria, setCategoria] = React.useState(categoriaInicial);
  const [nivel, setNivel] = React.useState<Nivel | "todos">("todos");

  const visibles = articulos.filter((a) => {
    if (categoria !== "todas" && a.categoria !== categoria) return false;
    if (nivel !== "todos" && a.nivel !== nivel) return false;
    const texto = q.trim().toLowerCase();
    if (texto && !`${a.titulo} ${a.resumen} ${a.tags.join(" ")}`.toLowerCase().includes(texto)) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por tema, técnica o palabra clave" className="pl-9" aria-label="Buscar artículo" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip activo={categoria === "todas"} onClick={() => setCategoria("todas")}>
            Todo
          </Chip>
          {categorias.map((c) => (
            <Chip key={c} activo={categoria === c} onClick={() => setCategoria(c)}>
              {categoriaLabel[c]}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground mr-1 text-xs tracking-wide uppercase">Nivel</span>
          {niveles.map((n) => (
            <Button key={n} size="sm" variant={nivel === n ? "secondary" : "ghost"} onClick={() => setNivel(n)} className="capitalize">
              {n}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground mt-6 text-sm tnum">
        {visibles.length} {visibles.length === 1 ? "artículo" : "artículos"}
      </p>

      {visibles.length === 0 ? (
        <EmptyState titulo="Nada por aquí todavía" descripcion="Prueba con otra categoría o busca otra palabra." />
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={cn(
        "rounded-full border px-3 py-1 text-sm transition-colors",
        activo ? "bg-foreground text-background border-transparent" : "hover:bg-surface"
      )}
    >
      {children}
    </button>
  );
}
