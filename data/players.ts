import type { Player, SerieRegistrada } from "./types";
import { average, handicap, seriesTotal } from "@/lib/bowling";

/**
 * Las series se generan con un PRNG sembrado por el slug del jugador: los datos
 * son estables entre servidor y cliente (nada de Math.random), realistas y no
 * hace falta escribir a mano cientos de scores. Al conectar la API real, esta
 * generación se reemplaza por el fetch y el resto del sitio no cambia.
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFrom(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Genera `semanas` series de 3 juegos alrededor de un promedio objetivo. */
function generarSeries(slug: string, promedioObjetivo: number, semanas: number, centroSlug: string, ligaSlug?: string): SerieRegistrada[] {
  const rand = mulberry32(seedFrom(slug));
  const series: SerieRegistrada[] = [];
  const inicio = new Date("2026-01-08T12:00:00");
  for (let s = 0; s < semanas; s++) {
    const juegos: number[] = [];
    for (let g = 0; g < 3; g++) {
      // Distribución aproximadamente normal usando la suma de tres uniformes.
      const ruido = (rand() + rand() + rand() - 1.5) * 34;
      // Ligera mejora a lo largo de la temporada: el jugador progresa.
      const tendencia = (s / semanas) * 6;
      const score = Math.round(promedioObjetivo + tendencia + ruido);
      juegos.push(Math.max(78, Math.min(300, score)));
    }
    const fecha = new Date(inicio.getTime() + s * 7 * 86400000);
    series.push({
      id: `${slug}-s${s + 1}`,
      fecha: fecha.toISOString().slice(0, 10),
      centroSlug,
      ligaSlug,
      juegos,
    });
  }
  return series;
}

type Semilla = {
  slug: string;
  nombre: string;
  apodo?: string;
  ciudad: string;
  centroSlug: string;
  equipoSlug?: string;
  mano: "derecha" | "izquierda";
  desdeAnio: number;
  nivel: Player["nivel"];
  bolaSlug?: string;
  promedio: number;
  ligaSlug?: string;
};

const semillas: Semilla[] = [
  { slug: "andrea-mercado", nombre: "Andrea Mercado", apodo: "La Zurda", ciudad: "Guadalajara", centroSlug: "boliche-minerva", equipoSlug: "los-tapatios", mano: "izquierda", desdeAnio: 2014, nivel: "competitivo", bolaSlug: "storm-phaze-ii", promedio: 214, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "ricardo-fuentes", nombre: "Ricardo Fuentes", ciudad: "Guadalajara", centroSlug: "boliche-minerva", equipoSlug: "los-tapatios", mano: "derecha", desdeAnio: 2009, nivel: "competitivo", bolaSlug: "hammer-black-widow", promedio: 209, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "mariana-delgado", nombre: "Mariana Delgado", ciudad: "Zapopan", centroSlug: "bowl-andares", equipoSlug: "pinas-de-acero", mano: "derecha", desdeAnio: 2016, nivel: "competitivo", bolaSlug: "roto-grip-idle", promedio: 206, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "jorge-alcantara", nombre: "Jorge Alcántara", apodo: "El Ingeniero", ciudad: "Guadalajara", centroSlug: "pista-chapalita", equipoSlug: "chapalita-bc", mano: "derecha", desdeAnio: 2005, nivel: "competitivo", bolaSlug: "motiv-jackal", promedio: 203, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "paulina-rios", nombre: "Paulina Ríos", ciudad: "Monterrey", centroSlug: "monterrey-bowl", equipoSlug: "regias", mano: "derecha", desdeAnio: 2018, nivel: "avanzado", bolaSlug: "storm-iq-tour", promedio: 198, ligaSlug: "liga-norte" },
  { slug: "diego-santamaria", nombre: "Diego Santamaría", ciudad: "Naucalpan", centroSlug: "bol-satelite", equipoSlug: "satelite-strikers", mano: "derecha", desdeAnio: 2012, nivel: "avanzado", bolaSlug: "900-global-zen", promedio: 196, ligaSlug: "liga-valle-de-mexico" },
  { slug: "sofia-vergara-l", nombre: "Sofía Vergara L.", ciudad: "Guadalajara", centroSlug: "boliche-minerva", equipoSlug: "pinas-de-acero", mano: "izquierda", desdeAnio: 2019, nivel: "avanzado", bolaSlug: "ebonite-choice", promedio: 191, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "hector-vazquez", nombre: "Héctor Vázquez", apodo: "Tornado", ciudad: "Tonalá", centroSlug: "strike-tonala", equipoSlug: "tonala-thunder", mano: "derecha", desdeAnio: 2011, nivel: "avanzado", bolaSlug: "hammer-black-widow", promedio: 189, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "carla-ibarra", nombre: "Carla Ibarra", ciudad: "Puebla", centroSlug: "puebla-pins", equipoSlug: "angelopolis", mano: "derecha", desdeAnio: 2020, nivel: "avanzado", bolaSlug: "roto-grip-idle", promedio: 186, ligaSlug: "liga-valle-de-mexico" },
  { slug: "emilio-navarro", nombre: "Emilio Navarro", ciudad: "León", centroSlug: "leon-bowling-center", equipoSlug: "leon-lanes", mano: "derecha", desdeAnio: 2015, nivel: "avanzado", bolaSlug: "storm-phaze-ii", promedio: 184, ligaSlug: "liga-bajio" },
  { slug: "renata-ochoa", nombre: "Renata Ochoa", ciudad: "Guadalajara", centroSlug: "pista-chapalita", equipoSlug: "chapalita-bc", mano: "derecha", desdeAnio: 2021, nivel: "intermedio", bolaSlug: "storm-iq-tour", promedio: 178, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "luis-mendoza", nombre: "Luis Mendoza", ciudad: "Zapopan", centroSlug: "bowl-andares", equipoSlug: "satelite-strikers", mano: "derecha", desdeAnio: 2017, nivel: "intermedio", bolaSlug: "pyramid-path", promedio: 175, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "valeria-cortes", nombre: "Valeria Cortés", ciudad: "Monterrey", centroSlug: "monterrey-bowl", equipoSlug: "regias", mano: "izquierda", desdeAnio: 2022, nivel: "intermedio", bolaSlug: "ebonite-choice", promedio: 172, ligaSlug: "liga-norte" },
  { slug: "fernando-tapia", nombre: "Fernando Tapia", ciudad: "Guadalajara", centroSlug: "boliche-minerva", equipoSlug: "los-tapatios", mano: "derecha", desdeAnio: 2013, nivel: "intermedio", bolaSlug: "motiv-jackal", promedio: 170, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "adriana-lugo", nombre: "Adriana Lugo", ciudad: "San Pedro Tlaquepaque", centroSlug: "tlaquepaque-lanes", equipoSlug: "tonala-thunder", mano: "derecha", desdeAnio: 2023, nivel: "intermedio", bolaSlug: "pyramid-path", promedio: 166, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "omar-beltran", nombre: "Omar Beltrán", ciudad: "Cancún", centroSlug: "cancun-strike", equipoSlug: "caribe-bowl", mano: "derecha", desdeAnio: 2021, nivel: "intermedio", bolaSlug: "storm-iq-tour", promedio: 163, ligaSlug: "liga-bajio" },
  { slug: "natalia-espinoza", nombre: "Natalia Espinoza", ciudad: "Puebla", centroSlug: "puebla-pins", equipoSlug: "angelopolis", mano: "derecha", desdeAnio: 2024, nivel: "principiante", bolaSlug: "pyramid-path", promedio: 148, ligaSlug: "liga-valle-de-mexico" },
  { slug: "kevin-morales", nombre: "Kevin Morales", ciudad: "León", centroSlug: "leon-bowling-center", equipoSlug: "leon-lanes", mano: "derecha", desdeAnio: 2025, nivel: "principiante", promedio: 141, ligaSlug: "liga-bajio" },
  { slug: "daniela-ponce", nombre: "Daniela Ponce", ciudad: "Guadalajara", centroSlug: "pista-chapalita", equipoSlug: "chapalita-bc", mano: "derecha", desdeAnio: 2025, nivel: "principiante", promedio: 137, ligaSlug: "liga-metropolitana-gdl" },
  { slug: "sergio-quintero", nombre: "Sergio Quintero", ciudad: "Naucalpan", centroSlug: "bol-satelite", equipoSlug: "satelite-strikers", mano: "derecha", desdeAnio: 2024, nivel: "principiante", promedio: 133, ligaSlug: "liga-valle-de-mexico" },
  { slug: "itzel-guerrero", nombre: "Itzel Guerrero", ciudad: "Cancún", centroSlug: "cancun-strike", equipoSlug: "caribe-bowl", mano: "izquierda", desdeAnio: 2023, nivel: "intermedio", bolaSlug: "ebonite-choice", promedio: 158, ligaSlug: "liga-bajio" },
  { slug: "pablo-arriaga", nombre: "Pablo Arriaga", ciudad: "Monterrey", centroSlug: "monterrey-bowl", equipoSlug: "regias", mano: "derecha", desdeAnio: 2010, nivel: "competitivo", bolaSlug: "900-global-zen", promedio: 201, ligaSlug: "liga-norte" },
  { slug: "gabriela-solis", nombre: "Gabriela Solís", ciudad: "Naucalpan", centroSlug: "bol-satelite", equipoSlug: "satelite-strikers", mano: "derecha", desdeAnio: 2008, nivel: "competitivo", bolaSlug: "storm-phaze-ii", promedio: 205, ligaSlug: "liga-valle-de-mexico" },
  { slug: "marco-zavala", nombre: "Marco Zavala", apodo: "Doble Cero", ciudad: "Tonalá", centroSlug: "strike-tonala", equipoSlug: "tonala-thunder", mano: "derecha", desdeAnio: 2007, nivel: "competitivo", bolaSlug: "motiv-jackal", promedio: 211, ligaSlug: "liga-metropolitana-gdl" },
];

export const players: Player[] = semillas.map((s) => {
  const series = generarSeries(s.slug, s.promedio, 18, s.centroSlug, s.ligaSlug);
  const todos = series.flatMap((x) => x.juegos);
  return {
    slug: s.slug,
    nombre: s.nombre,
    apodo: s.apodo,
    ciudad: s.ciudad,
    centroSlug: s.centroSlug,
    equipoSlug: s.equipoSlug,
    mano: s.mano,
    desdeAnio: s.desdeAnio,
    nivel: s.nivel,
    bolaSlug: s.bolaSlug,
    series,
    mejorJuego: Math.max(...todos),
    mejorSerie: Math.max(...series.map((x) => seriesTotal(x.juegos))),
    imagen: `/img/jugadores/${s.slug}.jpg`,
  };
});

export const playerBySlug = (slug: string) => players.find((p) => p.slug === slug);

export function playerStats(p: Player) {
  const juegos = p.series.flatMap((s) => s.juegos);
  const avg = average(juegos);
  return {
    juegos: juegos.length,
    promedio: avg,
    handicap: handicap(avg),
    mejorJuego: p.mejorJuego,
    mejorSerie: p.mejorSerie,
    ultimas: p.series.slice(-6),
    /** Promedio de las últimas 5 series contra el general: la forma actual. */
    forma: average(p.series.slice(-5).flatMap((s) => s.juegos)) - avg,
  };
}

/** Ranking por promedio, de mayor a menor. */
export const ranking = [...players]
  .map((p) => ({ player: p, stats: playerStats(p) }))
  .sort((a, b) => b.stats.promedio - a.stats.promedio)
  .map((x, i) => ({ ...x, posicion: i + 1 }));
