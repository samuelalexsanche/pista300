import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { teams, teamBySlug } from "@/data/teams";
import { players, playerStats } from "@/data/players";
import { centerName } from "@/data/centers";
import { leagueBySlug } from "@/data/leagues";
import { PlayerCard } from "@/components/community/player-card";
import { Badge } from "@/components/ui/badge";
import { Stat, StatStrip } from "@/components/marketing/stat";
import { Foto } from "@/components/marketing/foto";
import { JsonLd } from "@/components/seo/json-ld";
import { metadatos } from "@/lib/seo";
import { grafo, teamSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = teamBySlug(slug);
  if (!t) return {};
  return metadatos({
    titulo: t.nombre,
    descripcion: `Roster, récord de ${t.ganados}-${t.perdidos} y liga del equipo ${t.nombre}, fundado en ${t.fundado}. Integrantes y promedios en Pista300.`,
    ruta: `/conecta/equipos/${t.slug}`,
    keywords: [t.nombre, "equipo de boliche", "liga de boliche México"],
  });
}

export default async function EquipoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = teamBySlug(slug);
  if (!t) notFound();

  const integrantes = t.integrantes.map((s) => players.find((p) => p.slug === s)).filter(Boolean);
  const promedio = Math.round(integrantes.reduce((a, p) => a + playerStats(p!).promedio, 0) / (integrantes.length || 1));
  const liga = leagueBySlug(t.ligaSlug);
  const capitan = players.find((p) => p.slug === t.capitanSlug);
  const partidos = t.ganados + t.perdidos;

  return (
    <>
      <JsonLd
        data={grafo(
          teamSchema(
            t,
            liga,
            integrantes.map((p) => ({ nombre: p!.nombre, slug: p!.slug }))
          ),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Conecta", ruta: "/conecta" },
            { nombre: "Equipos", ruta: "/conecta/equipos" },
            { nombre: t.nombre, ruta: `/conecta/equipos/${t.slug}` },
          ])
        )}
      />
      <div className="border-b">
        <div className="container-page py-8">
          <Link href="/conecta/equipos" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="size-4" /> Equipos
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <span className="size-14 shrink-0 rounded-xl" style={{ background: `linear-gradient(135deg, ${t.colores[0]}, ${t.colores[1]})` }} aria-hidden />
            <div>
              <Badge variant="secondary" className="mb-2">
                {liga?.nombre ?? t.ligaSlug}
              </Badge>
              <h1 className="text-3xl font-semibold tracking-tight">{t.nombre}</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {centerName(t.centroSlug)} · fundado en {t.fundado} · capitán {capitan?.nombre ?? "—"}
              </p>
            </div>
          </div>
          <StatStrip className="mt-8">
            <Stat valor={`${t.ganados}–${t.perdidos}`} etiqueta="Récord" />
            <Stat valor={`${Math.round((t.ganados / (partidos || 1)) * 100)}%`} etiqueta="Efectividad" tono="primary" />
            <Stat valor={promedio} etiqueta="Promedio de equipo" />
            <Stat valor={integrantes.length} etiqueta="Integrantes" />
          </StatStrip>
        </div>
      </div>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div>
          <h2 className="mb-4 font-semibold">Roster</h2>
          <div className="flex flex-col gap-2">
            {integrantes.map((p) => (
              <PlayerCard key={p!.slug} p={p!} />
            ))}
          </div>
        </div>
        <div>
          <Foto src={t.imagen} alt={`Integrantes del equipo ${t.nombre}`} ratio="4/3" />
          {liga && (
            <div className="mt-4 rounded-xl border p-5 text-sm">
              <p className="font-medium">{liga.nombre}</p>
              <p className="text-muted-foreground mt-1">
                {liga.dia} · {liga.hora} · {liga.formato}
              </p>
              <p className="text-muted-foreground mt-1 tnum">
                Semana {liga.semanaActual} de {liga.semanas}
              </p>
              <Link href="/conecta/ligas" className="text-primary mt-3 inline-block text-sm hover:underline">
                Ver tabla de posiciones
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
