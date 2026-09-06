import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PinTriangle } from "@/components/marketing/pin-triangle";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center gap-5 py-32 text-center">
      <PinTriangle className="text-primary w-24 opacity-40" />
      <p className="font-mono text-5xl font-semibold">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Canal.</h1>
      <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
        Esta página no existe o cambió de lugar. Vuelve al inicio y toma la línea otra vez.
      </p>
      <Button asChild>
        <Link href="/">Ir al inicio</Link>
      </Button>
    </div>
  );
}
