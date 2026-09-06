import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, ClipboardList, Droplets, Target } from "lucide-react";
import { PageHeader } from "@/components/marketing/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PremiumBadgeLock } from "@/components/premium/premium-gate";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Herramientas",
  descripcion: "Calculadora de promedio, anotador con análisis, guía de repuestos y banco de patrones de aceite.",
  ruta: "/herramientas",
  keywords: ["herramientas de boliche", "calculadora de boliche"],
});

const herramientas = [
  {
    href: "/herramientas/promedio",
    titulo: "Promedio y hándicap",
    detalle: "Captura tus juegos y obtén el promedio truncado y el hándicap con la fórmula de tu liga.",
    Icon: Calculator,
    premium: false,
  },
  {
    href: "/herramientas/anotador",
    titulo: "Anotador y análisis",
    detalle: "Marcador frame a frame con puntuación real y diagnóstico de strikes, repuestos y pinos perdidos.",
    Icon: ClipboardList,
    premium: true,
  },
  {
    href: "/herramientas/repuestos",
    titulo: "Guía de repuestos",
    detalle: "Diagrama interactivo: elige lo que quedó en pie y te dice dónde pararte y a dónde apuntar.",
    Icon: Target,
    premium: true,
  },
  {
    href: "/herramientas/patrones",
    titulo: "Banco de patrones",
    detalle: "Perfil de volumen, ratio y línea sugerida de los patrones de casa, sport y campeonato.",
    Icon: Droplets,
    premium: true,
  },
];

export default function HerramientasPage() {
  return (
    <>
      <PageHeader
        etiqueta="Análisis"
        titulo="Herramientas"
        descripcion="Cuatro herramientas construidas para el boliche real. Una es abierta; las otras tres vienen con la membresía Premium."
      >
        <p className="text-muted-foreground text-sm">
          Estás en el demo: usa el interruptor <strong className="text-foreground">Free / Premium</strong> del encabezado para ver cómo cambia el
          acceso en vivo.
        </p>
      </PageHeader>
      <div className="container-page grid gap-4 py-10 md:grid-cols-2">
        {herramientas.map(({ href, titulo, detalle, Icon, premium }) => (
          <Link key={href} href={href} className="group">
            <Card className="hover:border-primary/50 h-full transition-colors">
              <CardContent className="flex h-full flex-col gap-3 p-6">
                <div className="flex items-start justify-between">
                  <Icon className="text-primary size-6" />
                  {premium ? <PremiumBadgeLock /> : <Badge variant="positive">Gratis</Badge>}
                </div>
                <h2 className="group-hover:text-primary text-lg font-semibold transition-colors">{titulo}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{detalle}</p>
                <span className="text-primary mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium">
                  Abrir <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
