import { writeFile, mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { imagenes } from "./imagenes.manifest.mjs";

/**
 * Genera las imágenes del sitio con Kie AI (google/nano-banana) y las deja en
 * `public/` con la ruta exacta que el código ya espera.
 *
 *   KIE_API_KEY=... node scripts/generar-imagenes.mjs [--solo=/img/bolas]
 *
 * Es reanudable: si el archivo ya existe, lo salta. Un fallo a mitad no obliga
 * a regenerar (ni a volver a pagar) lo que ya se descargó.
 */

const KEY = process.env.KIE_API_KEY;
if (!KEY) {
  console.error("Falta KIE_API_KEY en el entorno.");
  process.exit(1);
}

const BASE = "https://api.kie.ai";
const PUBLIC = new URL("../public", import.meta.url).pathname;
const CONCURRENCIA = 4;
const ESPERA_MAX_MS = 5 * 60 * 1000;

const filtro = process.argv.find((a) => a.startsWith("--solo="))?.slice(7);
const pendientes = filtro ? imagenes.filter((i) => i.ruta.startsWith(filtro)) : imagenes;

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

async function existe(ruta) {
  try {
    await access(join(PUBLIC, ruta));
    return true;
  } catch {
    return false;
  }
}

async function api(ruta, opciones = {}) {
  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", ...opciones.headers },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${ruta}`);
  return res.json();
}

async function generar({ ruta, prompt, aspecto }) {
  if (await existe(ruta)) return { ruta, estado: "ya existía" };

  const creacion = await api("/api/v1/jobs/createTask", {
    method: "POST",
    body: JSON.stringify({ model: "google/nano-banana", input: { prompt, image_size: aspecto } }),
  });
  if (creacion.code !== 200) throw new Error(`createTask: ${creacion.msg}`);
  const taskId = creacion.data.taskId;

  const limite = Date.now() + ESPERA_MAX_MS;
  while (Date.now() < limite) {
    await dormir(5000);
    const info = await api(`/api/v1/jobs/recordInfo?taskId=${taskId}`);
    const estado = info.data?.state;
    if (estado === "success") {
      const url = JSON.parse(info.data.resultJson).resultUrls[0];
      const bin = Buffer.from(await (await fetch(url)).arrayBuffer());
      const destino = join(PUBLIC, ruta);
      await mkdir(dirname(destino), { recursive: true });
      await writeFile(destino, bin);
      return { ruta, estado: "ok", kb: Math.round(bin.length / 1024) };
    }
    if (estado === "fail") throw new Error(`generación falló: ${info.data.failMsg ?? "sin detalle"}`);
  }
  throw new Error("tiempo de espera agotado");
}

// Cola con concurrencia limitada: la API acepta varias en paralelo, pero
// lanzar 61 de golpe es una forma rápida de que empiece a rechazar.
const cola = [...pendientes];
const resultados = [];
const fallos = [];

async function trabajador(n) {
  while (cola.length) {
    const item = cola.shift();
    try {
      const r = await generar(item);
      resultados.push(r);
      console.log(`[${resultados.length + fallos.length}/${pendientes.length}] ${r.estado.padEnd(10)} ${r.ruta}${r.kb ? ` (${r.kb} KB)` : ""}`);
    } catch (e) {
      fallos.push({ ruta: item.ruta, error: e.message });
      console.error(`[${resultados.length + fallos.length}/${pendientes.length}] FALLO     ${item.ruta} — ${e.message}`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCIA }, (_, i) => trabajador(i)));

console.log(`\nListas: ${resultados.length} · Fallos: ${fallos.length}`);
if (fallos.length) {
  console.log("Vuelve a correr el script para reintentar solo las que faltan:");
  for (const f of fallos) console.log(`  ${f.ruta} — ${f.error}`);
  process.exit(1);
}
