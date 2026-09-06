# Pista300 — comunidad de boliche

Demo de sitio para una comunidad de boliche mexicana. Construido por **Mattera Systems**.

Next.js 16 · React 19 · TypeScript · Tailwind v4 · shadcn/ui · Recharts.
Marca, jugadores, torneos y boliches son **ficticios**; el código es real.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npx tsc --noEmit
```

> Antes del primer build, borra la carpeta `.next` heredada del entorno donde se construyó:
> `rm -rf .next`

## Documentación

| Archivo | Contenido |
|---|---|
| [`docs/HANDOFF.md`](docs/HANDOFF.md) | **Empieza aquí.** Contexto, dirección de arte, mapa de las 27 rutas, las piezas clave, estado de la verificación y roadmap |
| [`docs/MODELO-DATOS.md`](docs/MODELO-DATOS.md) | Entidades, tablas propuestas y reglas de negocio |
| [`docs/IMAGENES.md`](docs/IMAGENES.md) | Los 61 huecos de imagen con prompts de IA listos |
| [`docs/PROMPT-CLAUDE-CODE.md`](docs/PROMPT-CLAUDE-CODE.md) | El prompt para continuar el desarrollo en Claude Code |

## Lo que hay que saber en 30 segundos

- **`lib/bowling.ts`** es el motor de puntuación real (strikes, spares, décimo frame,
  promedio truncado, hándicap). Validado: 300 / 150 / 90 / 167.
- **`providers/membership-provider.tsx`** simula la membresía. El interruptor
  **Free / Premium** del encabezado es un control de demo y no debe existir en producción.
- **`components/premium/premium-gate.tsx`** gobierna todo el paywall del sitio.
- **`app/globals.css`** tiene el sistema de diseño completo. Ningún componente usa colores
  literales.
