/**
 * Catálogo de las imágenes del sitio: ruta exacta que el código espera → prompt.
 *
 * Los prompts vienen de `docs/IMAGENES.md`. Vive en un archivo aparte para que
 * se pueda revisar y editar sin tocar el script que llama a la API.
 */

/** Estilo común. Va al final de todos los prompts para que la serie sea coherente. */
const ESTILO =
  "Clean sports-editorial photography, natural light, high detail, no text, no logos, " +
  "no watermarks, no brand names on equipment. Muted background so orange UI accents " +
  "stand out. Photorealistic.";

const con = (prompt) => `${prompt}. ${ESTILO}`;

const bola = (color) =>
  con(
    `Studio product photo of a single bowling ball on a plain light gray seamless background, ` +
      `soft even lighting, subtle reflection underneath, three finger holes visible, centered, ` +
      `${color} marbled coverstock`
  );

const centro = (variacion) =>
  con(`Interior of a modern bowling center, ${variacion}, wide angle architectural photography, clean and uncluttered, no people in the foreground`);

const equipo = (color) =>
  con(
    `Bowling team of three to four people in matching ${color} shirts posing casually at a bowling center, ` +
      `candid group photo, natural light, friendly, no text on shirts`
  );

export const imagenes = [
  // ---------------------------------------------------------------- Torneos (16:9)
  { ruta: "/img/torneos/abierto-guadalajara.jpg", aspecto: "16:9", prompt: con("Wide shot of a modern bowling center during a competitive tournament, lanes lit from above, blurred spectators in the background, focus on the pin deck, cool neutral tones with warm highlights") },
  { ruta: "/img/torneos/copa-pista300.jpg", aspecto: "16:9", prompt: con("Mid shot of a bowler mid-approach in a bright bowling alley, motion blur on the ball, amateur league atmosphere, warm daylight through large windows") },
  { ruta: "/img/torneos/dobles-satelite.jpg", aspecto: "16:9", prompt: con("Two bowlers celebrating a strike together at a bowling center, mixed doubles, energetic but candid, shallow depth of field") },
  { ruta: "/img/torneos/juvenil-jalisco.jpg", aspecto: "16:9", prompt: con("Teenage bowlers lined up at the ball return in a bright bowling center, youth tournament, natural candid moment, no faces in sharp focus") },
  { ruta: "/img/torneos/regio-scratch.jpg", aspecto: "16:9", prompt: con("Dramatic low-angle shot of a bowling ball leaving the hand at the foul line, polished lane reflecting overhead lights, dark moody tones") },
  { ruta: "/img/torneos/equipos-bajio.jpg", aspecto: "16:9", prompt: con("Team of four bowlers in matching shirts seated at the scoring table of a bowling center, seen from behind, relaxed") },
  { ruta: "/img/torneos/senior-puebla.jpg", aspecto: "16:9", prompt: con("Row of bowling balls resting on the ball return rack at a traditional bowling center, warm friendly atmosphere, natural daylight, no people") },
  { ruta: "/img/torneos/caribe-open.jpg", aspecto: "16:9", prompt: con("Empty bowling center interior with floor-to-ceiling windows, palm trees and bright coastal light outside, polished lanes in the foreground, no people") },

  // ------------------------------------------------------------- Artículos (21:9)
  { ruta: "/img/articulos/primera-bola.jpg", aspecto: "21:9", prompt: con("Row of bowling balls of different colors on a pro shop rack, shallow depth of field, warm shop lighting") },
  { ruta: "/img/articulos/cuatro-pasos.jpg", aspecto: "21:9", prompt: con("Side profile of a bowler's four-step approach, motion sequence feel, clean bowling center background") },
  { ruta: "/img/articulos/leer-la-pista.jpg", aspecto: "21:9", prompt: con("Close-up of a bowling lane surface showing oil sheen under overhead lights, abstract, receding perspective") },
  { ruta: "/img/articulos/repuestos.jpg", aspecto: "21:9", prompt: con("Two bowling pins left standing at the end of a lane, rest of the deck empty, sharp focus on the pins") },
  { ruta: "/img/articulos/juego-mental.jpg", aspecto: "21:9", prompt: con("Empty bench seat facing an illuminated bowling lane at night, single bowling ball resting beside it, contemplative and quiet, backlit, moody, no people") },
  { ruta: "/img/articulos/reglas.jpg", aspecto: "21:9", prompt: con("Overhead flat lay of a bowling scoresheet, pencil and a bowling ball on a wooden surface") },
  { ruta: "/img/articulos/rev-rate.jpg", aspecto: "21:9", prompt: con("Extreme close-up of a bowling ball spinning just after release, motion blur showing rotation") },
  { ruta: "/img/articulos/primera-liga.jpg", aspecto: "21:9", prompt: con("Group of league bowlers gathered around the scoring monitor, candid, evening lighting") },
  { ruta: "/img/articulos/mantenimiento.jpg", aspecto: "21:9", prompt: con("Bowling ball being wiped with a microfiber towel on a workbench, pro shop tools in the background") },
  { ruta: "/img/articulos/analisis.jpg", aspecto: "21:9", prompt: con("Bowling scoring monitor showing statistics, screen glow, out-of-focus lanes behind") },
  { ruta: "/img/articulos/etiqueta.jpg", aspecto: "21:9", prompt: con("Two adjacent bowling approaches with one bowler waiting while the other throws, wide shot") },
  { ruta: "/img/articulos/entrenar-en-casa.jpg", aspecto: "21:9", prompt: con("Athlete doing a shoulder mobility exercise with a resistance band in a plain living room, morning light") },
  { ruta: "/img/articulos/diez-parado.jpg", aspecto: "21:9", prompt: con("Single bowling pin standing alone on the right corner of the pin deck, dramatic lighting") },
  { ruta: "/img/articulos/de-170-a-190.jpg", aspecto: "21:9", prompt: con("Bowler reviewing notes on a notebook next to a bowling ball, focused, warm side lighting") },

  // ------------------------------------------------------------------ Bolas (1:1)
  { ruta: "/img/bolas/phaze-ii.jpg", aspecto: "1:1", prompt: bola("deep purple and teal") },
  { ruta: "/img/bolas/black-widow.jpg", aspecto: "1:1", prompt: bola("glossy black with red flecks") },
  { ruta: "/img/bolas/idle-fury.jpg", aspecto: "1:1", prompt: bola("navy blue and copper") },
  { ruta: "/img/bolas/jackal-ghost.jpg", aspecto: "1:1", prompt: bola("matte charcoal gray") },
  { ruta: "/img/bolas/iq-tour.jpg", aspecto: "1:1", prompt: bola("pearlescent white and silver") },
  { ruta: "/img/bolas/zen.jpg", aspecto: "1:1", prompt: bola("emerald green and black") },
  { ruta: "/img/bolas/choice-pearl.jpg", aspecto: "1:1", prompt: bola("pearl blue and white") },
  { ruta: "/img/bolas/path-rising.jpg", aspecto: "1:1", prompt: bola("bright orange and black") },
  { ruta: "/img/bolas/pitch-black.jpg", aspecto: "1:1", prompt: bola("solid matte black") },
  { ruta: "/img/bolas/rhino.jpg", aspecto: "1:1", prompt: bola("magenta and violet") },
  { ruta: "/img/bolas/kinetic-emerald.jpg", aspecto: "1:1", prompt: bola("jade green") },
  { ruta: "/img/bolas/verge-hybrid.jpg", aspecto: "1:1", prompt: bola("crimson and dark gray") },
  { ruta: "/img/bolas/white-dot.jpg", aspecto: "1:1", prompt: bola("solid glossy white") },
  { ruta: "/img/bolas/electrify.jpg", aspecto: "1:1", prompt: bola("electric blue and lime") },

  // --------------------------------------------------------------- Boliches (4:3)
  { ruta: "/img/centros/minerva.jpg", aspecto: "4:3", prompt: centro("24 lanes, high ceilings, late afternoon light") },
  { ruta: "/img/centros/chapalita.jpg", aspecto: "4:3", prompt: centro("16 lanes, boutique feel, light wood") },
  { ruta: "/img/centros/andares.jpg", aspecto: "4:3", prompt: centro("20 lanes, modern bar, warm lighting") },
  { ruta: "/img/centros/tlaquepaque.jpg", aspecto: "4:3", prompt: centro("12 lanes, traditional and simple") },
  { ruta: "/img/centros/tonala.jpg", aspecto: "4:3", prompt: centro("14 lanes, family friendly, bright colors") },
  { ruta: "/img/centros/satelite.jpg", aspecto: "4:3", prompt: centro("32 lanes, very large, impressive scale") },
  { ruta: "/img/centros/monterrey.jpg", aspecto: "4:3", prompt: centro("28 lanes, mountain view through large windows") },
  { ruta: "/img/centros/puebla.jpg", aspecto: "4:3", prompt: centro("18 lanes, classic, tile work") },
  { ruta: "/img/centros/leon.jpg", aspecto: "4:3", prompt: centro("20 lanes, contemporary") },
  { ruta: "/img/centros/cancun.jpg", aspecto: "4:3", prompt: centro("16 lanes, tropical light") },

  // ---------------------------------------------------------------- Equipos (4:3)
  { ruta: "/img/equipos/los-tapatios.jpg", aspecto: "4:3", prompt: equipo("orange") },
  { ruta: "/img/equipos/pinas-de-acero.jpg", aspecto: "4:3", prompt: equipo("blue") },
  { ruta: "/img/equipos/chapalita-bc.jpg", aspecto: "4:3", prompt: equipo("teal") },
  { ruta: "/img/equipos/tonala-thunder.jpg", aspecto: "4:3", prompt: equipo("purple") },
  { ruta: "/img/equipos/regias.jpg", aspecto: "4:3", prompt: equipo("red") },
  { ruta: "/img/equipos/satelite-strikers.jpg", aspecto: "4:3", prompt: equipo("amber") },
  { ruta: "/img/equipos/angelopolis.jpg", aspecto: "4:3", prompt: equipo("light blue") },
  { ruta: "/img/equipos/leon-lanes.jpg", aspecto: "4:3", prompt: equipo("green") },
  { ruta: "/img/equipos/caribe-bowl.jpg", aspecto: "4:3", prompt: equipo("turquoise") },

  // --------------------------------------------------------------- Técnicas (4:3)
  { ruta: "/img/tecnicas/pushaway.jpg", aspecto: "4:3", prompt: con("Distant backlit silhouette of a bowling approach at the start of the delivery, strong rim light, figure unrecognizable and very small in frame, clean background") },
  { ruta: "/img/tecnicas/swing.jpg", aspecto: "4:3", prompt: con("Side view of a bowler at the top of the backswing, arm fully extended behind") },
  { ruta: "/img/tecnicas/deslizamiento.jpg", aspecto: "4:3", prompt: con("Low angle of a bowler's slide foot at the foul line, knee bent, ball about to be released") },
  { ruta: "/img/tecnicas/posicion-mano.jpg", aspecto: "4:3", prompt: con("Extreme close-up of the three drilled finger holes on a bowling ball, studio lighting, sharp detail on the drilled bevels, no people") },
  { ruta: "/img/tecnicas/ajuste-lateral.jpg", aspecto: "4:3", prompt: con("Overhead view of the bowling approach dots and lane arrows, geometric and clean") },
  { ruta: "/img/tecnicas/velocidad.jpg", aspecto: "4:3", prompt: con("Bowling ball in motion down the lane with motion blur, arrows visible in the foreground") },

  // ------------------------------------------------------- Fondos de profundidad
  // No estaban en docs/IMAGENES.md: son para las capas de parallax. Muy oscuras y
  // sin sujeto, para que el texto encima siga siendo legible en los dos temas.
  { ruta: "/img/fondos/hero.jpg", aspecto: "16:9", prompt: con("Very dark abstract bowling lane receding into deep shadow, oil sheen catching a single warm highlight, heavy negative space, almost black, minimal") },
  { ruta: "/img/fondos/pinos.jpg", aspecto: "16:9", prompt: con("Extremely dark moody close-up of bowling pins in deep shadow, single rim light on the edges, most of the frame near black, abstract") },
  { ruta: "/img/fondos/aceite.jpg", aspecto: "16:9", prompt: con("Abstract macro texture of oil on a bowling lane surface, subtle iridescence, very dark, no recognizable objects, wallpaper-like") },
];
