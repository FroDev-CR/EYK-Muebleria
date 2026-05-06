import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cómo contactar a EYK Mueblería: WhatsApp, teléfono, correo e Instagram.",
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
