import { playerBySlug, playerStats } from "./players";
import { teamBySlug } from "./teams";

/**
 * Autores del sitio.
 *
 * Los ocho firmantes son jugadores de la comunidad, así que su credencial no es
 * una biografía escrita: es su promedio, sus años jugando y su equipo, todo
 * verificable en su perfil. Esa es la diferencia entre "escrito por un experto"
 * y "escrito por alguien que promedia 217 y lo puedes comprobar".
 *
 * Importa para GEO: los motores generativos tratan las señales de experiencia y
 * autoría como filtro, no como bonificación. Un artículo sin autor identificable
 * y sin credencial comprobable compite en desventaja aunque el texto sea mejor.
 */

export interface Author {
  /** Coincide con el slug del jugador: la credencial sale de ahí. */
  slug: string;
  nombre: string;
  /** Qué lo hace fuente creíble en el tema que firma. Una frase, concreta. */
  credencial: string;
  /** Temas sobre los que escribe. Alimenta `knowsAbout` del JSON-LD. */
  especialidad: string[];
  /** Certificaciones reales del deporte. Vacío si no tiene: no se inventan. */
  certificaciones?: string[];
}

export const authors: Author[] = [
  {
    slug: "jorge-alcantara",
    nombre: "Jorge Alcántara",
    credencial:
      "Trabajó seis años en pro shop perforando bolas. Escribe sobre equipo desde el lado del que mide la mano, no del que vende el catálogo.",
    especialidad: ["equipo", "perforación", "primera bola"],
    certificaciones: ["Técnico de pro shop certificado (IBPSIA, nivel 1)"],
  },
  {
    slug: "andrea-mercado",
    nombre: "Andrea Mercado",
    credencial: "Zurda, primera del ranking de la comunidad. Su tema es leer la pista y ajustar antes de que el patrón se rompa.",
    especialidad: ["lectura de pista", "patrones de aceite", "juego competitivo"],
  },
  {
    slug: "marco-zavala",
    nombre: "Marco Zavala",
    credencial: "Segundo del ranking y capitán de liga. Escribe sobre técnica desde el trabajo semanal, no desde la teoría.",
    especialidad: ["técnica", "approach", "swing"],
  },
  {
    slug: "gabriela-solis",
    nombre: "Gabriela Solís",
    credencial: "Entrena a juveniles en su boliche. Su especialidad es el juego mental y la rutina previa al tiro.",
    especialidad: ["juego mental", "rutina", "entrenamiento"],
    certificaciones: ["Entrenadora nivel I (USBC Coaching)"],
  },
  {
    slug: "ricardo-fuentes",
    nombre: "Ricardo Fuentes",
    credencial: "Lleva doce temporadas de liga sin interrupción. Escribe sobre repuestos, que es donde dice que se gana el promedio.",
    especialidad: ["repuestos", "splits", "consistencia"],
  },
  {
    slug: "renata-ochoa",
    nombre: "Renata Ochoa",
    credencial: "Pasó de 130 a 190 en dos años documentando cada serie. Escribe sobre entrenamiento medible.",
    especialidad: ["entrenamiento", "progresión", "estadística personal"],
  },
  {
    slug: "mariana-delgado",
    nombre: "Mariana Delgado",
    credencial: "Organiza torneos en el occidente. Conoce el formato competitivo desde la mesa de inscripción.",
    especialidad: ["torneos", "formatos", "reglamento"],
  },
  {
    slug: "paulina-rios",
    nombre: "Paulina Ríos",
    credencial: "Entró a su primera liga hace tres años. Escribe la parte que los manuales dan por sabida.",
    especialidad: ["iniciación", "etiqueta", "ligas"],
  },
];

export const authorByName = (nombre: string) => authors.find((a) => a.nombre === nombre);
export const authorBySlug = (slug: string) => authors.find((a) => a.slug === slug);

/**
 * Credencial completa de un autor, con las cifras vivas de su perfil de
 * jugador. Se calcula, no se escribe: si su promedio cambia, la firma cambia.
 */
export function authorConDatos(nombre: string) {
  const autor = authorByName(nombre);
  if (!autor) return null;
  const jugador = playerBySlug(autor.slug);
  if (!jugador) return { ...autor, jugador: null, stats: null, equipo: null, anios: null };

  const stats = playerStats(jugador);
  return {
    ...autor,
    jugador,
    stats,
    equipo: jugador.equipoSlug ? teamBySlug(jugador.equipoSlug) : null,
    anios: new Date().getFullYear() - jugador.desdeAnio,
  };
}
