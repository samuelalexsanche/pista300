import type { Metadata } from "next";
import { AccountDashboard } from "@/components/premium/account-dashboard";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Mi cuenta",
  descripcion: "Panel del socio: plan, series registradas e inscripciones.",
  ruta: "/cuenta",
  noIndexar: true,
});

export default function CuentaPage() {
  return <AccountDashboard />;
}
