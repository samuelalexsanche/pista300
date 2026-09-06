/**
 * lib/bowling.ts — Motor de boliche.
 *
 * Es la pieza más importante del sitio: si estos números están mal, el demo
 * pierde toda credibilidad frente a un boliche. Todo lo demás (anotador,
 * perfiles, rankings, calculadora) consume estas funciones.
 *
 * Reglas implementadas:
 *  - 10 frames. Del 1 al 9: dos tiros salvo strike.
 *  - Strike  = 10 + los dos tiros siguientes.
 *  - Spare   = 10 + el tiro siguiente.
 *  - Frame 10: hasta tres tiros; el tercero solo si hubo strike o spare.
 *  - Juego perfecto = 300. Todo spares de 5 = 150. Todo abiertos 9 = 90.
 */

/** Un frame es la lista de pinos derribados por tiro. `null` = tiro no lanzado. */
export type Frame = (number | null)[];

export type FrameResult = {
  /** Pinos por tiro, tal cual se capturaron. */
  rolls: (number | null)[];
  /** Acumulado hasta este frame. `null` si aún no se puede cerrar. */
  cumulative: number | null;
  type: "strike" | "spare" | "open" | "incomplete";
};

export type GameResult = {
  frames: FrameResult[];
  /** Total del juego; si aún faltan tiros, es el máximo ya asegurado. */
  total: number;
  complete: boolean;
  strikes: number;
  spares: number;
  opens: number;
  /** Pinos dejados en pie por frames abiertos. */
  missedPins: number;
};

/** Convierte los 10 frames en la secuencia plana de tiros que exige el marcador. */
function flatten(frames: Frame[]): (number | null)[] {
  const rolls: (number | null)[] = [];
  frames.forEach((f) => f.forEach((r) => rolls.push(r ?? null)));
  return rolls;
}

/**
 * Puntúa un juego completo o parcial.
 * `frames` debe traer 10 entradas; los frames 1-9 con 1 o 2 tiros y el 10 con
 * hasta 3. Los tiros no lanzados se pasan como `null` o simplemente se omiten.
 */
export function scoreGame(frames: Frame[]): GameResult {
  const padded: Frame[] = Array.from({ length: 10 }, (_, i) => frames[i] ?? []);
  const results: FrameResult[] = [];

  // Índice del primer tiro de cada frame dentro de la secuencia plana.
  const flat: (number | null)[] = [];
  const starts: number[] = [];
  padded.forEach((f) => {
    starts.push(flat.length);
    const rolls = f.filter((r) => r !== undefined) as (number | null)[];
    rolls.forEach((r) => flat.push(r));
  });

  let running = 0;
  let closed = true;
  let strikes = 0;
  let spares = 0;
  let opens = 0;
  let missedPins = 0;

  for (let i = 0; i < 10; i++) {
    const start = starts[i];
    const rolls = padded[i].filter((r) => r !== undefined) as (number | null)[];
    const r0 = flat[start];
    const r1 = flat[start + 1];
    const r2 = flat[start + 2];

    let type: FrameResult["type"] = "incomplete";
    let frameScore: number | null = null;

    if (i < 9) {
      if (r0 === 10) {
        type = "strike";
        const b1 = flat[start + 1];
        const b2 = flat[start + 2];
        if (b1 != null && b2 != null) frameScore = 10 + b1 + b2;
      } else if (r0 != null && r1 != null) {
        if (r0 + r1 === 10) {
          type = "spare";
          const b1 = flat[start + 2];
          if (b1 != null) frameScore = 10 + b1;
        } else {
          type = "open";
          frameScore = r0 + r1;
          missedPins += 10 - (r0 + r1);
        }
      }
    } else {
      // Décimo frame
      const a = r0;
      const b = r1;
      const c = r2;
      if (a === 10) type = "strike";
      else if (a != null && b != null && a + b === 10) type = "spare";
      else if (a != null && b != null) {
        type = "open";
        missedPins += 10 - (a + b);
      }

      const needsThird = a === 10 || (a != null && b != null && a + b === 10);
      if (a != null && b != null && (!needsThird || c != null)) {
        frameScore = a + b + (c ?? 0);
      }
    }

    if (type === "strike") strikes++;
    else if (type === "spare") spares++;
    else if (type === "open") opens++;

    if (frameScore == null) {
      closed = false;
      results.push({ rolls, cumulative: null, type });
    } else {
      running += frameScore;
      results.push({ rolls, cumulative: closed ? running : null, type });
    }
  }

  return {
    frames: results,
    total: running,
    complete: closed && results[9].cumulative != null,
    strikes,
    spares,
    opens,
    missedPins,
  };
}

/** Total simple de un juego (0 si no se puede calcular todavía). */
export function gameTotal(frames: Frame[]): number {
  return scoreGame(frames).total;
}

/** Promedio de una lista de scores, truncado como marca la regla USBC. */
export function average(scores: number[]): number {
  if (!scores.length) return 0;
  return Math.floor(scores.reduce((a, b) => a + b, 0) / scores.length);
}

/**
 * Hándicap: (base − promedio) × porcentaje, truncado, nunca negativo.
 * Formato habitual en México y USBC: 80% de 220 o 90% de 210.
 */
export function handicap(avg: number, base = 220, percentage = 0.8): number {
  if (avg >= base) return 0;
  return Math.floor((base - avg) * percentage);
}

/** Score con hándicap aplicado. */
export function scratchToHandicap(score: number, hdcp: number): number {
  return score + hdcp;
}

/** Total de una serie (normalmente 3 juegos). */
export function seriesTotal(scores: number[]): number {
  return scores.reduce((a, b) => a + b, 0);
}

/** Convierte un score a texto de rendimiento relativo al promedio. */
export function deltaFromAverage(score: number, avg: number) {
  const delta = score - avg;
  return {
    delta,
    label: `${delta > 0 ? "+" : ""}${delta}`,
    tone: delta > 0 ? ("positive" as const) : delta < 0 ? ("negative" as const) : ("neutral" as const),
  };
}

/** Notación de un tiro para el marcador: X, /, -, o el número. */
export function rollSymbol(frameRolls: (number | null)[], index: number, isTenth = false): string {
  const value = frameRolls[index];
  if (value == null) return "";
  if (value === 10) return "X";
  if (index > 0) {
    const prev = frameRolls[index - 1] ?? 0;
    if (isTenth && prev === 10) return value === 10 ? "X" : value === 0 ? "-" : String(value);
    if (prev + value === 10) return "/";
  }
  return value === 0 ? "-" : String(value);
}

/** Genera 10 frames vacíos para el anotador. */
export function emptyFrames(): Frame[] {
  return Array.from({ length: 10 }, () => []);
}

/** Pinos máximos que se pueden tirar en el siguiente lanzamiento de un frame. */
export function maxPins(frame: Frame, index: number, isTenth: boolean): number {
  if (!isTenth) {
    if (index === 0) return 10;
    return 10 - (frame[0] ?? 0);
  }
  const a = frame[0] ?? null;
  const b = frame[1] ?? null;
  if (index === 0) return 10;
  if (index === 1) return a === 10 ? 10 : 10 - (a ?? 0);
  if (a === 10 && b === 10) return 10;
  if (a === 10) return 10 - (b ?? 0);
  return 10; // tras spare, tercer tiro libre
}
