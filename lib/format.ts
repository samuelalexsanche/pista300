const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/** "12 mar 2027" — formato corto y estable en servidor y cliente. */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`;
}

/** "12–14 mar 2027" para rangos de torneo. */
export function formatDateRange(startIso: string, endIso?: string): string {
  if (!endIso || endIso === startIso) return formatDate(startIso);
  const a = new Date(`${startIso}T12:00:00`);
  const b = new Date(`${endIso}T12:00:00`);
  if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) {
    return `${a.getDate()}–${b.getDate()} ${MESES[a.getMonth()]} ${a.getFullYear()}`;
  }
  return `${formatDate(startIso)} – ${formatDate(endIso)}`;
}

export function formatMoney(mxn: number): string {
  return `$${mxn.toLocaleString("es-MX")} MXN`;
}

export function pluralize(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}

/** Días restantes hasta una fecha; negativo si ya pasó. */
export function daysUntil(iso: string, today = new Date()): number {
  const target = new Date(`${iso}T12:00:00`).getTime();
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12).getTime();
  return Math.round((target - now) / 86400000);
}
