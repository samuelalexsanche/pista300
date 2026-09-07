import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Hand, MapPin, Users } from "lucide-react";
import { players, playerBySlug, playerStats, ranking } from "@/data/players";
import { teamBySlug } from "@/data/teams";
import { centerName } from "@/data/centers";
import { leagueName } from "@/data/leagues";
import { ballBySlug } from "@/data/balls";
import { seriesTotal, average, deltaFromAverage } from "@/lib/bowling";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Stat, StatStrip } from "@/components/marketing/stat";
import { TrendChart } from "@/components/community/trend-chart";
import { PremiumGate } from "@/components/premium/premium-gate";
import { iniciales } from "@/components/community/player-card";
import { JsonLd } from "@/components/seo/json-ld";
import { metadatos } from "@/lib/seo";
import { grafo, playerSchema, profilePageSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = playerBySlug(slug);
  if (!p) return {};
  const s = playerStats(p);
  return metadatos({
    titulo: p.apodo ? `${p.nombre} "${p.apodo}"` : p.nombre,
    // Las cifras van en la descripción: es lo que diferencia este perfil de
    // otros 22 y lo que un motor generativo puede citar textualmente.
    descripcion: `Promedio de ${s.promedio} en ${s.juegos} juegos, hándicap ${s.handicap}, mejor juego de ${p.mejorJuego}. Perfil, tendencia y historial de ${p.nombre}, bolichista de ${p.ciudad}.`,
    ruta: `/conecta/jugadores/${p.slug}`,
    keywords: [p.nombre, `bolichista ${p.ciudad}`, "promedio de boliche", "ranking boliche México"],
  });
}

export default async function JugadorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = playerBySlug(slug);
  if (!p) notFound();

  const stats = playerStats(p);
  const posicion = ranking.find((r) => r.player.slug === p.slug)?.posicion ?? 0;
  const equipo = teamBySlug(p.equipoSlug ?? "");
  const bola = ballBySlug(p.bolaSlug);

  const datos = p.series.map((s, i) => ({
    etiqueta: `S${i + 1}`,
    serie: seriesTotal(s.juegos),
    promedioJuego: average(s.juegos),
  }));

  const ultimas = [...p.series].reverse().slice(0, 10);

  const persona = playerSchema(p, stats.promedio, equipo);
  const rutaPerfil = `/conecta/jugadores/${p.slug}`;

  return (
    <>
      <JsonLd
        data={grafo(
          persona,
          profilePageSchema(persona, rutaPerfil),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Conecta", ruta: "/conecta" },
            { nombre: "Rankings", ruta: "/conecta/rankings" },
            { nombre: p.nombre, ruta: rutaPerfil },
          ])
        )}
      />
      <div className="border-b">
        <div className="container-page py-8">
          <Link href="/conecta/rankings" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="size-4" /> Ranking
          </Link>
          <div className="flex flex-wrap items-start gap-5">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg">{iniciales(p.nombre)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="data">#{posicion} del ranking</Badge>
                <Badge variant="secondary" className="capitalize">{p.nivel}</Badge>
                {p.mano === "izquierda" && <Badge variant="outline">Zurda</Badge>}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {p.nombre}
                {p.apodo && <span className="text-muted-foreground ml-2 text-xl font-normal">«{p.apodo}»</span>}
              </h1>
              <p className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> {p.ciudad} · {centerName(p.centroSlug)}
                </span>
                {equipo && (
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5" />
                    <Link href={`/conecta/equipos/${equipo.slug}`} className="hover:underline">
                      {equipo.nombre}
                    </Link>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Hand className="size-3.5" /> Mano {p.mano} · desde {p.desdeAnio}
                </span>
              </p>
            </div>
          </div>

          <StatStrip className="mt-8 sm:grid-cols-5">
            <Stat valor={stats.promedio} etiqueta="Promedio" tono="primary" />
            <Stat valor={stats.handicap} etiqueta="Hándicap" detalle="80% de 220" />
            <Stat valor={stats.mejorJuego} etiqueta="Mejor juego" />
            <Stat valor={stats.mejorSerie} etiqueta="Mejor serie" />
            <Stat
              valor={`${stats.forma > 0 ? "+" : ""}${stats.forma}`}
              etiqueta="Forma"
              detalle="últimas 5 series"
              tono={stats.forma > 0 ? "positive" : stats.forma < 0 ? "negative" : "neutral"}
            />
          </StatStrip>
        </div>
      </div>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        {/* min-w-0: deja que la gráfica y las tablas encojan en móvil. */}
        <div className="flex min-w-0 flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de la temporada</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendChart datos={datos} promedio={stats.promedio} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de series</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <PremiumGate
                titulo="Historial completo"
                descripcion="Los socios Premium ven las 18 series de la temporada, el detalle por juego y la comparación contra la liga."
                alto="lg"
                className="mx-5 border-0"
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="hidden sm:table-cell">Liga</TableHead>
                      <TableHead className="text-right">J1</TableHead>
                      <TableHead className="text-right">J2</TableHead>
                      <TableHead className="text-right">J3</TableHead>
                      <TableHead className="text-right">Serie</TableHead>
                      <TableHead className="text-right">vs prom.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ultimas.map((s) => {
                      const total = seriesTotal(s.juegos);
                      const d = deltaFromAverage(average(s.juegos), stats.promedio);
                      return (
                        <TableRow key={s.id}>
                          <TableCell className="tnum">{formatDate(s.fecha)}</TableCell>
                          <TableCell className="text-muted-foreground hidden sm:table-cell">{leagueName(s.ligaSlug)}</TableCell>
                          {s.juegos.map((j, i) => (
                            <TableCell key={i} className="text-right font-mono">
                              {j}
                            </TableCell>
                          ))}
                          <TableCell className="text-right font-mono font-semibold">{total}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={d.tone === "positive" ? "positive" : d.tone === "negative" ? "negative" : "secondary"}>{d.label}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </PremiumGate>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          {bola && (
            <Card>
              <CardHeader>
                <CardTitle>Su equipo</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <Link href={`/mejora/equipo/${bola.slug}`} className="font-medium hover:underline">
                  {bola.marca} {bola.modelo}
                </Link>
                <p className="text-muted-foreground mt-1 text-xs">
                  {bola.cubierta} · {bola.acabado} · aceite {bola.aceite}
                </p>
                <p className="text-muted-foreground mt-3 leading-relaxed">{bola.resumen}</p>
              </CardContent>
            </Card>
          )}
          {equipo && (
            <Card>
              <CardHeader>
                <CardTitle>Equipo y liga</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 text-sm">
                <Link href={`/conecta/equipos/${equipo.slug}`} className="font-medium hover:underline">
                  {equipo.nombre}
                </Link>
                <span className="text-muted-foreground">{leagueName(equipo.ligaSlug)}</span>
                <span className="text-muted-foreground tnum">
                  Récord {equipo.ganados}–{equipo.perdidos}
                </span>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
