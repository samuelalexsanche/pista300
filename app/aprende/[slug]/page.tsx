import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { articles, articleBySlug, categoriaLabel } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Placeholder } from "@/components/marketing/placeholder";
import { ArticleCard } from "@/components/content/article-card";
import { PremiumGate, PremiumBadgeLock } from "@/components/premium/premium-gate";
import { JsonLd } from "@/components/seo/json-ld";
import { metadatos } from "@/lib/seo";
import { grafo, articleSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return metadatos({
    titulo: a.titulo,
    descripcion: a.resumen,
    ruta: `/aprende/${a.slug}`,
    tipo: "article",
    publicado: a.fecha,
    autor: a.autor,
    keywords: [...a.tags, categoriaLabel[a.categoria], "boliche México"],
  });
}

function Cuerpo({ bloques }: { bloques: NonNullable<ReturnType<typeof articleBySlug>>["cuerpo"] }) {
  return (
    <div className="flex flex-col gap-5">
      {bloques.map((b, i) => {
        if (b.tipo === "h2") return <h2 key={i} className="mt-4 text-xl font-semibold tracking-tight">{b.texto}</h2>;
        if (b.tipo === "lista")
          return (
            <ul key={i} className="flex flex-col gap-2">
              {b.items?.map((item, j) => (
                <li key={j} className="flex gap-3 text-[15px] leading-relaxed">
                  <span className="bg-primary mt-2.5 size-1.5 shrink-0 rounded-full" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        if (b.tipo === "cita")
          return (
            <blockquote key={i} className="border-primary bg-surface rounded-r-lg border-l-2 px-5 py-4 text-[15px] leading-relaxed italic">
              {b.texto}
            </blockquote>
          );
        if (b.tipo === "dato")
          return (
            <aside key={i} className="bg-surface rounded-lg border p-4 text-sm leading-relaxed">
              <p className="text-primary mb-1 font-mono text-[10px] tracking-widest uppercase">Dato</p>
              {b.texto}
            </aside>
          );
        return <p key={i} className="text-[15px] leading-relaxed">{b.texto}</p>;
      })}
    </div>
  );
}

export default async function ArticuloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();

  const relacionados = articles.filter((x) => x.slug !== a.slug && x.categoria === a.categoria).slice(0, 3);
  const intro = a.cuerpo.slice(0, 2);
  const resto = a.cuerpo.slice(2);

  return (
    <>
      <JsonLd
        data={grafo(
          articleSchema(a),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Aprende", ruta: "/aprende" },
            { nombre: a.titulo, ruta: `/aprende/${a.slug}` },
          ])
        )}
      />
      <article className="container-page max-w-3xl py-10">
        <Link href="/aprende" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm">
          <ArrowLeft className="size-4" /> Biblioteca
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{categoriaLabel[a.categoria]}</Badge>
          <Badge variant="outline" className="capitalize">{a.nivel}</Badge>
          {a.premium && <PremiumBadgeLock />}
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{a.titulo}</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-pretty">{a.resumen}</p>

        <div className="text-muted-foreground mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span>Por {a.autor}</span>
          <span className="tnum">{formatDate(a.fecha)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {a.minutos} min de lectura
          </span>
        </div>

        <Placeholder src={a.imagen} ratio="21/9" className="mt-8" />

        <div className="mt-8">
          <Cuerpo bloques={intro} />
        </div>

        {a.premium ? (
          <PremiumGate
            className="mt-6"
            alto="lg"
            titulo="Sigue leyendo con Premium"
            descripcion="Este análisis completo forma parte de la biblioteca Premium de Pista300."
          >
            <div className="p-5">
              <Cuerpo bloques={resto} />
            </div>
          </PremiumGate>
        ) : (
          <div className="mt-6">
            <Cuerpo bloques={resto} />
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <Badge key={t} variant="outline">
              #{t}
            </Badge>
          ))}
        </div>
      </article>

      {relacionados.length > 0 && (
        <section className="container-page pb-16">
          <Separator className="mb-10" />
          <h2 className="mb-6 text-lg font-semibold">Relacionados</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((r) => (
              <ArticleCard key={r.slug} a={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
