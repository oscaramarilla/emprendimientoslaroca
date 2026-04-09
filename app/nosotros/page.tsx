import { cliente } from "@/lib/config/cliente";

export default function Nosotros() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-10 text-center">
        <p className="text-accent font-semibold mb-2">Más de 5 años resolviendo obras y reparaciones</p>
        <h1 className="text-4xl font-bold">Quiénes somos</h1>
        <p className="max-w-2xl mx-auto mt-4 text-slate-700">
          Somos un equipo técnico que trabaja en hogar, comercio y obra para entregar soluciones rápidas, responsables y con garantía.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Nuestro enfoque</h2>
          <p className="text-slate-700">
            Nos enfocamos en resolver problemas reales: humedad, instalaciones eléctricas, seguridad y acabados que necesitan un cierre profesional.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Cómo trabajamos</h2>
          <p className="text-slate-700">
            Diagnóstico rápido, presupuesto transparente y ejecución ordenada con comunicación constante desde el primer contacto.
          </p>
        </div>
      </div>

      <section className="mt-12 rounded-3xl bg-gray-100 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Nuestro compromiso</h2>
        <p className="text-slate-700">
          Respetamos tus tiempos, cuidamos tus espacios y garantizamos el trabajo realizado. La satisfacción del cliente es nuestra prioridad.
        </p>
      </section>
    </div>
  );
}
