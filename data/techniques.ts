import type { Technique, TrainingPlan } from "./types";

export const techniques: Technique[] = [
  {
    slug: "pushaway",
    nombre: "El pushaway",
    resumen: "El primer movimiento del approach. Define el ritmo de todo el tiro y es donde nace el 80% de los problemas de timing.",
    nivel: "principiante",
    minutos: 15,
    premium: false,
    errorComun: "Empujar la bola hacia abajo en lugar de hacia adelante, lo que acorta el swing y obliga a jalar con el hombro.",
    pasos: [
      { titulo: "Postura inicial", detalle: "Bola a la altura del pecho, codo apoyado en la cadera, hombros cuadrados a la línea que vas a jugar." },
      { titulo: "Empuje hacia adelante", detalle: "Al dar el primer paso, extiende los brazos hacia adelante y ligeramente hacia abajo. La bola debe alejarse del cuerpo, no caer junto a él." },
      { titulo: "Soltar el peso", detalle: "Al final del empuje, deja de sostener. La gravedad hace el downswing; tu única tarea es no interferir." },
      { titulo: "Sincronía", detalle: "El empuje termina cuando termina el primer paso. Si termina después, vas atrasado el resto del approach." },
    ],
    drills: [
      "Empuje sin paso: 10 repeticiones solo del movimiento de brazos, sentado el peso en el pie de atrás.",
      "Un paso y suelta: da solo el último paso y deja caer la bola. Sentir el peso sin controlarlo.",
      "Grabar de perfil y verificar que la muñeca no gire durante el empuje.",
    ],
    imagen: "/img/tecnicas/pushaway.jpg",
  },
  {
    slug: "swing-libre",
    nombre: "Swing libre",
    resumen: "Un péndulo que no se jala ni se frena. Es la diferencia entre repetir un tiro y adivinarlo.",
    nivel: "intermedio",
    minutos: 20,
    premium: false,
    errorComun: "Muscular el backswing para ganar velocidad. Sube el hombro, cambia el plano del swing y hace que la bola se cruce.",
    pasos: [
      { titulo: "Plano del swing", detalle: "El brazo pasa junto al cuerpo, no separado. Si en el backswing la bola se aleja de la espalda, el hombro está trabajando de más." },
      { titulo: "Altura natural", detalle: "La altura del backswing la determina el empuje inicial, no la fuerza. Un backswing más alto se consigue empujando más lejos, no jalando más." },
      { titulo: "Muñeca constante", detalle: "La posición de la muñeca al inicio debe ser la misma al soltar. Cualquier cambio a mitad del swing es una variable más." },
      { titulo: "Finish", detalle: "El brazo termina arriba, hacia el objetivo, con el codo cerca de la oreja. Un finish corto casi siempre significa que frenaste." },
    ],
    drills: [
      "Swing de una mano sin paso: sostener la bola con la mano de tiro y dejar tres péndulos completos sin lanzar.",
      "Toalla bajo la axila: si se cae durante el swing, el brazo se está separando.",
      "Lanzar con los ojos cerrados 5 tiros: obliga a confiar en el péndulo.",
    ],
    imagen: "/img/tecnicas/swing.jpg",
  },
  {
    slug: "deslizamiento",
    nombre: "El deslizamiento",
    resumen: "El último paso frena el cuerpo y crea la plataforma estable desde la que sale la bola.",
    nivel: "principiante",
    minutos: 12,
    premium: false,
    errorComun: "Terminar de pie, con la pierna estirada. Sube el punto de salida de la bola y hace que rebote en la pista.",
    pasos: [
      { titulo: "Rodilla flexionada", detalle: "El muslo casi paralelo al suelo en el momento de soltar. Baja el centro de gravedad y el punto de salida." },
      { titulo: "Pie recto", detalle: "El pie de deslizamiento apunta al objetivo. Si apunta hacia afuera, el cuerpo se abre y el brazo se cruza." },
      { titulo: "Longitud", detalle: "Entre 10 y 15 centímetros de deslizamiento. Más que eso normalmente significa que llegaste con demasiada inercia." },
      { titulo: "Equilibrio final", detalle: "Deberías poder mantener la posición dos segundos después de soltar. Si te tambaleas, el tiro no fue reproducible." },
    ],
    drills: [
      "Deslizar sin bola hasta detener el pie en la misma tabla 10 veces seguidas.",
      "Mantener la posición final contando hasta tres después de cada tiro.",
      "Marcar la tabla objetivo con cinta y verificar dónde termina el pie.",
    ],
    imagen: "/img/tecnicas/deslizamiento.jpg",
  },
  {
    slug: "posicion-de-mano",
    nombre: "Posición de mano y rotación",
    resumen: "Cómo la posición de la mano en el momento de soltar determina el eje de rotación y, con él, la forma del gancho.",
    nivel: "avanzado",
    minutos: 25,
    premium: true,
    errorComun: "Girar la muñeca activamente para 'darle efecto'. Genera rotación inconsistente y suele lesionar el codo.",
    pasos: [
      { titulo: "Mano detrás de la bola", detalle: "En el downswing la palma mira al frente. Esta es la posición neutra desde la que se construye todo lo demás." },
      { titulo: "Rotación por debajo", detalle: "Los dedos giran de las 6 a las 4 en punto (diestros) al salir. El giro viene del antebrazo, nunca de la muñeca." },
      { titulo: "Cup y uncup", detalle: "Una muñeca en cup aumenta las revoluciones; una plana las reduce. Es un ajuste válido para adaptarse al patrón sin cambiar de bola." },
      { titulo: "Consistencia sobre potencia", detalle: "Es preferible una rotación moderada repetible que una fuerte que aparece una de cada tres veces." },
    ],
    drills: [
      "Tiros con la muñeca plana intencionalmente: sentir la diferencia de reacción.",
      "Serie de 10 tiros alternando cup y plana para calibrar el ajuste.",
      "Video en cámara lenta del punto de salida, buscando la misma hora del reloj cada vez.",
    ],
    imagen: "/img/tecnicas/posicion-mano.jpg",
  },
  {
    slug: "ajuste-lateral",
    nombre: "Ajuste lateral 2 a 1",
    resumen: "El sistema de movimiento más usado del mundo: por cada dos tablas de pies, una de objetivo.",
    nivel: "intermedio",
    minutos: 18,
    premium: true,
    errorComun: "Mover los pies sin mover el objetivo, lo que cambia el ángulo y no solo la zona de la pista.",
    pasos: [
      { titulo: "Identifica la dirección", detalle: "Si la bola se pasa de largo (deja el 10), muévete adentro. Si se voltea temprano (cruza la cabeza), muévete afuera." },
      { titulo: "Aplica la proporción", detalle: "Dos tablas de pies por una de objetivo mantiene el ángulo mientras cambias la zona de aceite que usas." },
      { titulo: "Un ajuste a la vez", detalle: "Cambiar pies, objetivo y velocidad en el mismo tiro hace imposible saber qué funcionó." },
      { titulo: "Cuándo no sirve", detalle: "En patrones planos el 2 a 1 se queda corto: ahí los ajustes son de superficie o de bola, no de posición." },
    ],
    drills: [
      "Bloque de 6 tiros moviéndose 2 tablas cada dos tiros y anotando la reacción.",
      "Jugar un juego completo cambiando solo el objetivo, sin mover los pies.",
    ],
    imagen: "/img/tecnicas/ajuste-lateral.jpg",
  },
  {
    slug: "control-de-velocidad",
    nombre: "Control de velocidad",
    resumen: "Subir o bajar la velocidad sin cambiar el swing: el ajuste que salva bloques cuando no puedes moverte más.",
    nivel: "avanzado",
    minutos: 20,
    premium: true,
    errorComun: "Cambiar la velocidad empujando más fuerte, lo que altera el timing y desplaza el punto de salida.",
    pasos: [
      { titulo: "Cambia la altura, no la fuerza", detalle: "Sostener la bola más alta en la postura inicial aumenta la velocidad; más baja la reduce. El swing sigue siendo un péndulo." },
      { titulo: "Ajusta el punto de salida", detalle: "Bajar el hombro en el deslizamiento reduce la velocidad efectiva sin cambiar el ritmo." },
      { titulo: "Mide", detalle: "Los tableros del boliche marcan la velocidad. Aprende cuál es tu rango normal y qué reacción te da cada extremo." },
      { titulo: "Úsalo con criterio", detalle: "Más velocidad retrasa el rompimiento sin cambiar de bola: perfecto para cuando la pista se está abriendo." },
    ],
    drills: [
      "Tres tiros lentos, tres normales, tres rápidos, anotando la velocidad del tablero.",
      "Jugar un juego entero intentando repetir la misma velocidad ±0.5 km/h.",
    ],
    imagen: "/img/tecnicas/velocidad.jpg",
  },
];

export const techniqueBySlug = (slug: string) => techniques.find((t) => t.slug === slug);

export const trainingPlans: TrainingPlan[] = [
  {
    slug: "base-solida-8-semanas",
    nombre: "Base sólida — 8 semanas",
    nivel: "principiante",
    semanas: 8,
    sesionesPorSemana: 2,
    objetivo: "Construir un approach repetible y llegar a un promedio estable arriba de 140 sin malos hábitos.",
    premium: false,
    bloques: [
      { semana: "Semanas 1–2", foco: "Postura y pushaway", ejercicios: ["10 empujes sin paso antes de cada sesión", "Un juego completo con approach de un solo paso", "Video de perfil al final de cada sesión"] },
      { semana: "Semanas 3–4", foco: "Timing de cuatro pasos", ejercicios: ["Approach completo sin lanzar, 10 repeticiones", "Dos juegos concentrados solo en el punto de parada", "Marcar la tabla de deslizamiento con cinta"] },
      { semana: "Semanas 5–6", foco: "Repuestos de un pino", ejercicios: ["Sistema 3-6-9 con bola de plástico", "Juego de solo repuestos: derribar 1 pino a propósito y convertir", "Registrar porcentaje de conversión"] },
      { semana: "Semanas 7–8", foco: "Consistencia bajo presión", ejercicios: ["Bloques de 3 juegos seguidos sin descanso", "Anotar cada serie en Pista300", "Primera liga o torneo con hándicap"] },
    ],
  },
  {
    slug: "salto-a-180-12-semanas",
    nombre: "Salto a 180 — 12 semanas",
    nivel: "intermedio",
    semanas: 12,
    sesionesPorSemana: 3,
    objetivo: "Eliminar los juegos por debajo de 140 y subir el promedio a 180 mediante repuestos y ajustes.",
    premium: true,
    bloques: [
      { semana: "Semanas 1–3", foco: "Auditoría de repuestos", ejercicios: ["Medir conversión por tipo de repuesto", "200 repuestos del 10 con bola de plástico", "Un juego semanal solo con la bola de plástico"] },
      { semana: "Semanas 4–6", foco: "Repetición del primer tiro", ejercicios: ["Diez tiros idénticos como calentamiento", "Video semanal comparado con la semana anterior", "Trabajo de swing libre con la toalla"] },
      { semana: "Semanas 7–9", foco: "Lectura y ajuste", ejercicios: ["Método de lectura en tres tiros cada sesión", "Aplicar el 2 a 1 y registrar el resultado", "Jugar un patrón sport al menos una vez"] },
      { semana: "Semanas 10–12", foco: "Competencia", ejercicios: ["Bloques de 6 juegos simulando torneo", "Rutina mental de reinicio entre juegos", "Inscribirse a un torneo con hándicap"] },
    ],
  },
  {
    slug: "preparacion-torneo-6-semanas",
    nombre: "Preparación de torneo — 6 semanas",
    nivel: "competitivo",
    semanas: 6,
    sesionesPorSemana: 4,
    objetivo: "Llegar afinado a un torneo scratch: arsenal listo, patrón estudiado y resistencia para bloques largos.",
    premium: true,
    bloques: [
      { semana: "Semanas 1–2", foco: "Arsenal", ejercicios: ["Probar cada bola en el patrón del torneo", "Ajustar superficies en el pro shop", "Definir bola de arranque y bola de transición"] },
      { semana: "Semanas 3–4", foco: "El patrón", ejercicios: ["Bloques completos sobre el patrón oficial", "Mapear la transición cada 2 juegos", "Anotar el plan de movimiento por juego"] },
      { semana: "Semanas 5–6", foco: "Resistencia y cabeza", ejercicios: ["Bloques de 8 juegos", "Trabajo físico de tronco 3 veces por semana", "Rutina previa al tiro estandarizada"] },
    ],
  },
];

export const planBySlug = (slug: string) => trainingPlans.find((p) => p.slug === slug);
