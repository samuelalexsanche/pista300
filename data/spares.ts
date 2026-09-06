import type { SpareLeave } from "./types";

/**
 * Los pinos van numerados 1–10 en la disposición estándar:
 *        7  8  9  10
 *          4  5  6
 *            2  3
 *              1
 */
export const spareLeaves: SpareLeave[] = [
  { id: "10", nombre: "El 10", pinos: [10], dificultad: "media", tabladeParado: "Parado en la tabla 33", objetivo: "Flecha 2ª desde la derecha (tabla 10)", consejo: "Bola de plástico y línea recta. El error clásico es intentar ganchar el 10: cualquier fricción te lo cruza. Muévete a la izquierda y cruza el objetivo, no lo persigas.", premium: false },
  { id: "7", nombre: "El 7", pinos: [7], dificultad: "media", tabladeParado: "Parado en la tabla 7", objetivo: "Flecha 3ª desde la derecha (tabla 15)", consejo: "El espejo del 10 para diestros. Camina a la orilla derecha y tira cruzado hacia la izquierda; el ángulo hace el trabajo, no la fuerza.", premium: false },
  { id: "3-6-10", nombre: "3-6-10 (escalera derecha)", pinos: [3, 6, 10], dificultad: "media", tabladeParado: "Parado en la tabla 30", objetivo: "Tabla 12 en las flechas", consejo: "Apunta al 3 con ángulo: si le pegas de lleno al 3 por la derecha, el 6 se lleva al 10. Golpear el 3 de frente deja el 10 parado.", premium: false },
  { id: "2-4-5", nombre: "2-4-5 (bucket)", pinos: [2, 4, 5], dificultad: "fácil", tabladeParado: "Parado en la tabla 22", objetivo: "Flecha central (tabla 20)", consejo: "El bucket se cae solo si le pegas al 2 en la cara interna. No cambies de bola: úsala como si fuera un tiro de primera bola apuntado un poco a la izquierda.", premium: false },
  { id: "4-7-10", nombre: "4-7-10", pinos: [4, 7, 10], dificultad: "difícil", tabladeParado: "Parado en la tabla 25", objetivo: "Tabla 13, contacto en el lado derecho del 4", consejo: "Casi imposible de convertir completo. La decisión inteligente es asegurar el 4-7 y aceptar el abierto; forzar el rebote del 4 al 10 tira los tres solo con suerte.", premium: true },
  { id: "7-10", nombre: "7-10 (split de la muerte)", pinos: [7, 10], dificultad: "difícil", tabladeParado: "Parado en la tabla 12", objetivo: "Golpe fino en el lado interno del 10", consejo: "Se convierte deslizando el 10 hacia el 7 por el canal trasero. Requiere velocidad alta y contacto muy fino. En liga: tira el que más te convenga y sigue adelante.", premium: true },
  { id: "5-7", nombre: "5-7", pinos: [5, 7], dificultad: "difícil", tabladeParado: "Parado en la tabla 20", objetivo: "Lado izquierdo del 5", consejo: "Pégale al 5 por la izquierda para mandarlo al 7. Es un split convertible: el margen de error es de un par de tablas.", premium: true },
  { id: "6-7-10", nombre: "6-7-10", pinos: [6, 7, 10], dificultad: "difícil", tabladeParado: "Parado en la tabla 28", objetivo: "Lado derecho del 6", consejo: "El 6 debe cruzar hacia el 7. Si te fijas solo en el 6-10 pierdes el 7. Prioriza el rebote, no el número de pinos.", premium: true },
  { id: "2-8", nombre: "2-8", pinos: [2, 8], dificultad: "fácil", tabladeParado: "Parado en la tabla 20", objetivo: "Centro del 2", consejo: "Tiro casi directo. El 8 está justo detrás del 2: si le pegas al 2 de frente, los dos caen.", premium: false },
  { id: "3-9", nombre: "3-9", pinos: [3, 9], dificultad: "fácil", tabladeParado: "Parado en la tabla 24", objetivo: "Centro del 3", consejo: "Como el 2-8 pero del lado derecho. Repite el mismo tiro cambiando el punto de parada un par de tablas.", premium: false },
];

/** Coordenadas relativas de cada pino para el diagrama (0-1). */
export const pinPositions: Record<number, { x: number; y: number }> = {
  7: { x: 0.14, y: 0.12 }, 8: { x: 0.38, y: 0.12 }, 9: { x: 0.62, y: 0.12 }, 10: { x: 0.86, y: 0.12 },
  4: { x: 0.26, y: 0.4 }, 5: { x: 0.5, y: 0.4 }, 6: { x: 0.74, y: 0.4 },
  2: { x: 0.38, y: 0.68 }, 3: { x: 0.62, y: 0.68 },
  1: { x: 0.5, y: 0.94 },
};
