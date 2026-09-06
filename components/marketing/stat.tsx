import { cn } from "@/lib/utils";

export function Stat({
  valor,
  etiqueta,
  detalle,
  tono = "neutral",
  className,
}: {
  valor: React.ReactNode;
  etiqueta: string;
  detalle?: string;
  tono?: "neutral" | "positive" | "negative" | "primary";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span
        className={cn(
          "font-mono text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl",
          tono === "positive" && "text-positive",
          tono === "negative" && "text-negative",
          tono === "primary" && "text-primary"
        )}
      >
        {valor}
      </span>
      <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{etiqueta}</span>
      {detalle && <span className="text-muted-foreground text-xs">{detalle}</span>}
    </div>
  );
}

export function StatStrip({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-2 gap-6 sm:grid-cols-4", className)}>{children}</div>;
}
