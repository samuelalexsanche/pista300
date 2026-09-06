import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hueco de imagen del demo.
 *
 * No hay ni un solo binario en el proyecto: cada imagen es este bloque, que
 * muestra la ruta exacta que el código espera y las dimensiones sugeridas.
 * docs/IMAGENES.md tiene el prompt de IA para generar cada una.
 */
export function Placeholder({
  src,
  ratio = "16/9",
  etiqueta,
  className,
}: {
  src: string;
  ratio?: string;
  etiqueta?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("bg-surface pin-grid text-muted-foreground relative flex items-center justify-center overflow-hidden rounded-lg border border-dashed", className)}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={etiqueta ?? `Imagen pendiente: ${src}`}
    >
      <div className="flex flex-col items-center gap-1.5 px-4 text-center">
        <ImageIcon className="size-5 opacity-50" />
        {etiqueta && <span className="text-xs font-medium">{etiqueta}</span>}
        <code className="font-mono text-[10px] break-all opacity-70">{src}</code>
      </div>
    </div>
  );
}
