# Imágenes pendientes — 61 huecos

El proyecto **no tiene ni un binario**. Cada imagen es un componente `<Placeholder />`
que dibuja la ruta exacta que el código espera. Genera el archivo, colócalo en `public/`
con ese nombre exacto y sustituye el `<Placeholder />` por `<Image>` de `next/image`.

## Flujo con kie.ai (el mismo del skill `facebook-ads-creator`)

```
POST https://api.kie.ai/api/v1/jobs/createTask
  model: google/nano-banana
  prompt: <el de abajo>
→ polling a getTaskDetail hasta que el estado sea success
```

## Reglas de estilo comunes a todas

Añade siempre al final del prompt:

```
Clean sports-editorial photography, natural light, high detail, no text, no logos,
no watermarks, no brand names on equipment. Muted background so orange UI accents
stand out. Photorealistic.
```

Y el negativo:

```
no text, no logos, no brand marks, no watermark, no distorted hands, no extra fingers
```

---

## 1. Torneos — `public/img/torneos/*.jpg` · 1600×900 (16:9)

| Archivo | Prompt |
|---|---|
| `abierto-guadalajara.jpg` | Wide shot of a modern bowling center during a competitive tournament, lanes lit from above, blurred spectators in the background, focus on the pin deck, cool neutral tones with warm highlights |
| `copa-pista300.jpg` | Mid shot of a bowler mid-approach in a bright bowling alley, motion blur on the ball, amateur league atmosphere, warm daylight through large windows |
| `dobles-satelite.jpg` | Two bowlers celebrating a strike together at a bowling center, mixed doubles, energetic but candid, shallow depth of field |
| `juvenil-jalisco.jpg` | Teenage bowlers lined up at the ball return in a bright bowling center, youth tournament, natural candid moment, no faces in sharp focus |
| `regio-scratch.jpg` | Dramatic low-angle shot of a bowling ball leaving the hand at the foul line, polished lane reflecting overhead lights, dark moody tones |
| `equipos-bajio.jpg` | Team of four bowlers in matching shirts seated at the scoring table of a bowling center, seen from behind, relaxed |
| `senior-puebla.jpg` | Older bowlers in their fifties and sixties at a bowling center, warm friendly atmosphere, natural daylight |
| `caribe-open.jpg` | Bowling center with large windows overlooking palm trees and bright coastal light, tropical tournament setting |

## 2. Artículos — `public/img/articulos/*.jpg` · 2100×900 (21:9)

| Archivo | Prompt |
|---|---|
| `primera-bola.jpg` | Row of bowling balls of different colors on a pro shop rack, shallow depth of field, warm shop lighting |
| `cuatro-pasos.jpg` | Side profile of a bowler's four-step approach, motion sequence feel, clean bowling center background |
| `leer-la-pista.jpg` | Close-up of a bowling lane surface showing oil sheen under overhead lights, abstract, receding perspective |
| `repuestos.jpg` | Two bowling pins left standing at the end of a lane, rest of the deck empty, sharp focus on the pins |
| `juego-mental.jpg` | Bowler sitting alone on the bench looking down the lane, contemplative, backlit, moody |
| `reglas.jpg` | Overhead flat lay of a bowling scoresheet, pencil and a bowling ball on a wooden surface |
| `rev-rate.jpg` | Extreme close-up of a bowling ball spinning just after release, motion blur showing rotation |
| `primera-liga.jpg` | Group of league bowlers gathered around the scoring monitor, candid, evening lighting |
| `mantenimiento.jpg` | Bowling ball being wiped with a microfiber towel on a workbench, pro shop tools in the background |
| `analisis.jpg` | Bowling scoring monitor showing statistics, screen glow, out-of-focus lanes behind |
| `etiqueta.jpg` | Two adjacent bowling approaches with one bowler waiting while the other throws, wide shot |
| `entrenar-en-casa.jpg` | Athlete doing a shoulder mobility exercise with a resistance band in a plain living room, morning light |
| `diez-parado.jpg` | Single bowling pin standing alone on the right corner of the pin deck, dramatic lighting |
| `de-170-a-190.jpg` | Bowler reviewing notes on a notebook next to a bowling ball, focused, warm side lighting |

## 3. Bolas — `public/img/bolas/*.jpg` · 1000×1000 (1:1)

Un solo prompt base, cambiando el color:

```
Studio product photo of a single bowling ball on a plain light gray seamless background,
soft even lighting, subtle reflection underneath, three finger holes visible, centered,
<COLOR> marbled coverstock, no text, no logos, no brand marks. Photorealistic, 1000x1000.
```

| Archivo | COLOR |
|---|---|
| `phaze-ii.jpg` | deep purple and teal |
| `black-widow.jpg` | glossy black with red flecks |
| `idle-fury.jpg` | navy blue and copper |
| `jackal-ghost.jpg` | matte charcoal gray |
| `iq-tour.jpg` | pearlescent white and silver |
| `zen.jpg` | emerald green and black |
| `choice-pearl.jpg` | pearl blue and white |
| `path-rising.jpg` | bright orange and black |
| `pitch-black.jpg` | solid matte black |
| `rhino.jpg` | magenta and violet |
| `kinetic-emerald.jpg` | jade green |
| `verge-hybrid.jpg` | crimson and dark gray |
| `white-dot.jpg` | solid glossy white |
| `electrify.jpg` | electric blue and lime |

## 4. Boliches — `public/img/centros/*.jpg` · 1600×1200 (4:3)

```
Interior of a modern bowling center, <VARIACIÓN>, wide angle architectural photography,
clean and uncluttered, no people in the foreground.
```

Variaciones sugeridas: `minerva` (24 líneas, techos altos, luz de tarde) · `chapalita`
(16 líneas, boutique, madera clara) · `andares` (20 líneas, bar moderno, iluminación
cálida) · `tlaquepaque` (12 líneas, tradicional, sencillo) · `tonala` (14 líneas, familiar,
colores vivos) · `satelite` (32 líneas, muy grande, escala impresionante) · `monterrey`
(28 líneas, vista a las montañas por ventanales) · `puebla` (18 líneas, clásico, azulejo) ·
`leon` (20 líneas, contemporáneo) · `cancun` (16 líneas, luz tropical).

## 5. Equipos — `public/img/equipos/*.jpg` · 1200×900 (4:3)

```
Bowling team of three to four people in matching <COLOR> shirts posing casually at a
bowling center, candid group photo, natural light, friendly, no text on shirts.
```

Colores por equipo: `los-tapatios` naranja · `pinas-de-acero` azul · `chapalita-bc` verde
azulado · `tonala-thunder` morado · `regias` rojo · `satelite-strikers` ámbar ·
`angelopolis` celeste · `leon-lanes` verde · `caribe-bowl` turquesa.

## 6. Técnicas — `public/img/tecnicas/*.jpg` · 1200×900 (4:3)

| Archivo | Prompt |
|---|---|
| `pushaway.jpg` | Side view of a bowler at the start of the approach, arms extending the ball forward, clean background |
| `swing.jpg` | Side view of a bowler at the top of the backswing, arm fully extended behind |
| `deslizamiento.jpg` | Low angle of a bowler's slide foot at the foul line, knee bent, ball about to be released |
| `posicion-mano.jpg` | Extreme close-up of a hand gripping a bowling ball, fingers in the holes, wrist straight |
| `ajuste-lateral.jpg` | Overhead view of the bowling approach dots and lane arrows, geometric and clean |
| `velocidad.jpg` | Bowling ball in motion down the lane with motion blur, arrows visible in the foreground |

---

## Después de generar

1. Coloca los archivos en `public/img/<categoría>/`.
2. Sustituye `<Placeholder src="..." />` por:
   ```tsx
   <Image src={t.imagen} alt={t.nombre} width={1600} height={900} className="rounded-lg" />
   ```
   (importa `Image` de `next/image`).
3. Añade `alt` descriptivo en español a cada una. No dejes `alt=""` salvo en las
   decorativas.
4. Genera además la imagen Open Graph del sitio: `public/img/og.jpg`, 1200×630, con el
   mismo prompt del hero pero con espacio negativo a la izquierda para el texto.
