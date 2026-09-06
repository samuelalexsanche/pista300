import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site, siteUrl, coloresMeta } from "@/data/site";
import { urlAbsoluta } from "@/lib/seo";
import { grafo, organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { MembershipProvider } from "@/providers/membership-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

// Si Google Fonts no está disponible en la red donde se compila, next/font cae
// a estas pilas del sistema y el sitio sigue viéndose correcto.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  // Sin metadataBase, toda URL relativa de Open Graph se rompe en redes sociales.
  metadataBase: new URL(siteUrl),
  title: { default: `${site.nombre} — ${site.tagline}`, template: `%s · ${site.nombre}` },
  description: site.descripcion,
  applicationName: site.nombre,
  category: "sports",
  alternates: { canonical: urlAbsoluta("/") },
  authors: [{ name: site.nombre, url: siteUrl }],
  creator: site.nombre,
  publisher: site.nombre,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Sin límite de fragmento ni de vista previa: es lo que permite que el
      // sitio se cite completo en AI Overviews en vez de con un extracto corto.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: urlAbsoluta("/"),
    siteName: site.nombre,
    locale: "es_MX",
    title: `${site.nombre} — ${site.tagline}`,
    description: site.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nombre} — ${site.tagline}`,
    description: site.descripcion,
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  // El color de la barra del navegador sigue al tema. Los valores vienen de
  // `coloresMeta` porque el navegador los necesita antes de que exista el CSS.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: coloresMeta.claro },
    { media: "(prefers-color-scheme: dark)", color: coloresMeta.oscuro },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <head>
        {/* Identidad del sitio: se declara una sola vez y el resto de las
            páginas referencia estos nodos por @id en vez de repetirlos. */}
        <JsonLd data={grafo(organizationSchema(), websiteSchema())} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MembershipProvider>
            <a href="#contenido" className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-3 focus:py-2 focus:text-sm">
              Saltar al contenido
            </a>
            <SiteHeader />
            <main id="contenido">{children}</main>
            <SiteFooter />
          </MembershipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
