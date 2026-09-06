import { SearchX } from "lucide-react";

export function EmptyState({ titulo, descripcion }: { titulo: string; descripcion?: string }) {
  return (
    <div className="border-border flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-16 text-center">
      <SearchX className="text-muted-foreground size-6" />
      <p className="font-medium">{titulo}</p>
      {descripcion && <p className="text-muted-foreground max-w-sm text-sm">{descripcion}</p>}
    </div>
  );
}
