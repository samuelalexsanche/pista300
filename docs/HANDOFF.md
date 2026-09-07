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
- ✅ Verificación visual hecha: home, rankings, torneo, perfil de jugador, biblioteca y
  las herramientas con paywall, en claro y oscuro a 375 / 768 / 1440. Sin errores de
  consola. Falta pasar el resto de las rutas una por una
- ✅ `npm run build` pasa limpio: 134 páginas prerenderizadas, cero rutas dinámicas.
- ⚠️ En el entorno de construcción, `fonts.googleapis.com` estaba bloqueado, así que
  `next/font` usó las pilas de respaldo. En tu máquina descargará Geist normalmente.
  Los `fallback` explícitos ya están puestos en `app/layout.tsx` por si acaso.
- ✅ La carpeta `.next/` con artefactos parciales ya se borró.

---

## 9. Lo que falta para producción (roadmap sugerido)

| # | Tarea | Por qué |
|---|---|---|
| ~~1~~ | ~~Generar las 61 imágenes~~ **HECHO** — 64 generadas con Kie AI, ver sección 12 | — |
| 2 | Sustituir el `MembershipProvider` por auth real (Supabase Auth o NextAuth) y quitar el `PlanToggle` | El toggle es un control de demo |
| 3 | Backend: Supabase Postgres con el esquema de `docs/MODELO-DATOS.md` | Los datos mock ya están tipados igual que las tablas propuestas |
| 4 | Pasarela de pago para la membresía y las inscripciones (Stripe o Mercado Pago) | Hoy la inscripción y el cambio de plan son simulados |
| 5 | Panel de administración para publicar artículos y torneos | Hoy se editan archivos `.ts` |
| 6 | Guardar series desde el anotador en la cuenta del usuario | Es el gancho real de la membresía: el historial |
| ~~7~~ | ~~SEO~~ **HECHO** — ver sección 11 | — |
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

---

## 11. SEO y GEO

**En vivo:** https://samuelalexsanche.github.io/pista300/
Se publica solo, con GitHub Actions, en cada push a `main` (`.github/workflows/deploy.yml`).

### El criterio

Google publicó en mayo de 2026 su guía de optimización para IA generativa, y ahí desmiente
casi todo lo que se vende como "GEO": **`llms.txt` no lo usa, no hace falta partir el
contenido en trozos, no hay que escribir distinto para la IA, y los datos estructurados no
son obligatorios** para AI Overviews ni AI Mode. Las funciones de IA corren sobre el
ranking normal de Search. Es decir: **el SEO técnico bien hecho ES el GEO.**

Por eso aquí no hay trucos. Hay fundamentos completos y un `robots.txt` que sí deja pasar
a los agentes — que es la parte que de verdad se rompe seguido.

### Qué quedó implementado

| Pieza | Archivo | Nota |
|---|---|---|
| Base de metadatos | `app/layout.tsx` | `metadataBase`, plantilla de título, `max-image-preview:large` y `max-snippet:-1`, que es lo que permite que el sitio se cite completo en respuestas de IA |
| Helper de metadatos | `lib/seo.ts` | Todas las rutas construyen su canonical, OG y Twitter desde aquí. No se pueden desincronizar |
| Constructores de JSON-LD | `lib/schema.ts` | Un `@graph` conectado por `@id` |
| Sitemap | `app/sitemap.ts` | Con `lastModified` real y prioridad según tipo de contenido |
| robots.txt | `app/robots.ts` | Permite explícitamente los buscadores con IA y los crawlers de entrenamiento |
| Imágenes sociales | `lib/og.tsx` + 3 rutas `opengraph-image` | 33 imágenes generadas en build. **No son binarios versionados** |

### El schema por ruta

`SportsOrganization` + `WebSite` con `SearchAction` en el layout; y luego `SportsEvent`
en torneos, `Person` + `ProfilePage` en jugadores, `SportsTeam` en equipos, `BowlingAlley`
en cada boliche, `Product` en bolas, `Article` en la biblioteca, `HowTo` en técnicas y en
boliche básico, `FAQPage` donde hay preguntas visibles, `ItemList` en los listados y
`BreadcrumbList` en todo lo anidado.

**Lo que a propósito NO se marcó:**
- `aggregateRating` en las bolas. La calificación es editorial, no viene de reseñas de
  usuarios. Marcarla sería una acción manual de Google esperando a pasar.
- `Product`/`Offer` en los planes de membresía. Los precios son una propuesta, no una
  decisión del cliente (sección 6).
- `HowTo` en técnicas premium. Declarar como disponibles unos pasos que el visitante no
  puede leer es exactamente lo que el marcado de paywall existe para evitar.

### El paywall y el SEO

Este era el riesgo real del proyecto. `<PremiumGate>` renderiza el contenido en el DOM
siempre — difuminado para quien no paga. Eso significa que **el crawler ve el artículo
completo**, y sin declararlo eso se parece mucho a *cloaking*.

La solución es la que Google documenta para contenido de suscripción: el `Article` lleva
`isAccessibleForFree: false` y un `hasPart` que apunta al selector `.contenido-premium`,
clase que `<PremiumGate>` pone en sus dos estados. Así el contenido se indexa completo,
de forma declarada y legítima.

**Si alguna vez se mueve el paywall a renderizado condicional real** (que es lo correcto
cuando exista backend), hay que revisar esto: el contenido dejaría de estar en el HTML y
el `hasPart` sobraría.

### Mover el sitio a su dominio

Dos variables y nada más:

```
NEXT_PUBLIC_SITE_URL=https://pista300.mx
NEXT_PUBLIC_BASE_PATH=            # vacío
```

Están en `.github/workflows/deploy.yml`. De ahí salen el canonical, el sitemap, el
robots.txt y todo el JSON-LD.

### Lo que falta y no depende de código

1. **Verificar el dominio en Google Search Console** y mandar el sitemap. Sin esto no hay
   forma de medir nada, ni el informe de rendimiento en IA generativa.
2. **Google Business Profile** de cada boliche del directorio, si el cliente los opera.
   Es lo que Google recomienda explícitamente para visibilidad local.
3. **Las 61 imágenes** (sección 7). Google pide media de calidad para AI, y hoy cada hueco
   es un `<Placeholder />`.
4. **Datos reales** de bolas y patrones (sección 6). Contenido de primera mano y
   verificable es el factor que Google sí premia; specs plausibles pero no verificadas
   juegan en contra.
5. **Analítica** (roadmap 9) para medir si el paywall está en el lugar correcto.

---

## 12. Autoridad (GEO de contenido) e imágenes

La sección 11 cubre la fontanería. Esto es lo otro: lo que hace que un modelo
considere al sitio digno de cita.

### En qué se basa

La investigación de GEO (Aggarwal et al., KDD 2024, ~10,000 consultas) midió nueve
intervenciones de contenido. Tres destacaron: **añadir estadísticas (~41%), citar fuentes
(~30-40%) y añadir citas atribuidas (~22%)** sobre la métrica de visibilidad. El matiz
importante, que casi todo el mundo se salta: **el efecto viene del dato, no del formato**.
Una cita decorativa sin cifra dentro no gana nada. Lo que se levanta para responder es la
afirmación específica, verificable y autocontenida.

La otra mitad es E-E-A-T. En los motores generativos funciona como filtro de entrada, no
como bonificación: una fuente sin autor identificable, sin método declarado y sin política
de correcciones compite en desventaja aunque escriba mejor.

### Qué se construyó

| Pieza | Dónde | Por qué |
|---|---|---|
| **Autores con credencial calculada** | `data/authors.ts`, `components/content/author-bio.tsx` | Los 8 firmantes son jugadores de la comunidad: su credencial es su promedio verificable, no una biografía. Se calcula del perfil, no se escribe |
| **Respuesta corta** | `components/content/answer-block.tsx`, `data/article-extras.ts` | Cada artículo abre con la respuesta directa en 2-3 frases que se sostienen fuera de contexto. Va también al `abstract` del JSON-LD |
| **Fuentes citadas** | `components/content/sources-list.tsx` | Referencias reales a USBC, IBF y Kegel, al pie y en `citation` del schema |
| **Informe de datos propios** | `/datos`, `lib/estadisticas.ts` | La jugada de autoridad más fuerte: ser la fuente del dato, no repetirlo. Estadística agregada de la comunidad con `Dataset` schema, licencia CC BY 4.0 y permiso explícito de cita |
| **Centro de preguntas** | `/preguntas`, `data/faq.ts` | 15 respuestas autocontenidas a las búsquedas reales, todas visibles (sin acordeón) y marcadas con `FAQPage` |
| **Transparencia editorial** | `/acerca` | Quién escribe, con qué credencial, de dónde salen las cifras, política de correcciones y declaración de no tener contenido pagado |

### La limitación que hay que conocer

La investigación es consistente en algo incómodo: **el contenido de terceros se cita
alrededor de 3 veces más que el sitio propio**, y ~91% de las respuestas generativas citan
fuentes externas antes que la web de la marca. Todo lo anterior es condición necesaria
pero no suficiente.

Lo que mueve la aguja de verdad es que **otros citen a Pista300**. Por eso `/datos` está
construido como está: cifras que nadie más publica, con licencia abierta, formato de cita
listo y contacto para prensa. Esa página es la que puede ganar enlaces de medios
deportivos; el resto del sitio la sostiene.

### Imágenes

Las 64 imágenes se generaron con Kie AI (`google/nano-banana`) y viven en `public/img/`.

```bash
KIE_API_KEY=... node scripts/generar-imagenes.mjs   # reanudable: salta las que ya existen
bash scripts/comprimir-imagenes.sh                  # OBLIGATORIO después de generar
```

- `scripts/imagenes.manifest.mjs` es el catálogo ruta → prompt. Editable sin tocar el script.
- **La compresión no es opcional.** Kie devuelve JPEG de ~1.3 MB; sesenta y cuatro son
  ~75 MB que en export estático se sirven tal cual. El script los deja en **6.2 MB
  totales (93% menos)**, ~97 KB por imagen.
- Cinco prompts fueron rechazados por el filtro de Google por describir personas (edad,
  manos, figuras). Se reencuadraron sobre el objeto o la silueta. Si añades imágenes con
  personas, cuenta con esto.
- `<Placeholder>` sigue existiendo para huecos futuros; las fotos van por
  `components/marketing/foto.tsx`, que fuerza `width`/`height` y `alt` en español.

### Movimiento y profundidad

- Fondos con parallax en el hero y en el encabezado de las 27 rutas
  (`components/marketing/fondo.tsx`), bajo velo degradado con tokens `--fondo-velo` y
  `--fondo-opacidad` definidos en `:root` y `.dark`.
- Entrada al hacer scroll en los encabezados de sección (`.reveal`).
- **Todo con animaciones de scroll de CSS (`animation-timeline`), sin JavaScript.** No hay
  listener de scroll, no hay trabajo en el hilo principal y corre en el compositor. Un
  parallax con JS que dispara en cada scroll arruina el INP, que es métrica de ranking:
  habría costado justo lo que la sección 11 acaba de ganar.
- Donde el navegador no lo soporta, el contenido se ve fijo y completo. Verificado:
  ningún elemento queda en opacidad 0.

**Nota de dirección de arte:** la sección 2 define el movimiento como «sobrio a propósito».
El parallax se añadió por petición explícita y se calibró para no romper eso: recorrido
corto, una sola gestualidad repetida, y la foto siempre por debajo de la retícula de pines
y del triángulo, que siguen siendo la marca. Si en algún momento se siente decorativo en
lugar de estructural, lo correcto es bajarlo, no subirlo.

---

## 13. Responsive

Verificado sin desbordamiento horizontal en las 30 rutas a **320, 375, 768, 1024,
1280 y 1440 px**, en claro y oscuro.

### El fallo que había y por qué

Los hijos de un grid traen `min-width: auto`: no encogen por debajo del ancho mínimo
de su contenido. La hoja de anotación mide 672 px de contenido mínimo, así que
estiraba su columna a ese ancho y empujaba la página entera — y su propio
`overflow-x-auto` nunca llegaba a activarse. En el hero arrastraba también al
titular de al lado, porque en móvil ambos comparten la única columna.

Afectaba a `/`, `/conecta`, `/cuenta`, `/herramientas/anotador`, el perfil de
jugador, la ficha de torneo y la ficha de bola.

**La solución está en `app/globals.css`:**

```css
:where(.grid) > * { min-width: 0; }
```

Se limita a grid (no a flex, donde encoger sí cambia el reparto de espacio) y va en
`:where()` para no sumar especificidad: cualquier `min-w-*` explícito sigue ganando.
Además quedan `min-w-0` explícitos en los puntos concretos, como documentación en el
lugar donde importa.

### Otros arreglos

| Qué | Dónde | Por qué |
|---|---|---|
| Menú de escritorio desde `lg` en vez de `md` | `site-header.tsx` | A 768 px el encabezado pedía 834: logo 100 + menú 361 + bloque derecho 341 + padding. El desplegable ahora cubre hasta `lg`, así que en tablet no queda nada inalcanzable |
| Etiqueta «Demo» desde `xl` | `plan-toggle.tsx` | Sobraban 24 px justo en 1024, donde aparecen a la vez el menú y el botón Premium. Es el píxel menos importante del encabezado |
| Botones de ordenar con área táctil de 32 px | `ranking-table.tsx` | Medían 16 px de alto. Se agrandan con `-my-2 py-2`, sin alterar el alto de la fila |
| Enlaces del pie con alto mínimo de 36 px en móvil | `site-footer.tsx` | Como texto en línea medían 18 px |
| Botones del anotador con `flex-wrap` | `scoresheet.tsx` | Tres botones no caben en una fila de 375 px |
| Cifras de cabecera sin separador de millares | `/datos` | En Geist Mono todos los glifos ocupan una celda, así que la coma y el punto se leen como espacios: «1 , 296», «30 . 6%». En el texto en prosa sí se conservan |

### Cómo comprobarlo cuando cambies algo

Pega esto en la consola del navegador con el sitio abierto. Mide el ancho real y
descarta lo que ya vive dentro de un contenedor con scroll propio:

```js
const sweep = async (rutas, ancho) => {
  const f = document.createElement("iframe");
  f.style.cssText = `position:fixed;left:-9999px;width:${ancho}px;height:900px;border:0`;
  document.body.appendChild(f);
  const malas = [];
  for (const r of rutas) {
    await new Promise((ok) => { f.onload = ok; f.src = r; });
    await new Promise((ok) => setTimeout(ok, 300));
    const d = f.contentDocument;
    const x = d.documentElement.scrollWidth - d.documentElement.clientWidth;
    if (x > 1) malas.push(`${r}: +${x}px`);
  }
  f.remove();
  return malas;
};
await sweep(["/", "/conecta/rankings", "/cuenta", "/datos"], 375);
```

Hazlo en tandas de 10–15 rutas: más de eso agota el tiempo de la consola.
