import type { ReactNode } from "react";
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

function getServiceEmotionalBenefit(servicio: string): string {
  const emotionalBenefits: { [key: string]: string } = {
    "Venta de materiales eléctricos": "Eficiencia y seguridad en tus instalaciones",
    "Instalación y venta de cámaras de seguridad": "Tranquilidad y control total de tu propiedad",
    "Instalación y mantenimiento de aire acondicionado": "Confort y frescura rápida en cualquier momento",
    "Servicios de pintura en general": "Transformación y renovación de tus espacios",
    "Placas antihumedad": "Ambiente saludable y libre de humedad",
    "Construcción e instalación de piscinas": "Diversión y relax en tu propio oasis",
    "Cerca eléctrica perimetral": "Protección máxima y disuasión efectiva",
    "Colocación de Durlock (Tabiquería seca)": "Reformas rápidas y espacios optimizados",
    "Plomería": "Soluciones inmediatas y sin complicaciones",
    "Servicio integral para la construcción": "Proyecto completo sin preocupaciones",
  };
  return emotionalBenefits[servicio] || "Menos tiempo perdido y menos gastos inesperados.";
}

function getServiceIcon(servicio: string) {
  const icons: Record<string, ReactNode> = {
    "Venta de materiales eléctricos": (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
    "Instalación y venta de cámaras de seguridad": (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M16 6l3 4-3 4" />
        <circle cx="11" cy="12" r="2" />
      </svg>
    ),
    "Instalación y mantenimiento de aire acondicionado": (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M6 12h12" />
        <path d="M4 7h16M4 17h16" />
      </svg>
    ),
    "Servicios de pintura en general": (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 3l10 10-4 4-10-10 4-4z" />
        <path d="M16 8l3 3" />
      </svg>
    ),
    "Placas antihumedad": (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3l8 4v6a8 8 0 1 1-16 0V7l8-4z" />
        <path d="M9 12l3 3 5-5" />
      </svg>
    ),
    "Construcción e instalación de piscinas": (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 15h16M4 19h16" />
        <path d="M5 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      </svg>
    ),
    "Cerca eléctrica perimetral": (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6v12M10 6v12M16 6v12M22 6v12" />
        <path d="M2 9h20M2 15h20" />
      </svg>
    ),
    "Colocación de Durlock (Tabiquería seca)": (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16v16H4V4z" />
        <path d="M8 4v16M16 4v16M4 8h16M4 16h16" />
      </svg>
    ),
    "Plomería": (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 10v4a5 5 0 0 0 10 0v-4" />
        <path d="M7 10V7a5 5 0 0 1 10 0v3" />
        <path d="M8 10h8" />
      </svg>
    ),
    "Servicio integral para la construcción": (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 20h16V8L12 3 4 8v12z" />
        <path d="M9 12h6M9 16h6" />
      </svg>
    ),
  };
  return icons[servicio] || (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export default function Servicios() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-10 text-center">
        <p className="text-slate-800 font-semibold mb-2">Servicios con impacto real</p>
        <h1 className="text-4xl font-semibold text-slate-900">Beneficios claros para tu hogar, comercio y obra</h1>
        <p className="max-w-2xl mx-auto mt-4 text-slate-600">
          Más que descripción técnica: te contamos cómo cada servicio reduce tu tiempo de gestión y te da tranquilidad.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cliente.servicios.map((servicio) => (
          <article key={servicio} className="bg-white p-6 rounded-3xl shadow-md">
            <div className="mb-4 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-900">
                {getServiceIcon(servicio)}
              </span>
              <h2 className="text-2xl font-semibold text-slate-900">{servicio}</h2>
            </div>
            <p className="text-slate-700 mb-3">{getServiceBenefit(servicio)}</p>
            <p className="font-medium text-slate-800 mb-4">Beneficio: {getServiceEmotionalBenefit(servicio)}</p>
            <Link
              href={`https://wa.me/${cliente.whatsapp}?text=${encodeURIComponent(getServiceMessage(servicio))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-[#25D366]">
                <path fill="#25D366" d="M16.67 7.27c-.22-.12-1.3-.64-1.5-.71-.2-.08-.35-.11-.5.12-.14.22-.55.71-.67.86-.12.14-.23.16-.43.06-.2-.1-.85-.31-1.62-.98-.6-.53-.99-1.19-1.11-1.39-.12-.2-.01-.31.08-.42.08-.1.18-.24.27-.34.09-.1.12-.17.18-.28.06-.11.03-.2-.02-.28-.05-.09-.46-1.08-.63-1.48-.17-.39-.34-.34-.47-.35-.12-.01-.27-.01-.41-.01-.14 0-.34.05-.52.25-.17.2-.66.66-.66 1.61 0 .95.69 1.87.78 2.06.09.18 1.28 2.06 3.1 2.85.42.18.74.29 1 .37.42.14.8.12 1.1.08.34-.05 1.05-.44 1.2-.86.15-.42.15-.78.11-.86-.05-.08-.18-.13-.34-.22z"/>
                <path fill="#25D366" d="M12 2C6.48 2 2 6.48 2 12c0 1.86.5 3.6 1.36 5.11L2 22l4.94-1.3A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zM12 20c-1.73 0-3.35-.5-4.74-1.35l-.34-.2-2.94.77.78-2.86-.22-.37A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              Cotizar por WhatsApp
            </Link>
          </article>
        ))}
      </div>

      <section className="mt-16 bg-gray-100 p-8 rounded-3xl shadow-sm">
        <h2 className="text-3xl font-semibold text-slate-900 mb-6">Casos de éxito</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="mb-4 text-slate-700">&quot;Instalaron nuestro aire acondicionado en menos de 24 horas y ahora el local está fresco todo el día. El equipo llegó puntual y nos explicó cada paso.&quot;</p>
            <p className="text-sm font-semibold text-slate-900">Cliente de comercio local</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="mb-4 text-slate-700">&quot;La reparación de la humedad en la pared quedó perfecta y el problema no volvió. Me encantó la limpieza y la rapidez del trabajo.&quot;</p>
            <p className="text-sm font-semibold text-slate-900">Cliente residencial en Asunción</p>
          </div>
        </div>
      </section>
    </div>
  );
}