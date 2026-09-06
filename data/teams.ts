import type { Team } from "./types";

export const teams: Team[] = [
  { slug: "los-tapatios", nombre: "Los Tapatíos", centroSlug: "boliche-minerva", ligaSlug: "liga-metropolitana-gdl", capitanSlug: "ricardo-fuentes", integrantes: ["andrea-mercado", "ricardo-fuentes", "fernando-tapia", "marco-zavala"], fundado: 2016, ganados: 41, perdidos: 19, colores: ["#FF5A1F", "#0C1116"], imagen: "/img/equipos/los-tapatios.jpg" },
  { slug: "pinas-de-acero", nombre: "Piñas de Acero", centroSlug: "bowl-andares", ligaSlug: "liga-metropolitana-gdl", capitanSlug: "mariana-delgado", integrantes: ["mariana-delgado", "sofia-vergara-l", "luis-mendoza"], fundado: 2019, ganados: 38, perdidos: 22, colores: ["#1B6EF3", "#0C1116"], imagen: "/img/equipos/pinas-de-acero.jpg" },
  { slug: "chapalita-bc", nombre: "Chapalita BC", centroSlug: "pista-chapalita", ligaSlug: "liga-metropolitana-gdl", capitanSlug: "jorge-alcantara", integrantes: ["jorge-alcantara", "renata-ochoa", "daniela-ponce"], fundado: 2013, ganados: 35, perdidos: 25, colores: ["#0F766E", "#F6F7F9"], imagen: "/img/equipos/chapalita-bc.jpg" },
  { slug: "tonala-thunder", nombre: "Tonalá Thunder", centroSlug: "strike-tonala", ligaSlug: "liga-metropolitana-gdl", capitanSlug: "marco-zavala", integrantes: ["hector-vazquez", "adriana-lugo"], fundado: 2018, ganados: 30, perdidos: 30, colores: ["#7C3AED", "#F6F7F9"], imagen: "/img/equipos/tonala-thunder.jpg" },
  { slug: "regias", nombre: "Regias BC", centroSlug: "monterrey-bowl", ligaSlug: "liga-norte", capitanSlug: "pablo-arriaga", integrantes: ["paulina-rios", "valeria-cortes", "pablo-arriaga"], fundado: 2015, ganados: 44, perdidos: 16, colores: ["#DC2626", "#0C1116"], imagen: "/img/equipos/regias.jpg" },
  { slug: "satelite-strikers", nombre: "Satélite Strikers", centroSlug: "bol-satelite", ligaSlug: "liga-valle-de-mexico", capitanSlug: "gabriela-solis", integrantes: ["diego-santamaria", "gabriela-solis", "sergio-quintero", "luis-mendoza"], fundado: 2011, ganados: 40, perdidos: 20, colores: ["#A16207", "#0C1116"], imagen: "/img/equipos/satelite-strikers.jpg" },
  { slug: "angelopolis", nombre: "Angelópolis BC", centroSlug: "puebla-pins", ligaSlug: "liga-valle-de-mexico", capitanSlug: "carla-ibarra", integrantes: ["carla-ibarra", "natalia-espinoza"], fundado: 2020, ganados: 27, perdidos: 33, colores: ["#0EA5E9", "#0C1116"], imagen: "/img/equipos/angelopolis.jpg" },
  { slug: "leon-lanes", nombre: "León Lanes", centroSlug: "leon-bowling-center", ligaSlug: "liga-bajio", capitanSlug: "emilio-navarro", integrantes: ["emilio-navarro", "kevin-morales"], fundado: 2017, ganados: 26, perdidos: 34, colores: ["#16A34A", "#0C1116"], imagen: "/img/equipos/leon-lanes.jpg" },
  { slug: "caribe-bowl", nombre: "Caribe Bowl", centroSlug: "cancun-strike", ligaSlug: "liga-bajio", capitanSlug: "omar-beltran", integrantes: ["omar-beltran", "itzel-guerrero"], fundado: 2022, ganados: 22, perdidos: 38, colores: ["#14B8A6", "#0C1116"], imagen: "/img/equipos/caribe-bowl.jpg" },
];

export const teamBySlug = (slug: string) => teams.find((t) => t.slug === slug);
export const teamName = (slug?: string) => (slug ? teamBySlug(slug)?.nombre ?? slug : "Sin equipo");
