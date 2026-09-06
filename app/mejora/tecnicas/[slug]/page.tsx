import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, Clock } from "lucide-react";
import { techniques, techniqueBySlug } from "@/data/techniques";
import { PageHeader } from "@/components/marketing/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Foto } from "@/components/marketing/foto";
import { PremiumGate, PremiumBadgeLock } from "@/components/premium/premium-gate";
import { JsonLd } from "@/components/seo/json-ld";
import { metadatos } from "@/lib/seo";
import { grafo, howToSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return techniques.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = techniqueBySlug(slug);
  if (!t) return {};
  return metadatos({
    titulo: t.nombre,
    descripcion: `${t.resumen} Nivel ${t.nivel}, ${t.pasos.length} pasos y el error más común al aprenderla.`,
    ruta: `/mejora/tecnicas/${t.slug}`,
    keywords: [t.nombre, "técnica de boliche", `boliche nivel ${t.nivel}`, "cómo mejorar en boliche"],
  });
}

export default async function TecnicaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = techniqueBySlug(slug);
  if (!t) notFound();

  const pasos = (
    <ol className="flex flex-col gap-5">
      {t.pasos.map((p, i) => (
        <li key={p.titulo} className="flex gap-4">
          <span className="bg-primary/12 text-primary flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold">
            {i + 1}
          </span>
          <div>
            <p className="font-medium">{p.titulo}</p>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{p.detalle}</p>
          </div>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <JsonLd
        data={grafo(
          // El HowTo solo se emite en las técnicas libres. Marcar los pasos de
          // una técnica que está tras el paywall sería declarar como disponible
          // algo que el visitante no puede leer.
          t.premium ? null : howToSchema(t.nombre, t.resumen, t.pasos),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Mejora", ruta: "/mejora" },
            { nombre: "Técnicas", ruta: "/mejora/tecnicas" },
            { nombre: t.nombre, ruta: `/mejora/tecnicas/${t.slug}` },
          ])
        )}
      />
      <div className="border-b">
        <div className="container-page py-8">
          <Link href="/mejora/tecnicas" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="size-4" /> Técnicas
          </Link>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="capitalize">{t.nivel}</Badge>
            {t.premium && <PremiumBadgeLock />}
            <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
              <Clock className="size-3" /> {t.minutos} min de práctica
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.nombre}</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-[15px] leading-relaxed">{t.resumen}</p>
        </div>
      </div>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Paso a paso</CardTitle>
            </CardHeader>
            <CardContent>
              {t.premium ? (
                <PremiumGate titulo="Técnica Premium" descripcion="El desglose completo y los drills forman parte del plan Premium." alto="md" className="border-0">
                  {pasos}
                </PremiumGate>
              ) : (
                pasos
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Drills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {t.drills.map((d, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span className="text-primary mt-0.5 font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Foto src={t.imagen} alt={`Secuencia del movimiento: ${t.nombre}`} ratio="4/3" />
          <Card className="border-warning/40 bg-warning/5">
            <CardContent className="flex gap-3 p-5">
              <AlertTriangle className="text-warning mt-0.5 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">El error más común</p>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{t.errorComun}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
