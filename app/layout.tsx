import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cliente } from "@/lib/config/cliente";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BotonWhatsApp from "@/components/BotonWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: cliente.seo.title,
  description: cliente.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{
        '--color-primary': cliente.colores.primary,
        '--color-accent': cliente.colores.accent,
        '--color-background': cliente.colores.background,
        '--color-foreground': cliente.colores.foreground,
      } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <BotonWhatsApp />
        <Footer />
      </body>
    </html>
  );
}
