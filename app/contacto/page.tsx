import { cliente } from "@/lib/config/cliente";

export default function Contacto() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-10 text-center">
        <p className="text-accent font-semibold mb-2">Listos para tu próximo proyecto</p>
        <h1 className="text-4xl font-bold">Contactanos</h1>
        <p className="max-w-2xl mx-auto mt-4 text-slate-700">
          Hacenos llegar tu consulta por WhatsApp o email y te damos un presupuesto rápido y sin compromiso.
        </p>
      </header>

      <div className="rounded-3xl bg-white p-8 shadow-md">
        <div className="space-y-4 text-slate-700">
          <p>
            <span className="font-semibold">WhatsApp:</span> {cliente.whatsapp}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {cliente.email}
          </p>
          <p>
            <span className="font-semibold">Horario:</span> {cliente.horario}
          </p>
        </div>
      </div>
    </div>
  );
}
