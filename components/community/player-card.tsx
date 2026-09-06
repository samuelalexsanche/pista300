import Link from "next/link";
import type { Player } from "@/data/types";
import { playerStats } from "@/data/players";
import { teamName } from "@/data/teams";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function PlayerCard({ p, posicion, className }: { p: Player; posicion?: number; className?: string }) {
  const stats = playerStats(p);
  return (
    <Link
      href={`/conecta/jugadores/${p.slug}`}
      className={cn("group bg-card hover:border-primary/50 flex items-center gap-3 rounded-xl border p-3 transition-colors", className)}
    >
      {posicion !== undefined && (
        <span className="text-muted-foreground w-6 shrink-0 text-center font-mono text-sm font-semibold tabular-nums">{posicion}</span>
      )}
      <Avatar>
        <AvatarFallback>{iniciales(p.nombre)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="group-hover:text-primary truncate text-sm font-medium transition-colors">{p.nombre}</p>
        <p className="text-muted-foreground truncate text-xs">
          {teamName(p.equipoSlug)} · {p.ciudad}
        </p>
      </div>
      <div className="text-right">
        <p className="font-mono text-lg font-semibold tabular-nums">{stats.promedio}</p>
        <p className="text-muted-foreground text-[10px] tracking-wide uppercase">Promedio</p>
      </div>
      {p.mano === "izquierda" && <Badge variant="outline">Zurda</Badge>}
    </Link>
  );
}
