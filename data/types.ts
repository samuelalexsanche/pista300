/** Modelo de datos de Pista300. Todo el sitio consume estos tipos. */

export type Nivel = "principiante" | "intermedio" | "avanzado" | "competitivo";
export type Plan = "free" | "premium";

export interface Center {
  slug: string;
  nombre: string;
  ciudad: string;
  estado: string;
  lineas: number;
  colonia: string;
  telefono: string;
  servicios: string[];
  proShop: boolean;
  ligasActivas: number;
  imagen: string; // placeholder
}

export interface SerieRegistrada {
  id: string;
  fecha: string; // ISO
  ligaSlug?: string;
  centroSlug: string;
  juegos: number[];
}

export interface Player {
  slug: string;
  nombre: string;
  apodo?: string;
  ciudad: string;
  centroSlug: string;
  equipoSlug?: string;
  mano: "derecha" | "izquierda";
  desdeAnio: number;
  nivel: Nivel;
  bolaSlug?: string;
  series: SerieRegistrada[];
  /** Estadísticas destacadas capturadas por el jugador. */
  mejorJuego: number;
  mejorSerie: number;
  imagen: string;
}

export interface Team {
  slug: string;
  nombre: string;
  centroSlug: string;
  ligaSlug: string;
  capitanSlug: string;
  integrantes: string[]; // slugs de jugadores
  fundado: number;
  ganados: number;
  perdidos: number;
  colores: [string, string];
  imagen: string;
}

export interface LeagueStanding {
  teamSlug: string;
  puntos: number;
  ganados: number;
  perdidos: number;
  pinfall: number;
  promedioEquipo: number;
}

export interface League {
  slug: string;
  nombre: string;
  temporada: string;
  centroSlug: string;
  dia: string;
  hora: string;
  formato: string;
  handicapBase: number;
  handicapPct: number;
  semanas: number;
  semanaActual: number;
  standings: LeagueStanding[];
}

export type FormatoTorneo = "scratch" | "handicap" | "dobles" | "equipos" | "juvenil" | "senior";

export interface Tournament {
  slug: string;
  nombre: string;
  centroSlug: string;
  ciudad: string;
  fechaInicio: string;
  fechaFin: string;
  formato: FormatoTorneo;
  patronSlug: string;
  cuota: number;
  bolsaGarantizada: number;
  cupo: number;
  inscritos: string[]; // slugs de jugadores
  descripcion: string;
  reglas: string[];
  premios: { lugar: string; monto: number }[];
  destacado: boolean;
  imagen: string;
}

export type CategoriaArticulo =
  | "boliche-basico"
  | "tecnica"
  | "equipo"
  | "juego-mental"
  | "repuestos"
  | "entrenamiento"
  | "comunidad";

export interface Article {
  slug: string;
  titulo: string;
  resumen: string;
  categoria: CategoriaArticulo;
  seccion: "aprende" | "mejora";
  autor: string;
  fecha: string;
  minutos: number;
  premium: boolean;
  nivel: Nivel;
  tags: string[];
  imagen: string;
  /** Cuerpo en bloques simples: no hace falta un motor de markdown para el demo. */
  cuerpo: { tipo: "p" | "h2" | "lista" | "cita" | "dato"; texto?: string; items?: string[] }[];
}

export interface Technique {
  slug: string;
  nombre: string;
  resumen: string;
  nivel: Nivel;
  minutos: number;
  premium: boolean;
  errorComun: string;
  pasos: { titulo: string; detalle: string }[];
  drills: string[];
  imagen: string;
}

export interface TrainingPlan {
  slug: string;
  nombre: string;
  nivel: Nivel;
  semanas: number;
  sesionesPorSemana: number;
  objetivo: string;
  premium: boolean;
  bloques: { semana: string; foco: string; ejercicios: string[] }[];
}

export interface Ball {
  slug: string;
  marca: string;
  modelo: string;
  anio: number;
  cubierta: string;
  acabado: string;
  core: string;
  rg: number;
  diferencial: number;
  factorGancho: number; // 1-10
  largo: number; // 1-10
  backend: number; // 1-10
  aceite: "seco" | "medio" | "pesado";
  precio: number;
  calificacion: number;
  resumen: string;
  imagen: string;
}

export interface OilPattern {
  slug: string;
  nombre: string;
  longitud: number; // pies
  volumen: number; // ml
  ratio: string;
  dificultad: "casa" | "sport" | "campeonato";
  linea: string;
  descripcion: string;
  /** Perfil de volumen por tabla (1-39) para el gráfico. */
  perfil: number[];
}

export interface SpareLeave {
  id: string;
  nombre: string;
  pinos: number[];
  dificultad: "fácil" | "media" | "difícil";
  tabladeParado: string;
  objetivo: string;
  consejo: string;
  premium: boolean;
}

export interface MembershipPlan {
  id: Plan;
  nombre: string;
  precioMensual: number;
  precioAnual: number;
  descripcion: string;
  destacado: boolean;
  beneficios: { texto: string; incluido: boolean }[];
}
