import { Metadata } from "next";

export const metadata: Metadata = {
  title: "A la medida",
  description:
    "Cotiza un mueble fabricado a la medida. Sala, comedor, cama o cualquier diseño de referencia.",
};

export default function ALaMedidaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
