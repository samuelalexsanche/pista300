import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, BookOpen, Droplets, Percent, Target, Sparkles } from "lucide-react";
import { membershipPlans, premiumFaq } from "@/data/plans";
import { PageHeader } from "@/components/marketing/section-heading";
import { Pricing } from "@/components/premium/pricing";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = metadatos({
  titulo: "Membresía Premium",
  descripcion: "Herramientas de análisis, biblioteca completa y beneficios en torneos por $149 MXN al mes.",
  ruta: "/premium",
  keywords: ["membresía de boliche", "suscripción Pista300"],
});

const beneficios = [
  { Icon: BarChart3, titulo: "Anotador con análisis", detalle: "Captura frame a frame, porcentaje de strikes y repuestos, y tendencia de tus series." },
  { Icon: Droplets, titulo: "Banco de patrones", detalle: "Perfil de volumen y línea sugerida de cada patrón, incluidos los de torneo." },
  { Icon: Target, titulo: "Guía de repuestos", detalle: "Todos los repuestos y splits con posición de parada, objetivo y el consejo detrás." },
  { Icon: BookOpen, titulo: "Biblioteca completa", detalle: "Los análisis largos y los planes de entrenamiento, sin cortes a mitad del texto." },
  { Icon: Percent, titulo: "10% en torneos", detalle: "Descuento automático en la inscripción a los torneos organizados por Pista300." },
  { Icon: Sparkles, titulo: "Acceso anticipado", detalle: "Las inscripciones se abren 48 horas antes para los socios Premium." },
];

export default function PremiumPage() {
  return (
    <>
      {/* El FAQ va marcado porque las respuestas están visibles en la página.
          Los planes NO se marcan como Product: los precios son una propuesta,
          no una decisión del cliente (ver sección 6 del HANDOFF). */}
      <JsonLd
        data={grafo(
          faqSchema(premiumFaq.map((f) => ({ pregunta: f.q, respuesta: f.a }))),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Premium", ruta: "/premium" },
          ])
        )}
      />
      <PageHeader
        etiqueta="Membresía"
        titulo="Premium"
        descripcion="Las herramientas que convierten la práctica en promedio, más los beneficios de pertenecer a la comunidad. Sin permanencia."
      />

      <div className="container-page py-10">
        <Pricing planes={membershipPlans} />

        <section className="mt-20">
          <h2 className="text-center text-2xl font-semibold tracking-tight">Qué desbloqueas</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {beneficios.map(({ Icon, titulo, detalle }) => (
              <Card key={titulo}>
                <CardContent className="flex flex-col gap-2 p-5">
                  <Icon className="text-primary size-5" />
                  <p className="font-semibold">{titulo}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{detalle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿Quieres verlas antes? <Link href="/herramientas" className="text-primary hover:underline">Entra a las herramientas</Link> y usa el
            interruptor Free/Premium del encabezado.
          </p>
        </section>

        <section className="mx-auto mt-20 max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight">Preguntas frecuentes</h2>
          <Accordion type="single" collapsible className="rounded-xl border px-5">
            {premiumFaq.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </>
  );
}
