import type { MetadataRoute } from "next";
import { urlAbsoluta } from "@/lib/seo";
import { articles } from "@/data/articles";
import { tournaments } from "@/data/tournaments";
import { players } from "@/data/players";
import { teams } from "@/data/teams";
import { balls } from "@/data/balls";
import { techniques } from "@/data/techniques";

/** Requerido por `output: "export"`: estos handlers se resuelven en build. */
export const dynamic = "force-static";

/**
 * Sitemap del sitio.
 *
 * `lastModified` va siempre: sin él, el crawler no tiene señal de qué vale la
 * pena volver a rastrear. Donde el dato existe (fecha del artículo, inicio del
 * torneo) se usa el real; el resto usa la fecha del build.
 *
 * `/cuenta` queda fuera a propósito: es un panel de sesión, no contenido.
 */

const build = new Date();

type Entrada = MetadataRoute.Sitemap[number];

const estaticas: { ruta: string; prioridad: number; frecuencia: Entrada["changeFrequency"] }[] = [
  { ruta: "/", prioridad: 1, frecuencia: "daily" },
  { ruta: "/conecta/torneos", prioridad: 0.9, frecuencia: "daily" },
  { ruta: "/conecta/rankings", prioridad: 0.9, frecuencia: "daily" },
  // Contenido de autoridad: informe propio y centro de preguntas. Alta
  // prioridad porque son las páginas pensadas para ser citadas.
  { ruta: "/datos", prioridad: 0.9, frecuencia: "weekly" },
  { ruta: "/preguntas", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/acerca", prioridad: 0.5, frecuencia: "yearly" },
  { ruta: "/aprende", prioridad: 0.8, frecuencia: "weekly" },
  { ruta: "/aprende/boliche-basico", prioridad: 0.8, frecuencia: "monthly" },
  { ruta: "/centros", prioridad: 0.8, frecuencia: "monthly" },
  { ruta: "/mejora", prioridad: 0.7, frecuencia: "weekly" },
  { ruta: "/mejora/tecnicas", prioridad: 0.7, frecuencia: "monthly" },
  { ruta: "/mejora/entrenamiento", prioridad: 0.7, frecuencia: "monthly" },
  { ruta: "/mejora/equipo", prioridad: 0.7, frecuencia: "weekly" },
  { ruta: "/conecta", prioridad: 0.7, frecuencia: "weekly" },
  { ruta: "/conecta/equipos", prioridad: 0.6, frecuencia: "weekly" },
  { ruta: "/conecta/ligas", prioridad: 0.6, frecuencia: "weekly" },
  { ruta: "/herramientas", prioridad: 0.7, frecuencia: "monthly" },
  { ruta: "/herramientas/promedio", prioridad: 0.8, frecuencia: "monthly" },
  { ruta: "/herramientas/anotador", prioridad: 0.6, frecuencia: "monthly" },
  { ruta: "/herramientas/repuestos", prioridad: 0.6, frecuencia: "monthly" },
  { ruta: "/herramientas/patrones", prioridad: 0.6, frecuencia: "monthly" },
  { ruta: "/premium", prioridad: 0.6, frecuencia: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...estaticas.map(({ ruta, prioridad, frecuencia }) => ({
      url: urlAbsoluta(ruta),
      lastModified: build,
      changeFrequency: frecuencia,
      priority: prioridad,
    })),

    ...articles.map((a) => ({
      url: urlAbsoluta(`/aprende/${a.slug}`),
      lastModified: new Date(a.fecha),
      changeFrequency: "yearly" as const,
      // Un artículo de acceso libre se prioriza sobre uno tras el paywall.
      priority: a.premium ? 0.5 : 0.7,
    })),

    ...tournaments.map((t) => ({
      url: urlAbsoluta(`/conecta/torneos/${t.slug}`),
      lastModified: build,
      // Un torneo cambia (cupo, inscritos) hasta que se juega.
      changeFrequency: "daily" as const,
      priority: t.destacado ? 0.9 : 0.8,
    })),

    ...players.map((p) => ({
      url: urlAbsoluta(`/conecta/jugadores/${p.slug}`),
      lastModified: build,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),

    ...teams.map((t) => ({
      url: urlAbsoluta(`/conecta/equipos/${t.slug}`),
      lastModified: build,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),

    ...balls.map((b) => ({
      url: urlAbsoluta(`/mejora/equipo/${b.slug}`),
      lastModified: build,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    ...techniques.map((t) => ({
      url: urlAbsoluta(`/mejora/tecnicas/${t.slug}`),
      lastModified: build,
      changeFrequency: "monthly" as const,
      priority: t.premium ? 0.5 : 0.7,
    })),
  ];
}
