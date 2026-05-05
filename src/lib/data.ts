export type CategoryId =
  | "salas"
  | "esquineros"
  | "sofa-camas"
  | "butacas"
  | "sofas-tantricos"
  | "camas"
  | "comedores"
  | "madera"
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
      "Comedores de 4 y 6 sillas, desayunadores de 4 bancos. Mesas en madera Pino, Laurel, Cedro o Cenízaro con sobres en vidrio o porcelanato.",
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
      "Mesas de noche, gaveteros, recibidores, cómodas, trasteros y bases. Madera Pino, Laurel, Cedro o Cenízaro.",
    customizable: "Medidas · Tono de madera",
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
    description: "Recibidores, gaveteros, mesas y cómodas.",
  },
];

// ── Telas disponibles ────────────────────────────────────────────────────────
export interface FabricOption {
  id: string;
  name: string;
  hex: string;      // color representativo para el swatch
  available: boolean;
}

export const FABRICS: FabricOption[] = [
  { id: "beige",        name: "Beige / Arena",     hex: "#d4bc98", available: true },
  { id: "gris-claro",   name: "Gris Claro",         hex: "#c8c8c8", available: true },
  { id: "gris-medio",   name: "Gris Medio",         hex: "#8a8a8a", available: true },
  { id: "gris-oscuro",  name: "Gris Oscuro",        hex: "#4a4a4a", available: true },
  { id: "negro",        name: "Negro",              hex: "#1a1a1a", available: true },
  { id: "blanco-hueso", name: "Blanco Hueso",       hex: "#f0ead8", available: true },
  { id: "cafe",         name: "Café / Chocolate",   hex: "#6b3f1e", available: true },
  { id: "camel",        name: "Camel / Mostaza",    hex: "#c8944a", available: true },
  { id: "azul-marino",  name: "Azul Marino",        hex: "#1e3a5f", available: true },
  { id: "verde-oliva",  name: "Verde Oliva",        hex: "#5c6b3a", available: true },
  { id: "vino",         name: "Vino / Burgundy",    hex: "#6b1a2a", available: true },
  { id: "terracota",    name: "Terracota",           hex: "#c4622d", available: true },
];

// ── Maderas disponibles ──────────────────────────────────────────────────────
export const WOOD_TYPES = ["Pino", "Laurel", "Cedro", "Cenízaro"] as const;
export type WoodType = (typeof WOOD_TYPES)[number];

// ── Contacto ─────────────────────────────────────────────────────────────────
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
