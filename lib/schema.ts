import { site, siteUrl, organizacion } from "@/data/site";
import { urlAbsoluta, recortar } from "@/lib/seo";
import { authorConDatos } from "@/data/authors";
import type { Article, Ball, Center, Player, Team, Tournament, League } from "@/data/types";

/**
 * Constructores de JSON-LD (schema.org).
 *
 * Criterio: se marca lo que el sitio realmente contiene y un usuario podría
 * buscar. Nada de schema inflado — un dato marcado que no está visible en la
 * página es una violación de las guías de Google y puede costar los rich results.
 *
 * Los `@id` son URLs con fragmento para que las entidades se puedan referenciar
 * entre sí (un torneo apunta a su boliche, un jugador a su equipo) y el grafo
 * quede conectado en vez de ser islas sueltas.
 */

type Nodo = Record<string, unknown>;

const ID_ORG = `${siteUrl}/#organizacion`;
const ID_SITIO = `${siteUrl}/#sitio`;

/** Quita claves vacías: un JSON-LD con `undefined` o `""` ensucia la validación. */
function limpiar(nodo: Nodo): Nodo {
  return Object.fromEntries(
    Object.entries(nodo).filter(([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0))
  );
}

/* ---------------------------------------------------------------- Identidad */

/** La comunidad. Va una sola vez, en el layout raíz. */
export function organizationSchema(): Nodo {
  return limpiar({
    "@type": organizacion.tipo,
    "@id": ID_ORG,
    name: site.nombre,
    alternateName: site.tagline,
    url: siteUrl,
    description: site.descripcion,
    sport: organizacion.deporte,
    foundingDate: organizacion.fundacion,
    email: site.email,
    areaServed: { "@type": "Country", name: "México" },
    address: { "@type": "PostalAddress", addressLocality: "Guadalajara", addressRegion: "Jalisco", addressCountry: "MX" },
    sameAs: organizacion.perfiles,
  });
}

/**
 * El sitio como entidad, con la acción de búsqueda interna.
 * `SearchAction` es lo que habilita el sitelinks searchbox y le dice a un agente
 * cómo consultar el catálogo sin navegar a ciegas.
 */
export function websiteSchema(): Nodo {
  return {
    "@type": "WebSite",
    "@id": ID_SITIO,
    url: siteUrl,
    name: site.nombre,
    description: site.descripcion,
    inLanguage: organizacion.idioma,
    publisher: { "@id": ID_ORG },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/aprende?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

/* -------------------------------------------------------------- Navegación */

/**
 * Migas. Google las usa para reemplazar la URL cruda en el resultado, y los
 * motores generativos las usan para entender dónde encaja la página.
 */
export function breadcrumbSchema(migas: { nombre: string; ruta: string }[]): Nodo {
  return {
    "@type": "BreadcrumbList",
    itemListElement: migas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nombre,
      item: urlAbsoluta(m.ruta),
    })),
  };
}

/** Listado (rankings, torneos, equipos): declara el orden y el tamaño real. */
export function itemListSchema(nombre: string, elementos: { nombre: string; ruta: string }[]): Nodo {
  return {
    "@type": "ItemList",
    name: nombre,
    numberOfItems: elementos.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: elementos.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.nombre,
      url: urlAbsoluta(e.ruta),
    })),
  };
}

/* ---------------------------------------------------------------- Contenido */

/**
 * Artículo. Para los premium se marca el paywall con `isAccessibleForFree: false`
 * y `hasPart`, que es la forma que Google exige para contenido de suscripción:
 * permite indexar el artículo completo sin que cuente como cloaking.
 * El selector `.contenido-premium` debe existir en el DOM — lo pone <PremiumGate>.
 */
export function articleSchema(a: Article): Nodo {
  return limpiar({
    "@type": "Article",
    "@id": `${urlAbsoluta(`/aprende/${a.slug}`)}#articulo`,
    headline: a.titulo,
    description: recortar(a.resumen),
    datePublished: a.fecha,
    dateModified: a.fecha,
    // `abstract` lleva la respuesta directa: es la unidad autocontenida que un
    // motor puede levantar sin tener que resumir el artículo entero.
    abstract: a.respuestaCorta,
    author: autorSchema(a.autor),
    // Las fuentes citadas van al grafo. Es una de las señales que la
    // investigación de GEO mide como más determinantes para ser citado.
    citation: a.fuentes?.map((f) => ({
      "@type": "CreativeWork",
      name: f.titulo,
      publisher: { "@type": "Organization", name: f.organizacion },
      url: f.url,
      ...(f.anio ? { datePublished: String(f.anio) } : {}),
    })),
    publisher: { "@id": ID_ORG },
    inLanguage: organizacion.idioma,
    articleSection: a.categoria,
    keywords: a.tags.join(", "),
    timeRequired: `PT${a.minutos}M`,
    mainEntityOfPage: { "@type": "WebPage", "@id": urlAbsoluta(`/aprende/${a.slug}`) },
    isAccessibleForFree: !a.premium,
    ...(a.premium
      ? {
          hasPart: {
            "@type": "WebPageElement",
            isAccessibleForFree: false,
            cssSelector: ".contenido-premium",
          },
        }
      : {}),
  });
}

/**
 * Autor con su credencial.
 *
 * Un `author` que es solo un nombre no aporta nada: no distingue a un
 * practicante de doce años de experiencia de un redactor anónimo. Aquí se
 * declara el promedio verificable, la especialidad y las certificaciones, y se
 * enlaza al perfil donde esos datos se pueden comprobar.
 */
function autorSchema(nombre: string): Nodo {
  const a = authorConDatos(nombre);
  if (!a) return { "@type": "Person", name: nombre };

  const url = a.jugador ? urlAbsoluta(`/conecta/jugadores/${a.jugador.slug}`) : undefined;
  return limpiar({
    "@type": "Person",
    "@id": url ? `${url}#persona` : undefined,
    name: a.nombre,
    url,
    description: a.credencial,
    knowsAbout: [...a.especialidad],
    hasCredential: a.certificaciones?.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c,
    })),
    memberOf: a.equipo ? { "@type": "SportsTeam", name: a.equipo.nombre } : undefined,
  });
}

/** Guía paso a paso (técnicas, boliche básico). */
export function howToSchema(nombre: string, descripcion: string, pasos: { titulo: string; detalle: string }[]): Nodo {
  return {
    "@type": "HowTo",
    name: nombre,
    description: recortar(descripcion),
    inLanguage: organizacion.idioma,
    step: pasos.map((p, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: p.titulo,
      text: p.detalle,
    })),
  };
}

/** Preguntas frecuentes. Solo si las respuestas están visibles en la página. */
export function faqSchema(preguntas: { pregunta: string; respuesta: string }[]): Nodo {
  return {
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta },
    })),
  };
}

/* ---------------------------------------------------------------- Comunidad */

/**
 * Torneo. Es el contenido con más intención de búsqueda del sitio
 * ("torneos de boliche en Guadalajara") y el que más se beneficia de rich results.
 */
export function tournamentSchema(t: Tournament, centro?: Center): Nodo {
  const ruta = `/conecta/torneos/${t.slug}`;
  return limpiar({
    "@type": "SportsEvent",
    "@id": `${urlAbsoluta(ruta)}#evento`,
    name: t.nombre,
    description: recortar(t.descripcion),
    sport: organizacion.deporte,
    startDate: t.fechaInicio,
    endDate: t.fechaFin,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: organizacion.idioma,
    organizer: { "@id": ID_ORG },
    url: urlAbsoluta(ruta),
    maximumAttendeeCapacity: t.cupo,
    location: centro
      ? {
          "@type": "BowlingAlley",
          "@id": `${urlAbsoluta("/centros")}#${centro.slug}`,
          name: centro.nombre,
          address: {
            "@type": "PostalAddress",
            streetAddress: centro.colonia,
            addressLocality: centro.ciudad,
            addressRegion: centro.estado,
            addressCountry: "MX",
          },
        }
      : { "@type": "Place", name: t.ciudad, address: { "@type": "PostalAddress", addressLocality: t.ciudad, addressCountry: "MX" } },
    offers: {
      "@type": "Offer",
      name: "Inscripción",
      price: t.cuota,
      priceCurrency: "MXN",
      availability: t.inscritos.length < t.cupo ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      url: urlAbsoluta(ruta),
      validFrom: new Date().toISOString().slice(0, 10),
    },
  });
}

/** Jugador. `Person` dentro de un `ProfilePage` es el patrón que Google documenta. */
export function playerSchema(p: Player, promedio: number, equipo?: Team): Nodo {
  const ruta = `/conecta/jugadores/${p.slug}`;
  return limpiar({
    "@type": "Person",
    "@id": `${urlAbsoluta(ruta)}#persona`,
    name: p.nombre,
    alternateName: p.apodo,
    url: urlAbsoluta(ruta),
    homeLocation: { "@type": "Place", name: p.ciudad },
    memberOf: equipo ? { "@type": "SportsTeam", name: equipo.nombre, url: urlAbsoluta(`/conecta/equipos/${equipo.slug}`) } : undefined,
    knowsAbout: organizacion.deporte,
    // El promedio y el mejor juego son los datos que un motor generativo cita.
    additionalProperty: [
      { "@type": "PropertyValue", name: "Promedio", value: promedio },
      { "@type": "PropertyValue", name: "Mejor juego", value: p.mejorJuego },
      { "@type": "PropertyValue", name: "Mejor serie", value: p.mejorSerie },
      { "@type": "PropertyValue", name: "Mano", value: p.mano },
    ],
  });
}

/** Página de perfil que envuelve a la persona. */
export function profilePageSchema(nodoPersona: Nodo, ruta: string): Nodo {
  return {
    "@type": "ProfilePage",
    "@id": `${urlAbsoluta(ruta)}#perfil`,
    mainEntity: { "@id": (nodoPersona as { "@id": string })["@id"] },
    inLanguage: organizacion.idioma,
  };
}

/** Equipo. */
export function teamSchema(t: Team, liga?: League, integrantes: { nombre: string; slug: string }[] = []): Nodo {
  const ruta = `/conecta/equipos/${t.slug}`;
  return limpiar({
    "@type": "SportsTeam",
    "@id": `${urlAbsoluta(ruta)}#equipo`,
    name: t.nombre,
    url: urlAbsoluta(ruta),
    sport: organizacion.deporte,
    foundingDate: String(t.fundado),
    memberOf: liga ? { "@type": "SportsOrganization", name: liga.nombre, sport: organizacion.deporte } : undefined,
    athlete: integrantes.map((i) => ({
      "@type": "Person",
      name: i.nombre,
      url: urlAbsoluta(`/conecta/jugadores/${i.slug}`),
    })),
  });
}

/** Boliche. Subtipo específico `BowlingAlley`, no `LocalBusiness` genérico. */
export function centerSchema(c: Center): Nodo {
  return limpiar({
    "@type": "BowlingAlley",
    "@id": `${urlAbsoluta("/centros")}#${c.slug}`,
    name: c.nombre,
    telephone: `+52${c.telefono.replace(/\D/g, "")}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.colonia,
      addressLocality: c.ciudad,
      addressRegion: c.estado,
      addressCountry: "MX",
    },
    amenityFeature: c.servicios.map((s) => ({ "@type": "LocationFeatureSpecification", name: s, value: true })),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Líneas", value: c.lineas },
      { "@type": "PropertyValue", name: "Ligas activas", value: c.ligasActivas },
    ],
  });
}

/**
 * Bola. Se marca como `Product` SIN `aggregateRating` a propósito: la
 * calificación del demo es editorial y no viene de reseñas de usuarios reales.
 * Marcarla como rating agregado sería una acción manual de Google esperando a pasar.
 */
export function ballSchema(b: Ball): Nodo {
  const ruta = `/mejora/equipo/${b.slug}`;
  return limpiar({
    "@type": "Product",
    "@id": `${urlAbsoluta(ruta)}#producto`,
    name: `${b.marca} ${b.modelo}`,
    brand: { "@type": "Brand", name: b.marca },
    category: "Bolas de boliche",
    description: recortar(b.resumen),
    url: urlAbsoluta(ruta),
    releaseDate: String(b.anio),
    material: b.cubierta,
    additionalProperty: [
      { "@type": "PropertyValue", name: "RG", value: b.rg },
      { "@type": "PropertyValue", name: "Diferencial", value: b.diferencial },
      { "@type": "PropertyValue", name: "Core", value: b.core },
      { "@type": "PropertyValue", name: "Acabado", value: b.acabado },
      { "@type": "PropertyValue", name: "Condición de aceite", value: b.aceite },
    ],
  });
}

/**
 * Conjunto de datos propio.
 *
 * Es el marcado que corresponde a publicar estadística original en vez de
 * repetir la de otros. Declara periodo, tamaño de muestra, licencia y método,
 * que es lo que permite que alguien —persona o modelo— cite la cifra sabiendo
 * de dónde salió.
 */
export function datasetSchema({
  nombre,
  descripcion,
  ruta,
  desde,
  hasta,
  registros,
  variables,
}: {
  nombre: string;
  descripcion: string;
  ruta: string;
  desde: string;
  hasta: string;
  registros: number;
  variables: string[];
}): Nodo {
  return {
    "@type": "Dataset",
    "@id": `${urlAbsoluta(ruta)}#dataset`,
    name: nombre,
    description: recortar(descripcion, 300),
    url: urlAbsoluta(ruta),
    creator: { "@id": ID_ORG },
    publisher: { "@id": ID_ORG },
    inLanguage: organizacion.idioma,
    temporalCoverage: `${desde}/${hasta}`,
    spatialCoverage: { "@type": "Place", name: "México" },
    // Los datos se pueden citar y redistribuir dando crédito. Sin una licencia
    // explícita, quien quiera usar la cifra no sabe si puede.
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    creativeWorkStatus: "Published",
    variableMeasured: variables.map((v) => ({ "@type": "PropertyValue", name: v })),
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/html",
      contentUrl: urlAbsoluta(ruta),
    },
    size: `${registros} juegos registrados`,
  };
}

/** Afirmación citable: una cifra con su definición y su periodo. */
export function claimSchema(afirmacion: string, ruta: string, indice: number): Nodo {
  return {
    "@type": "Claim",
    "@id": `${urlAbsoluta(ruta)}#hallazgo-${indice}`,
    text: afirmacion,
    author: { "@id": ID_ORG },
    inLanguage: organizacion.idioma,
  };
}

/** Herramienta interactiva (calculadora, anotador). */
export function toolSchema(nombre: string, descripcion: string, ruta: string, gratis: boolean): Nodo {
  return {
    "@type": "WebApplication",
    "@id": `${urlAbsoluta(ruta)}#app`,
    name: nombre,
    description: recortar(descripcion),
    url: urlAbsoluta(ruta),
    applicationCategory: "SportsApplication",
    operatingSystem: "Web",
    inLanguage: organizacion.idioma,
    isAccessibleForFree: gratis,
    offers: gratis
      ? { "@type": "Offer", price: 0, priceCurrency: "MXN" }
      : { "@type": "Offer", price: 149, priceCurrency: "MXN", category: "Suscripción" },
  };
}

/* ------------------------------------------------------------------ Grafo */

/**
 * Envuelve los nodos en un solo `@graph`. Un único bloque por página con todo
 * conectado se interpreta mejor que cinco bloques sueltos.
 */
export function grafo(...nodos: (Nodo | null | undefined)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodos.filter(Boolean),
  };
}
