import type { MetadataRoute } from "next";
import { urlAbsoluta } from "@/lib/seo";

/** Requerido por `output: "export"`: estos handlers se resuelven en build. */
export const dynamic = "force-static";

/**
 * robots.txt
 *
 * Esta es la pieza más importante para visibilidad en IA y la que más seguido
 * está mal: si los agentes de los motores generativos están bloqueados, el sitio
 * simplemente no existe para ellos, por bueno que sea el contenido. Se listan
 * explícitamente en vez de confiar en el `*`, porque muchos CDN (Cloudflare
 * entre ellos) bloquean crawlers de IA por defecto y conviene que la intención
 * quede escrita.
 *
 * Se distinguen dos familias:
 *  - Crawlers de BÚSQUEDA con IA (citan y enlazan): interesa que entren.
 *  - Crawlers de ENTRENAMIENTO de modelos: también se permiten porque el
 *    objetivo del sitio es ser la referencia del boliche en México, y aparecer
 *    en la respuesta de un modelo es tráfico de marca. Si el cliente prefiere
 *    no ceder contenido a entrenamiento, se bloquean AQUÍ y en ningún otro lado.
 */

/** Buscadores generativos: leen en tiempo real, citan y mandan tráfico. */
const buscadoresIA = [
  "OAI-SearchBot", // ChatGPT Search
  "ChatGPT-User", // navegación a petición del usuario en ChatGPT
  "PerplexityBot",
  "Perplexity-User",
  "Claude-User", // navegación a petición del usuario en Claude
  "Claude-SearchBot",
  "Google-Extended", // habilita citas en Gemini y AI Overviews
  "Applebot-Extended",
  "Bingbot",
  "DuckDuckBot",
];

/** Crawlers de entrenamiento de modelos. */
const entrenamientoIA = ["GPTBot", "ClaudeBot", "anthropic-ai", "Meta-ExternalAgent", "Amazonbot", "Bytespider", "CCBot"];

/** Rutas sin valor de búsqueda: panel de sesión y API interna. */
const privadas = ["/cuenta", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privadas },
      ...buscadoresIA.map((agente) => ({ userAgent: agente, allow: "/", disallow: privadas })),
      ...entrenamientoIA.map((agente) => ({ userAgent: agente, allow: "/", disallow: privadas })),
    ],
    sitemap: urlAbsoluta("/sitemap.xml"),
    host: urlAbsoluta("/"),
  };
}
