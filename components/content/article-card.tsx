import Link from "next/link";
import { Clock } from "lucide-react";
import type { Article } from "@/data/types";
import { categoriaLabel } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Foto } from "@/components/marketing/foto";
import { PremiumBadgeLock } from "@/components/premium/premium-gate";
import { cn } from "@/lib/utils";

export function ArticleCard({ a, className, destacado = false }: { a: Article; className?: string; destacado?: boolean }) {
  return (
    <Link
      href={`/aprende/${a.slug}`}
      className={cn("group bg-card hover:border-primary/50 flex flex-col overflow-hidden rounded-xl border transition-colors", className)}
    >
      <Foto src={a.imagen} alt={a.titulo} ratio={destacado ? "21/9" : "16/9"} className="rounded-none" />
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{categoriaLabel[a.categoria]}</Badge>
          {a.premium && <PremiumBadgeLock />}
        </div>
        <h3 className={cn("group-hover:text-primary font-semibold tracking-tight text-balance transition-colors", destacado ? "text-xl" : "text-[15px]")}>
          {a.titulo}
        </h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">{a.resumen}</p>
        <div className="text-muted-foreground mt-auto flex items-center gap-3 pt-2 text-xs">
          <span>{a.autor}</span>
          <span aria-hidden>·</span>
          <span className="tnum">{formatDate(a.fecha)}</span>
          <span className="ml-auto inline-flex items-center gap-1">
            <Clock className="size-3" /> {a.minutos} min
          </span>
        </div>
      </div>
    </Link>
  );
}
