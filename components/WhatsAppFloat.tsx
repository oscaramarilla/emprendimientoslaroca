'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cliente } from "@/lib/config/cliente";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const message = encodeURIComponent(
    `Hola, quiero un presupuesto desde ${origin}${pathname}`
  );
  const href = `https://wa.me/${cliente.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-full bg-green-600 px-5 py-4 text-white shadow-2xl shadow-green-500/20 transition hover:bg-green-500"
      aria-label="Contactar por WhatsApp"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-green-600 font-bold">
        W
      </span>
      <span className="font-semibold">WhatsApp</span>
    </a>
  );
}
