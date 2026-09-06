# HANDOFF — Pista300, sitio para comunidad de boliche

**Proyecto:** demo de sitio para una comunidad de boliche
**Construido por:** Mattera Systems
**Estado:** demo funcional completo. 27 rutas, datos mock, sin imágenes.
**Fecha:** 6 de septiembre de 2026
**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui · Recharts

---

## 1. Qué es esto

Un sitio completo para una comunidad de boliche mexicana, construido como demo vendible.
La marca (**Pista300**), los jugadores, los torneos y los boliches son **ficticios**;
la estructura, las funcionalidades y el código son reales y listos para producción.

### La arquitectura viene del diagrama del cliente

```
INICIO
├── APRENDE   → Artículos, Tips, Tutoriales, Boliche básico
├── MEJORA    → Técnicas, Entrenamiento, Análisis, Equipo
└── CONECTA   → Comunidad, Equipos, Torneos, Rankings
        ↓
MEMBRESÍA PREMIUM → Contenido exclusivo · Herramientas exclusivas · Beneficios especiales
```

### Qué se copió de la competencia (y qué no)

| Fuente | Funcionalidad replicada |
|---|---|
| **bowl.com** | Buscadores ("find a center / member / tournament"), calendario de torneos con ficha completa e inscripción, standing sheets de liga, rankings por promedio, banco de patrones de aceite, membresía con beneficios |
| **bowlingthismonth.com** | Biblioteca de artículos por categoría (ball motion, entrenamiento, juego mental, repuestos), reseñas y comparador de bolas, paywall de suscripción, archivo buscable |

Lo que **no** se copió, por decisión explícita: su navegación sobrecargada, su densidad
tipo portal de 2010 y sus tablas sin jerarquía visual. La dirección de arte es propia.

---

## 2. Dirección de arte — "Deportivo claro"

Referencia: Strava y ATP Tour. Mucho blanco, el dato al frente, un solo acento cálido.

| Elemento | Decisión | Razón |
|---|---|---|
| Paleta | Blanco `#FFFFFF`, superficie `#F6F7F9`, tinta `#0C1116`, borde `#E4E7EB`, **naranja pista `#FF5A1F`**, azul dato `#1B6EF3`, verde `#16A34A` / rojo `#DC2626` | El naranja es el único color de marca y se reserva para acciones y acentos. Verde y rojo **solo** significan rendimiento (mejor/peor que el promedio), nunca decoración |
| Tipografía | **Geist** para UI, **Geist Mono** para toda cifra | Los scores, promedios y tablas van en mono con `tabular-nums`: las columnas no bailan al cambiar de número. Es la diferencia entre un sitio de datos y un blog con tablas |
| Motivo estructural | **El triángulo de 10 pinos** (`PinTriangle`) y el **score-strip** de 10 frames | Se usan como marca de agua del hero, fondo de tarjeta y elemento gráfico recurrente. Reemplazan al típico "bola con llamas" |
| Densidad | Tarjetas de 1px de borde, radio 12px, sin sombras pesadas | Se lee como panel de datos, no como landing de agencia |
| Tema | Claro y oscuro completos, por tokens en `app/globals.css` (`:root` y `.dark`) | Ningún color literal en los componentes: todo pasa por variables |
| Movimiento | Entrada `fade + 8px`, transiciones de 150–200ms | Sobrio a propósito. Todo respeta `prefers-reduced-motion` |

---

## 3. Estructura de archivos

```
comunidad-boliche/
├── app/                          27 rutas (ver sección 4)
│   ├── globals.css               ← SISTEMA DE DISEÑO COMPLETO. Todos los tokens viven aquí
│   ├── layout.tsx                Providers, fuentes, header y footer
│   └── page.tsx                  Home
├── components/
│   ├── ui/                       20 componentes shadcn/ui escritos a mano (ver nota abajo)
│   ├── layout/                   site-header, site-footer, logo, theme-toggle
│   ├── marketing/                placeholder, pin-triangle, section-heading, stat, empty-state
│   ├── content/                  article-card, article-browser
│   ├── community/                tournament-card/browser/register, ranking-table, player-card,
│   │                             score-strip, trend-chart, center-browser
│   ├── tools/                    average-calculator, scoresheet, spare-guide,
│   │                             ball-comparator, oil-pattern-viewer
│   └── premium/                  premium-gate, plan-toggle, pricing, account-dashboard
├── data/                         TODOS los datos mock, tipados
├── lib/
│   ├── bowling.ts                ← MOTOR DE PUNTUACIÓN. La pieza más importante
│   ├── format.ts                 Fechas, dinero, días restantes
│   └── utils.ts                  cn()
├── providers/                    membership-provider (demo), theme-provider
├── public/img/                   vacío a propósito: ver docs/IMAGENES.md
└── docs/                         esta documentación
```

> **Nota sobre shadcn/ui:** el registro `ui.shadcn.com` está bloqueado por la política de
> red del entorno donde se construyó, así que el CLI `shadcn add` no funcionó. Los 20
> componentes de `components/ui/` se escribieron a mano contra los mismos primitivos de
> Radix, con la misma API y los mismos nombres. **Puedes seguir usando `npx shadcn add`
> normalmente desde tu máquina** para añadir componentes nuevos; convivirán sin problema.
> Si el CLI pide `components.json`, créalo con `npx shadcn init` (elige Next.js + Radix +
> CSS variables) y no dejes que sobreescriba `app/globals.css`.

---

## 4. Mapa de rutas (27, todas verificadas con 200)

| Ruta | Qué hay | Premium |
|---|---|---|
| `/` | Hero, tres caminos, próximos torneos, top del ranking, últimos artículos, CTA premium | — |
| `/aprende` | Biblioteca con buscador, filtro por categoría y por nivel | — |
| `/aprende/[slug]` | Artículo. 14 artículos, 5 de ellos premium | parcial |
| `/aprende/boliche-basico` | Guía de iniciación en 5 pasos + FAQ + hoja de anotación explicada | — |
| `/mejora` | Hub de los cuatro pilares | — |
| `/mejora/tecnicas` | 6 técnicas | — |
| `/mejora/tecnicas/[slug]` | Pasos, error común y drills | 3 de 6 |
| `/mejora/entrenamiento` | 3 planes por nivel, semana a semana | 2 de 3 |
| `/mejora/equipo` | Comparador de bolas: filtros + comparativa de hasta 4 | — |
| `/mejora/equipo/[slug]` | Ficha técnica de la bola + quién la usa | — |
| `/conecta` | Hub de comunidad | — |
| `/conecta/torneos` | Calendario con buscador y filtros por ciudad, formato y orden | — |
| `/conecta/torneos/[slug]` | Ficha completa: reglas, premios, inscritos e **inscripción simulada** | — |
| `/conecta/rankings` | Tabla ordenable por 6 columnas, con filtros | — |
| `/conecta/jugadores/[slug]` | Perfil: promedio, hándicap, gráfica de tendencia, historial | historial |
| `/conecta/equipos` | Directorio de 9 equipos | — |
| `/conecta/equipos/[slug]` | Roster, récord y liga | — |
| `/conecta/ligas` | 4 ligas con tabla de posiciones y avance de temporada | — |
| `/centros` | Directorio de 10 boliches con filtros | — |
| `/premium` | Planes, comparativa, beneficios y FAQ | — |
| `/cuenta` | Panel del socio (login simulado) | — |
| `/herramientas` | Índice de las 4 herramientas | — |
| `/herramientas/promedio` | Calculadora de promedio y hándicap | **gratis** |
| `/herramientas/anotador` | Anotador frame a frame + análisis | sí |
| `/herramientas/repuestos` | Guía interactiva de repuestos y splits | sí |
| `/herramientas/patrones` | Banco de patrones de aceite | sí |
| `/ruta-inexistente` | 404 propio ("Canal.") | — |

---

## 5. Las tres piezas que hay que entender antes de tocar nada

### 5.1 `lib/bowling.ts` — el motor de puntuación

Implementa las reglas reales: strike = 10 + los dos tiros siguientes, spare = 10 + el
siguiente, décimo frame con hasta tres tiros. Lo consumen el anotador, el score-strip,
los perfiles, los rankings y la calculadora.

**Está verificado contra los cuatro casos canónicos:**

| Caso | Esperado | Obtenido |
|---|---|---|
| 12 strikes (juego perfecto) | 300 | ✅ 300 |
| Todo spares tirando 5 | 150 | ✅ 150 |
| Todos los frames abiertos con 9 | 90 | ✅ 90 |
| Juego mixto de referencia | 167 | ✅ 167 |

Si tocas este archivo, **vuelve a correr esa verificación** (comando en la sección 8).
Una puntuación mal calculada destruye la credibilidad del demo frente a cualquier bolichista.

También expone `average()` (truncado, como manda USBC) y `handicap(avg, base, pct)`.

### 5.2 `providers/membership-provider.tsx` — la membresía simulada

Contexto de React con `plan: "free" | "premium"` persistido en `localStorage`.
Expone `plan`, `esPremium`, `sesionIniciada`, `usuario`, `setPlan`, `iniciarSesion`,
`cerrarSesion` y `cargando`.

La superficie del contexto se diseñó **para que conectar el backend real no toque ni un
componente**: cuando exista Supabase/NextAuth, solo cambia el interior del provider.

`components/premium/plan-toggle.tsx` es el interruptor **Free / Premium** del encabezado.
Es un control **de demostración**: no debe existir en producción. Está pensado para
enseñarle el sitio a un cliente y cambiar de plan en vivo.

### 5.3 `components/premium/premium-gate.tsx` — todo el paywall

Un solo componente gobierna el bloqueo de contenido en todo el sitio. Envuelve cualquier
bloque; si el plan es free lo renderiza difuminado con overlay y CTA a `/premium`.

```tsx
<PremiumGate titulo="..." descripcion="..." alto="lg">
  <LoQueSeaPremium />
</PremiumGate>
```

Está aplicado en: artículos premium (a partir del tercer bloque), técnicas premium,
planes de entrenamiento premium, historial completo del perfil de jugador, y tres de las
cuatro herramientas.

---

## 6. Los datos (todos mock)

Todo vive en `data/`, tipado en `data/types.ts`. Ver `docs/MODELO-DATOS.md` para el
detalle de cada entidad.

| Archivo | Contenido |
|---|---|
| `players.ts` | 23 jugadores. **Las series se generan con un PRNG sembrado por el slug**: son deterministas (idénticas en servidor y cliente, sin errores de hidratación), realistas y no hubo que escribir 1,242 scores a mano |
| `tournaments.ts` | 8 torneos con reglas y premios reales de formato |
| `teams.ts` / `leagues.ts` | 9 equipos, 4 ligas. Los standings **se derivan** de los promedios reales de los integrantes |
| `centers.ts` | 10 boliches |
| `articles.ts` | 14 artículos con cuerpo completo escrito |
| `techniques.ts` | 6 técnicas + 3 planes de entrenamiento |
| `balls.ts` | 14 bolas |
| `oil-patterns.ts` | 8 patrones con perfil de volumen generado |
| `spares.ts` | 10 repuestos y splits con diagrama |
| `plans.ts` | Los dos planes de membresía y el FAQ |

### ⚠️ Advertencias antes de publicar

1. **Las specs de las bolas (RG, diferencial, cubierta) son plausibles pero no verificadas.**
   Publicarlas como si fueran oficiales es un problema de credibilidad. Sustitúyelas por
   las fichas del fabricante o por mediciones propias. Ya hay una nota visible en
   `/mejora/equipo` que lo advierte; quítala cuando los datos sean reales.
2. **Los perfiles de los patrones de aceite están generados matemáticamente.** En
   producción se cargan de las hojas oficiales de Kegel / USBC.
3. **Nombres, teléfonos y boliches son inventados.** Si algún nombre coincidiera con una
   persona o negocio real, cámbialo.
4. **Los precios de la membresía ($149/mes, $1,490/año) son una propuesta**, no una
   decisión del cliente.

---

## 7. PENDIENTE 1 — Imágenes (prioridad alta)

Es lo único que separa el sitio de verse terminado. **No hay ni un binario en el
proyecto**: cada imagen es un `<Placeholder />` que muestra la ruta exacta que el código
espera. Son 61 huecos.

Los prompts listos para generar con IA están en **`docs/IMAGENES.md`**.

---

## 8. Cómo correrlo y verificarlo

```bash
cd comunidad-boliche
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producción
npx tsc --noEmit     # tipos (limpio actualmente)
```

**Verificación del motor de puntuación** (hazla después de tocar `lib/bowling.ts`):

```bash
npx tsx -e "
import { scoreGame } from './lib/bowling';
const p = Array.from({length:9},()=>[10]).concat([[10,10,10]]);
const s = Array.from({length:9},()=>[5,5]).concat([[5,5,5]]);
const o = Array.from({length:10},()=>[9,0]);
const m = [[10],[7,3],[9,0],[10],[0,8],[8,2],[0,6],[10],[10],[10,8,1]];
console.log(scoreGame(p).total===300, scoreGame(s).total===150, scoreGame(o).total===90, scoreGame(m).total===167);
"
```

### Estado de la verificación al momento del handoff

- ✅ `npx tsc --noEmit` limpio
- ✅ Las 27 rutas responden 200 (la inexistente, 404)
- ✅ Motor de puntuación validado contra los 4 casos canónicos
- ✅ Toggle Free ⇄ Premium bloquea y desbloquea sin recargar
- ✅ Paridad de tokens claro/oscuro verificada: todos los tokens de `:root` existen en
  `.dark` (salvo `--radius`, que es común a ambos)
- ⚠️ **No se pudieron tomar capturas de pantalla**: el entorno de construcción no pudo
  descargar un navegador headless. La verificación visual (claro/oscuro y responsive a
  375 / 768 / 1440) queda pendiente de hacer en tu máquina con `npm run dev`
- ⚠️ `npm run build` **no se pudo ejecutar en el entorno de construcción** porque la
  carpeta estaba montada sin permiso de borrado y Next necesita limpiar `.next`.
  **Córrelo en tu máquina; debería pasar limpio** (los tipos ya están validados).
- ⚠️ En el entorno de construcción, `fonts.googleapis.com` estaba bloqueado, así que
  `next/font` usó las pilas de respaldo. En tu máquina descargará Geist normalmente.
  Los `fallback` explícitos ya están puestos en `app/layout.tsx` por si acaso.
- ℹ️ Quedó una carpeta `.next/` con artefactos parciales que no se pudieron borrar desde
  el entorno remoto. **Bórrala tú** (`rm -rf .next`) antes del primer build.

---

## 9. Lo que falta para producción (roadmap sugerido)

| # | Tarea | Por qué |
|---|---|---|
| 1 | Generar las 61 imágenes (`docs/IMAGENES.md`) | Es lo que separa el demo de verse terminado |
| 2 | Sustituir el `MembershipProvider` por auth real (Supabase Auth o NextAuth) y quitar el `PlanToggle` | El toggle es un control de demo |
| 3 | Backend: Supabase Postgres con el esquema de `docs/MODELO-DATOS.md` | Los datos mock ya están tipados igual que las tablas propuestas |
| 4 | Pasarela de pago para la membresía y las inscripciones (Stripe o Mercado Pago) | Hoy la inscripción y el cambio de plan son simulados |
| 5 | Panel de administración para publicar artículos y torneos | Hoy se editan archivos `.ts` |
| 6 | Guardar series desde el anotador en la cuenta del usuario | Es el gancho real de la membresía: el historial |
| 7 | SEO: `sitemap.ts`, `robots.ts`, `opengraph-image`, JSON-LD de `SportsEvent` para torneos | Los torneos son contenido muy buscado |
| 8 | Datos reales de bolas y patrones | Ver advertencias de la sección 6 |
| 9 | Analítica (Plausible o GA4) y medición del embudo free → premium | Sin esto no se sabe si el paywall está en el lugar correcto |

---

## 10. Decisiones que conviene no deshacer sin pensarlo

- **Los números van en mono con `tabular-nums`.** Es lo que hace que las tablas de
  rankings y los marcadores se lean como datos y no como texto.
- **Verde y rojo solo significan rendimiento.** Si se usan para otra cosa, el ojo deja de
  poder leer una tabla de un vistazo.
- **Un solo `PremiumGate` para todo el paywall.** Si el bloqueo se implementa a mano en
  cada página, mover la línea free/premium se vuelve un trabajo de días.
- **Las series se generan, no se escriben.** Cambiar el promedio objetivo de un jugador en
  `players.ts` regenera 18 series coherentes automáticamente.
- **Cero colores literales en los componentes.** Todo pasa por tokens; por eso el modo
  oscuro funciona sin tocar un solo componente.
