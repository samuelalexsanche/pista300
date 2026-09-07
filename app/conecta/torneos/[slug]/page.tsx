import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Users, Ticket, Droplets, ArrowLeft } from "lucide-react";
import { tournaments, tournamentBySlug, formatoLabel } from "@/data/tournaments";
import { centerBySlug } from "@/data/centers";
import { patternBySlug } from "@/data/oil-patterns";
import { playerBySlug } from "@/data/players";
import { formatDateRange, formatMoney, daysUntil } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Foto } from "@/components/marketing/foto";
import { Stat } from "@/components/marketing/stat";
import { PlayerCard } from "@/components/community/player-card";
import { TournamentRegister } from "@/components/community/tournament-register";
import { JsonLd } from "@/components/seo/json-ld";
import { metadatos } from "@/lib/seo";
import { grafo, tournamentSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return tournaments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = tournamentBySlug(slug);
  if (!t) return {};
  return metadatos({
    titulo: t.nombre,
    // La descripción lleva ciudad, formato y fecha: es lo que la gente busca
    // ("torneo de boliche en Guadalajara en marzo") y lo que un motor cita.
    descripcion: `${t.descripcion} Torneo ${formatoLabel[t.formato]} en ${t.ciudad}. Bolsa garantizada de ${formatMoney(t.bolsaGarantizada)}.`,
    ruta: `/conecta/torneos/${t.slug}`,
    keywords: [`torneo de boliche ${t.ciudad}`, `boliche ${t.formato}`, t.nombre, "torneos de boliche México"],
  });
}

export default async function TorneoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = tournamentBySlug(slug);
  if (!t) notFound();

  const centro = centerBySlug(t.centroSlug);
  const patron = patternBySlug(t.patronSlug);
  const inscritos = t.inscritos.map((s) => playerBySlug(s)).filter(Boolean);
  const dias = daysUntil(t.fechaInicio, new Date("2026-09-06"));
  const lugares = t.cupo - t.inscritos.length;

  return (
    <>
      <JsonLd
        data={grafo(
          tournamentSchema(t, centro),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Conecta", ruta: "/conecta" },
            { nombre: "Torneos", ruta: "/conecta/torneos" },
            { nombre: t.nombre, ruta: `/conecta/torneos/${t.slug}` },
          ])
        )}
      />
      <div className="border-b">
        <div className="container-page py-8">
          <Link href="/conecta/torneos" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="size-4" /> Todos los torneos
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge>{formatoLabel[t.formato]}</Badge>
                {t.destacado && <Badge variant="data">Destacado</Badge>}
                {dias > 0 ? <Badge variant="outline">Faltan {dias} días</Badge> : <Badge variant="secondary">Finalizado</Badge>}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{t.nombre}</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl text-[15px] leading-relaxed">{t.descripcion}</p>

              <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="flex gap-3">
                  <CalendarDays className="text-primary mt-0.5 size-4 shrink-0" />
                  <div>
                    <dt className="text-muted-foreground text-xs tracking-wide uppercase">Fechas</dt>
                    <dd className="text-sm font-medium tnum">{formatDateRange(t.fechaInicio, t.fechaFin)}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
                  <div>
                    <dt className="text-muted-foreground text-xs tracking-wide uppercase">Sede</dt>
                    <dd className="text-sm font-medium">
                      {centro ? (
                        <Link href="/centros" className="hover:underline">
                          {centro.nombre}
                        </Link>
                      ) : (
                        t.ciudad
                      )}
                      <span className="text-muted-foreground font-normal"> · {t.ciudad}</span>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Droplets className="text-primary mt-0.5 size-4 shrink-0" />
                  <div>
                    <dt className="text-muted-foreground text-xs tracking-wide uppercase">Patrón de aceite</dt>
                    <dd className="text-sm font-medium">
                      <Link href="/herramientas/patrones" className="hover:underline">
                        {patron?.nombre ?? "Por confirmar"}
                      </Link>
                      {patron && <span className="text-muted-foreground font-normal"> · {patron.longitud} pies</span>}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="text-primary mt-0.5 size-4 shrink-0" />
                  <div>
                    <dt className="text-muted-foreground text-xs tracking-wide uppercase">Cupo</dt>
                    <dd className="text-sm font-medium tnum">
                      {t.inscritos.length} inscritos · {lugares} lugares libres
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <Card className="lg:sticky lg:top-20">
              <Foto src={t.imagen} alt={`Sede del torneo ${t.nombre}`} ratio="16/9" className="m-5 mb-0" prioridad sizes="(max-width: 1024px) 100vw, 420px" />
              <CardContent className="pt-5">
                <div className="flex items-end justify-between border-b pb-4">
                  <Stat valor={formatMoney(t.cuota).replace(" MXN", "")} etiqueta="Cuota" />
                  {t.bolsaGarantizada > 0 && <Stat valor={`$${(t.bolsaGarantizada / 1000).toFixed(0)}k`} etiqueta="Bolsa garantizada" tono="primary" />}
                </div>
                <TournamentRegister nombre={t.nombre} cuota={t.cuota} lugares={lugares} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr]">
        {/* min-w-0: deja encoger la columna en pantallas de 320px. */}
        <div className="flex min-w-0 flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Reglas y formato</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {t.reglas.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span className="text-primary mt-0.5 font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Premios</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {t.premios.map((p) => (
                  <li key={p.lugar} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="font-medium">{p.lugar}</span>
                    <span className="font-mono tabular-nums">{p.monto > 0 ? formatMoney(p.monto) : "Premio en especie"}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Inscritos</h2>
            <Badge variant="secondary" className="tnum">
              <Ticket className="size-3" /> {t.inscritos.length}/{t.cupo}
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            {inscritos.map((p) => (
              <PlayerCard key={p!.slug} p={p!} />
            ))}
          </div>
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link href="/conecta/rankings">Ver ranking completo</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
