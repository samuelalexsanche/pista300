import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { authorConDatos } from "@/data/authors";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { iniciales } from "@/components/community/player-card";

/**
 * Firma del artículo con la credencial del autor.
 *
 * La credencial no está escrita: se calcula del perfil del jugador. "Promedio
 * 217, 12 años jugando, Los Tapatíos" es comprobable en dos clics, y esa es
 * exactamente la diferencia entre experiencia declarada y experiencia
 * demostrable. Los motores generativos tratan la señal de autoría como filtro
 * de entrada, no como puntos extra.
 */
export function AuthorBio({ nombre }: { nombre: string }) {
  const autor = authorConDatos(nombre);

  // Un autor sin ficha sigue firmando, solo que sin credencial.
  if (!autor) return <span className="font-medium">{nombre}</span>;

  const perfil = autor.jugador ? `/conecta/jugadores/${autor.jugador.slug}` : null;

  return (
    <section className="bg-surface mt-12 rounded-xl border p-5">
      <div className="flex flex-wrap items-start gap-4">
        <Avatar className="size-11">
          <AvatarFallback>{iniciales(autor.nombre)}</AvatarFallback>
        </Avatar>

        <div className="min-w-56 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="font-semibold">
              {perfil ? (
                <Link href={perfil} className="hover:text-primary underline-offset-2 hover:underline">
                  {autor.nombre}
                </Link>
              ) : (
                autor.nombre
              )}
            </p>
            {autor.stats && (
              <p className="text-muted-foreground text-sm">
                promedio <span className="text-foreground font-mono font-semibold tabular-nums">{autor.stats.promedio}</span>
                {autor.anios ? (
                  <>
                    {" · "}
                    <span className="font-mono tabular-nums">{autor.anios}</span> años jugando
                  </>
                ) : null}
                {autor.equipo ? ` · ${autor.equipo.nombre}` : null}
              </p>
            )}
          </div>

          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{autor.credencial}</p>

          {autor.certificaciones?.length ? (
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {autor.certificaciones.map((c) => (
                <li key={c} className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <BadgeCheck className="text-primary size-3.5 shrink-0" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
