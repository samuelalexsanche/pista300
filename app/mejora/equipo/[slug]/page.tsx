import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { balls, ballBySlug } from "@/data/balls";
import { players } from "@/data/players";
import { formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Foto } from "@/components/marketing/foto";
import { Stat, StatStrip } from "@/components/marketing/stat";
import { PlayerCard } from "@/components/community/player-card";
import { JsonLd } from "@/components/seo/json-ld";
import { metadatos } from "@/lib/seo";
import { grafo, ballSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return balls.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = ballBySlug(slug);
  if (!b) return {};
  return metadatos({
    titulo: `${b.marca} ${b.modelo}`,
    descripcion: `${b.resumen} Cubierta ${b.cubierta}, core ${b.core}, RG ${b.rg} y diferencial ${b.diferencial}. Para pista ${b.aceite}.`,
    ruta: `/mejora/equipo/${b.slug}`,
    keywords: [`${b.marca} ${b.modelo}`, "bola de boliche", `bola para pista ${b.aceite}`, b.marca],
  });
}

export default async function BolaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = ballBySlug(slug);
  if (!b) notFound();

  const usuarios = players.filter((p) => p.bolaSlug === b.slug);

  return (
    <>
      <JsonLd
        data={grafo(
          ballSchema(b),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Mejora", ruta: "/mejora" },
            { nombre: "Equipo", ruta: "/mejora/equipo" },
            { nombre: `${b.marca} ${b.modelo}`, ruta: `/mejora/equipo/${b.slug}` },
          ])
        )}
      />
      <div className="border-b">
        <div className="container-page py-8">
          <Link href="/mejora/equipo" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="size-4" /> Comparador
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <Foto src={b.imagen} alt={`Bola de boliche ${b.marca} ${b.modelo}`} ratio="1/1" prioridad sizes="(max-width: 1024px) 100vw, 420px" />
            <div>
              <p className="text-muted-foreground text-sm tracking-wide uppercase">{b.marca}</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{b.modelo}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="capitalize">Aceite {b.aceite}</Badge>
                <Badge variant="outline">{b.core}</Badge>
                <Badge variant="outline">{b.anio}</Badge>
                <span className="inline-flex items-center gap-1 font-mono text-sm">
                  <Star className="fill-primary text-primary size-3.5" /> {b.calificacion}
                </span>
              </div>
              <p className="text-muted-foreground mt-4 max-w-xl text-[15px] leading-relaxed">{b.resumen}</p>
              <StatStrip className="mt-8 max-w-lg">
                <Stat valor={b.rg.toFixed(2)} etiqueta="RG" />
                <Stat valor={b.diferencial.toFixed(3)} etiqueta="Diferencial" />
                <Stat valor={`${b.factorGancho}/10`} etiqueta="Gancho" tono="primary" />
                <Stat valor={formatMoney(b.precio).replace(" MXN", "")} etiqueta="Precio" />
              </StatStrip>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <Card>
          <CardHeader>
            <CardTitle>Ficha técnica</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y text-sm">
              {[
                ["Cubierta", b.cubierta],
                ["Acabado de fábrica", b.acabado],
                ["Core", b.core],
                ["RG", b.rg.toFixed(2)],
                ["Diferencial", b.diferencial.toFixed(3)],
                ["Largo (1-10)", String(b.largo)],
                ["Backend (1-10)", String(b.backend)],
                ["Condición ideal", `Aceite ${b.aceite}`],
                ["Año de lanzamiento", String(b.anio)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2.5">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-mono capitalize">{v}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-4 font-semibold">Quién la usa en la comunidad</h2>
          {usuarios.length > 0 ? (
            <div className="flex flex-col gap-2">
              {usuarios.map((p) => (
                <PlayerCard key={p.slug} p={p} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Todavía nadie la tiene registrada en su perfil.</p>
          )}
        </div>
      </div>
    </>
  );
}
