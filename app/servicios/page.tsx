import { cliente } from "@/lib/config/cliente";

function getServiceDescription(servicio: string): string {
  const descriptions: { [key: string]: string } = {
    "Climatización": "Ofrecemos instalación profesional de sistemas de climatización, incluyendo aires acondicionados split, centralizados y portátiles. Realizamos mantenimiento preventivo y correctivo, reparaciones urgentes y asesoramiento para elegir el equipo adecuado según tus necesidades energéticas y de confort. Trabajamos en hogares, oficinas y locales comerciales en toda el área metropolitana.",
    "Terminaciones y protección": "Especialistas en terminaciones interiores y exteriores: pintura de paredes, techos y fachadas, instalación de placas antihumedad, durlock, cielorrasos y revestimientos. Protegemos tu propiedad contra humedad, filtraciones y desgaste, utilizando materiales de calidad y técnicas profesionales para resultados duraderos.",
    "Seguridad y electricidad": "Instalamos sistemas de seguridad completos: cercas perimetrales, cámaras de vigilancia, alarmas y control de acceso. En electricidad, realizamos instalaciones nuevas, ampliaciones, reparaciones y mantenimiento de tableros, circuitos y equipos eléctricos. Cumplimos con todas las normativas de seguridad vigentes.",
    "Obras especiales": "Ejecutamos proyectos personalizados como construcción e instalación de piscinas, reformas integrales, ampliaciones y obras especiales. Contamos con equipo especializado para trabajos que requieren precisión y calidad, desde el diseño hasta la entrega final, adaptándonos a presupuestos y plazos.",
  };
  return descriptions[servicio] || "Descripción no disponible.";
}

export default function Servicios() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Nuestros Servicios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cliente.servicios.map((servicio) => (
          <div key={servicio} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{servicio}</h2>
            <p>{getServiceDescription(servicio)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}