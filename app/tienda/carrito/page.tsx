import type { Metadata } from "next";
import { cliente } from "@/lib/config/cliente";
import Carrito from "@/components/tienda/Carrito";

export const metadata: Metadata = {
  title: `Mi pedido | ${cliente.tienda.titulo}`,
  description: "Revisá los equipos seleccionados y envianos tu pedido en un toque.",
  robots: { index: false },
};

export default function CarritoPage() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-10 text-center">
        <p className="mb-2 font-semibold text-slate-800">Un paso más</p>
        <h1 className="text-4xl font-bold text-slate-900">Mi pedido</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Revisá las cantidades y envianos el pedido por WhatsApp. Te respondemos con la
          disponibilidad y el precio final el mismo día.
        </p>
      </header>

      <Carrito />
    </div>
  );
}
