import { readdir, rename, readFile, writeFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";

/**
 * Ajustes al export estático para que GitHub Pages lo sirva bien.
 *
 * Dos cosas que Next no puede resolver solo:
 *
 * 1. `.nojekyll` — GitHub Pages pasa el sitio por Jekyll, que IGNORA cualquier
 *    carpeta que empiece con guion bajo. Todo el JS y el CSS de Next viven en
 *    `_next/`, así que sin este archivo el sitio se publica sin estilos y sin
 *    interactividad. Es el error clásico de desplegar Next en Pages.
 *
 * 2. Extensión de las imágenes Open Graph — Next las emite como archivos sin
 *    extensión (`/opengraph-image`). Pages deduce el Content-Type por la
 *    extensión, así que las serviría como binario genérico y WhatsApp, X y
 *    Facebook descartarían la vista previa. Se renombran a `.png` y se
 *    reescriben las referencias en el HTML.
 */

const OUT = new URL("../out/", import.meta.url).pathname;
const TEXTO = new Set([".html", ".txt", ".xml", ".json", ".webmanifest"]);

async function* archivos(dir) {
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) yield* archivos(ruta);
    else yield ruta;
  }
}

let renombradas = 0;
let reescritos = 0;

// 1. Renombrar las imágenes OG a .png
for await (const ruta of archivos(OUT)) {
  if (!ruta.endsWith("/opengraph-image")) continue;
  const info = await stat(ruta);
  if (!info.isFile()) continue;
  await rename(ruta, `${ruta}.png`);
  renombradas++;
}

// 2. Reescribir las referencias en todo archivo de texto del export
for await (const ruta of archivos(OUT)) {
  if (!TEXTO.has(extname(ruta))) continue;
  const original = await readFile(ruta, "utf8");
  // Solo las ocurrencias que NO tengan ya la extensión.
  const nuevo = original.replaceAll(/opengraph-image(?!\.png)/g, "opengraph-image.png");
  if (nuevo !== original) {
    await writeFile(ruta, nuevo);
    reescritos++;
  }
}

// 3. Desactivar Jekyll
await writeFile(join(OUT, ".nojekyll"), "");

// 4. Comprobar que ninguna imagen quedó sin el basePath.
//
// Next NO antepone el basePath a los archivos de /public cuando el optimizador
// de imágenes está apagado, que es obligatorio en export estático. El build
// pasa, el sitio compila, y en producción TODAS las imágenes dan 404 sin un
// solo error. Ya ocurrió una vez; esto lo convierte en fallo de build.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
if (BASE) {
  const huerfanas = new Set();
  for await (const ruta of archivos(OUT)) {
    if (extname(ruta) !== ".html") continue;
    const html = await readFile(ruta, "utf8");
    for (const m of html.matchAll(/(?:src|href)="(\/img\/[^"]+)"/g)) huerfanas.add(m[1]);
  }
  if (huerfanas.size) {
    console.error(`\npostexport: ${huerfanas.size} recursos sin el basePath "${BASE}" — darían 404 en producción:`);
    for (const r of [...huerfanas].slice(0, 10)) console.error(`  ${r}`);
    console.error("Pásalos por rutaPublica() de lib/seo.ts.");
    process.exit(1);
  }
}

console.log(`postexport: ${renombradas} imágenes OG renombradas, ${reescritos} archivos reescritos, .nojekyll creado`);
