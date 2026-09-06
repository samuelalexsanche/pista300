"use client";

import * as React from "react";
import { Check, Sparkles } from "lucide-react";
import { useMembership } from "@/providers/membership-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatMoney } from "@/lib/format";

/**
 * Inscripción simulada. En producción, el submit va al backend y a la pasarela
 * de pago; aquí solo cambia el estado local para demostrar el flujo completo.
 */
export function TournamentRegister({ nombre, cuota, lugares }: { nombre: string; cuota: number; lugares: number }) {
  const { esPremium, usuario } = useMembership();
  const [inscrito, setInscrito] = React.useState(false);
  const [abierto, setAbierto] = React.useState(false);

  const descuento = esPremium ? Math.round(cuota * 0.1) : 0;
  const total = cuota - descuento;

  if (inscrito) {
    return (
      <div className="mt-4 flex flex-col items-center gap-2 rounded-lg border border-dashed py-6 text-center">
        <span className="bg-positive/12 text-positive flex size-9 items-center justify-center rounded-full">
          <Check className="size-4" />
        </span>
        <p className="text-sm font-medium">Inscripción registrada</p>
        <p className="text-muted-foreground px-6 text-xs">Te llegará la confirmación con las instrucciones de pago. (Simulado en el demo.)</p>
      </div>
    );
  }

  return (
    <>
      {esPremium && (
        <p className="text-primary mt-4 flex items-center gap-1.5 text-xs font-medium">
          <Sparkles className="size-3.5" /> Tu 10% de descuento Premium ya está aplicado
        </p>
      )}
      <Dialog open={abierto} onOpenChange={setAbierto}>
        <DialogTrigger asChild>
          <Button className="mt-3 w-full" size="lg" disabled={lugares <= 0}>
            {lugares > 0 ? "Inscribirme" : "Cupo lleno"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inscripción a {nombre}</DialogTitle>
            <DialogDescription>Confirma tus datos. En el demo no se procesa ningún pago.</DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setInscrito(true);
              setAbierto(false);
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="reg-nombre">Nombre completo</Label>
              <Input id="reg-nombre" required defaultValue={usuario?.nombre ?? ""} placeholder="Tu nombre" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reg-email">Correo</Label>
              <Input id="reg-email" type="email" required defaultValue={usuario?.email ?? ""} placeholder="tu@correo.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reg-promedio">Promedio actual</Label>
              <Input id="reg-promedio" type="number" min={80} max={300} required placeholder="185" />
            </div>
            <dl className="bg-surface rounded-lg p-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Cuota</dt>
                <dd className="tnum">{formatMoney(cuota)}</dd>
              </div>
              {descuento > 0 && (
                <div className="text-positive flex justify-between">
                  <dt>Descuento Premium</dt>
                  <dd className="tnum">−{formatMoney(descuento)}</dd>
                </div>
              )}
              <div className="mt-2 flex justify-between border-t pt-2 font-medium">
                <dt>Total</dt>
                <dd className="tnum">{formatMoney(total)}</dd>
              </div>
            </dl>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Confirmar inscripción</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
