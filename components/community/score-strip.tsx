import { scoreGame, rollSymbol, type Frame } from "@/lib/bowling";
import { cn } from "@/lib/utils";

/**
 * La hoja de anotación de 10 frames. Es el elemento gráfico recurrente del sitio
 * y también el que se usa dentro del anotador interactivo.
 */
export function ScoreStrip({ frames, compacto = false, className }: { frames: Frame[]; compacto?: boolean; className?: string }) {
  const resultado = scoreGame(frames);

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="flex min-w-fit rounded-lg border">
        {resultado.frames.map((frame, i) => {
          const esDecimo = i === 9;
          const tiros = esDecimo ? 3 : 2;
          return (
            <div key={i} className={cn("flex flex-col border-r last:border-r-0", esDecimo ? "min-w-[86px]" : "min-w-[58px]")}>
              <div className="text-muted-foreground border-b px-1 py-0.5 text-center font-mono text-[10px]">{i + 1}</div>
              <div className="flex h-7 border-b">
                {Array.from({ length: tiros }).map((_, r) => (
                  <div
                    key={r}
                    className={cn(
                      "flex flex-1 items-center justify-center border-r font-mono text-xs font-semibold last:border-r-0",
                      frame.type === "strike" && r === 0 && !esDecimo && "text-primary"
                    )}
                  >
                    {rollSymbol(frame.rolls, r, esDecimo)}
                  </div>
                ))}
              </div>
              <div className={cn("flex items-center justify-center font-mono font-semibold tabular-nums", compacto ? "h-7 text-xs" : "h-9 text-sm")}>
                {frame.cumulative ?? ""}
              </div>
            </div>
          );
        })}
        <div className="bg-surface flex min-w-[62px] flex-col justify-center px-2 text-center">
          <span className="text-muted-foreground text-[10px] tracking-wide uppercase">Total</span>
          <span className="font-mono text-lg font-semibold tabular-nums">{resultado.total}</span>
        </div>
      </div>
    </div>
  );
}
