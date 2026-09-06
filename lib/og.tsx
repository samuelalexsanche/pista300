import { ImageResponse } from "next/og";
import { site, coloresMeta } from "@/data/site";

/**
 * Plantilla común de las imágenes Open Graph.
 *
 * Se generan en tiempo de build, no son binarios versionados: el proyecto sigue
 * sin imágenes commiteadas (regla 6). El motivo del triángulo de 10 pinos se
 * dibuja aquí a mano porque `ImageResponse` no puede importar componentes con
 * CSS ni leer variables de `globals.css`; por eso los colores vienen de
 * `coloresMeta`, que es copia declarada de los tokens.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Triángulo de 10 pinos, en cuatro filas, como marca de agua. */
function pinos(color: string) {
  const filas = [4, 3, 2, 1];
  const r = 26;
  const sep = 66;
  return filas.flatMap((cantidad, fila) =>
    Array.from({ length: cantidad }, (_, i) => {
      const anchoFila = (cantidad - 1) * sep;
      return (
        <div
          key={`${fila}-${i}`}
          style={{
            position: "absolute",
            left: 640 + i * sep - anchoFila / 2 + fila * 0,
            top: 150 + fila * sep,
            width: r * 2,
            height: r * 2,
            borderRadius: r,
            background: color,
          }}
        />
      );
    })
  );
}

type Datos = {
  /** Etiqueta corta de sección: "Torneo", "Jugador", "Artículo". */
  etiqueta?: string;
  titulo: string;
  bajada?: string;
  /** Cifras destacadas. Van en mono, como en todo el sitio. */
  metricas?: { valor: string; etiqueta: string }[];
};

export function imagenOg({ etiqueta, titulo, bajada, metricas = [] }: Datos) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: coloresMeta.claro,
          padding: 64,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Marca de agua del triángulo, a la derecha y muy tenue. */}
        <div style={{ position: "absolute", right: -40, top: 40, display: "flex", opacity: 0.07 }}>
          {pinos(coloresMeta.oscuro)}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 42, background: coloresMeta.marca, borderRadius: 4, display: "flex" }} />
          <div style={{ fontSize: 34, fontWeight: 700, color: coloresMeta.oscuro, letterSpacing: -0.5 }}>{site.nombre}</div>
          {etiqueta ? (
            <div
              style={{
                marginLeft: 8,
                padding: "6px 14px",
                borderRadius: 999,
                background: coloresMeta.superficie,
                border: `1px solid ${coloresMeta.borde}`,
                color: coloresMeta.tenue,
                fontSize: 22,
                display: "flex",
              }}
            >
              {etiqueta}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
          <div style={{ fontSize: titulo.length > 48 ? 62 : 76, fontWeight: 700, color: coloresMeta.oscuro, lineHeight: 1.05, letterSpacing: -2 }}>
            {titulo}
          </div>
          {bajada ? (
            <div style={{ fontSize: 30, color: coloresMeta.tenue, lineHeight: 1.35 }}>{bajada}</div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 48 }}>
            {metricas.map((m) => (
              <div key={m.etiqueta} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontSize: 52, fontWeight: 700, color: coloresMeta.oscuro, fontFamily: "monospace" }}>{m.valor}</div>
                <div style={{ fontSize: 22, color: coloresMeta.tenue, textTransform: "uppercase", letterSpacing: 1 }}>{m.etiqueta}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, color: coloresMeta.tenue, display: "flex" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
