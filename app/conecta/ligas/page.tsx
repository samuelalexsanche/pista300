import type { Metadata } from "next";
import Link from "next/link";
import { leagues } from "@/data/leagues";
import { teamBySlug } from "@/data/teams";
import { centerName } from "@/data/centers";
import { PageHeader } from "@/components/marketing/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Ligas",
  descripcion: "Ligas activas por temporada con tabla de posiciones, formato y hándicap.",
  ruta: "/conecta/ligas",
  keywords: ["ligas de boliche", "tabla de posiciones boliche"],
});

export default function LigasPage() {
  return (
    <>
      <PageHeader
        etiqueta="Conecta"
        titulo="Ligas y tablas de posiciones"
        descripcion="Las standing sheets, pero legibles. Formato, hándicap y avance de temporada de cada liga registrada."
      />
      <div className="container-page flex flex-col gap-8 py-10">
        {leagues.map((l) => (
          <Card key={l.slug}>
            <CardHeader className="gap-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">{l.nombre}</CardTitle>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {centerName(l.centroSlug)} · {l.dia} {l.hora} · {l.formato}
                  </p>
                </div>
                <Badge variant="secondary">Temporada {l.temporada}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={(l.semanaActual / l.semanas) * 100} className="max-w-xs" />
                <span className="text-muted-foreground text-xs tnum">
                  Semana {l.semanaActual} de {l.semanas}
                </span>
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-5">#</TableHead>
                    <TableHead>Equipo</TableHead>
                    <TableHead className="text-right">Pts</TableHead>
                    <TableHead className="text-right">G</TableHead>
                    <TableHead className="text-right">P</TableHead>
                    <TableHead className="hidden text-right sm:table-cell">Pinfall</TableHead>
                    <TableHead className="pr-5 text-right">Prom.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {l.standings.map((s, i) => {
                    const equipo = teamBySlug(s.teamSlug);
                    return (
                      <TableRow key={s.teamSlug}>
                        <TableCell className="text-muted-foreground pl-5 font-mono">{i + 1}</TableCell>
                        <TableCell>
                          <Link href={`/conecta/equipos/${s.teamSlug}`} className="font-medium hover:underline">
                            {equipo?.nombre ?? s.teamSlug}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold">{s.puntos}</TableCell>
                        <TableCell className="text-right font-mono">{s.ganados}</TableCell>
                        <TableCell className="text-right font-mono">{s.perdidos}</TableCell>
                        <TableCell className="text-muted-foreground hidden text-right font-mono sm:table-cell">{s.pinfall.toLocaleString("es-MX")}</TableCell>
                        <TableCell className="pr-5 text-right font-mono">{s.promedioEquipo}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
