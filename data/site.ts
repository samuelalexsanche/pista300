export const site = {
  nombre: "Pista300",
  tagline: "La comunidad del boliche mexicano",
  descripcion:
    "Aprende, mejora y compite. Artículos, herramientas de análisis, torneos, ligas y rankings de la comunidad boliche de México.",
  ciudad: "Guadalajara, Jalisco",
  email: "hola@pista300.mx",
  whatsapp: "523327874747",
  anioFundacion: 2024,
  /** Placeholders: reemplazar con datos reales del cliente antes de producción. */
  demo: true,
} as const;

/**
 * ÚNICA fuente de verdad de la URL pública del sitio.
 *
 * De aquí salen el `metadataBase`, los canonical, el sitemap, el robots.txt y
 * todo el JSON-LD. Cambiar este valor (y `basePath` en `next.config.ts`) es lo
 * único que hace falta para mover el sitio a su dominio definitivo.
 *
 * Se puede sobreescribir con la variable de entorno NEXT_PUBLIC_SITE_URL.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuelalexsanche.github.io/pista300").replace(/\/$/, "");

/**
 * Prefijo de ruta cuando el sitio no vive en la raíz del dominio (GitHub Pages
 * lo sirve bajo /pista300). Vacío en local y en un dominio propio.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Datos de identidad que consume el JSON-LD de Organization / LocalBusiness. */
export const organizacion = {
  /** El ente es una comunidad deportiva, no un negocio con mostrador. */
  tipo: "SportsOrganization",
  deporte: "Boliche",
  fundacion: String(site.anioFundacion),
  region: "MX",
  idioma: "es-MX",
  /** Redes y perfiles oficiales: alimentan `sameAs`. Vacío mientras sea demo. */
  perfiles: [] as string[],
} as const;

/**
 * ÚNICA excepción a la regla de "cero colores literales".
 *
 * `<meta name="theme-color">` y el manifest se resuelven antes de que exista
 * CSS, así que no pueden leer las variables de `app/globals.css`. Estos valores
 * son copia de `--background` y `--foreground` de `:root` y `.dark`: si cambian
 * allá, cámbialos aquí. No los uses para nada más.
 */
export const coloresMeta = {
  claro: "#ffffff",
  oscuro: "#0c1116",
  marca: "#ff5a1f",
  /** Solo para las imágenes Open Graph, que se rasterizan sin CSS. */
  superficie: "#f6f7f9",
  borde: "#e4e7eb",
  tenue: "#5b6470",
  dato: "#1b6ef3",
} as const;

export const nav = [
  {
    slug: "aprende",
    titulo: "Aprende",
    descripcion: "Lo básico, bien explicado. Artículos, tips y tutoriales para empezar sin malos hábitos.",
    href: "/aprende",
    items: [
      { titulo: "Artículos", href: "/aprende" },
      { titulo: "Boliche básico", href: "/aprende/boliche-basico" },
      { titulo: "Preguntas frecuentes", href: "/preguntas" },
      { titulo: "Tips rápidos", href: "/aprende?categoria=tecnica" },
      { titulo: "Tutoriales", href: "/aprende?categoria=entrenamiento" },
    ],
  },
  {
    slug: "mejora",
    titulo: "Mejora",
    descripcion: "Técnica, entrenamiento, análisis de tu juego y el equipo correcto para tu mano.",
    href: "/mejora",
    items: [
      { titulo: "Técnicas", href: "/mejora/tecnicas" },
      { titulo: "Entrenamiento", href: "/mejora/entrenamiento" },
      { titulo: "Análisis", href: "/herramientas" },
      { titulo: "Equipo", href: "/mejora/equipo" },
    ],
  },
  {
    slug: "conecta",
    titulo: "Conecta",
    descripcion: "Torneos, ligas, equipos y rankings. Encuentra dónde y con quién jugar.",
    href: "/conecta",
    items: [
      { titulo: "Comunidad", href: "/conecta" },
      { titulo: "Torneos", href: "/conecta/torneos" },
      { titulo: "Equipos", href: "/conecta/equipos" },
      { titulo: "Rankings", href: "/conecta/rankings" },
      { titulo: "Ligas", href: "/conecta/ligas" },
      { titulo: "Boliches", href: "/centros" },
      { titulo: "Datos de la comunidad", href: "/datos" },
    ],
  },
] as const;
