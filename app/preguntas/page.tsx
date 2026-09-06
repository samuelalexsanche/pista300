import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faq, categoriasFaqEnUso, categoriaFaqLabel } from "@/data/faq";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { PageHeader } from "@/components/marketing/section-heading";

export const metadata: Metadata = metadatos({
  titulo: "Preguntas frecuentes del boliche",
  descripcion:
    "Cuál es un buen promedio, cómo se calcula el hándicap, cuánto cuesta una bola, cómo entrar a una liga. Las dudas reales del boliche mexicano, respondidas de una en una.",
  ruta: "/preguntas",
  keywords: [
    "preguntas frecuentes boliche",
    "cuál es un buen promedio de boliche",
    "cómo se calcula el promedio de boliche",
    "cuánto cuesta una bola de boliche",
    "cómo se juega boliche",
  ],
});

export default function PreguntasPage() {
  return (
    <>
      {/* Todas las respuestas están visibles en la página, sin acordeón que las
          esconda tras un clic: es requisito para marcar FAQPage y, sobre todo,
          es lo que hace que se puedan leer y citar completas. */}
      <JsonLd
        data={grafo(
          faqSchema(faq.map((f) => ({ pregunta: f.pregunta, respuesta: f.respuesta }))),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Preguntas", ruta: "/preguntas" },
          ])
        )}
      />

      <PageHeader
        etiqueta="Preguntas frecuentes"
        titulo="Las dudas reales del boliche"
        descripcion="Cada respuesta se sostiene sola y va al grano. Si la respuesta honesta es «depende», aquí dice de qué depende."
        fondo="/img/articulos/reglas.jpg"
      />

      <div className="container-page py-10">
        {categoriasFaqEnUso.map((categoria) => {
          const preguntas = faq.filter((f) => f.categoria === categoria);
          return (
            <section key={categoria} className="mb-14 last:mb-0">
              <h2 className="text-primary font-mono text-xs font-medium tracking-widest uppercase">{categoriaFaqLabel[categoria]}</h2>
              <div className="mt-5 flex flex-col gap-8 border-t pt-6">
                {preguntas.map((f) => (
                  <article key={f.pregunta} className="max-w-3xl">
                    <h3 className="text-lg font-semibold tracking-tight text-balance">{f.pregunta}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-pretty">{f.respuesta}</p>
                    {f.ampliar && (
                      <Link
                        href={f.ampliar}
                        className="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                      >
                        Ampliar <ArrowRight className="size-4" />
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <p className="text-muted-foreground mt-14 max-w-2xl text-sm leading-relaxed">
          ¿Falta tu pregunta? Escríbenos y la respondemos aquí. Las cifras de promedio salen del{" "}
          <Link href="/datos" className="text-primary font-medium hover:underline">
            informe abierto de la comunidad
          </Link>
          , que se actualiza con cada serie registrada.
        </p>
      </div>
    </>
  );
}
