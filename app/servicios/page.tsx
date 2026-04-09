import { cliente } from "@/lib/config/cliente";
import Link from "next/link";

function getServiceBenefit(servicio: string): string {
  const benefits: { [key: string]: string } = {
    "Venta de materiales eléctricos": "Materiales eléctricos de calidad para tus instalaciones, con asesoramiento experto y precios competitivos.",
    "Instalación y venta de cámaras de seguridad": "Protege tu hogar o negocio con sistemas de videovigilancia profesionales, instalados por expertos.",
    "Instalación y mantenimiento de aire acondicionado": "Mantén tu espacio fresco y cómodo con instalación y mantenimiento de aires acondicionados.",
    "Servicios de pintura en general": "Transforma tus espacios con pintura de calidad, interior y exterior, para un acabado profesional.",
    "Placas antihumedad": "Elimina la humedad y los malos olores con soluciones efectivas de placas antihumedad.",
    "Construcción e instalación de piscinas": "Disfruta de tu propio oasis con piscinas construidas a medida para tu patio.",
    "Cerca eléctrica perimetral": "Asegura tu propiedad con cercas eléctricas perimetrales, instalación segura y confiable.",
    "Colocación de Durlock (Tabiquería seca)": "Reformas rápidas y limpias con tabiquería en seco, ideal para dividir espacios o revestir paredes.",
    "Plomería": "Soluciones rápidas para todos tus problemas de plomería, desde reparaciones hasta instalaciones nuevas.",
    "Servicio integral para la construcción": "Gestiona tu proyecto completo con un equipo que se encarga de todo, desde el diseño hasta la finalización.",
  };
  return benefits[servicio] || "Solución confiable y rápida para tus necesidades.";
}

function getServiceMessage(servicio: string): string {
  const messages: { [key: string]: string } = {
    "Venta de materiales eléctricos": "Hola César, vengo de la web. Necesito cotizar materiales eléctricos.",
    "Instalación y venta de cámaras de seguridad": "Hola César, vengo de la web. Me interesa el servicio de cámaras de videovigilancia.",
    "Instalación y mantenimiento de aire acondicionado": "Hola César, vengo de la web. Necesito un presupuesto para aire acondicionado.",
    "Servicios de pintura en general": "Hola César, vengo de la web. Quiero cotizar un trabajo de pintura.",
    "Placas antihumedad": "Hola César, vengo de la web. Necesito solucionar un problema con placas antihumedad.",
    "Construcción e instalación de piscinas": "Hola César, vengo de la web. Me gustaría cotizar la construcción de una piscina.",
    "Cerca eléctrica perimetral": "Hola César, vengo de la web. Quiero cotizar la instalación de cerca eléctrica.",
    "Colocación de Durlock (Tabiquería seca)": "Hola César, vengo de la web. Necesito cotizar un trabajo en Durlock.",
    "Plomería": "Hola César, vengo de la web. Necesito un plomero.",
    "Servicio integral para la construcción": "Hola César, vengo de la web. Necesito cotizar una obra o refacción general.",
  };
  return messages[servicio] || "Hola César, vengo de la web. Me gustaría hacer una consulta.";
}

export default function Servicios() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-10 text-center">
        <p className="text-accent font-semibold mb-2">Servicios con impacto real</p>
        <h1 className="text-4xl font-bold">Beneficios claros para tu hogar, comercio y obra</h1>
        <p className="max-w-2xl mx-auto mt-4 text-slate-700">
          Más que descripción técnica: te contamos cómo cada servicio reduce tu tiempo de gestión y te da tranquilidad.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cliente.servicios.map((servicio) => (
          <article key={servicio} className="bg-white p-6 rounded-3xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{servicio}</h2>
            <p className="text-slate-700 mb-3">{getServiceBenefit(servicio)}</p>
            <p className="font-medium text-slate-900 mb-4">Beneficio: menos tiempo perdido y menos gastos inesperados.</p>
            <Link
              href={`https://wa.me/${cliente.whatsapp}?text=${encodeURIComponent(getServiceMessage(servicio))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              Cotizar por WhatsApp
            </Link>
          </article>
        ))}
      </div>

      <section className="mt-16 bg-gray-100 p-8 rounded-3xl shadow-sm">
        <h2 className="text-3xl font-bold mb-6">Casos de éxito</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="mb-4">&quot;Instalaron nuestro aire acondicionado en menos de 24 horas y ahora el local está fresco todo el día. El equipo llegó puntual y nos explicó cada paso.&quot;</p>
            <p className="text-sm font-semibold">Cliente de comercio local</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="mb-4">&quot;La reparación de la humedad en la pared quedó perfecta y el problema no volvió. Me encantó la limpieza y la rapidez del trabajo.&quot;</p>
            <p className="text-sm font-semibold">Cliente residencial en Asunción</p>
          </div>
        </div>
      </section>
    </div>
  );
}