<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:pista300-project-rules -->

# Pista300 — reglas del proyecto

Sitio de comunidad de boliche (demo) construido por Mattera Systems.
**Lee `docs/HANDOFF.md` antes de escribir código.** Ahí está el contexto completo.

## Skills a usar en trabajo de interfaz
`frontend design`, `shadcn`, `web guidelines`, `ux-ui pro max`.

## Idioma
Todo el contenido del sitio va en **español de México**. Los comentarios de código
también. Los nombres de archivos y de símbolos, en español cuando son de dominio
(`promedio`, `handicap`, `torneos`) y en inglés cuando son de framework.

## Reglas que no se rompen sin avisar al usuario

1. **Cero colores literales en componentes.** Todo sale de los tokens de
   `app/globals.css` (`:root` y `.dark`). Si añades un color, defínelo en los dos bloques.
2. **Toda cifra en `font-mono` con `tabular-nums`** (clase `.tnum` o `font-mono`).
   Los números nunca en la fuente de texto.
3. **Verde y rojo solo significan rendimiento** (mejor/peor que el promedio). Nunca
   decoración.
4. **El paywall se hace siempre con `<PremiumGate>`** (`components/premium/premium-gate.tsx`),
   nunca a mano por página.
5. **`lib/bowling.ts` es la única fuente de verdad** para puntuación, promedio y hándicap.
   Si lo tocas, corre la verificación: juego perfecto = 300, todo spares de 5 = 150,
   todo abiertos de 9 = 90, el juego mixto de referencia = 167.
6. **Nada de imágenes binarias todavía.** Los huecos son `<Placeholder />` hasta que se
   generen con los prompts de `docs/IMAGENES.md`.
7. **`PlanToggle` es un control de demo.** No debe llegar a producción.

## Antes de dar algo por terminado
```bash
npx tsc --noEmit    # limpio
npm run build       # sin errores
```
<!-- END:pista300-project-rules -->
