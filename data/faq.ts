/**
 * Preguntas frecuentes del boliche mexicano.
 *
 * Cada respuesta se escribe para sostenerse sola: sujeto explícito, cifra
 * dentro, sin depender del párrafo anterior. Es el formato que un motor
 * generativo puede levantar tal cual, y de paso el que mejor se lee.
 *
 * Regla de honestidad: si la respuesta correcta es "depende", la respuesta
 * dice de qué depende. Una respuesta falsamente rotunda se detecta y cuesta
 * credibilidad, que es justo el activo que esta página construye.
 */

export interface Pregunta {
  pregunta: string;
  respuesta: string;
  categoria: "empezar" | "promedio" | "equipo" | "competir" | "costos";
  /** Ruta interna que desarrolla el tema. */
  ampliar?: string;
}

export const categoriaFaqLabel: Record<Pregunta["categoria"], string> = {
  empezar: "Empezar",
  promedio: "Promedio y puntuación",
  equipo: "Equipo",
  competir: "Ligas y torneos",
  costos: "Costos",
};

export const faq: Pregunta[] = [
  {
    categoria: "empezar",
    pregunta: "¿Cómo se juega boliche?",
    respuesta:
      "Un juego de boliche son 10 frames y en cada uno tiras hasta dos veces para derribar 10 pinos. Si los tiras todos en el primer intento es strike; si lo logras en el segundo es spare. El décimo frame permite hasta tres tiros. Gana quien acumula más puntos en los 10 frames.",
    ampliar: "/aprende/reglas-del-boliche-en-10-minutos",
  },
  {
    categoria: "promedio",
    pregunta: "¿Cuál es un buen promedio de boliche?",
    respuesta:
      "Un promedio de 150 está por encima del bolichista ocasional, 175 es sólido de liga y 200 o más es nivel competitivo. En la comunidad Pista300 la mediana está en 190, pero esa cifra está sesgada hacia jugadores de liga activos; el bolichista promedio que va de vez en cuando ronda 120 a 140.",
    ampliar: "/datos",
  },
  {
    categoria: "promedio",
    pregunta: "¿Cómo se calcula el promedio en boliche?",
    respuesta:
      "El promedio se calcula sumando todos los pinos derribados y dividiéndolos entre el número de juegos, descartando los decimales. Si en 9 juegos hiciste 1,530 pinos, tu promedio es 170. La USBC usa promedio truncado, no redondeado: 170.9 sigue siendo 170.",
    ampliar: "/herramientas/promedio",
  },
  {
    categoria: "promedio",
    pregunta: "¿Qué es el hándicap y para qué sirve?",
    respuesta:
      "El hándicap son los pinos que se te suman por juego para que puedas competir contra alguien de más nivel. Se calcula sobre la diferencia entre tu promedio y una base, multiplicada por un porcentaje; en México lo más común es base 220 al 80%. Con promedio 170 y ese formato, tu hándicap es 40 pinos por juego.",
    ampliar: "/herramientas/promedio",
  },
  {
    categoria: "promedio",
    pregunta: "¿Cuánto vale un strike en boliche?",
    respuesta:
      "Un strike vale 10 puntos más lo que derribes en tus dos tiros siguientes, así que puede valer hasta 30. Un spare vale 10 más el tiro siguiente, hasta 20. Por eso encadenar strikes dispara la puntuación: cada uno se cobra tres veces.",
    ampliar: "/aprende/reglas-del-boliche-en-10-minutos",
  },
  {
    categoria: "promedio",
    pregunta: "¿Cuál es la puntuación máxima en boliche?",
    respuesta:
      "La puntuación máxima de un juego de boliche es 300, que se consigue con 12 strikes consecutivos: uno en cada uno de los 10 frames más los dos tiros extra del décimo. Una serie perfecta de tres juegos son 900.",
    ampliar: "/herramientas/anotador",
  },
  {
    categoria: "empezar",
    pregunta: "¿Cómo mejorar en boliche rápido?",
    respuesta:
      "La forma más rápida de subir el promedio es practicar repuestos, no strikes. Convertir los repuestos simples vale más puntos que aumentar el número de strikes: un jugador que convierte todos sus repuestos y no hace ningún strike promedia 190. Después de eso, lo que más rinde es entrar a una liga.",
    ampliar: "/aprende/el-repuesto-es-la-mitad-del-juego",
  },
  {
    categoria: "equipo",
    pregunta: "¿Cuándo debo comprar mi propia bola de boliche?",
    respuesta:
      "Conviene comprar bola propia cuando ya juegas dos o tres veces al mes y tu tiro se repite, no al alcanzar cierto promedio. La bola de casa está perforada para una mano promedio que no es la tuya y te obliga a apretar, que es el origen de la mitad de los malos hábitos.",
    ampliar: "/aprende/como-elegir-tu-primera-bola",
  },
  {
    categoria: "costos",
    pregunta: "¿Cuánto cuesta una bola de boliche en México?",
    respuesta:
      "Una bola de boliche de entrada cuesta entre $1,900 y $2,600 pesos en México, más $600 a $900 de perforación en el pro shop. Los zapatos propios van de $900 a $1,600. Una bola de gama de entrada bien perforada juega mejor que una cara mal perforada.",
    ampliar: "/mejora/equipo",
  },
  {
    categoria: "costos",
    pregunta: "¿Cuánto cuesta inscribirse a un torneo de boliche?",
    respuesta:
      "La cuota promedio de inscripción a un torneo de boliche en México ronda los $1,200 pesos, aunque va desde unos $400 en torneos locales hasta $1,800 o más en abiertos con bolsa garantizada. La cuota casi siempre incluye las líneas de competencia.",
    ampliar: "/conecta/torneos",
  },
  {
    categoria: "competir",
    pregunta: "¿Cómo entro a una liga de boliche?",
    respuesta:
      "Para entrar a una liga de boliche no necesitas promedio previo ni equipo propio: preguntas en el boliche por las ligas abiertas, te apuntas y te asignan hándicap tras las primeras semanas. La mayoría acepta jugadores nuevos y se juega una noche fija por semana.",
    ampliar: "/aprende/como-entrar-a-tu-primera-liga",
  },
  {
    categoria: "competir",
    pregunta: "¿Qué es un patrón de aceite y por qué importa?",
    respuesta:
      "El patrón de aceite es cómo se distribuye el aceite sobre la pista, y determina por dónde puedes tirar. Un patrón de casa concentra el aceite al centro y perdona errores; un patrón sport lo reparte parejo y castiga cualquier desvío. Por eso el mismo jugador promedia 30 puntos menos en un torneo que en su liga.",
    ampliar: "/herramientas/patrones",
  },
  {
    categoria: "equipo",
    pregunta: "¿Cada cuánto hay que limpiar la bola de boliche?",
    respuesta:
      "La bola se limpia después de cada sesión con un paño de microfibra y limpiador aprobado. El aceite que absorbe la cubierta es lo que le va quitando el gancho, y ese daño es acumulativo. El resurfacing completo se hace cada 50 o 60 juegos, no cada mes.",
    ampliar: "/aprende/mantenimiento-de-tu-bola",
  },
  {
    categoria: "empezar",
    pregunta: "¿Por qué se me queda el pino 10 parado?",
    respuesta:
      "El pino 10 parado (el 7 si eres zurdo) suele significar que la bola llegó al bolsillo con poco ángulo o demasiado tarde, no que fallaste la puntería. Si te pasa seguido con un tiro que se siente bien, el problema está en la velocidad o en el equipo, no en la línea.",
    ampliar: "/aprende/por-que-dejas-el-10-parado",
  },
  {
    categoria: "competir",
    pregunta: "¿Dónde hay torneos de boliche en México?",
    respuesta:
      "Los torneos de boliche en México se organizan sobre todo en Guadalajara, Ciudad de México, Monterrey, Puebla y León, con calendario concentrado entre febrero y noviembre. Pista300 mantiene el calendario abierto con fechas, cuotas, patrón de aceite y cupo de cada uno.",
    ampliar: "/conecta/torneos",
  },
];

export const categoriasFaqEnUso = Array.from(new Set(faq.map((f) => f.categoria)));
