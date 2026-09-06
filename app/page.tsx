import Link from "next/link";
import { ArrowRight, Sparkles, Trophy, Wrench } from "lucide-react";
import { nav, site } from "@/data/site";
import { proximosTorneos } from "@/data/tournaments";
import { ranking, players } from "@/data/players";
import { articlesRecientes } from "@/data/articles";
import { centers } from "@/data/centers";
import { tournaments } from "@/data/tournaments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Stat, StatStrip } from "@/components/marketing/stat";
import { PinTriangle } from "@/components/marketing/pin-triangle";
import { Fondo } from "@/components/marketing/fondo";
import { TournamentCard } from "@/components/community/tournament-card";
import { ArticleCard } from "@/components/content/article-card";
import { PlayerCard } from "@/components/community/player-card";
import { ScoreStrip } from "@/components/community/score-strip";

const juegoDemo = [[10], [9, 1], [10], [10], [8, 2], [10], [7, 2], [10], [10], [10, 10, 9]];

export default function Home() {
  const proximos = proximosTorneos("2026-09-06", 3);
  const top = ranking.slice(0, 6);
  const recientes = articlesRecientes.slice(0, 4);
  const totalSeries = players.reduce((acc, p) => acc + p.series.length, 0);

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative isolate overflow-hidden border-b">
        <Fondo src="/img/articulos/leer-la-pista.jpg" prioridad />
        <div className="pin-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <PinTriangle className="text-primary pointer-events-none absolute -top-16 right-[-8%] hidden w-[420px] opacity-[0.13] lg:block" />
        <div className="container-page relative grid gap-10 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-24">
          <div className="animate-rise">
            <Badge variant="outline" className="mb-5 gap-1.5 bg-background">
              <span className="bg-primary size-1.5 rounded-full" /> Comunidad abierta · {site.ciudad}
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Sube tu promedio. <span className="text-primary">Encuentra con quién jugar.</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed text-pretty">
              Pista300 reúne lo que estaba disperso: aprender bien desde el principio, herramientas reales de análisis
              y el calendario completo de torneos, ligas y rankings del boliche mexicano.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/conecta/torneos">
                  <Trophy /> Ver torneos
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/herramientas">
                  <Wrench /> Probar las herramientas
                </Link>
              </Button>
            </div>
            <StatStrip className="mt-12 max-w-lg">
              <Stat valor={players.length} etiqueta="Jugadores" />
              <Stat valor={tournaments.length} etiqueta="Torneos" />
              <Stat valor={centers.length} etiqueta="Boliches" />
              <Stat valor={totalSeries} etiqueta="Series registradas" />
            </StatStrip>
          </div>

          <div className="bg-card animate-rise rounded-2xl border p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Serie de la semana</p>
                <p className="text-muted-foreground text-xs">Andrea Mercado · Boliche Minerva</p>
              </div>
              <Badge variant="positive">+52 sobre su promedio</Badge>
            </div>
            <ScoreStrip frames={juegoDemo} />
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              Así se ve una serie capturada en el anotador de Pista300: puntuación real frame a frame, con el análisis
              de strikes, repuestos y tendencia incluido.
            </p>
            <Button asChild variant="secondary" size="sm" className="mt-4 w-full">
              <Link href="/herramientas/anotador">
                Abrir el anotador <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- LOS TRES CAMINOS */}
      <section className="container-page py-16">
        <SectionHeading
          etiqueta="Por dónde empezar"
          titulo="Tres caminos, una comunidad"
          descripcion="Da igual si es tu primera vez o si llevas veinte años en liga: el sitio está organizado por lo que necesitas hacer ahora."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {nav.map((seccion, i) => (
            <Link
              key={seccion.slug}
              href={seccion.href}
              className="group bg-card hover:border-primary/50 relative overflow-hidden rounded-xl border p-6 transition-colors"
            >
              <PinTriangle className="text-primary absolute -right-6 -bottom-8 w-32 opacity-[0.07] transition-opacity group-hover:opacity-[0.14]" />
              <span className="text-primary font-mono text-xs tracking-widest">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{seccion.titulo}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{seccion.descripcion}</p>
              <span className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium">
                Explorar <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ TORNEOS */}
      <section className="border-y">
        <div className="container-page py-16">
          <SectionHeading
            etiqueta="Conecta"
            titulo="Próximos torneos"
            descripcion="Inscripciones abiertas en todo el país. Cupo, cuota, patrón y premios de cada evento, sin llamar a nadie."
            href="/conecta/torneos"
            hrefLabel="Calendario completo"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {proximos.map((t) => (
              <TournamentCard key={t.slug} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- RANKING + LECTURA */}
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading etiqueta="Rankings" titulo="Top de la comunidad" href="/conecta/rankings" hrefLabel="Ranking completo" />
          <div className="mt-6 flex flex-col gap-2">
            {top.map((r) => (
              <PlayerCard key={r.player.slug} p={r.player} posicion={r.posicion} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeading etiqueta="Aprende y mejora" titulo="Lo último publicado" href="/aprende" hrefLabel="Ver todo" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {recientes.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ PREMIUM */}
      <section className="container-page pb-20">
        <div className="bg-foreground text-background relative overflow-hidden rounded-2xl px-6 py-12 sm:px-12">
          <PinTriangle className="text-background pointer-events-none absolute -right-10 -bottom-16 w-72 opacity-10" />
          <div className="relative max-w-2xl">
            <Badge className="mb-4 gap-1">
              <Sparkles className="size-3" /> Membresía Premium
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Las herramientas que de verdad suben el promedio
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed opacity-80">
              Anotador con análisis de serie, banco de patrones de aceite, guía completa de repuestos, biblioteca
              premium y descuento en torneos. Todo por menos de lo que cuestan dos líneas.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/premium">Ver planes</Link>
              </Button>
              <span className="font-mono text-sm opacity-70">$149 MXN / mes · cancela cuando quieras</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
