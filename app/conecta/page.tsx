import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Trophy, Users, BarChart3, CalendarRange } from "lucide-react";
import { proximosTorneos } from "@/data/tournaments";
import { ranking } from "@/data/players";
import { teams } from "@/data/teams";
import { leagues } from "@/data/leagues";
import { centers } from "@/data/centers";
import { PageHeader, SectionHeading } from "@/components/marketing/section-heading";
import { TournamentCard } from "@/components/community/tournament-card";
import { PlayerCard } from "@/components/community/player-card";
import { Card, CardContent } from "@/components/ui/card";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Conecta",
  descripcion: "Torneos, ligas, equipos, rankings y boliches de la comunidad.",
  ruta: "/conecta",
  keywords: ["comunidad de boliche", "ligas de boliche México"],
});

const accesos = [
  { href: "/conecta/torneos", titulo: "Torneos", detalle: "Calendario nacional e inscripción", Icon: Trophy },
  { href: "/conecta/rankings", titulo: "Rankings", detalle: "Promedios y forma de la comunidad", Icon: BarChart3 },
  { href: "/conecta/equipos", titulo: "Equipos", detalle: "Rosters, récords y capitanes", Icon: Users },
  { href: "/conecta/ligas", titulo: "Ligas", detalle: "Tablas de posiciones por temporada", Icon: CalendarRange },
  { href: "/centros", titulo: "Boliches", detalle: "Dónde jugar y dónde hay pro shop", Icon: Building2 },
];

export default function ConectaPage() {
  const proximos = proximosTorneos("2026-09-06", 3);
  return (
    <>
      <PageHeader
        etiqueta="Conecta"
        titulo="La comunidad, en un solo lugar"
        descripcion="Torneos, ligas, equipos, rankings y boliches. Todo lo que necesitas para dejar de jugar solo."
      />
      <div className="container-page py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {accesos.map(({ href, titulo, detalle, Icon }) => (
            <Link key={href} href={href} className="group">
              <Card className="hover:border-primary/50 h-full transition-colors">
                <CardContent className="flex h-full flex-col gap-2 p-5">
                  <Icon className="text-primary size-5" />
                  <p className="group-hover:text-primary font-semibold transition-colors">{titulo}</p>
                  <p className="text-muted-foreground text-sm">{detalle}</p>
                  <ArrowRight className="text-muted-foreground mt-auto size-4 transition-transform group-hover:translate-x-0.5" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-14">
          <SectionHeading etiqueta="Agenda" titulo="Lo que viene" href="/conecta/torneos" hrefLabel="Todo el calendario" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {proximos.map((t) => (
              <TournamentCard key={t.slug} t={t} />
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading etiqueta="Rankings" titulo="Top 8" href="/conecta/rankings" hrefLabel="Ranking completo" />
            <div className="mt-6 flex flex-col gap-2">
              {ranking.slice(0, 8).map((r) => (
                <PlayerCard key={r.player.slug} p={r.player} posicion={r.posicion} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading etiqueta="En números" titulo="La comunidad hoy" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { valor: teams.length, etiqueta: "Equipos registrados", href: "/conecta/equipos" },
                { valor: leagues.length, etiqueta: "Ligas activas", href: "/conecta/ligas" },
                { valor: centers.length, etiqueta: "Boliches en el directorio", href: "/centros" },
                { valor: ranking.length, etiqueta: "Jugadores con promedio", href: "/conecta/rankings" },
              ].map((s) => (
                <Link key={s.etiqueta} href={s.href} className="hover:border-primary/50 rounded-xl border p-5 transition-colors">
                  <p className="font-mono text-3xl font-semibold tabular-nums">{s.valor}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{s.etiqueta}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
