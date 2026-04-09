import { cliente } from "@/lib/config/cliente";

export default function Servicios() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Nuestros Servicios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cliente.servicios.map((servicio) => (
          <div key={servicio} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{servicio}</h2>
            <p>Descripción detallada del servicio de {servicio.toLowerCase()}.</p>
          </div>
        ))}
      </div>
    </div>
  );
}