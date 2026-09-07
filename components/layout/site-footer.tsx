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
            {/* Los enlaces son de bloque con alto mínimo: como texto en línea
                medían 18px y quedaban por debajo del área táctil usable. */}
            <ul className="flex flex-col">
              {seccion.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground flex min-h-9 items-center text-sm transition-colors sm:min-h-0 sm:py-1"
                  >
                    {item.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-page flex flex-col gap-2 border-t py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>© {new Date().getFullYear()} {site.nombre}. Sitio de demostración construido por Mattera Systems.</span>
          {/* Enlaces de confianza: quién escribe y de dónde salen los datos.
              Que estén en el pie de todas las páginas es parte de la señal. */}
          <Link href="/acerca" className="hover:text-foreground underline underline-offset-2">
            Quiénes somos
          </Link>
          <Link href="/datos" className="hover:text-foreground underline underline-offset-2">
            Datos abiertos
          </Link>
        </p>
        <p className="text-muted-foreground">
          Datos, nombres y resultados son ficticios y sirven únicamente para mostrar el funcionamiento del sitio.
        </p>
      </div>
    </footer>
  );
}
