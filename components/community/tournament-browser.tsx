"use client";

import * as React from "react";
import type { Tournament } from "@/data/types";
import { formatoLabel } from "@/data/tournaments";
import { TournamentCard } from "./tournament-card";
import { EmptyState } from "@/components/marketing/empty-state";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export function TournamentBrowser({ torneos, ciudades }: { torneos: Tournament[]; ciudades: string[] }) {
  const [q, setQ] = React.useState("");
  const [ciudad, setCiudad] = React.useState("todas");
  const [formato, setFormato] = React.useState("todos");
  const [orden, setOrden] = React.useState("fecha");

  const filtrados = React.useMemo(() => {
    const texto = q.trim().toLowerCase();
    const lista = torneos.filter((t) => {
      if (ciudad !== "todas" && t.ciudad !== ciudad) return false;
      if (formato !== "todos" && t.formato !== formato) return false;
      if (texto && !`${t.nombre} ${t.descripcion} ${t.ciudad}`.toLowerCase().includes(texto)) return false;
      return true;
    });
    return [...lista].sort((a, b) => {
      if (orden === "bolsa") return b.bolsaGarantizada - a.bolsaGarantizada;
      if (orden === "cuota") return a.cuota - b.cuota;
      return a.fechaInicio.localeCompare(b.fechaInicio);
    });
  }, [torneos, q, ciudad, formato, orden]);

  const hayFiltros = q !== "" || ciudad !== "todas" || formato !== "todos";

  return (
    <div>
      <div className="bg-surface flex flex-wrap items-center gap-3 rounded-xl border p-3">
        <div className="relative min-w-52 flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar torneo o ciudad" className="pl-9" aria-label="Buscar torneo" />
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
        <Select value={formato} onValueChange={setFormato}>
          <SelectTrigger className="w-40" aria-label="Filtrar por formato">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los formatos</SelectItem>
            {Object.entries(formatoLabel).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={orden} onValueChange={setOrden}>
          <SelectTrigger className="w-40" aria-label="Ordenar">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fecha">Más próximos</SelectItem>
            <SelectItem value="bolsa">Mayor bolsa</SelectItem>
            <SelectItem value="cuota">Menor cuota</SelectItem>
          </SelectContent>
        </Select>
        {hayFiltros && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQ("");
              setCiudad("todas");
              setFormato("todos");
            }}
          >
            <X /> Limpiar
          </Button>
        )}
      </div>

      <p className="text-muted-foreground mt-4 text-sm tnum">
        {filtrados.length} {filtrados.length === 1 ? "torneo" : "torneos"}
      </p>

      {filtrados.length === 0 ? (
        <EmptyState titulo="Ningún torneo coincide" descripcion="Prueba quitando algún filtro o buscando por otra ciudad." />
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((t) => (
            <TournamentCard key={t.slug} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}
