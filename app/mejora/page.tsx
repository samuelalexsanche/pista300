import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Dumbbell, LineChart, Settings2, Target } from "lucide-react";
import { techniques, trainingPlans } from "@/data/techniques";
import { articles } from "@/data/articles";
import { balls } from "@/data/balls";
import { PageHeader, SectionHeading } from "@/components/marketing/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/content/article-card";
import { PremiumBadgeLock } from "@/components/premium/premium-gate";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Mejora",
  descripcion: "Técnica, entrenamiento, análisis y equipo: lo que necesitas para subir el promedio.",
  ruta: "/mejora",
  keywords: ["mejorar en boliche", "subir promedio boliche"],
});

const pilares = [
  { href: "/mejora/tecnicas", titulo: "Técnicas", detalle: `${techniques.length} fundamentos con pasos y drills`, Icon: Target },
  { href: "/mejora/entrenamiento", titulo: "Entrenamiento", detalle: `${trainingPlans.length} planes por nivel y objetivo`, Icon: Dumbbell },
  { href: "/herramientas", titulo: "Análisis", detalle: "Anotador, promedios y tendencias", Icon: LineChart },
  { href: "/mejora/equipo", titulo: "Equipo", detalle: `${balls.length} bolas comparables por specs`, Icon: Settings2 },
];

export default function MejoraPage() {
  const deMejora = articles.filter((a) => a.seccion === "mejora").slice(0, 6);
  return (
    <>
      <PageHeader
        etiqueta="Mejora"
        titulo="Sube el promedio con método"
        descripcion="Cuatro frentes: la técnica que repites, el plan que sigues, los datos que miras y el equipo que usas. Ninguno funciona solo."
      />
      <div className="container-page py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map(({ href, titulo, detalle, Icon }) => (
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
          <SectionHeading etiqueta="Fundamentos" titulo="Técnicas" href="/mejora/tecnicas" hrefLabel="Ver todas" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {techniques.slice(0, 3).map((t) => (
              <Link key={t.slug} href={`/mejora/tecnicas/${t.slug}`} className="group">
                <Card className="hover:border-primary/50 h-full transition-colors">
                  <CardContent className="flex h-full flex-col gap-2 p-5">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize">{t.nivel}</Badge>
                      {t.premium && <PremiumBadgeLock />}
                    </div>
                    <h3 className="group-hover:text-primary font-semibold transition-colors">{t.nombre}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t.resumen}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <SectionHeading etiqueta="Biblioteca" titulo="Análisis y guías" href="/aprende" hrefLabel="Toda la biblioteca" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deMejora.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
