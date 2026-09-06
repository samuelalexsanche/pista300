"use client";

import Link from "next/link";
import { LogIn, LogOut, Sparkles } from "lucide-react";
import { useMembership } from "@/providers/membership-provider";
import { playerBySlug, playerStats } from "@/data/players";
import { proximosTorneos } from "@/data/tournaments";
import { leagueName } from "@/data/leagues";
import { seriesTotal, average } from "@/lib/bowling";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/marketing/section-heading";
import { Stat, StatStrip } from "@/components/marketing/stat";
import { ScoreStrip } from "@/components/community/score-strip";

const ultimoJuego = [[9, 1], [10], [8, 1], [10], [10], [7, 3], [9, 0], [10], [8, 2], [10, 9, 1]];

export function AccountDashboard() {
  const { sesionIniciada, usuario, esPremium, iniciarSesion, cerrarSesion, setPlan, cargando } = useMembership();

  if (cargando) {
    return (
      <div className="container-page py-20">
        <div className="bg-surface h-40 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!sesionIniciada || !usuario) {
    return (
      <>
        <PageHeader etiqueta="Cuenta" titulo="Entra a tu cuenta" descripcion="En el demo el acceso es simulado: un clic y entras como socio de ejemplo." />
        <div className="container-page py-16">
          <Card className="mx-auto max-w-sm">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Al entrar verás el panel del socio con series, inscripciones y estado de la membresía.
              </p>
              <Button onClick={iniciarSesion} className="w-full" size="lg">
                <LogIn /> Entrar como socio demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const jugador = playerBySlug(usuario.playerSlug);
  const stats = jugador ? playerStats(jugador) : null;
  const inscripciones = proximosTorneos("2026-09-06", 2);
  const ultimas = jugador ? [...jugador.series].reverse().slice(0, 6) : [];

  return (
    <>
      <PageHeader etiqueta="Cuenta" titulo={`Hola, ${usuario.nombre.split(" ")[0]}`} descripcion={`Socio desde ${formatDate(usuario.desde)}.`}>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant={esPremium ? "default" : "secondary"} className="gap-1">
            {esPremium && <Sparkles className="size-3" />} Plan {esPremium ? "Premium" : "Comunidad"}
          </Badge>
          {esPremium ? (
            <Button variant="outline" size="sm" onClick={() => setPlan("free")}>
              Bajar a Comunidad
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link href="/premium">
                <Sparkles /> Hazte Premium
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={cerrarSesion}>
            <LogOut /> Cerrar sesión
          </Button>
        </div>
      </PageHeader>

      <div className="container-page py-10">
        {stats && (
          <StatStrip className="sm:grid-cols-4">
            <Stat valor={stats.promedio} etiqueta="Tu promedio" tono="primary" />
            <Stat valor={stats.handicap} etiqueta="Hándicap" detalle="80% de 220" />
            <Stat valor={stats.juegos} etiqueta="Juegos registrados" />
            <Stat
              valor={`${stats.forma > 0 ? "+" : ""}${stats.forma}`}
              etiqueta="Forma"
              tono={stats.forma > 0 ? "positive" : stats.forma < 0 ? "negative" : "neutral"}
            />
          </StatStrip>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tu último juego</CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreStrip frames={ultimoJuego} />
                <Button asChild variant="secondary" size="sm" className="mt-4">
                  <Link href="/herramientas/anotador">Registrar una serie nueva</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Series recientes</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-5">Fecha</TableHead>
                      <TableHead className="hidden sm:table-cell">Liga</TableHead>
                      <TableHead className="text-right">J1</TableHead>
                      <TableHead className="text-right">J2</TableHead>
                      <TableHead className="text-right">J3</TableHead>
                      <TableHead className="pr-5 text-right">Serie</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ultimas.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="pl-5 tnum">{formatDate(s.fecha)}</TableCell>
                        <TableCell className="text-muted-foreground hidden sm:table-cell">{leagueName(s.ligaSlug)}</TableCell>
                        {s.juegos.map((j, i) => (
                          <TableCell key={i} className="text-right font-mono">
                            {j}
                          </TableCell>
                        ))}
                        <TableCell className="pr-5 text-right font-mono font-semibold">{seriesTotal(s.juegos)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {ultimas.length > 0 && (
                  <p className="text-muted-foreground px-5 pt-3 text-xs">
                    Promedio de estas {ultimas.length} series: {average(ultimas.flatMap((s) => s.juegos))}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tus inscripciones</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {inscripciones.map((t) => (
                  <Link key={t.slug} href={`/conecta/torneos/${t.slug}`} className="hover:bg-surface -mx-2 rounded-lg px-2 py-2 transition-colors">
                    <p className="text-sm font-medium">{t.nombre}</p>
                    <p className="text-muted-foreground text-xs tnum">
                      {formatDate(t.fechaInicio)} · {t.ciudad}
                    </p>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membresía</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <dl className="divide-y">
                  <div className="flex justify-between py-2">
                    <dt className="text-muted-foreground">Plan</dt>
                    <dd className="font-medium">{esPremium ? "Premium" : "Comunidad"}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-muted-foreground">Correo</dt>
                    <dd className="font-mono text-xs">{usuario.email}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-muted-foreground">Renovación</dt>
                    <dd>{esPremium ? "6 de octubre de 2026" : "—"}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
