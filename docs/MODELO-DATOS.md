# Modelo de datos — Pista300

Los tipos viven en `data/types.ts`. Esta es la traducción a tablas para cuando se conecte
un backend real (la propuesta es Supabase / Postgres).

## Entidades y relaciones

```
centers ──< leagues ──< teams ──< players
   │                      │         │
   └──< tournaments       │         └──< series ──< games
            │             │
            └── oil_patterns
                          
articles     techniques     training_plans     balls     spare_leaves     membership_plans
```

## Tablas propuestas

### `centers` — boliches
| Columna | Tipo | Nota |
|---|---|---|
| slug | text PK | |
| nombre, ciudad, estado, colonia, telefono | text | |
| lineas, ligas_activas | int | |
| pro_shop | bool | |
| servicios | text[] | |
| imagen | text | ruta o URL |

### `players` — jugadores
| Columna | Tipo | Nota |
|---|---|---|
| slug | text PK | |
| user_id | uuid FK → auth.users | null si el perfil no está reclamado |
| nombre, apodo, ciudad | text | |
| centro_slug | text FK → centers | |
| equipo_slug | text FK → teams | nullable |
| mano | enum('derecha','izquierda') | |
| desde_anio | int | |
| nivel | enum('principiante','intermedio','avanzado','competitivo') | |
| bola_slug | text FK → balls | nullable |

El promedio, el hándicap, el mejor juego y la mejor serie **no se guardan**: se calculan
desde `series` con `lib/bowling.ts`. Guardarlos duplicados es la forma más rápida de que
el ranking y el perfil dejen de coincidir.

### `series` y `games`
| `series` | Tipo |
|---|---|
| id | uuid PK |
| player_slug | text FK |
| fecha | date |
| centro_slug | text FK |
| liga_slug | text FK, nullable |

| `games` | Tipo |
|---|---|
| id | uuid PK |
| serie_id | uuid FK |
| orden | int (1–3) |
| score | int |
| frames | jsonb — opcional, los tiros capturados en el anotador |

Guardar `frames` es lo que permite el análisis por tiro (porcentaje de strikes, primer
tiro promedio) además del score final. El anotador ya produce esa estructura.

### `teams`
slug PK · nombre · centro_slug FK · liga_slug FK · capitan_slug FK → players · fundado int ·
ganados int · perdidos int · colores text[2] · imagen

`team_members` (team_slug, player_slug) como tabla puente si un jugador puede estar en
varios equipos de distintas ligas — hoy el mock asume uno.

### `leagues`
slug PK · nombre · temporada · centro_slug FK · dia · hora · formato ·
handicap_base int · handicap_pct numeric · semanas int · semana_actual int

Los standings se derivan; si el volumen lo pide, materializarlos en `league_standings`
(liga, equipo, puntos, ganados, perdidos, pinfall, promedio) con un job semanal.

### `tournaments`
slug PK · nombre · centro_slug FK · ciudad · fecha_inicio · fecha_fin ·
formato enum('scratch','handicap','dobles','equipos','juvenil','senior') ·
patron_slug FK → oil_patterns · cuota int · bolsa_garantizada int · cupo int ·
descripcion · reglas text[] · premios jsonb · destacado bool · imagen

`tournament_registrations` (tournament_slug, player_slug, estado_pago, creado_en) para
las inscripciones — hoy el mock guarda solo un array de slugs.

### `articles`
slug PK · titulo · resumen · categoria enum · seccion enum('aprende','mejora') · autor ·
fecha · minutos int · **premium bool** · nivel enum · tags text[] · imagen ·
cuerpo jsonb (bloques `{tipo, texto?, items?}`)

El cuerpo por bloques evita meter un motor de markdown en el demo. Si se añade un CMS,
lo natural es pasar a MDX o a un campo `content` de Portable Text.

### `balls`
slug PK · marca · modelo · anio · cubierta · acabado · core · rg numeric ·
diferencial numeric · factor_gancho int · largo int · backend int ·
aceite enum('seco','medio','pesado') · precio int · calificacion numeric · resumen · imagen

### `oil_patterns`
slug PK · nombre · longitud int · volumen numeric · ratio text ·
dificultad enum('casa','sport','campeonato') · linea · descripcion · perfil numeric[39]

### `techniques`, `training_plans`, `spare_leaves`, `membership_plans`
Estructuras planas, todas con bandera `premium` donde aplica. Ver `data/types.ts`.

## Reglas de negocio que ya están implementadas en el código

1. **Promedio USBC**: suma de scores dividida entre juegos, **truncada** (no redondeada).
2. **Hándicap**: `floor((base − promedio) × pct)`, nunca negativo. Configurable por liga.
3. **Puntuación**: reglas completas de 10 frames con bonificación del décimo.
4. **Forma**: promedio de las últimas 5 series menos el promedio general.
5. **Descuento Premium**: 10% sobre la cuota de inscripción, aplicado en el diálogo de
   inscripción (`components/community/tournament-register.tsx`).
