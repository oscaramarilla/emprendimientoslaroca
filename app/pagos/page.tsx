"use client";

import { useState } from "react";
import { cliente } from "@/lib/config/cliente";

export default function Pagos() {
  const [copied, setCopied] = useState(false);
  const copyText = `Titular: CENTURION MENDEZ, CESAR DAVID\nN° de Cédula: 4225312\nN° de Cuenta: 81-25682`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-10 text-center">
        <p className="text-accent font-semibold mb-2">Pagos claros y confianza total</p>
        <h1 className="text-4xl font-bold">Pagá con seguridad y presupuesto sin sorpresas</h1>
        <p className="max-w-2xl mx-auto mt-4 text-slate-700">
          Presupuestos transparentes, métodos de pago confiables y una garantía de satisfacción para que tu inversión esté protegida.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Garantía de trabajo</h2>
          <p className="mb-4 text-slate-700">
            Todas las intervenciones se realizan con una garantía de satisfacción. Si algo no queda como acordamos, lo revisamos.
          </p>
          <ul className="list-disc list-inside space-y-3 text-slate-700">
            <li>Presupuesto claro y sin cláusulas ocultas.</li>
            <li>Entrega de comprobante y control de avance.</li>
            <li>Sin pagos completos por adelantado hasta que tu obra esté definida.</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Métodos de pago confiables</h2>
          <p className="mb-4 text-slate-700">
            Aceptamos formas de pago pensadas para que te resulte fácil y seguro cerrar el trabajo.
          </p>
          <div className="space-y-3 text-slate-700">
            <p>• Efectivo al finalizar el trabajo.</p>
            <p>• Transferencia bancaria o pago móvil.</p>
            <p>• Presupuestos con entrega de comprobante.</p>
          </div>
        </div>
      </div>

      <section className="mt-12 rounded-3xl bg-gray-100 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Protegemos tu inversión</h2>
        <p className="text-slate-700 mb-4">
          No te quedes con dudas: el trabajo comienza solo cuando confirmamos el alcance y acordamos el precio.
        </p>
        <p className="font-medium">Beneficios:</p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-slate-700">
          <li>Claridad en los materiales y mano de obra.</li>
          <li>Comunicación constante durante el proyecto.</li>
          <li>Entrega puntual y resultados verificables.</li>
        </ul>
      </section>

      <section className="mt-12 rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Pago por transferencia</h2>
        <p className="text-slate-700 mb-4">
          Copiá y pegá fácilmente estos datos desde tu celular para hacer la transferencia sin errores.
        </p>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 mb-4">
          <div className="flex flex-col gap-3 text-slate-800">
            <div>
              <p className="text-sm text-slate-500">Titular</p>
              <p className="font-semibold">CENTURION MENDEZ, CESAR DAVID</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">N° de Cédula</p>
              <p className="font-semibold">4225312</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">N° de Cuenta</p>
              <p className="font-semibold">81-25682</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {copied ? "Datos copiados" : "Copiar datos de pago"}
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-slate-700 mb-3">Condiciones de factura:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>Factura al contado con descuento para pagos inmediatos.</li>
            <li>Factura a crédito según el presupuesto y acuerdo previo.</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-slate-950 p-8 text-white shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Contacto para pagar y cerrar</h2>
        <p className="text-slate-300 mb-4">Escribinos por WhatsApp o enviá un correo para recibir tu presupuesto definitivo y coordinar factura.</p>
        <p className="font-semibold">WhatsApp: {cliente.whatsapp}</p>
        <p>Email: {cliente.email}</p>
      </section>
    </div>
  );
}
