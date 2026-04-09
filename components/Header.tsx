import Link from "next/link";
import { cliente } from "@/lib/config/cliente";

export default function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          {cliente.marca}
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {cliente.navegacion.map((item) => (
              <li key={item}>
                <Link
                  href={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-accent"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}