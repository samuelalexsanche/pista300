/**
 * Inserta un bloque JSON-LD en la página.
 *
 * Es un Server Component: el schema queda en el HTML que recibe el crawler, sin
 * pasar por JavaScript. Eso importa — un motor generativo que no ejecuta JS
 * igual lo lee.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro y se serializa con JSON.stringify; se escapa "<"
      // para que un texto con HTML no pueda cerrar la etiqueta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
