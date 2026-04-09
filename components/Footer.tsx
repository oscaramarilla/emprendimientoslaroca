import { cliente } from "@/lib/config/cliente";

export default function Footer() {
  return (
    <footer className="bg-primary text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; 2026 {cliente.marca}. Todos los derechos reservados.</p>
        <p>WhatsApp: {cliente.whatsapp}</p>
        <p>Email: {cliente.email}</p>
        <p>Horario: {cliente.horario}</p>
        <div className="flex justify-center space-x-4 mt-2">
          {cliente.redes.map((red) => (
            <a
              key={red.name}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ir a ${red.name}`}
              className="hover:text-accent"
            >
              {red.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
