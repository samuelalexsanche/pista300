"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Wrench, LogIn, User2, Sparkles } from "lucide-react";
import { nav } from "@/data/site";
import { useMembership } from "@/providers/membership-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { PlanToggle } from "@/components/premium/plan-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { esPremium, sesionIniciada, usuario, iniciarSesion } = useMembership();
  const [abierto, setAbierto] = React.useState(false);
  const [hub, setHub] = React.useState<string | null>(null);

  React.useEffect(() => {
    setAbierto(false);
    setHub(null);
  }, [pathname]);

  return (
    <header className="bg-background/85 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="container-page flex h-14 items-center gap-3">
        <Logo />

        {/* Navegación de los tres hubs del diagrama: Aprende / Mejora / Conecta.
            Desde lg: por debajo no cabe junto al bloque derecho y se usa el
            desplegable, que lleva los mismos enlaces. */}
        <nav className="hidden lg:flex" onMouseLeave={() => setHub(null)}>
          <ul className="flex items-center">
            {nav.map((seccion) => {
              const activo = pathname.startsWith(seccion.href);
              return (
                <li key={seccion.slug} onMouseEnter={() => setHub(seccion.slug)} className="relative">
                  <Link
                    href={seccion.href}
                    className={cn(
                      "flex h-14 items-center px-3 text-sm font-medium transition-colors",
                      activo ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {seccion.titulo}
                    {activo && <span className="bg-primary absolute inset-x-3 bottom-0 h-0.5 rounded-full" />}
                  </Link>
                  {hub === seccion.slug && (
                    <div className="bg-popover animate-rise absolute top-full left-0 z-50 w-72 rounded-xl border p-2 shadow-lg">
                      <p className="text-muted-foreground px-2 pt-1 pb-2 text-xs leading-relaxed">{seccion.descripcion}</p>
                      <ul>
                        {seccion.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className="hover:bg-surface block rounded-md px-2 py-1.5 text-sm">
                              {item.titulo}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
            <li>
              <Link
                href="/herramientas"
                className={cn(
                  "flex h-14 items-center gap-1.5 px-3 text-sm font-medium transition-colors",
                  pathname.startsWith("/herramientas") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Wrench className="size-4" /> Herramientas
              </Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <PlanToggle className="hidden sm:inline-flex" />
          <ThemeToggle />
          {sesionIniciada ? (
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href="/cuenta">
                <User2 /> {usuario?.nombre.split(" ")[0]}
                {esPremium && <Badge variant="default" className="ml-1">Pro</Badge>}
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={iniciarSesion} className="hidden sm:inline-flex">
              <LogIn /> Entrar
            </Button>
          )}
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link href="/premium">
              <Sparkles /> Hazte Premium
            </Link>
          </Button>

          <Sheet open={abierto} onOpenChange={setAbierto}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menú">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Menú</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-5 px-5 pb-8">
                {nav.map((seccion) => (
                  <div key={seccion.slug}>
                    <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">{seccion.titulo}</p>
                    <ul className="flex flex-col gap-1">
                      {seccion.items.map((item) => (
                        <li key={item.href}>
                          <SheetClose asChild>
                            <Link href={item.href} className="hover:bg-surface -mx-2 block rounded-md px-2 py-1.5 text-sm">
                              {item.titulo}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">Premium</p>
                  <ul className="flex flex-col gap-1">
                    {[
                      { titulo: "Herramientas", href: "/herramientas" },
                      { titulo: "Planes", href: "/premium" },
                      { titulo: "Mi cuenta", href: "/cuenta" },
                    ].map((item) => (
                      <li key={item.href}>
                        <SheetClose asChild>
                          <Link href={item.href} className="hover:bg-surface -mx-2 block rounded-md px-2 py-1.5 text-sm">
                            {item.titulo}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </div>
                <PlanToggle />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
