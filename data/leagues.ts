import type { League } from "./types";
import { teams } from "./teams";
import { players, playerStats } from "./players";

/** Standings derivados de los equipos: el pinfall se calcula de los promedios reales. */
function standingsFor(ligaSlug: string) {
  return teams
    .filter((t) => t.ligaSlug === ligaSlug)
    .map((t) => {
      const integrantes = t.integrantes.map((s) => players.find((p) => p.slug === s)).filter(Boolean);
      const promedios = integrantes.map((p) => playerStats(p!).promedio);
      const promedioEquipo = promedios.length ? Math.round(promedios.reduce((a, b) => a + b, 0) / promedios.length) : 0;
      return {
        teamSlug: t.slug,
        puntos: t.ganados * 2,
        ganados: t.ganados,
        perdidos: t.perdidos,
        pinfall: promedioEquipo * 3 * (t.ganados + t.perdidos),
        promedioEquipo,
      };
    })
    .sort((a, b) => b.puntos - a.puntos || b.pinfall - a.pinfall);
}

export const leagues: League[] = [
  {
    slug: "liga-metropolitana-gdl",
    nombre: "Liga Metropolitana GDL",
    temporada: "2026–2027",
    centroSlug: "boliche-minerva",
    dia: "Martes",
    hora: "20:00",
    formato: "Equipos de 4, hándicap 80% de 220",
    handicapBase: 220,
    handicapPct: 0.8,
    semanas: 30,
    semanaActual: 18,
    standings: standingsFor("liga-metropolitana-gdl"),
  },
  {
    slug: "liga-norte",
    nombre: "Liga Norte",
    temporada: "2026–2027",
    centroSlug: "monterrey-bowl",
    dia: "Jueves",
    hora: "21:00",
    formato: "Equipos de 3, scratch",
    handicapBase: 220,
    handicapPct: 0,
    semanas: 28,
    semanaActual: 16,
    standings: standingsFor("liga-norte"),
  },
  {
    slug: "liga-valle-de-mexico",
    nombre: "Liga Valle de México",
    temporada: "2026–2027",
    centroSlug: "bol-satelite",
    dia: "Miércoles",
    hora: "19:30",
    formato: "Equipos de 4, hándicap 90% de 210",
    handicapBase: 210,
    handicapPct: 0.9,
    semanas: 32,
    semanaActual: 18,
    standings: standingsFor("liga-valle-de-mexico"),
  },
  {
    slug: "liga-bajio",
    nombre: "Liga Bajío Mixta",
    temporada: "2026–2027",
    centroSlug: "leon-bowling-center",
    dia: "Sábado",
    hora: "17:00",
    formato: "Mixta, equipos de 2, hándicap 80% de 220",
    handicapBase: 220,
    handicapPct: 0.8,
    semanas: 24,
    semanaActual: 14,
    standings: standingsFor("liga-bajio"),
  },
];

export const leagueBySlug = (slug: string) => leagues.find((l) => l.slug === slug);
export const leagueName = (slug?: string) => (slug ? leagueBySlug(slug)?.nombre ?? slug : "—");
