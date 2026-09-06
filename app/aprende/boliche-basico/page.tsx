import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { PageHeader } from "@/components/marketing/section-heading";
import { ArticleCard } from "@/components/content/article-card";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScoreStrip } from "@/components/community/score-strip";
import { Button } from "@/components/ui/button";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = metadatos({
  titulo: "Boliche básico",
  descripcion: "La guía de iniciación: reglas, puntuación, equipo mínimo, etiqueta y cómo entrar a tu primera liga.",
  ruta: "/aprende/boliche-basico",
  keywords: ["cómo jugar boliche", "reglas del boliche", "boliche para principiantes"],
});

const ruta = [
  {
    paso: "01",
    titulo: "Entiende cómo se cuenta",
    detalle:
      "Diez frames, dos tiros por frame. El strike y el spare valen 10 más lo que hagas después: por eso una serie de strikes se dispara. Empieza por aquí y todo lo demás tiene sentido.",
    href: "/aprende/reglas-del-boliche-en-10-minutos",
    cta: "Leer las reglas",
  },
  {
    paso: "02",
    titulo: "Aprende a moverte",
    detalle:
      "El approach de cuatro pasos sincroniza el swing con el cuerpo. No necesitas fuerza: necesitas que la bola y el último paso lleguen juntos a la línea.",
    href: "/mejora/tecnicas/pushaway",
    cta: "Ver la técnica",
  },
  {
    paso: "03",
    titulo: "Consigue tu equipo",
    detalle:
      "La bola de casa te está frenando. Una bola propia bien perforada, aunque sea de entrada, cambia por completo cómo aprendes.",
    href: "/aprende/como-elegir-tu-primera-bola",
    cta: "Cómo elegirla",
  },
  {
    paso: "04",
    titulo: "No hagas el ridículo",
    detalle: "Cuatro reglas de etiqueta y ya eres uno más. Quién tira primero, dónde pararse y qué no tocar.",
    href: "/aprende/guia-de-etiqueta-en-la-pista",
    cta: "Etiqueta en la pista",
  },
  {
    paso: "05",
    titulo: "Entra a una liga",
    detalle:
      "Es la forma más rápida de mejorar: presión real todas las semanas y un promedio oficial. Cuánto cuesta y cómo elegir la correcta.",
    href: "/aprende/como-entrar-a-tu-primera-liga",
    cta: "Guía de ligas",
  },
];

const ejemplo = [[10], [9, 1], [7, 2], [10], [10], [5, 5], [8, 0], [10], [9, 1], [10, 7, 2]];

const faq = [
  { q: "¿Qué bola de casa elijo?", a: "Una que puedas sostener con los dedos sin apretar. Regla rápida: alrededor del 10% de tu peso corporal, con un máximo de 16 libras. Si tienes que apretar para que no se caiga, es muy pesada o los hoyos son grandes." },
  { q: "¿Zapatos propios desde el principio?", a: "Son la segunda compra más rentable después de la bola. Los de renta tienen suela de deslizamiento en los dos pies, lo que impide frenar bien. Unos propios cuestan entre $900 y $1,600." },
  { q: "¿Cuántas líneas debo jugar por sesión?", a: "Tres o cuatro. Más que eso y la técnica se degrada por cansancio, así que acabas practicando el error." },
  { q: "¿Cuánto tarda en subir el promedio?", a: "Con dos sesiones a la semana y trabajo de repuestos, pasar de 110 a 140 suele tomar dos o tres meses. De 140 a 170, otros tres. De ahí en adelante el avance se vuelve mucho más lento y depende de la técnica." },
  { q: "¿Necesito entrenador?", a: "No para empezar, sí para pasar de 160. Una sola sesión con un entrenador certificado corrige cosas que por tu cuenta tardarías un año en notar." },
];

export default function BolicheBasicoPage() {
  const basicos = articles.filter((a) => a.categoria === "boliche-basico" || (a.nivel === "principiante" && !a.premium));

  return (
    <>
      {/* Esta es la página con más intención de búsqueda informacional del sitio
          ("cómo jugar boliche", "reglas del boliche") y la que más se cita en
          respuestas generativas: lleva HowTo y FAQ, ambos con el texto visible. */}
      <JsonLd
        data={grafo(
          howToSchema(
            "Cómo empezar a jugar boliche",
            "Guía de iniciación en cinco pasos: puntuación, movimiento, equipo, etiqueta y entrada a liga.",
            ruta.map((r) => ({ titulo: r.titulo, detalle: r.detalle }))
          ),
          faqSchema(faq.map((f) => ({ pregunta: f.q, respuesta: f.a }))),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Aprende", ruta: "/aprende" },
            { nombre: "Boliche básico", ruta: "/aprende/boliche-basico" },
          ])
        )}
      />
      <PageHeader
        etiqueta="Aprende"
        titulo="Boliche básico"
        descripcion="Si es tu primera vez, empieza aquí. Cinco pasos, en orden, para pasar de tirar por diversión a saber lo que estás haciendo."
      />

      <div className="container-page py-10">
        <ol className="flex flex-col gap-3">
          {ruta.map((r) => (
            <li key={r.paso}>
              <Card>
                <CardContent className="flex flex-wrap items-start gap-5 p-5">
                  <span className="text-primary font-mono text-2xl font-semibold">{r.paso}</span>
                  <div className="min-w-56 flex-1">
                    <h2 className="font-semibold">{r.titulo}</h2>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{r.detalle}</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={r.href}>
                      {r.cta} <ArrowRight />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">Así se lee una hoja de anotación</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed">
            La fila de arriba son los pinos de cada tiro: <strong className="text-foreground">X</strong> es strike,{" "}
            <strong className="text-foreground">/</strong> es spare y <strong className="text-foreground">−</strong> es cero. La fila de abajo es
            el acumulado, que solo se puede cerrar cuando ya se conocen los tiros de bonificación.
          </p>
          <div className="mt-5">
            <ScoreStrip frames={ejemplo} />
          </div>
        </section>

        <section className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Dudas de principiante</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Las preguntas que todo el mundo hace la primera vez, respondidas sin misterio.
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-xl border px-5">
            {faq.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mt-14">
          <h2 className="mb-6 text-xl font-semibold tracking-tight">Lecturas para empezar</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {basicos.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
