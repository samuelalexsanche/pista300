import Link from "next/link";
import { nav, site } from "@/data/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-surface mt-20 border-t">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">{site.descripcion}</p>
          <p className="text-muted-foreground mt-4 text-xs">
            {site.ciudad} · {site.email}
          </p>
        </div>
        {nav.map((seccion) => (
          <div key={seccion.slug}>
            <p className="mb-3 text-sm font-semibold">{seccion.titulo}</p>
            <ul className="flex flex-col gap-2">
              {seccion.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {item.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-page flex flex-col gap-2 border-t py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} {site.nombre}. Sitio de demostración construido por Mattera Systems.
        </p>
        <p className="text-muted-foreground">
          Datos, nombres y resultados son ficticios y sirven únicamente para mostrar el funcionamiento del sitio.
        </p>
      </div>
    </footer>
  );
}
