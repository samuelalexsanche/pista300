import Link from "next/link";
import { CalendarDays, MapPin, Users, Trophy } from "lucide-react";
import type { Tournament } from "@/data/types";
import { formatoLabel } from "@/data/tournaments";
import { centerName } from "@/data/centers";
import { formatDateRange, formatMoney, daysUntil } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Placeholder } from "@/components/marketing/placeholder";
import { cn } from "@/lib/utils";

export function TournamentCard({ t, className }: { t: Tournament; className?: string }) {
  const dias = daysUntil(t.fechaInicio, new Date("2026-09-06"));
  const lleno = Math.round((t.inscritos.length / t.cupo) * 100);

  return (
    <Link
      href={`/conecta/torneos/${t.slug}`}
      className={cn(
        "group bg-card hover:border-primary/50 flex flex-col overflow-hidden rounded-xl border transition-colors",
        className
      )}
    >
      <div className="relative">
        <Placeholder src={t.imagen} ratio="16/9" className="rounded-none border-0 border-b border-dashed" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant={t.formato === "scratch" ? "default" : "secondary"}>{formatoLabel[t.formato]}</Badge>
          {t.destacado && <Badge variant="data">Destacado</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="group-hover:text-primary font-semibold tracking-tight transition-colors">{t.nombre}</h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{t.descripcion}</p>
        </div>
        <dl className="text-muted-foreground mt-auto grid gap-1.5 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-3.5 shrink-0" />
            <span className="tnum">{formatDateRange(t.fechaInicio, t.fechaFin)}</span>
            {dias > 0 && dias <= 45 && <span className="text-primary font-medium">· en {dias} días</span>}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0" />
            <span>
              {centerName(t.centroSlug)}, {t.ciudad}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="size-3.5 shrink-0" />
            <span className="tnum">
              {t.inscritos.length} de {t.cupo} lugares
            </span>
            <span className="bg-surface-2 relative h-1 w-14 overflow-hidden rounded-full">
              <span className="bg-primary absolute inset-y-0 left-0" style={{ width: `${Math.max(4, lleno)}%` }} />
            </span>
          </div>
        </dl>
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-sm font-medium">{formatMoney(t.cuota)}</span>
          {t.bolsaGarantizada > 0 && (
            <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
              <Trophy className="size-3.5" /> Bolsa {formatMoney(t.bolsaGarantizada)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
