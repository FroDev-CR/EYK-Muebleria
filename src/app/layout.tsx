import type { Metadata } from "next";
import { Spectral, Manrope } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-button";
import { LangProvider } from "@/contexts/lang-context";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EYK Mueblería · Muebles a la medida en Costa Rica",
    template: "%s · EYK Mueblería",
  },
  description:
    "Catálogo de salas, comedores, camas y muebles en madera fabricados a la medida. Personaliza medidas, telas, colores y acabados.",
  openGraph: {
    title: "EYK Mueblería · Muebles a la medida",
    description:
      "Salas, comedores, camas y muebles en madera fabricados a la medida.",
    type: "website",
    locale: "es_CR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spectral.variable} ${manrope.variable}`}>
      <body>
        <LangProvider>
          <Nav />
          <main id="contenido">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LangProvider>
      </body>
    </html>
  );
}
