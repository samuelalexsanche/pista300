"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpDown, Search } from "lucide-react";
import type { Player } from "@/data/types";
import { teamName } from "@/data/teams";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/marketing/empty-state";
import { cn } from "@/lib/utils";

export type RankingRow = {
  posicion: number;
  slug: string;
  nombre: string;
  ciudad: string;
  equipoSlug?: string;
  nivel: Player["nivel"];
  promedio: number;
  handicap: number;
  juegos: number;
  mejorJuego: number;
  mejorSerie: number;
  forma: number;
};

type Campo = "posicion" | "promedio" | "mejorJuego" | "mejorSerie" | "juegos" | "forma";

export function RankingTable({ filas, ciudades }: { filas: RankingRow[]; ciudades: string[] }) {
  const [q, setQ] = React.useState("");
  const [ciudad, setCiudad] = React.useState("todas");
  const [nivel, setNivel] = React.useState("todos");
  const [campo, setCampo] = React.useState<Campo>("posicion");
  const [asc, setAsc] = React.useState(true);

  const ordenar = (c: Campo) => {
    if (c === campo) setAsc((v) => !v);
    else {
      setCampo(c);
      setAsc(c === "posicion");
    }
  };

  const visibles = React.useMemo(() => {
    const texto = q.trim().toLowerCase();
    const lista = filas.filter((f) => {
      if (ciudad !== "todas" && f.ciudad !== ciudad) return false;
      if (nivel !== "todos" && f.nivel !== nivel) return false;
      if (texto && !f.nombre.toLowerCase().includes(texto)) return false;
      return true;
    });
    return [...lista].sort((a, b) => {
      const dif = a[campo] - b[campo];
      return asc ? dif : -dif;
    });
  }, [filas, q, ciudad, nivel, campo, asc]);

  const Th = ({ c, children, right }: { c: Campo; children: React.ReactNode; right?: boolean }) => (
    <TableHead className={cn(right && "text-right")}>
      <button
        type="button"
        onClick={() => ordenar(c)}
        className={cn(
          // -my-2 py-2: agranda el área táctil a 32px sin alterar el alto de
          // la fila. Un encabezado ordenable de 16px no se puede tocar.
          "-my-2 inline-flex min-h-8 items-center gap-1 py-2 uppercase transition-colors hover:text-foreground",
          campo === c && "text-foreground"
        )}
        aria-label={`Ordenar por ${String(children)}`}
      >
        {children}
        <ArrowUpDown className="size-3" />
      </button>
    </TableHead>
  );

  return (
    <div>
      <div className="bg-surface mb-4 flex flex-wrap gap-3 rounded-xl border p-3">
        <div className="relative min-w-52 flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar jugador" className="pl-9" aria-label="Buscar jugador" />
        </div>
        <Select value={ciudad} onValueChange={setCiudad}>
          <SelectTrigger className="w-44" aria-label="Filtrar por ciudad">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las ciudades</SelectItem>
            {ciudades.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={nivel} onValueChange={setNivel}>
          <SelectTrigger className="w-40" aria-label="Filtrar por nivel">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los niveles</SelectItem>
            <SelectItem value="principiante">Principiante</SelectItem>
            <SelectItem value="intermedio">Intermedio</SelectItem>
            <SelectItem value="avanzado">Avanzado</SelectItem>
            <SelectItem value="competitivo">Competitivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {visibles.length === 0 ? (
        <EmptyState titulo="Sin jugadores" descripcion="Ajusta los filtros para ver resultados." />
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <Th c="posicion">#</Th>
                <TableHead>Jugador</TableHead>
                <TableHead className="hidden md:table-cell">Equipo</TableHead>
                <TableHead className="hidden lg:table-cell">Ciudad</TableHead>
                <Th c="promedio" right>Prom.</Th>
                <TableHead className="hidden sm:table-cell text-right">Hcp</TableHead>
                <Th c="mejorJuego" right>Mejor</Th>
                <Th c="mejorSerie" right>Serie</Th>
                <Th c="juegos" right>Juegos</Th>
                <Th c="forma" right>Forma</Th>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibles.map((f) => (
                <TableRow key={f.slug}>
                  <TableCell className="text-muted-foreground font-mono">{f.posicion}</TableCell>
                  <TableCell>
                    <Link href={`/conecta/jugadores/${f.slug}`} className="font-medium hover:underline">
                      {f.nombre}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">{teamName(f.equipoSlug)}</TableCell>
                  <TableCell className="text-muted-foreground hidden lg:table-cell">{f.ciudad}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">{f.promedio}</TableCell>
                  <TableCell className="text-muted-foreground hidden sm:table-cell text-right font-mono">{f.handicap}</TableCell>
                  <TableCell className="text-right font-mono">{f.mejorJuego}</TableCell>
                  <TableCell className="text-right font-mono">{f.mejorSerie}</TableCell>
                  <TableCell className="text-muted-foreground text-right font-mono">{f.juegos}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={f.forma > 0 ? "positive" : f.forma < 0 ? "negative" : "secondary"}>
                      {f.forma > 0 ? "+" : ""}
                      {f.forma}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <p className="text-muted-foreground mt-3 text-xs">
        Forma = diferencia entre el promedio de las últimas 5 series y el promedio general. Hándicap calculado al 80% de 220.
      </p>
    </div>
  );
}
