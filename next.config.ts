import type { NextConfig } from "next";

/**
 * El sitio se publica como export estático en GitHub Pages, que lo sirve bajo
 * un subdirectorio (/pista300). Ambas cosas se controlan con variables de
 * entorno para que en local siga corriendo en la raíz sin tocar el config.
 *
 * Para mover el sitio a su dominio definitivo: quitar NEXT_PUBLIC_BASE_PATH y
 * apuntar NEXT_PUBLIC_SITE_URL al dominio. Nada más cambia.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // GitHub Pages no reescribe rutas: sin la diagonal final, /aprende no
  // encuentra archivo. Con ella se genera aprende/index.html, que sí sirve.
  trailingSlash: true,
  // El export estático no puede correr el optimizador de imágenes de Next.
  images: { unoptimized: true },
};

export default nextConfig;
