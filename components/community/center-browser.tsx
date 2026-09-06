"use client";

import * as React from "react";
import { MapPin, Phone, Search, Wrench } from "lucide-react";
import type { Center } from "@/data/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/marketing/empty-state";

export function CenterBrowser({ centros, ciudades }: { centros: Center[]; ciudades: string[] }) {
  const [q, setQ] = React.useState("");
  const [ciudad, setCiudad] = React.useState("todas");
  const [soloProShop, setSoloProShop] = React.useState(false);

  const visibles = centros.filter((c) => {
    if (ciudad !== "todas" && c.ciudad !== ciudad) return false;
    if (soloProShop && !c.proShop) return false;
    const texto = q.trim().toLowerCase();
    if (texto && !`${c.nombre} ${c.ciudad} ${c.colonia}`.toLowerCase().includes(texto)) return false;
    return true;
  });

  return (
    <div>
      <div className="bg-surface flex flex-wrap items-center gap-3 rounded-xl border p-3">
        <div className="relative min-w-52 flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar boliche o colonia" className="pl-9" aria-label="Buscar boliche" />
        </div>
        <Select value={ciudad} onValueChange={setCiudad}>
          <SelectTrigger className="w-48" aria-label="Filtrar por ciudad">
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
        <div className="flex items-center gap-2 px-1">
          <Checkbox id="proshop" checked={soloProShop} onCheckedChange={(v) => setSoloProShop(v === true)} />
          <Label htmlFor="proshop" className="cursor-pointer text-sm font-normal">
            Solo con pro shop
          </Label>
        </div>
      </div>

      {visibles.length === 0 ? (
        <EmptyState titulo="Sin boliches" descripcion="Prueba con otra ciudad o quita el filtro de pro shop." />
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((c) => (
            <Card key={c.slug}>
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{c.nombre}</h2>
                    <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                      <MapPin className="size-3" /> {c.colonia}, {c.ciudad}
                    </p>
                  </div>
                  <Badge variant="secondary" className="tnum shrink-0">
                    {c.lineas} líneas
                  </Badge>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {c.servicios.map((s) => (
                    <li key={s}>
                      <Badge variant="outline">{s}</Badge>
                    </li>
                  ))}
                </ul>
                <div className="text-muted-foreground mt-auto flex items-center justify-between border-t pt-3 text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="size-3" /> {c.telefono}
                  </span>
                  <span className="inline-flex items-center gap-1.5 tnum">
                    <Wrench className="size-3" /> {c.ligasActivas} ligas
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
