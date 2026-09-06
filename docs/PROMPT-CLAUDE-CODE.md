# Prompt para continuar en Claude Code

Abre Claude Code en la carpeta `comunidad-boliche` y pega esto tal cual en el primer
mensaje. Está escrito para que el nuevo chat entienda todo el proyecto sin que tengas
que explicar nada.

---

```
Vas a continuar el desarrollo de Pista300, un sitio para una comunidad de boliche
mexicana que construimos como demo vendible en Mattera Systems. Está en esta carpeta.

ANTES DE ESCRIBIR NADA:
1. Lee docs/HANDOFF.md completo. Ahí está el contexto, la dirección de arte, el mapa de
   rutas y las decisiones que no hay que deshacer.
2. Lee docs/MODELO-DATOS.md si vas a tocar datos o backend.
3. Lee docs/IMAGENES.md si vas a trabajar en las imágenes.
4. Lee lib/bowling.ts y providers/membership-provider.tsx. Son las dos piezas de las que
   depende todo lo demás.

USA ESTOS SKILLS en todo el trabajo de interfaz: frontend design, shadcn, web guidelines
y ux-ui pro max. Si alguno no está disponible, dímelo y seguimos sin él, pero no lo
sustituyas por criterio propio sin avisarme.

STACK: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui ·
Recharts. Todos los textos del sitio van en español de México.

REGLAS DEL PROYECTO (no las rompas sin avisarme):
- Cero colores literales en los componentes. Todos los colores salen de los tokens de
  app/globals.css. Por eso el modo oscuro funciona sin tocar componentes.
- Toda cifra va en font-mono con tabular-nums. Los números nunca en la fuente de texto.
- Verde y rojo SOLO significan rendimiento (mejor o peor que el promedio). Nunca
  decoración.
- El paywall se hace SIEMPRE con <PremiumGate>, nunca a mano en cada página.
- No agregues imágenes binarias: los huecos son <Placeholder /> hasta que se generen.
- lib/bowling.ts es la única fuente de verdad para puntuación, promedio y hándicap.
  Si lo tocas, corre la verificación de la sección 8 del HANDOFF (300 / 150 / 90 / 167).
- Antes de darme algo por terminado: npx tsc --noEmit limpio y npm run build sin errores.

PRIMERO, dos tareas de higiene:
- Borra la carpeta .next (quedaron artefactos parciales del entorno remoto donde se
  construyó) y corre npm run build una vez para confirmar que pasa limpio.
- Confirma que las fuentes Geist se descargan bien en local (en el entorno de
  construcción Google Fonts estaba bloqueado y se usaron las pilas de respaldo).

DESPUÉS, quiero que empecemos por: [ESCRIBE AQUÍ LA SIGUIENTE TAREA]

El roadmap sugerido está en la sección 9 del HANDOFF. Si crees que el orden debería ser
otro, dímelo antes de empezar.
```

---

## Ideas para "la siguiente tarea", en el orden que yo recomendaría

1. **Generar las 61 imágenes con IA y montarlas.** Es lo que más cambia la percepción del
   demo por hora invertida. `docs/IMAGENES.md` ya trae todos los prompts.
2. **Conectar Supabase**: auth real + las tablas de `docs/MODELO-DATOS.md`, empezando por
   `players`, `series` y `games`, para que el anotador guarde de verdad.
3. **Guardar series desde el anotador en la cuenta.** Es el gancho real de la membresía.
4. **Panel de administración** para publicar torneos y artículos sin tocar archivos `.ts`.
5. **SEO**: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` y JSON-LD de `SportsEvent`
   en las fichas de torneo. Los torneos son lo más buscado de este nicho.
6. **Pasarela de pago** (Stripe o Mercado Pago) para membresía e inscripciones.
