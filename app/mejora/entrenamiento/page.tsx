import type { Metadata } from "next";
import { trainingPlans } from "@/data/techniques";
import { PageHeader } from "@/components/marketing/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stat, StatStrip } from "@/components/marketing/stat";
import { PremiumGate, PremiumBadgeLock } from "@/components/premium/premium-gate";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Entrenamiento",
  descripcion: "Planes de entrenamiento de boliche por nivel: base sólida, salto a 180 y preparación de torneo.",
  ruta: "/mejora/entrenamiento",
  keywords: ["entrenamiento de boliche", "plan de entrenamiento boliche"],
});

export default function EntrenamientoPage() {
  return (
    <>
      <PageHeader
        etiqueta="Mejora"
        titulo="Planes de entrenamiento"
        descripcion="Un plan es lo que convierte 'voy a practicar más' en un resultado medible. Elige según tu nivel y tu objetivo."
      />
      <div className="container-page flex flex-col gap-8 py-10">
        {trainingPlans.map((p) => {
          const bloques = (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {p.bloques.map((b) => (
                <div key={b.semana} className="bg-surface rounded-lg border p-4">
                  <p className="text-primary font-mono text-[10px] tracking-widest uppercase">{b.semana}</p>
                  <p className="mt-1 font-medium">{b.foco}</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {b.ejercicios.map((e) => (
                      <li key={e} className="text-muted-foreground flex gap-2 text-sm leading-relaxed">
                        <span className="bg-primary mt-2 size-1 shrink-0 rounded-full" aria-hidden />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );

          return (
            <Card key={p.slug}>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">{p.nombre}</CardTitle>
                    <p className="text-muted-foreground mt-1.5 max-w-2xl text-sm leading-relaxed">{p.objetivo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">{p.nivel}</Badge>
                    {p.premium && <PremiumBadgeLock />}
                  </div>
                </div>
                <StatStrip className="mt-4 max-w-md sm:grid-cols-3">
                  <Stat valor={p.semanas} etiqueta="Semanas" />
                  <Stat valor={p.sesionesPorSemana} etiqueta="Sesiones / semana" />
                  <Stat valor={p.bloques.length} etiqueta="Bloques" />
                </StatStrip>
              </CardHeader>
              <CardContent>
                {p.premium ? (
                  <PremiumGate titulo="Plan Premium" descripcion="Los planes completos, semana por semana, están incluidos en la membresía Premium." alto="md">
                    {bloques}
                  </PremiumGate>
                ) : (
                  bloques
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
