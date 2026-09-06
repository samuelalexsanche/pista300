import type { OilPattern } from "./types";

/** Perfil de volumen por tabla (1–39), simétrico, para el gráfico del banco. */
function perfil(picoCentro: number, orillas: number, ancho: number): number[] {
  return Array.from({ length: 39 }, (_, i) => {
    const tabla = i + 1;
    const distancia = Math.abs(tabla - 20);
    const valor = picoCentro * Math.exp(-(distancia ** 2) / (2 * ancho ** 2)) + orillas;
    return Math.round(valor * 10) / 10;
  });
}

export const oilPatterns: OilPattern[] = [
  { slug: "casa-tipica", nombre: "Patrón de casa (típico)", longitud: 40, volumen: 22.5, ratio: "10:1", dificultad: "casa", linea: "Parado en 20, mira a la flecha 10, salida a la tabla 8.", descripcion: "Mucho aceite al centro y poco en las orillas: la bola perdona errores hacia afuera y regresa sola. Es el patrón con el que se hacen la mayoría de los promedios de liga.", perfil: perfil(9, 0.6, 6.5) },
  { slug: "kegel-stone-street", nombre: "Kegel Stone Street", longitud: 41, volumen: 24.9, ratio: "4.5:1", dificultad: "sport", linea: "Parado en 22, mira a la flecha 12, salida a la tabla 10. Poco margen afuera.", descripcion: "Patrón sport de longitud media. Castiga tirar demasiado afuera y premia mantener la bola en el aceite hasta el rompimiento.", perfil: perfil(6.2, 2.4, 8.5) },
  { slug: "kegel-chameleon", nombre: "Kegel Chameleon", longitud: 39, volumen: 23.3, ratio: "3.5:1", dificultad: "sport", linea: "Zona útil entre las tablas 8 y 12; el patrón se mueve conforme avanza el bloque.", descripcion: "Rayado en bloques que crean varias zonas jugables. El nombre viene de que cambia de personalidad juego a juego: hay que estar dispuesto a moverse.", perfil: perfil(5.4, 3.0, 9.5) },
  { slug: "usbc-red", nombre: "USBC Red", longitud: 39, volumen: 25.4, ratio: "3.2:1", dificultad: "campeonato", linea: "Muy plano. Parado en 18, línea directa a la tabla 9, control de velocidad ante todo.", descripcion: "Corto y plano. Casi no hay margen lateral: el que controle velocidad y rev rate gana. Es el patrón que separa promedios de 200 de promedios de 180.", perfil: perfil(5.0, 3.6, 11) },
  { slug: "usbc-blue", nombre: "USBC Blue", longitud: 42, volumen: 26.2, ratio: "3.5:1", dificultad: "campeonato", linea: "Parado en 24, mira a la 14, salida a la 12. Paciencia: la bola tarda en responder.", descripcion: "Medio-largo. La bola necesita más pista para leer, así que se juega más adentro y con menos superficie de la que crees.", perfil: perfil(5.6, 3.4, 10.5) },
  { slug: "wolf-32", nombre: "Wolf 32", longitud: 32, volumen: 20.1, ratio: "3.1:1", dificultad: "sport", linea: "Muy corto: juega recto por fuera, tabla 5–7, y baja la velocidad.", descripcion: "Uno de los patrones cortos clásicos. Todo el mundo lo odia la primera vez. La clave es aceptar que aquí la bola gancha muy temprano.", perfil: perfil(4.8, 2.6, 8) },
  { slug: "shark-48", nombre: "Shark 48", longitud: 48, volumen: 29.6, ratio: "2.9:1", dificultad: "campeonato", linea: "Larguísimo. Juega casi recto por el centro, tablas 15–20, y usa una bola de mucha superficie.", descripcion: "El patrón más largo de la serie de animales. La bola simplemente no tiene pista seca para responder: se juega con línea directa y ángulo mínimo.", perfil: perfil(6.5, 4.2, 13) },
  { slug: "scorpion-42", nombre: "Scorpion 42", longitud: 42, volumen: 26.8, ratio: "4.3:1", dificultad: "sport", linea: "Parado en 25, mira a la 15. Se abre por fuera conforme avanza el bloque.", descripcion: "Longitud media-larga con algo más de margen que un patrón de campeonato. Buen primer patrón sport para alguien que sale del patrón de casa.", perfil: perfil(6.0, 2.8, 10) },
];

export const patternBySlug = (slug?: string) => (slug ? oilPatterns.find((p) => p.slug === slug) : undefined);
export const patternName = (slug?: string) => patternBySlug(slug)?.nombre ?? "—";
