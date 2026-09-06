import type { Fuente } from "./types";

/**
 * Respuesta directa y fuentes de cada artículo.
 *
 * Vive aparte del cuerpo para que se pueda revisar de un vistazo: son las dos
 * cosas que más pesan para ser citado y conviene poder auditarlas juntas.
 *
 * Reglas de la respuesta corta:
 *  - Se lee sola, fuera de la página. Sujeto explícito, sin "esto" ni "aquí".
 *  - Lleva la cifra dentro cuando hay una.
 *  - Responde de verdad. Si el artículo dice "depende", la respuesta lo dice.
 *
 * Las fuentes son organismos reales del deporte. No se citan por decorar: si un
 * dato del artículo no viene de ahí, esa fuente no va.
 */

/** Referencias que se repiten en varios artículos. */
const USBC_REGLAS: Fuente = {
  titulo: "Playing Rules — Reglamento oficial de competencia",
  organizacion: "United States Bowling Congress (USBC)",
  url: "https://bowl.com/rules/playing-rules",
  anio: 2025,
};

const USBC_EQUIPO: Fuente = {
  titulo: "Equipment Specifications and Certifications Manual",
  organizacion: "United States Bowling Congress (USBC)",
  url: "https://bowl.com/equipment-and-specifications",
  anio: 2025,
};

const USBC_COACHING: Fuente = {
  titulo: "Coaching — Fundamentos y programa de certificación",
  organizacion: "USBC Coaching",
  url: "https://bowl.com/coaching",
  anio: 2025,
};

const KEGEL_PATRONES: Fuente = {
  titulo: "Lane Play & Oil Pattern Library",
  organizacion: "Kegel",
  url: "https://www.kegel.net/lane-play",
  anio: 2025,
};

const WORLD_BOWLING: Fuente = {
  titulo: "Statutes and Playing Rules",
  organizacion: "International Bowling Federation (IBF)",
  url: "https://bowling.sport/documents/",
  anio: 2024,
};

export interface ArticleExtra {
  respuestaCorta: string;
  fuentes: Fuente[];
}

export const articleExtras: Record<string, ArticleExtra> = {
  "como-elegir-tu-primera-bola": {
    respuestaCorta:
      "Conviene comprar bola propia cuando ya juegas dos o tres veces al mes y tu tiro se repite, no cuando alcanzas cierto promedio. En México una bola de entrada cuesta entre $1,900 y $2,600 pesos más $600 a $900 de perforación. Una bola barata bien perforada juega mejor que una cara mal perforada, sin excepciones.",
    fuentes: [USBC_EQUIPO],
  },
  "los-cuatro-pasos-explicados": {
    respuestaCorta:
      "El approach de cuatro pasos sincroniza el swing con el cuerpo: el pushaway sale con el primer paso y la bola llega al punto más bajo cuando el pie contrario toca el piso. El error más común no es de fuerza sino de tiempo: los brazos van adelantados o atrasados respecto a los pies.",
    fuentes: [USBC_COACHING],
  },
  "leer-la-pista-en-tres-tiros": {
    respuestaCorta:
      "Se lee la pista observando dónde la bola empieza a girar, no dónde termina. Con tres tiros iguales basta: si la bola se voltea antes cada vez, el aceite se está rompiendo y hay que moverse hacia adentro; si se desliza de más, hay más aceite del que supusiste.",
    fuentes: [KEGEL_PATRONES, USBC_COACHING],
  },
  "el-repuesto-es-la-mitad-del-juego": {
    respuestaCorta:
      "Convertir repuestos sube el promedio más rápido que hacer más strikes. Un jugador que convierte todos sus repuestos simples y no hace ningún strike promedia 190; uno que hace seis strikes por juego pero falla repuestos rara vez pasa de 170.",
    fuentes: [USBC_COACHING],
  },
  "que-hacer-cuando-todo-se-desmorona": {
    respuestaCorta:
      "Cuando el bloque se cae, el error casi nunca es técnico: es que la pista cambió y seguiste tirando igual. Antes de tocar tu tiro, muévete: un tablero adentro por cada dos frames malos seguidos. Cambiar la técnica a mitad de serie es lo que convierte un mal juego en un mal mes.",
    fuentes: [KEGEL_PATRONES],
  },
  "reglas-del-boliche-en-10-minutos": {
    respuestaCorta:
      "Un juego de boliche son 10 frames con dos tiros cada uno. Un strike vale 10 más los dos tiros siguientes; un spare vale 10 más el tiro siguiente. El décimo frame da hasta tres tiros. El máximo posible es 300, que son 12 strikes seguidos.",
    fuentes: [USBC_REGLAS, WORLD_BOWLING],
  },
  "velocidad-y-revoluciones": {
    respuestaCorta:
      "La bola ideal depende de la relación entre tu velocidad y tus revoluciones, no de cuál es la más agresiva del catálogo. Mucha velocidad con pocas revoluciones pide una cubierta que agarre; muchas revoluciones con poca velocidad pide una que se deslice. Igualar ese balance importa más que la marca.",
    fuentes: [USBC_EQUIPO, KEGEL_PATRONES],
  },
  "como-entrar-a-tu-primera-liga": {
    respuestaCorta:
      "Para entrar a una liga de boliche en México no necesitas promedio previo ni equipo propio: la mayoría acepta jugadores nuevos y te asigna hándicap tras las primeras series. El costo típico es semanal e incluye las líneas. Es la forma más rápida de mejorar porque genera presión real cada semana.",
    fuentes: [USBC_REGLAS],
  },
  "mantenimiento-de-tu-bola": {
    respuestaCorta:
      "Limpiar la bola después de cada sesión es lo único imprescindible: el aceite que absorbe la cubierta es lo que le quita el gancho con el tiempo. Un paño de microfibra y limpiador aprobado bastan. El resurfacing se hace cada 50 o 60 juegos, no cada mes.",
    fuentes: [USBC_EQUIPO],
  },
  "analiza-tu-serie-con-datos": {
    respuestaCorta:
      "Analizar una serie con datos significa contar en qué frame se cayó el juego y qué repuesto fallaste, no recordar cómo te sentiste. Registrar cada serie durante ocho semanas revela patrones que la memoria borra: casi todo el mundo pierde puntos en los frames 4 a 6, cuando el aceite empieza a moverse.",
    fuentes: [USBC_COACHING],
  },
  "guia-de-etiqueta-en-la-pista": {
    respuestaCorta:
      "La regla de etiqueta que más importa es la de la derecha: si el jugador de la pista de al lado ya está en el approach, espera. Además, no cruces por delante de alguien que va a tirar, no uses bola ajena sin permiso y no pises la pista con calzado de calle.",
    fuentes: [USBC_REGLAS],
  },
  "entrenar-sin-pista": {
    respuestaCorta:
      "Se puede entrenar boliche sin pista trabajando movilidad de hombro, estabilidad de muñeca y el patrón del approach en seco. Veinte minutos, tres veces por semana, mantienen el gesto y previenen la lesión de hombro, que es la más común del deporte.",
    fuentes: [USBC_COACHING],
  },
  "por-que-dejas-el-10-parado": {
    respuestaCorta:
      "El pino 10 parado (el 7 si eres zurdo) casi siempre significa que la bola entró al bolsillo con poco ángulo o llegó tarde, no que fallaste la puntería. Si te pasa seguido con buen tiro, el problema es de velocidad o de equipo, no de línea.",
    fuentes: [KEGEL_PATRONES, USBC_COACHING],
  },
  "de-170-a-190": {
    respuestaCorta:
      "Subir de 170 a 190 de promedio toma alrededor de tres meses con dos sesiones semanales, y se gana casi todo en los repuestos, no en los strikes. Veinte puntos de promedio son unos cuatro repuestos convertidos más por serie.",
    fuentes: [USBC_COACHING],
  },
};

export const extrasDeArticulo = (slug: string): ArticleExtra | undefined => articleExtras[slug];
