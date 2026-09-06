#!/usr/bin/env bash
# Comprime las imágenes generadas para que el sitio siga siendo rápido.
#
# Kie AI devuelve JPEG de ~1.3 MB. Sesenta y cuatro de esos son ~75 MB, que en
# un export estático (sin el optimizador de Next) se sirven tal cual: se cargaría
# el LCP y se tiraría a la basura el trabajo de SEO. Aquí se reescalan al ancho
# que el diseño realmente usa y se bajan de calidad a 72, que en fotografía
# editorial no se distingue a simple vista.
#
# Sin arrays asociativos a propósito: macOS trae bash 3.2, que no los soporta.
#
#   bash scripts/comprimir-imagenes.sh

set -euo pipefail
cd "$(dirname "$0")/.."

# "categoría:ancho" — ancho máximo según el tamaño real de presentación, x2 para
# pantallas retina. Nada se sirve más grande de lo que se ve.
CATEGORIAS="torneos:1600 articulos:1600 bolas:800 centros:1200 equipos:1200 tecnicas:1200 fondos:1600"
CALIDAD=60

total_antes=0
total_despues=0

for par in $CATEGORIAS; do
  categoria="${par%%:*}"
  ancho="${par##*:}"
  dir="public/img/$categoria"
  [ -d "$dir" ] || continue

  for archivo in "$dir"/*.jpg; do
    [ -e "$archivo" ] || continue
    antes=$(stat -f%z "$archivo")
    # -Z encaja la imagen dentro del cuadro sin ampliarla nunca; sin
    # "-s format jpeg" sips reencoda a su calidad por omisión y el archivo
    # termina PESANDO MÁS que el original.
    sips -Z "$ancho" -s format jpeg -s formatOptions "$CALIDAD" \
         "$archivo" --out "$archivo" >/dev/null 2>&1
    despues=$(stat -f%z "$archivo")
    total_antes=$((total_antes + antes))
    total_despues=$((total_despues + despues))
    printf "  %-44s %5d KB → %4d KB\n" "${archivo#public}" $((antes / 1024)) $((despues / 1024))
  done
done

if [ "$total_antes" -gt 0 ]; then
  printf "\nTotal: %d KB → %d KB (%d%% menos)\n" \
    $((total_antes / 1024)) $((total_despues / 1024)) \
    $((100 - total_despues * 100 / total_antes))
fi
