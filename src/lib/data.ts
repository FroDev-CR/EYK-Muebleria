/**
 * Catálogo EYK Mueblería — modelo de datos.
 * Las categorías se mapean al PDF original (20 páginas).
 */

export type CategoryId =
  | "salas"
  | "esquineros"
  | "sofa-camas"
  | "butacas"
  | "sofas-tantricos"
  | "camas"
  | "comedores"
  | "madera"
  | "coquetas"
  | "camillas";

export type CategoryGroup = "salas" | "comedores" | "camas" | "madera" | "otros";

export interface Category {
  id: CategoryId;
  group: CategoryGroup;
  label: string;
  short: string;
  description: string;
  customizable: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "salas",
    group: "salas",
    label: "Sofás · Sofá Diván",
    short: "Salas",
    description:
      "Sofás de tres, dos y una plaza, con o sin diván. Personaliza medidas, tela, color y posición del diván.",
    customizable: "Medidas · Tela · Color · Posición de diván",
  },
  {
    id: "esquineros",
    group: "salas",
    label: "Esquineros",
    short: "Esquineros",
    description:
      "Esquinas modulares con porta vasos, brazo revistero, brazo con gaveta, repisa de esquina y más detalles en madera.",
    customizable: "Tela · Color · Tono de madera · Detalles",
  },
  {
    id: "sofa-camas",
    group: "salas",
    label: "Sofá Camas",
    short: "Sofá camas",
    description:
      "Sofá camas matrimoniales, divanes con baúl y respaldares reclinables. Para salas que también descansan.",
    customizable: "Medidas · Tela · Color · Posición de diván",
  },
  {
    id: "butacas",
    group: "salas",
    label: "Butacas · Ottoman",
    short: "Butacas",
    description:
      "Butacas individuales, mecedoras, capitoneadas, princesa y ottomans para complementar la sala.",
    customizable: "Tela · Color · Tono de madera",
  },
  {
    id: "sofas-tantricos",
    group: "salas",
    label: "Sofás Tántricos",
    short: "Tántricos",
    description: "Piezas amplias y bajas para descanso prolongado.",
    customizable: "Tela · Color",
  },
  {
    id: "comedores",
    group: "comedores",
    label: "Comedores · Desayunadores",
    short: "Comedores",
    description:
      "Comedores de 4 y 6 sillas, desayunadores de 4 bancos, mesas en madera Pino, Laurel o Cenízaro con sobres en vidrio o porcelanato.",
    customizable: "Tono de madera · Tipo de sobre · Tela y color de silla",
  },
  {
    id: "camas",
    group: "camas",
    label: "Camas",
    short: "Camas",
    description:
      "Camas individuales, matrimoniales, queen y king. Camarotes, gavetas y combinaciones con escritorio. Cualquier diseño en cualquier medida.",
    customizable: "Medida · Tela · Color · Tono de madera",
  },
  {
    id: "madera",
    group: "madera",
    label: "Madera Varios",
    short: "Madera",
    description:
      "Mesas de noche, gaveteros, recibidores, cómodas, trasteros y bases. Madera Pino, Laurel o Cenízaro.",
    customizable: "Medidas · Tono de madera",
  },
  {
    id: "coquetas",
    group: "madera",
    label: "Coquetas · Vanity",
    short: "Coquetas",
    description: "Coquetas y vanities a la medida.",
    customizable: "Diseño de referencia",
  },
  {
    id: "camillas",
    group: "otros",
    label: "Camillas Lashista",
    short: "Camillas",
    description: "Camillas con base metálica o de madera para profesionales.",
    customizable: "Tela · Color",
  },
];

export const CATEGORY_GROUPS: { id: CategoryGroup; label: string; description: string }[] = [
  {
    id: "salas",
    label: "Salas",
    description: "Sofás, esquineros, sofá diván, sofá camas, butacas y ottomans.",
  },
  {
    id: "comedores",
    label: "Comedores",
    description: "Comedores y desayunadores en madera con sillas y bancos a juego.",
  },
  {
    id: "camas",
    label: "Camas",
    description: "Camas en cualquier medida, camarotes y combinaciones.",
  },
  {
    id: "madera",
    label: "Muebles en madera",
    description: "Recibidores, gaveteros, mesas, coquetas y cómodas.",
  },
];

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "50688887777",
  phone: process.env.NEXT_PUBLIC_PHONE || "+506 8888 7777",
  email: process.env.NEXT_PUBLIC_EMAIL || "ventas@eykmuebleria.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "eykmuebleria",
};

export function whatsappLink(message: string): string {
  const w = CONTACT.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${w}?text=${encodeURIComponent(message)}`;
}

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoriesInGroup(group: CategoryGroup): Category[] {
  return CATEGORIES.filter((c) => c.group === group);
}
