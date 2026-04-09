import { cliente } from "@/lib/config/cliente";

function getServiceDescription(servicio: string): string {
  const descriptions: { [key: string]: string } = {
    "Climatización": "Instalación, mantenimiento y reparación de aires acondicionados, calefacción y ventilación.",
    "Terminaciones y protección": "Pintura, placas antihumedad, durlock y acabados para hogares y comercios.",
    "Seguridad y electricidad": "Instalación de cercas, cámaras de seguridad, materiales eléctricos y sistemas de protección.",
    "Obras especiales": "Construcción e instalación de piscinas, reformas y proyectos personalizados.",
  };
  return descriptions[servicio] || "Descripción no disponible.";
}

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">{cliente.marca}</h1>
        <p className="text-xl mb-8">{cliente.tagline}. Respuesta rápida por WhatsApp.</p>
        <a
          href={`https://wa.me/${cliente.whatsapp}`}
          className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-80"
        >
          Pedí presupuesto hoy
        </a>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cliente.servicios.map((servicio) => (
            <div key={servicio} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{servicio}</h3>
              <p>{getServiceDescription(servicio)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Por qué elegir LA ROCA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Atención rápida</h3>
            <p>Respuesta inmediata a consultas y presupuestos por WhatsApp.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Soluciones integrales</h3>
            <p>Servicios completos para hogar, comercio y obra en Paraguay.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Profesionalismo</h3>
            <p>Trabajos realizados con calidad y garantía.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Horarios flexibles</h3>
            <p>Disponibles de lunes a sábado para atender tus necesidades.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Contacto</h2>
        <div className="text-center">
          <p className="mb-2">WhatsApp: {cliente.whatsapp}</p>
          <p className="mb-2">Email: {cliente.email}</p>
          <p className="mb-2">Horario: {cliente.horario}</p>
        </div>
      </section>
    </div>
  );
}
