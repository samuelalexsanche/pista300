import type { Metadata } from "next";
import Link from "next/link";
import { site, siteUrl } from "@/data/site";
import { authors, authorConDatos } from "@/data/authors";
import { resumen } from "@/lib/estadisticas";
import { metadatos, urlAbsoluta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, breadcrumbSchema } from "@/lib/schema";
import { PageHeader } from "@/components/marketing/section-heading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { iniciales } from "@/components/community/player-card";

export const metadata: Metadata = metadatos({
  titulo: "Quiénes somos y cómo trabajamos",
  descripcion:
    "Quién escribe en Pista300, con qué credenciales, de dónde salen los datos y qué hacemos cuando nos equivocamos. La política editorial completa.",
  ruta: "/acerca",
  keywords: ["sobre Pista300", "política editorial", "quiénes somos"],
});

/**
 * Página de transparencia editorial.
 *
 * No es relleno corporativo. Los motores generativos usan las señales de
 * experiencia, autoría y confianza como filtro de entrada: una fuente sin
 * autores identificables, sin método declarado y sin política de correcciones
 * compite en desventaja aunque el contenido sea mejor. Esta página es donde
 * esas señales se hacen verificables en un solo lugar.
 */
export default function AcercaPage() {
  const equipo = authors.map((a) => authorConDatos(a.nombre)!).filter(Boolean);

  return (
    <>
      <JsonLd
        data={grafo(
          {
            "@type": "AboutPage",
            "@id": `${urlAbsoluta("/acerca")}#pagina`,
            name: `Quiénes somos — ${site.nombre}`,
            url: urlAbsoluta("/acerca"),
            mainEntity: { "@id": `${siteUrl}/#organizacion` },
          },
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Acerca", ruta: "/acerca" },
          ])
        )}
      />

      <PageHeader
        etiqueta="Acerca"
        titulo="Quiénes somos y cómo trabajamos"
        descripcion="Todo lo que publicamos lo firma alguien que juega. Aquí está quién es cada uno, de dónde salen las cifras y qué hacemos cuando nos equivocamos."
        fondo="/img/articulos/primera-liga.jpg"
      />

      <div className="container-page max-w-3xl py-10">
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Qué es Pista300</h2>
          <div className="text-muted-foreground mt-3 flex flex-col gap-3 text-[15px] leading-relaxed">
            <p>
              Pista300 es una comunidad abierta de boliche mexicano con base en {site.ciudad}. Reúne tres cosas que estaban
              dispersas: material para aprender bien desde el principio, herramientas de análisis que funcionan de verdad, y el
              calendario de torneos, ligas y rankings del país.
            </p>
            <p>
              El acceso a la mayor parte del sitio es libre. La membresía Premium financia el mantenimiento y da acceso a las
              herramientas de análisis y a la biblioteca completa.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Quién escribe</h2>
          <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
            Los ocho firmantes son jugadores activos de la comunidad. Su credencial no es una biografía: es su promedio, sus años
            jugando y su equipo, y todo se puede comprobar en su perfil público.
          </p>
          <ul className="mt-6 flex flex-col gap-5">
            {equipo.map((a) => (
              <li key={a.slug} className="flex flex-wrap items-start gap-4">
                <Avatar className="size-10">
                  <AvatarFallback>{iniciales(a.nombre)}</AvatarFallback>
                </Avatar>
                <div className="min-w-56 flex-1">
                  <p className="font-semibold">
                    {a.jugador ? (
                      <Link href={`/conecta/jugadores/${a.jugador.slug}`} className="hover:text-primary underline-offset-2 hover:underline">
                        {a.nombre}
                      </Link>
                    ) : (
                      a.nombre
                    )}
                    {a.stats && (
                      <span className="text-muted-foreground ml-2 text-sm font-normal">
                        promedio <span className="text-foreground font-mono font-semibold tabular-nums">{a.stats.promedio}</span>
                      </span>
                    )}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{a.credencial}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">De dónde salen los datos</h2>
          <div className="text-muted-foreground mt-3 flex flex-col gap-3 text-[15px] leading-relaxed">
            <p>
              Los promedios, hándicaps y rankings se calculan con un solo motor de puntuación, verificado contra los cuatro casos
              canónicos del deporte: juego perfecto <span className="text-foreground font-mono tabular-nums">300</span>, todo
              spares de cinco <span className="text-foreground font-mono tabular-nums">150</span>, todo frames abiertos de nueve{" "}
              <span className="text-foreground font-mono tabular-nums">90</span>, y un juego mixto de referencia{" "}
              <span className="text-foreground font-mono tabular-nums">167</span>.
            </p>
            <p>
              El promedio se calcula truncado, como manda la USBC. El hándicap usa base 220 al 80%, el formato más común en las
              ligas mexicanas. Las cifras agregadas de la comunidad —hoy{" "}
              <span className="text-foreground font-mono tabular-nums">{resumen.juegos.toLocaleString("es-MX")}</span> juegos— se
              publican abiertas en el{" "}
              <Link href="/datos" className="text-primary font-medium hover:underline">
                informe del estado del boliche
              </Link>
              , con su metodología y sus limitaciones declaradas.
            </p>
            <p>
              Cuando un artículo se apoya en un reglamento o en una especificación técnica, la fuente va citada al pie con enlace
              directo. Las referencias son de organismos del deporte: USBC, la Federación Internacional de Boliche y Kegel.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Correcciones</h2>
          <div className="text-muted-foreground mt-3 flex flex-col gap-3 text-[15px] leading-relaxed">
            <p>
              Si encuentras un error, escríbenos a{" "}
              <a href={`mailto:${site.email}`} className="text-primary font-medium hover:underline">
                {site.email}
              </a>
              . Corregimos el texto y dejamos anotado qué cambió y cuándo. No borramos errores en silencio.
            </p>
            <p>
              Ninguna de las fichas de equipo lleva contenido pagado ni enlaces de afiliado. Si eso cambia alguna vez, se
              declarará en la propia ficha antes de publicarla.
            </p>
          </div>
        </section>

        {site.demo && (
          <section className="border-warning/40 bg-warning/5 mt-12 rounded-xl border p-5">
            <h2 className="font-semibold">Esto es una demostración</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Pista300 es un sitio de muestra construido por Mattera Systems. La marca, los jugadores, los boliches y los torneos
              son ficticios; la estructura, el código y el motor de puntuación son reales. Las cifras de la comunidad se generan
              de forma determinista a partir de datos de ejemplo y no deben citarse como estadística real del boliche mexicano.
            </p>
          </section>
        )}
      </div>
    </>
  );
}
