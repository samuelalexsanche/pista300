"use client";

import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type PuntoSerie = { etiqueta: string; serie: number; promedioJuego: number };

/** Tendencia de series. Una sola serie de datos: color de marca, sin leyenda. */
export function TrendChart({ datos, promedio }: { datos: PuntoSerie[]; promedio: number }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={datos} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id="grad-serie" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="etiqueta" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={44} domain={["dataMin - 20", "dataMax + 20"]} />
          <ReferenceLine
            y={promedio * 3}
            stroke="var(--muted-foreground)"
            strokeDasharray="4 4"
            label={{ value: "Promedio", position: "insideTopRight", fontSize: 10, fill: "var(--muted-foreground)" }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              fontSize: 12,
              color: "var(--popover-foreground)",
            }}
            formatter={(v) => [String(v), "Serie (3 juegos)"] as [string, string]}
          />
          <Area type="monotone" dataKey="serie" stroke="var(--chart-1)" strokeWidth={2} fill="url(#grad-serie)" dot={{ r: 2.5, strokeWidth: 0, fill: "var(--chart-1)" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
