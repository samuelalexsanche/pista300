import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  etiqueta,
  titulo,
  descripcion,
  href,
  hrefLabel = "Ver todo",
  className,
}: {
  etiqueta?: string;
  titulo: string;
  descripcion?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-2xl">
        {etiqueta && <p className="text-primary mb-1.5 font-mono text-xs font-medium tracking-widest uppercase">{etiqueta}</p>}
        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{titulo}</h2>
        {descripcion && <p className="text-muted-foreground mt-2 text-[15px] leading-relaxed text-pretty">{descripcion}</p>}
      </div>
      {href && (
        <Link href={href} className="text-primary inline-flex shrink-0 items-center gap-1 text-sm font-medium hover:underline">
          {hrefLabel} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}

export function PageHeader({
  etiqueta,
  titulo,
  descripcion,
  children,
}: {
  etiqueta?: string;
  titulo: string;
  descripcion?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b">
      <div className="container-page py-10 sm:py-14">
        {etiqueta && <p className="text-primary mb-2 font-mono text-xs font-medium tracking-widest uppercase">{etiqueta}</p>}
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{titulo}</h1>
        {descripcion && <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-relaxed text-pretty">{descripcion}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
