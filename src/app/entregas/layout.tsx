import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entregas a clientes",
  description: "Muebles EYK en los hogares de nuestros clientes. Reseñas y fotos de entregas reales.",
};

export default function EntregasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
