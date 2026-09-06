"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Star, X } from "lucide-react";
import type { Ball } from "@/data/types";
import { formatMoney } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/marketing/empty-state";
import { cn } from "@/lib/utils";

/** Barra de 1–10 para las características de movimiento. */
function Barra({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground w-16 shrink-0 text-[11px] tracking-wide uppercase">{etiqueta}</span>
      <span className="bg-surface-2 relative h-1.5 flex-1 overflow-hidden rounded-full">
        <span className="bg-primary absolute inset-y-0 left-0 rounded-full" style={{ width: `${valor * 10}%` }} />
      </span>
      <span className="w-5 shrink-0 text-right font-mono text-[11px] tabular-nums">{valor}</span>
    </div>
  );
}

export function BallComparator({ bolas, marcas }: { bolas: Ball[]; marcas: string[] }) {
  const [q, setQ] = React.useState("");
  const [marca, setMarca] = React.useState("todas");
  const [aceite, setAceite] = React.useState("todos");
  const [orden, setOrden] = React.useState("calificacion");
  const [seleccion, setSeleccion] = React.useState<string[]>([]);

  const visibles = React.useMemo(() => {
    const texto = q.trim().toLowerCase();
    const lista = bolas.filter((b) => {
      if (marca !== "todas" && b.marca !== marca) return false;
      if (aceite !== "todos" && b.aceite !== aceite) return false;
      if (texto && !`${b.marca} ${b.modelo} ${b.core} ${b.cubierta}`.toLowerCase().includes(texto)) return false;
      return true;
    });
    return [...lista].sort((a, b) => {
      if (orden === "precio") return a.precio - b.precio;
      if (orden === "gancho") return b.factorGancho - a.factorGancho;
      if (orden === "anio") return b.anio - a.anio;
      return b.calificacion - a.calificacion;
    });
  }, [bolas, q, marca, aceite, orden]);

  const comparadas = bolas.filter((b) => seleccion.includes(b.slug));

  const alternar = (slug: string) =>
    setSeleccion((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : prev.length >= 4 ? prev : [...prev, slug]));

  return (
    <div>
      <div className="bg-surface flex flex-wrap items-center gap-3 rounded-xl border p-3">
        <div className="relative min-w-52 flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar marca, modelo o cubierta" className="pl-9" aria-label="Buscar bola" />
        </div>
        <Select value={marca} onValueChange={setMarca}>
          <SelectTrigger className="w-40" aria-label="Filtrar por marca">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las marcas</SelectItem>
            {marcas.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={aceite} onValueChange={setAceite}>
          <SelectTrigger className="w-40" aria-label="Filtrar por condición de aceite">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todo tipo de aceite</SelectItem>
            <SelectItem value="seco">Pista seca</SelectItem>
            <SelectItem value="medio">Aceite medio</SelectItem>
            <SelectItem value="pesado">Aceite pesado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={orden} onValueChange={setOrden}>
          <SelectTrigger className="w-44" aria-label="Ordenar">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="calificacion">Mejor calificadas</SelectItem>
            <SelectItem value="gancho">Más gancho</SelectItem>
            <SelectItem value="precio">Menor precio</SelectItem>
            <SelectItem value="anio">Más recientes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {comparadas.length > 0 && (
        <div className="mt-6 rounded-xl border">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <p className="text-sm font-medium">
              Comparando {comparadas.length} {comparadas.length === 1 ? "bola" : "bolas"}
              <span className="text-muted-foreground font-normal"> · máximo 4</span>
            </p>
            <Button variant="ghost" size="sm" onClick={() => setSeleccion([])}>
              <X /> Limpiar
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Característica</TableHead>
                {comparadas.map((b) => (
                  <TableHead key={b.slug} className="text-foreground text-right normal-case">
                    {b.marca} {b.modelo}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(
                [
                  ["Cubierta", (b: Ball) => b.cubierta],
                  ["Acabado", (b: Ball) => b.acabado],
                  ["Core", (b: Ball) => b.core],
                  ["RG", (b: Ball) => b.rg.toFixed(2)],
                  ["Diferencial", (b: Ball) => b.diferencial.toFixed(3)],
                  ["Gancho (1-10)", (b: Ball) => b.factorGancho],
                  ["Largo (1-10)", (b: Ball) => b.largo],
                  ["Backend (1-10)", (b: Ball) => b.backend],
                  ["Aceite", (b: Ball) => b.aceite],
                  ["Precio", (b: Ball) => formatMoney(b.precio)],
                ] as [string, (b: Ball) => React.ReactNode][]
              ).map(([etiqueta, valor]) => (
                <TableRow key={etiqueta}>
                  <TableCell className="text-muted-foreground">{etiqueta}</TableCell>
                  {comparadas.map((b) => (
                    <TableCell key={b.slug} className="text-right font-mono capitalize">
                      {valor(b)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <p className="text-muted-foreground mt-6 text-sm tnum">
        {visibles.length} {visibles.length === 1 ? "bola" : "bolas"}
      </p>

      {visibles.length === 0 ? (
        <EmptyState titulo="Sin resultados" descripcion="Ajusta los filtros de marca o condición de aceite." />
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((b) => {
            const activa = seleccion.includes(b.slug);
            return (
              <Card key={b.slug} className={cn("transition-colors", activa && "border-primary")}>
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-muted-foreground text-xs tracking-wide uppercase">{b.marca}</p>
                      <Link href={`/mejora/equipo/${b.slug}`} className="hover:text-primary font-semibold transition-colors">
                        {b.modelo}
                      </Link>
                    </div>
                    <span className="inline-flex items-center gap-1 font-mono text-sm">
                      <Star className="fill-primary text-primary size-3.5" />
                      {b.calificacion}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="capitalize">Aceite {b.aceite}</Badge>
                    <Badge variant="outline">{b.core}</Badge>
                    <Badge variant="outline">{b.anio}</Badge>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Barra valor={b.factorGancho} etiqueta="Gancho" />
                    <Barra valor={b.largo} etiqueta="Largo" />
                    <Barra valor={b.backend} etiqueta="Backend" />
                  </div>
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{b.resumen}</p>
                  <div className="mt-auto flex items-center justify-between border-t pt-3">
                    <span className="font-mono text-sm font-medium">{formatMoney(b.precio)}</span>
                    <label className="flex cursor-pointer items-center gap-2 text-xs">
                      <Checkbox checked={activa} onCheckedChange={() => alternar(b.slug)} aria-label={`Comparar ${b.marca} ${b.modelo}`} />
                      Comparar
                    </label>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
