import type { Metadata } from "next";
import { cliente } from "@/lib/config/cliente";
import GeneradorPresupuesto from "@/components/presupuesto/GeneradorPresupuesto";

export const metadata: Metadata = {
  title: `Generador de presupuestos | ${cliente.marca}`,
  description:
    "Armá tu presupuesto en minutos: elegí productos y servicios, y descargalo en PDF o envialo por WhatsApp.",
  alternates: { canonical: `${cliente.seo.baseUrl}/presupuesto` },
};

export default function PresupuestoPage() {
  return (
    <div className="container mx-auto p-4">
      <header className="no-print mb-10 text-center">
        <p className="mb-2 font-semibold text-slate-800">Presupuestos en minutos</p>
        <h1 className="text-4xl font-bold text-slate-900">Generador de presupuestos</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Cargá los productos y servicios, y el sistema arma el presupuesto numerado con totales,
          IVA incluido y fecha de validez. Lo descargás en PDF o lo enviás por WhatsApp al instante.
        </p>
      </header>

      <GeneradorPresupuesto />
    </div>
  );
}
