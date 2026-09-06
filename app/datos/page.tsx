import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { site } from "@/data/site";
import { resumen, periodo, distribucionPromedios, promedioPorNivel, porMano, hallazgos } from "@/lib/estadisticas";
import { formatDate, formatMoney } from "@/lib/format";
import { metadatos, urlAbsoluta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { grafo, datasetSchema, claimSchema, breadcrumbSchema } from "@/lib/schema";
import { PageHeader } from "@/components/marketing/section-heading";
import { Stat, StatStrip } from "@/components/marketing/stat";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const RUTA = "/datos";

export const metadata: Metadata = metadatos({
  titulo: "Estado del boliche en México",
  descripcion: `Informe abierto con el promedio, la distribución por nivel y el costo de competir, medido sobre ${resumen.juegos.toLocaleString("es-MX")} juegos reales de la comunidad Pista300.`,
  ruta: RUTA,
  keywords: [
    "promedio de boliche en México",
    "estadísticas de boliche",
    "cuál es un buen promedio de boliche",
    "cuánto cuesta un torneo de boliche",
  ],
});

/** Barra de proporción. Usa el token de dato, no el de marca: esto es medición. */
function Barra({ porcentaje }: { porcentaje: number }) {
  return (
    <div className="bg-surface-2 h-1.5 w-full overflow-hidden rounded-full">
      <div className="bg-data h-full rounded-full" style={{ width: `${porcentaje}%` }} />
    </div>
  );
}

export default function DatosPage() {
  return (
    <>
      <JsonLd
        data={grafo(
          datasetSchema({
            nombre: "Estado del boliche en México — Pista300",
            descripcion: `Estadística agregada de ${resumen.jugadores} bolichistas y ${resumen.juegos} juegos registrados en ligas y torneos mexicanos entre ${periodo.desde} y ${periodo.hasta}.`,
            ruta: RUTA,
            desde: periodo.desde,
            hasta: periodo.hasta,
            registros: resumen.juegos,
            variables: ["Promedio", "Hándicap", "Puntuación por juego", "Total de serie", "Nivel", "Mano dominante", "Cuota de torneo"],
          }),
          ...hallazgos.map((h, i) => claimSchema(h.afirmacion, RUTA, i + 1)),
          breadcrumbSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Datos", ruta: RUTA },
          ])
        )}
      />

      <PageHeader
        etiqueta="Informe abierto"
        titulo="Estado del boliche en México"
        descripcion={`Nadie publica cuánto promedia realmente un bolichista mexicano. Nosotros sí: estas cifras salen de ${resumen.juegos.toLocaleString("es-MX")} juegos registrados por la comunidad, no de una encuesta ni de una estimación.`}
      />

      <div className="container-page py-10">
        <StatStrip>
          <Stat valor={resumen.promedioComunidad} etiqueta="Promedio general" detalle="de toda la comunidad" tono="primary" />
          <Stat valor={resumen.juegos.toLocaleString("es-MX")} etiqueta="Juegos medidos" detalle={`${resumen.series} series`} />
          <Stat valor={resumen.jugadores} etiqueta="Jugadores" detalle={`en ${resumen.boliches} boliches`} />
          <Stat valor={`${resumen.juegosSobre200}%`} etiqueta="Juegos de 200+" detalle="del total registrado" />
        </StatStrip>

        <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
          Periodo medido: {formatDate(periodo.desde)} — {formatDate(periodo.hasta)}. Metodología al final de la página.
        </p>

        {/* Los hallazgos van primero y en frases completas. Es lo que se cita. */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">Los cuatro hallazgos</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed">
            Cada uno se sostiene solo. Cítalos con atribución a Pista300 y enlace a esta página.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {hallazgos.map((h) => (
              <Card key={h.titulo}>
                <CardContent className="p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-primary font-mono text-3xl font-semibold tabular-nums">{h.dato}</span>
                    <h3 className="text-sm font-semibold">{h.titulo}</h3>
                  </div>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{h.afirmacion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">Cómo se reparte la comunidad</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed">
            La pregunta que todo el mundo hace es si su promedio es bueno. Esta es la respuesta honesta: depende de contra quién.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {distribucionPromedios.map((d) => (
              <div key={d.rango} className="flex items-center gap-4">
                <span className="w-28 shrink-0 text-sm font-medium">{d.rango}</span>
                <Barra porcentaje={d.porcentaje} />
                <span className="w-24 shrink-0 text-right">
                  <span className="font-mono text-sm font-semibold tabular-nums">{d.porcentaje}%</span>
                  <span className="text-muted-foreground ml-1.5 font-mono text-xs tabular-nums">({d.jugadores})</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">Promedio por nivel declarado</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed">
            Contrasta cómo se describe cada jugador contra lo que marca la hoja.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nivel</TableHead>
                  <TableHead className="text-right">Jugadores</TableHead>
                  <TableHead className="text-right">Promedio</TableHead>
                  <TableHead className="text-right">Más bajo</TableHead>
                  <TableHead className="text-right">Más alto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promedioPorNivel.map((n) => (
                  <TableRow key={n.nivel}>
                    <TableCell className="font-medium capitalize">{n.nivel}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{n.jugadores}</TableCell>
                    <TableCell className="text-right font-mono font-semibold tabular-nums">{n.promedio}</TableCell>
                    <TableCell className="text-muted-foreground text-right font-mono tabular-nums">{n.peor}</TableCell>
                    <TableCell className="text-muted-foreground text-right font-mono tabular-nums">{n.mejor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Derechos y zurdos</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Los zurdos juegan sobre una parte de la pista mucho menos transitada, así que el patrón les cambia más despacio.
            </p>
            <div className="mt-5 flex flex-col gap-4">
              {porMano.map((m) => (
                <div key={m.mano} className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3">
                  <span className="text-sm font-medium capitalize">Mano {m.mano}</span>
                  <span className="flex items-baseline gap-4">
                    <span className="text-muted-foreground font-mono text-xs tabular-nums">{m.porcentaje}%</span>
                    <span className="font-mono text-lg font-semibold tabular-nums">{m.promedio}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">Lo que cuesta competir</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Sobre los {resumen.torneos} torneos del calendario abierto de la comunidad.
            </p>
            <StatStrip className="mt-5 grid-cols-2 sm:grid-cols-2">
              <Stat valor={formatMoney(resumen.cuotaPromedio)} etiqueta="Cuota promedio" />
              <Stat valor={formatMoney(resumen.bolsaTotal)} etiqueta="Bolsa del calendario" />
              <Stat valor={resumen.lineasTotales} etiqueta="Líneas registradas" detalle={`en ${resumen.boliches} boliches`} />
              <Stat valor={resumen.ligas} etiqueta="Ligas activas" />
            </StatStrip>
          </div>
        </section>

        {/* Permiso explícito de cita: quita la fricción a quien quiera usarlo. */}
        <section className="mt-14">
          <div className="bg-surface flex flex-wrap items-start gap-4 rounded-xl border p-5">
            <Quote className="text-primary mt-0.5 size-5 shrink-0" aria-hidden />
            <div className="min-w-56 flex-1">
              <h2 className="text-sm font-semibold">Puedes citar estos datos</h2>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                Son abiertos, bajo licencia Creative Commons BY 4.0. Solo pedimos atribución a {site.nombre} y un enlace a esta
                página. Si eres periodista o investigador y necesitas el desglose completo, escríbenos a{" "}
                <a href={`mailto:${site.email}`} className="hover:text-primary font-medium underline underline-offset-2">
                  {site.email}
                </a>
                .
              </p>
              <p className="text-muted-foreground mt-3 font-mono text-xs leading-relaxed break-all">
                {site.nombre} ({new Date(periodo.hasta).getFullYear()}). Estado del boliche en México. {urlAbsoluta(RUTA)}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">Metodología</h2>
          <div className="text-muted-foreground mt-4 flex max-w-2xl flex-col gap-3 text-sm leading-relaxed">
            <p>
              La muestra son {resumen.jugadores} jugadores con series registradas en {resumen.boliches} boliches, entre{" "}
              {formatDate(periodo.desde)} y {formatDate(periodo.hasta)}. Cada serie es de tres juegos; en total{" "}
              <span className="text-foreground font-mono tabular-nums">{resumen.juegos.toLocaleString("es-MX")}</span> juegos.
            </p>
            <p>
              El promedio se calcula truncado, como manda la USBC: se suman todos los pinos y se divide entre el número de juegos,
              descartando los decimales. El hándicap usa base 220 al 80%, que es el formato más común en las ligas mexicanas.
            </p>
            <p>
              La distribución se calcula sobre el promedio de cada jugador, no sobre juegos individuales, para que un jugador con
              muchas series no pese más que uno con pocas. Los porcentajes de juegos de 200+ sí se calculan sobre juegos.
            </p>
            <p>
              <strong className="text-foreground">Limitación importante:</strong> la muestra es de la comunidad Pista300, no de
              todo el boliche mexicano. Está sesgada hacia jugadores de liga que registran sus series, que juegan más y promedian
              más alto que el bolichista ocasional. Léase como &ldquo;el bolichista federado y activo&rdquo;, no como la población
              general.
            </p>
            {site.demo && (
              <p className="border-warning/40 bg-warning/5 rounded-lg border px-4 py-3">
                <strong className="text-foreground">Aviso:</strong> esta es una demostración. Los jugadores, boliches y series son
                ficticios y las cifras se generan de forma determinista a partir de los datos de ejemplo. No las cites como
                estadística real del boliche mexicano hasta que el sitio opere con datos de la comunidad.
              </p>
            )}
          </div>
        </section>

        <p className="text-muted-foreground mt-10 text-sm">
          ¿Quieres que tus series entren en el próximo informe?{" "}
          <Link href="/herramientas/anotador" className="text-primary font-medium hover:underline">
            Regístralas con el anotador
          </Link>
          .
        </p>
      </div>
    </>
  );
}
