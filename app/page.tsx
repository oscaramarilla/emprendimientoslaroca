import Image from "next/image";
import Link from "next/link";
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
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-950 text-white">
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 w-full h-full">
          <picture>
            <source media="(max-width: 600px)" srcSet="/images/construcciones.webp" type="image/webp" />
            <source media="(max-width: 1024px)" srcSet="/images/construcciones.webp" type="image/webp" />
            <img
              src="/images/construcciones.webp"
              alt="Proyectos La Roca Emprendimientos"
              className="object-cover w-full h-full"
            />
          </picture>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">
            Seguridad y Excelencia
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Construimos soluciones
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              que respalden tu futuro
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Deja de preocuparte por los detalles técnicos. Nosotros ejecutamos tu proyecto con precisión para que tú solo disfrutes de los resultados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/servicios"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
            >
              Ver Nuestros Servicios
            </Link>
            <a
              href={`https://wa.me/${cliente.whatsapp}?text=${encodeURIComponent(
                "Hola,%20vengo%20de%20la%20web%20y%20quiero%20una%20cotización"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white font-bold py-4 px-8 rounded-full transition-all"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-4 text-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Por qué los clientes VIP eligen La Roca</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ⏱️
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Entregas a Tiempo</h3>
              <p className="text-slate-600">Valoramos tu tiempo. Cumplimos los plazos acordados sin excusas ni demoras.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Calidad Garantizada</h3>
              <p className="text-slate-600">Utilizamos materiales de primera línea para asegurar que tu inversión dure años.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🤝
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Atención Personalizada</h3>
              <p className="text-slate-600">Te acompañamos en cada paso del proceso con comunicación clara y transparente.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-900 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">
            Respaldo y Garantía
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10">
            Elegidos por quienes exigen resultados
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-slate-700 pb-12 mb-12">
            <div className="text-center">
              <p className="text-4xl font-black text-blue-400 mb-2">+5</p>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Años de Experiencia</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-emerald-400 mb-2">100%</p>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Garantía en Obra</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-purple-400 mb-2">24h</p>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Respuesta a Cotizaciones</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-orange-400 mb-2">10+</p>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Servicios Integrados</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-slate-400 mb-6 font-medium">Trabajamos con insumos y tecnología de primeras marcas:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <img src="/logos/hikvision.svg" alt="Hikvision" className="h-12 object-contain" loading="lazy" />
              <img src="/logos/durlock.svg" alt="Durlock" className="h-12 object-contain" loading="lazy" />
              <img src="/logos/philips.svg" alt="Philips" className="h-12 object-contain" loading="lazy" />
              <img src="/logos/suvinil.svg" alt="Suvinil" className="h-12 object-contain" loading="lazy" />
              <img src="/logos/tigre.svg" alt="Tigre" className="h-12 object-contain" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
