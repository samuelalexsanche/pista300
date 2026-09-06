import type { Metadata } from "next";
import { site, siteUrl, basePath } from "@/data/site";

/**
 * Helpers de SEO. Todo el sitio construye sus metadatos desde aquí para que
 * los canonical, el Open Graph y el JSON-LD nunca se desincronicen.
 */

/**
 * Convierte una ruta interna ("/conecta/torneos") en URL absoluta y canónica.
 *
 * Emite diagonal final porque el sitio se exporta con `trailingSlash: true`.
 * El canonical tiene que apuntar exactamente a la URL que el servidor sirve;
 * si no coinciden, se declara canónica una URL que redirige.
 */
export function urlAbsoluta(ruta = "/"): string {
  const limpia = ruta.startsWith("/") ? ruta : `/${ruta}`;
  if (limpia === "/") return `${siteUrl}/`;
  // Los archivos (sitemap.xml, robots.txt) no llevan diagonal final.
  const esArchivo = /\.[a-z0-9]+$/i.test(limpia);
  return `${siteUrl}${limpia}${esArchivo ? "" : "/"}`;
}

/**
 * Ruta a un archivo servido desde /public teniendo en cuenta el basePath.
 * `next/link` y `next/image` lo aplican solos; en JSON-LD y en metadatos hay
 * que hacerlo a mano.
 */
export function rutaPublica(ruta: string): string {
  return `${basePath}${ruta.startsWith("/") ? ruta : `/${ruta}`}`;
}

/** Recorta una descripción al largo que Google suele renderizar sin cortar palabras. */
export function recortar(texto: string, max = 155): string {
  const plano = texto.replace(/\s+/g, " ").trim();
  if (plano.length <= max) return plano;
  return `${plano.slice(0, plano.lastIndexOf(" ", max - 1))}…`;
}

type MetaEntrada = {
  titulo: string;
  descripcion: string;
  /** Ruta interna, p. ej. "/conecta/torneos/abierto-guadalajara-2027". */
  ruta: string;
  /** "article" para contenido con fecha; por omisión "website". */
  tipo?: "website" | "article";
  publicado?: string;
  autor?: string;
  /** Excluir de los índices (páginas de sesión, panel de cuenta). */
  noIndexar?: boolean;
  keywords?: readonly string[];
};

/**
 * Construye el bloque `Metadata` completo de una página: título, descripción,
 * canonical, Open Graph y Twitter card. La imagen OG la resuelve Next solo a
 * partir del `opengraph-image` más cercano en el árbol de rutas.
 */
export function metadatos({
  titulo,
  descripcion,
  ruta,
  tipo = "website",
  publicado,
  autor,
  noIndexar,
  keywords,
}: MetaEntrada): Metadata {
  const desc = recortar(descripcion);
  const url = urlAbsoluta(ruta);

  return {
    title: titulo,
    description: desc,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    robots: noIndexar
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : undefined,
    openGraph: {
      type: tipo,
      url,
      siteName: site.nombre,
      locale: "es_MX",
      title: `${titulo} · ${site.nombre}`,
      description: desc,
      ...(tipo === "article" && publicado
        ? { publishedTime: publicado, authors: autor ? [autor] : undefined }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${titulo} · ${site.nombre}`,
      description: desc,
    },
  };
}
