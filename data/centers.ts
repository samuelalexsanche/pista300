import type { Center } from "./types";

/** DEMO: boliches ficticios. Reemplazar con centros reales antes de publicar. */
export const centers: Center[] = [
  { slug: "boliche-minerva", nombre: "Boliche Minerva", ciudad: "Guadalajara", estado: "Jalisco", lineas: 24, colonia: "Vallarta Norte", telefono: "33 1234 5601", servicios: ["Pro shop", "Cafetería", "Estacionamiento", "Ligas nocturnas"], proShop: true, ligasActivas: 6, imagen: "/img/centros/minerva.jpg" },
  { slug: "pista-chapalita", nombre: "Pista Chapalita", ciudad: "Guadalajara", estado: "Jalisco", lineas: 16, colonia: "Chapalita", telefono: "33 1234 5602", servicios: ["Pro shop", "Escuela infantil", "Cafetería"], proShop: true, ligasActivas: 4, imagen: "/img/centros/chapalita.jpg" },
  { slug: "bowl-andares", nombre: "Bowl Andares", ciudad: "Zapopan", estado: "Jalisco", lineas: 20, colonia: "Puerta de Hierro", telefono: "33 1234 5603", servicios: ["Bar", "Eventos", "Estacionamiento", "Patrones sport"], proShop: false, ligasActivas: 3, imagen: "/img/centros/andares.jpg" },
  { slug: "tlaquepaque-lanes", nombre: "Tlaquepaque Lanes", ciudad: "San Pedro Tlaquepaque", estado: "Jalisco", lineas: 12, colonia: "Centro", telefono: "33 1234 5604", servicios: ["Cafetería", "Renta de bolas"], proShop: false, ligasActivas: 2, imagen: "/img/centros/tlaquepaque.jpg" },
  { slug: "strike-tonala", nombre: "Strike Tonalá", ciudad: "Tonalá", estado: "Jalisco", lineas: 14, colonia: "Loma Dorada", telefono: "33 1234 5605", servicios: ["Pro shop", "Ligas juveniles"], proShop: true, ligasActivas: 3, imagen: "/img/centros/tonala.jpg" },
  { slug: "bol-satelite", nombre: "Bol Satélite", ciudad: "Naucalpan", estado: "Estado de México", lineas: 32, colonia: "Ciudad Satélite", telefono: "55 1234 5606", servicios: ["Pro shop", "Bar", "Torneos nacionales", "Patrones sport"], proShop: true, ligasActivas: 9, imagen: "/img/centros/satelite.jpg" },
  { slug: "monterrey-bowl", nombre: "Monterrey Bowl", ciudad: "Monterrey", estado: "Nuevo León", lineas: 28, colonia: "San Jerónimo", telefono: "81 1234 5607", servicios: ["Pro shop", "Cafetería", "Escuela"], proShop: true, ligasActivas: 7, imagen: "/img/centros/monterrey.jpg" },
  { slug: "puebla-pins", nombre: "Puebla Pins", ciudad: "Puebla", estado: "Puebla", lineas: 18, colonia: "La Paz", telefono: "22 1234 5608", servicios: ["Cafetería", "Ligas mixtas"], proShop: false, ligasActivas: 4, imagen: "/img/centros/puebla.jpg" },
  { slug: "leon-bowling-center", nombre: "León Bowling Center", ciudad: "León", estado: "Guanajuato", lineas: 20, colonia: "Campestre", telefono: "47 1234 5609", servicios: ["Pro shop", "Estacionamiento"], proShop: true, ligasActivas: 5, imagen: "/img/centros/leon.jpg" },
  { slug: "cancun-strike", nombre: "Cancún Strike", ciudad: "Cancún", estado: "Quintana Roo", lineas: 16, colonia: "Zona Hotelera", telefono: "99 1234 5610", servicios: ["Bar", "Torneos abiertos"], proShop: false, ligasActivas: 2, imagen: "/img/centros/cancun.jpg" },
];

export const centerBySlug = (slug: string) => centers.find((c) => c.slug === slug);
export const centerName = (slug: string) => centerBySlug(slug)?.nombre ?? slug;
export const ciudades = Array.from(new Set(centers.map((c) => c.ciudad))).sort();
