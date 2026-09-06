import type { Metadata } from "next";
import Link from "next/link";
import { teams } from "@/data/teams";
import { centerName } from "@/data/centers";
import { leagueName } from "@/data/leagues";
import { players, playerStats } from "@/data/players";
import { PageHeader } from "@/components/marketing/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Equipos",
  descripcion: "Directorio de equipos de la comunidad Pista300.",
  ruta: "/conecta/equipos",
  keywords: ["equipos de boliche", "equipos de liga"],
});

export default function EquiposPage() {
  return (
    <>
      <PageHeader
        etiqueta="Conecta"
        titulo="Equipos"
        descripcion="Quiénes juegan juntos, en qué liga y con qué récord. Si buscas equipo, aquí empieza la conversación."
      />
      <div className="container-page grid gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((t) => {
          const integrantes = t.integrantes.map((s) => players.find((p) => p.slug === s)).filter(Boolean);
          const promedio = Math.round(integrantes.reduce((a, p) => a + playerStats(p!).promedio, 0) / (integrantes.length || 1));
          return (
            <Link key={t.slug} href={`/conecta/equipos/${t.slug}`} className="group">
              <Card className="hover:border-primary/50 h-full transition-colors">
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="size-9 shrink-0 rounded-lg" style={{ background: `linear-gradient(135deg, ${t.colores[0]}, ${t.colores[1]})` }} aria-hidden />
                      <div>
                        <h2 className="group-hover:text-primary font-semibold transition-colors">{t.nombre}</h2>
                        <p className="text-muted-foreground text-xs">{leagueName(t.ligaSlug)}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="tnum">
                      {t.ganados}–{t.perdidos}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{centerName(t.centroSlug)} · desde {t.fundado}</p>
                  <div className="mt-auto flex items-center justify-between border-t pt-3 text-sm">
                    <span className="text-muted-foreground tnum">{integrantes.length} integrantes</span>
                    <span className="font-mono font-semibold tabular-nums">{promedio} prom.</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
