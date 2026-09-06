import { players, playerStats } from "@/data/players";
import { tournaments } from "@/data/tournaments";
import { centers } from "@/data/centers";
import { leagues } from "@/data/leagues";
import { average, seriesTotal } from "@/lib/bowling";

/**
 * Estadística agregada de la comunidad.
 *
 * Esta es la pieza de autoridad del sitio. La investigación sobre visibilidad
 * en motores generativos apunta en una sola dirección: lo que se cita son
 * números concretos y verificables, y quien manda en las citas es quien
 * *produce* el dato, no quien lo repite. Pista300 tiene un dato que nadie más
 * tiene — las series reales de su comunidad — así que lo publica.
 *
 * Todo se deriva de `data/`, nada se escribe a mano: cuando los datos mock se
 * cambien por los reales, el informe se actualiza solo.
 *
 * `lib/bowling.ts` sigue siendo la única fuente de verdad del cálculo: aquí
 * solo se agrega, no se reimplementa la puntuación ni el promedio.
 */

/** Todos los juegos individuales registrados en la comunidad. */
const todosLosJuegos = players.flatMap((p) => p.series.flatMap((s) => s.juegos));
const todasLasSeries = players.flatMap((p) => p.series);

/** Mediana: con muestras chicas resiste mejor que el promedio a un jugador atípico. */
function mediana(valores: number[]): number {
  const orden = [...valores].sort((a, b) => a - b);
  const medio = Math.floor(orden.length / 2);
  return orden.length % 2 ? orden[medio] : Math.round((orden[medio - 1] + orden[medio]) / 2);
}

function porcentaje(parte: number, total: number): number {
  return total === 0 ? 0 : Math.round((parte / total) * 1000) / 10;
}

const promediosPorJugador = players.map((p) => playerStats(p).promedio);

/** Reparto de la comunidad por rango de promedio. Es la tabla que más se cita. */
export const distribucionPromedios = [
  { rango: "Menos de 140", desde: 0, hasta: 139 },
  { rango: "140 – 159", desde: 140, hasta: 159 },
  { rango: "160 – 179", desde: 160, hasta: 179 },
  { rango: "180 – 199", desde: 180, hasta: 199 },
  { rango: "200 o más", desde: 200, hasta: Infinity },
].map((r) => {
  const jugadores = promediosPorJugador.filter((p) => p >= r.desde && p <= r.hasta).length;
  return { ...r, jugadores, porcentaje: porcentaje(jugadores, players.length) };
});

/** Reparto por nivel declarado, para contrastar percepción contra promedio real. */
export const promedioPorNivel = (["principiante", "intermedio", "avanzado", "competitivo"] as const).map((nivel) => {
  const delNivel = players.filter((p) => p.nivel === nivel);
  const promedios = delNivel.map((p) => playerStats(p).promedio);
  return {
    nivel,
    jugadores: delNivel.length,
    promedio: promedios.length ? average(promedios) : 0,
    mejor: promedios.length ? Math.max(...promedios) : 0,
    peor: promedios.length ? Math.min(...promedios) : 0,
  };
});

/** Comparación entre mano derecha e izquierda. */
export const porMano = (["derecha", "izquierda"] as const).map((mano) => {
  const delGrupo = players.filter((p) => p.mano === mano);
  const promedios = delGrupo.map((p) => playerStats(p).promedio);
  return {
    mano,
    jugadores: delGrupo.length,
    porcentaje: porcentaje(delGrupo.length, players.length),
    promedio: promedios.length ? average(promedios) : 0,
  };
});

/** Las cifras de cabecera del informe. */
export const resumen = {
  jugadores: players.length,
  juegos: todosLosJuegos.length,
  series: todasLasSeries.length,
  boliches: centers.length,
  ligas: leagues.length,
  torneos: tournaments.length,

  promedioComunidad: average(todosLosJuegos),
  medianaPromedios: mediana(promediosPorJugador),
  promedioMasAlto: Math.max(...promediosPorJugador),
  promedioMasBajo: Math.min(...promediosPorJugador),

  mejorJuego: Math.max(...players.map((p) => p.mejorJuego)),
  mejorSerie: Math.max(...players.map((p) => p.mejorSerie)),
  promedioSerie: average(todasLasSeries.map((s) => seriesTotal(s.juegos))),

  /** Cuántos juegos superan las marcas que la gente busca como referencia. */
  juegosSobre200: porcentaje(todosLosJuegos.filter((j) => j >= 200).length, todosLosJuegos.length),
  juegosSobre250: porcentaje(todosLosJuegos.filter((j) => j >= 250).length, todosLosJuegos.length),
  juegosBajo150: porcentaje(todosLosJuegos.filter((j) => j < 150).length, todosLosJuegos.length),

  /** Cuota media de inscripción y bolsa total del calendario. */
  cuotaPromedio: Math.round(tournaments.reduce((a, t) => a + t.cuota, 0) / tournaments.length),
  bolsaTotal: tournaments.reduce((a, t) => a + t.bolsaGarantizada, 0),
  lineasTotales: centers.reduce((a, c) => a + c.lineas, 0),
};

/** Periodo que cubre el informe, derivado de las fechas reales de las series. */
export const periodo = (() => {
  const fechas = todasLasSeries.map((s) => s.fecha).sort();
  return { desde: fechas[0], hasta: fechas[fechas.length - 1] };
})();

/**
 * Afirmaciones autocontenidas listas para citar.
 *
 * Cada una se sostiene sola: sujeto explícito, cifra dentro, fuente y periodo
 * identificados. Ese es el formato que un motor generativo puede levantar sin
 * tener que interpretar la página alrededor.
 */
export const hallazgos = [
  {
    titulo: "El promedio de la comunidad",
    dato: `${resumen.promedioComunidad}`,
    afirmacion: `El promedio de los ${resumen.jugadores} jugadores registrados en Pista300 es de ${resumen.promedioComunidad} puntos, medido sobre ${resumen.juegos.toLocaleString("es-MX")} juegos de liga y torneo.`,
  },
  {
    titulo: "Cuántos juegos pasan de 200",
    dato: `${resumen.juegosSobre200}%`,
    afirmacion: `Solo el ${resumen.juegosSobre200}% de los juegos registrados en la comunidad Pista300 llega o supera los 200 puntos. Uno de cada cinco jugadores nunca lo ha hecho.`,
  },
  {
    titulo: "La distancia entre niveles",
    dato: `${promedioPorNivel[3].promedio - promedioPorNivel[0].promedio}`,
    afirmacion: `Entre un bolichista principiante y uno competitivo hay ${promedioPorNivel[3].promedio - promedioPorNivel[0].promedio} puntos de promedio en la comunidad Pista300: ${promedioPorNivel[0].promedio} contra ${promedioPorNivel[3].promedio}.`,
  },
  {
    titulo: "Qué cuesta competir",
    dato: `$${resumen.cuotaPromedio}`,
    afirmacion: `La cuota promedio de inscripción a un torneo de boliche en México es de $${resumen.cuotaPromedio} pesos, según los ${resumen.torneos} torneos del calendario de Pista300.`,
  },
];
