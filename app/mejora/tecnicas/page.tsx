import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { techniques } from "@/data/techniques";
import { PageHeader } from "@/components/marketing/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PremiumBadgeLock } from "@/components/premium/premium-gate";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Técnicas",
  descripcion: "Fundamentos técnicos del boliche con pasos, errores comunes y drills.",
  ruta: "/mejora/tecnicas",
  keywords: ["técnica de boliche", "cómo tirar boliche"],
});

export default function TecnicasPage() {
  return (
    <>
      <PageHeader
        etiqueta="Mejora"
        titulo="Técnicas"
        descripcion="Cada ficha trae el movimiento explicado por pasos, el error que casi todos cometen y los drills para corregirlo."
      />
      <div className="container-page grid gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
        {techniques.map((t) => (
          <Link key={t.slug} href={`/mejora/tecnicas/${t.slug}`} className="group">
            <Card className="hover:border-primary/50 h-full transition-colors">
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="capitalize">{t.nivel}</Badge>
                  {t.premium && <PremiumBadgeLock />}
                </div>
                <h2 className="group-hover:text-primary font-semibold transition-colors">{t.nombre}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.resumen}</p>
                <p className="text-muted-foreground mt-auto inline-flex items-center gap-1.5 border-t pt-3 text-xs">
                  <Clock className="size-3" /> {t.minutos} min de práctica · {t.drills.length} drills
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
