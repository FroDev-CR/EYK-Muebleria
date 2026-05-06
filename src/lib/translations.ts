export type Lang = "es" | "en";

export const translations = {
  // ── Nav ──────────────────────────────────────────────────────────
  nav: {
    home:       { es: "Inicio",       en: "Home" },
    catalog:    { es: "Catálogo",     en: "Catalog" },
    deliveries: { es: "Entregas",     en: "Deliveries" },
    custom:     { es: "A la medida",  en: "Custom Order" },
    downloads:  { es: "Descargas",    en: "Downloads" },
    contact:    { es: "Contacto",     en: "Contact" },
  },

  // ── Home ─────────────────────────────────────────────────────────
  home: {
    eyebrow:      { es: "Fabricantes nacionales · A la medida", en: "National manufacturers · Made to order" },
    hero_h1a:     { es: "Muebles que se sienten",               en: "Furniture that feels" },
    hero_h1b:     { es: "como tu casa",                         en: "like home" },
    hero_sub:     { es: "Salas, comedores, camas y muebles en madera fabricados en Costa Rica. 25% de adelanto, resto contra entrega. Envío gratis en Cartago y alrededores.", en: "Living rooms, dining sets, beds and wood furniture handcrafted in Costa Rica. 25% deposit, balance on delivery. Free shipping in Cartago." },
    cta_catalog:  { es: "Ver el catálogo",     en: "View catalog" },
    cta_custom:   { es: "Pedido a la medida",  en: "Custom order" },
    best_seller_badge: { es: "BEST SELLER",    en: "BEST SELLER" },
    featured:     { es: "Más vendido",         en: "Best seller" },
    marquee: {
      items: {
        es: ["Fabricantes nacionales", "Hecho a la medida", "Envío gratis en Cartago", "25% adelanto · resto contra entrega", "Tela · Color · Madera", "1 mes de fabricación aprox."],
        en: ["National manufacturers", "Made to order", "Free shipping in Cartago", "25% deposit · balance on delivery", "Fabric · Color · Wood", "~1 month production time"],
      }
    },
    stats: [
      { num: 280, suffix: "+", es: "Piezas en catálogo",      en: "Pieces in catalog",       italic: false },
      { num: 100, suffix: "%", es: "A la medida",             en: "Made to order",            italic: true  },
      { num: 10,  suffix: "+", es: "Categorías de mueble",    en: "Furniture categories",     italic: false },
    ],
    bs_eyebrow:   { es: "Best Sellers",          en: "Best Sellers" },
    bs_h2a:       { es: "Los más",               en: "Our most" },
    bs_h2b:       { es: "pedidos",               en: "popular" },
    bs_sub:       { es: "Salas, comedores y camas en fotografía de alta calidad. Cada pieza se fabrica a la medida.", en: "Living rooms, dining sets and beds in high-quality photography. Each piece is made to order." },
    bs_link:      { es: "Ver catálogo completo →", en: "View full catalog →" },
    bs_cta:       { es: "Ver todos los productos →", en: "View all products →" },
    cat_eyebrow:  { es: "Categorías",            en: "Categories" },
    cat_h2a:      { es: "Cuatro grupos.",         en: "Four groups." },
    cat_h2b:      { es: "Posibilidades infinitas.", en: "Infinite possibilities." },
    cat_link:     { es: "Todo el catálogo →",    en: "Full catalog →" },
    cat_see:      { es: "Ver categoría →",        en: "View category →" },
    cat_pieces:   { es: "piezas",                 en: "pieces" },
    process_eyebrow: { es: "A la medida",         en: "Custom-made" },
    process_h2a:  { es: "Si tenés una idea,",     en: "Got an idea?" },
    process_h2b:  { es: "la cotizamos",           en: "we'll quote it" },
    process_sub:  { es: "Trabajamos principalmente en madera y algunas estructuras metálicas. Fabricamos diseños personalizados — mandanos tu referencia y lo cotizamos.", en: "We work mainly in wood and some metal structures. We make custom designs — send us your reference and we'll quote it." },
    process_note: { es: "* Lapso de fabricación: ~1 mes salas · ~1 mes y 2 semanas comedores.", en: "* Production time: ~1 month living rooms · ~1 month and 2 weeks dining sets." },
    process_cta1: { es: "Empezar pedido →",       en: "Start order →" },
    process_cta2: { es: "Por WhatsApp",           en: "Via WhatsApp" },
    steps: [
      { n: "01", es_t: "Cotizá sin compromiso",  en_t: "Quote with no commitment", es_b: "25% de adelanto para iniciar. El resto contra entrega.",        en_b: "25% deposit to start. Balance on delivery." },
      { n: "02", es_t: "Fabricamos a mano",      en_t: "Handcrafted for you",      es_b: "Madera y tela de calidad. Cada detalle a tu gusto.",             en_b: "Quality wood and fabric. Every detail your way." },
      { n: "03", es_t: "Entrega a tu puerta",    en_t: "Delivered to your door",   es_b: "Gratis en Cartago. A cualquier parte del país con un adicional.", en_b: "Free in Cartago. Nationwide for an extra fee." },
    ],
    marquee2: {
      items: {
        es: ["EYK Mueblería", "Cartago · Costa Rica", "Salas", "Comedores", "Camas", "Madera", "A la medida", "Fabricantes"],
        en: ["EYK Mueblería", "Cartago · Costa Rica", "Living Rooms", "Dining Sets", "Beds", "Wood", "Made to Order", "Manufacturers"],
      }
    },
  },

  // ── Catálogo ─────────────────────────────────────────────────────
  catalog: {
    eyebrow:    { es: "Catálogo",          en: "Catalog" },
    h1:         { es: "Todo el",           en: "The full" },
    h1_italic:  { es: "catálogo",          en: "catalog" },
    all_desc:   { es: "Todo lo que fabricamos: salas, comedores, camas y muebles en madera. Cada pieza se hace a la medida.", en: "Everything we make: living rooms, dining sets, beds and wood furniture. Every piece made to order." },
    pieces:     { es: "piezas",            en: "pieces" },
    piece:      { es: "pieza",             en: "piece" },
    pdf_q:      { es: "¿Querés ver más opciones de", en: "Want to see more options for" },
    pdf_btn:    { es: "Ver catálogo completo PDF", en: "View full PDF catalog" },
  },

  // ── Tarjeta de producto ───────────────────────────────────────────
  card: {
    ask_price:   { es: "Consultar precio",          en: "Ask for price" },
    quote:       { es: "Cotizar medida específica", en: "Quote specific size" },
    best_seller: { es: "Best Seller",               en: "Best Seller" },
    offer:       { es: "OFERTA",                    en: "SALE" },
  },

  // ── Entregas ─────────────────────────────────────────────────────
  deliveries: {
    eyebrow:     { es: "Entregas a clientes",       en: "Client deliveries" },
    h1a:         { es: "Muebles",                   en: "Furniture" },
    h1b:         { es: "en su hogar",               en: "in their homes" },
    sub:         { es: "Cada entrega es el resultado de semanas de fabricación artesanal. Aquí compartimos algunos de los hogares que han confiado en nosotros.", en: "Every delivery is the result of weeks of handcrafted work. Here we share some of the homes that have trusted us." },
    photos_h2:   { es: "Fotos de entregas próximamente", en: "Delivery photos coming soon" },
    photos_sub:  { es: "Estamos recopilando las fotografías de entregas recientes. Mientras tanto, podés ver el catálogo o contactarnos por WhatsApp.", en: "We're collecting recent delivery photos. In the meantime, you can view the catalog or contact us on WhatsApp." },
    photos_cta:  { es: "Ver fotos por WhatsApp",    en: "See photos on WhatsApp" },
    reviews_eyebrow: { es: "Lo que dicen",          en: "What they say" },
    reviews_h2:  { es: "Clientes satisfechos",      en: "Happy clients" },
    cta_h2:      { es: "¿Querés ser el próximo cliente?", en: "Want to be our next client?" },
    cta_sub:     { es: "Contáctanos y cotizamos tu mueble hoy mismo.", en: "Contact us and we'll quote your furniture today." },
    cta1:        { es: "Cotizar por WhatsApp",       en: "Quote on WhatsApp" },
    cta2:        { es: "Pedido a la medida",         en: "Custom order" },
  },

  // ── Descargas ─────────────────────────────────────────────────────
  downloads: {
    eyebrow:    { es: "Descargas",                   en: "Downloads" },
    h1a:        { es: "Catálogos",                   en: "Catalogs" },
    h1b:        { es: "para descargar",              en: "to download" },
    sub:        { es: "Descargá nuestros catálogos en PDF para ver todos los diseños y opciones de tela disponibles.", en: "Download our PDF catalogs to see all available designs and fabric options." },
    how_h3:     { es: "¿Cómo usar el catálogo?",     en: "How to use the catalog?" },
    steps: [
      { es: "Revisá los diseños en el catálogo de productos.", en: "Browse the designs in the product catalog." },
      { es: "Buscá tu tono favorito en el catálogo de textiles.", en: "Find your favorite color in the textile catalog." },
      { es: "Contáctanos por WhatsApp o con el formulario de cotización con el número de página y las medidas que necesitás.", en: "Contact us via WhatsApp or the quote form with the page number and the dimensions you need." },
    ],
    download:   { es: "Descargar",    en: "Download" },
    files: [
      { es_title: "Catálogo EYK 2025", en_title: "EYK Catalog 2025", es_desc: "Catálogo completo de salas, comedores, camas y muebles en madera. Todos los diseños disponibles.", en_desc: "Full catalog of living rooms, dining sets, beds and wood furniture. All available designs.", es_size: "Catálogo completo", en_size: "Full catalog" },
      { es_title: "Catálogo de Textiles 2026", en_title: "Textile Catalog 2026", es_desc: "Todos los tonos y telas disponibles actualmente. Consultá opciones de color para tu pedido.", en_desc: "All currently available tones and fabrics. Check color options for your order.", es_size: "Telas · Colores", en_size: "Fabrics · Colors" },
    ],
  },

  // ── Contacto ─────────────────────────────────────────────────────
  contact: {
    eyebrow:    { es: "Contacto",                     en: "Contact" },
    h1:         { es: "Hablemos de tu próximo mueble.", en: "Let's talk about your next furniture." },
    sub:        { es: "Respondemos por WhatsApp generalmente el mismo día. También puedes escribirnos por correo o seguirnos en Instagram para ver trabajos recientes.", en: "We reply on WhatsApp usually the same day. You can also email us or follow us on Instagram to see recent projects." },
    whatsapp:   { es: "WhatsApp",         en: "WhatsApp" },
    whatsapp_sub: { es: "Respuesta el mismo día", en: "Same day response" },
    email:      { es: "Correo",          en: "Email" },
    email_sub:  { es: "Para envíos formales", en: "For formal inquiries" },
    instagram:  { es: "Instagram",       en: "Instagram" },
    insta_sub:  { es: "Trabajos del taller", en: "Workshop projects" },
    faq_h2:     { es: "Preguntas frecuentes", en: "Frequently asked questions" },
    faq: [
      { es: "¿Cuánto tarda un pedido?", en: "How long does an order take?", es_a: "Entre 2 y 4 semanas según el diseño y la complejidad.", en_a: "2 to 4 weeks depending on design and complexity." },
      { es: "¿Hacen entregas a todo el país?", en: "Do you deliver nationwide?", es_a: "Sí. La logística se cotiza aparte según la zona.", en_a: "Yes. Shipping costs vary by region." },
      { es: "¿Puedo llevar mi propio diseño?", en: "Can I bring my own design?", es_a: "Claro. Cualquier diseño de referencia se puede cotizar.", en_a: "Of course. Any reference design can be quoted." },
      { es: "¿Manejan adelantos?", en: "Do you require a deposit?", es_a: "Sí, normalmente trabajamos con un 50% de adelanto.", en_a: "Yes, we typically work with a 50% deposit." },
    ],
  },

  // ── A la medida ───────────────────────────────────────────────────
  custom: {
    eyebrow:    { es: "A la medida",                   en: "Made to order" },
    h1a:        { es: "Cuéntanos tu idea.",           en: "Tell us your idea." },
    h1b:        { es: "La hacemos realidad.",         en: "We'll make it real." },
    sub:        { es: "Cualquier diseño se puede cotizar. Adjunta una foto de referencia, dinos las medidas, el espacio donde irá y nos encargamos del resto.", en: "Any design can be quoted. Attach a reference photo, tell us the dimensions, where it will go, and we'll handle the rest." },
    how_h2:     { es: "Cómo funciona",                en: "How it works" },
    steps: [
      { n: "01", es: "Llenas el formulario", en: "Fill the form", es_b: "Foto, medidas y detalles. No te preocupes si no sabes todo.", en_b: "Photo, dimensions and details. Don't worry if you don't know everything." },
      { n: "02", es: "Te contactamos", en: "We contact you", es_b: "Por WhatsApp, generalmente el mismo día. Confirmamos detalles.", en_b: "Via WhatsApp, usually the same day. We confirm details." },
      { n: "03", es: "Cotización formal", en: "Formal quote", es_b: "Te enviamos precio, materiales y tiempo de entrega.", en_b: "We send you price, materials and delivery time." },
      { n: "04", es: "Fabricación", en: "Production", es_b: "Empezamos con el 50% de adelanto. Entre 2 y 4 semanas.", en_b: "We start with 50% deposit. 2 to 4 weeks production." },
    ],
    materials_h3: { es: "Materiales",                  en: "Materials" },
    fabrics:    { es: "Telas:",                        en: "Fabrics:" },
    fabrics_list: { es: "Lino, microfibra, vinil",    en: "Linen, microfiber, vinyl" },
    woods:      { es: "Maderas:",                      en: "Woods:" },
    woods_list: { es: "Pino, laurel, cenízaro",       en: "Pine, laurel, ziricote" },
    tops:       { es: "Sobres:",                       en: "Tops:" },
    tops_list:  { es: "Vidrio templado, porcelanato", en: "Tempered glass, porcelain" },
  },

  // ── Footer ────────────────────────────────────────────────────────
  footer: {
    tagline:    { es: "Fabricamos salas, comedores, camas y muebles en madera a la medida. Tela, color y acabados a tu gusto. Cotizamos cualquier diseño de referencia.", en: "We make living rooms, dining sets, beds and wood furniture to order. Fabric, color and finishes your way. We quote any reference design." },
    catalog:    { es: "Catálogo",         en: "Catalog" },
    contact:    { es: "Contacto",         en: "Contact" },
    rights:     { es: "Todos los derechos reservados.", en: "All rights reserved." },
    handmade:   { es: "Hecho a mano, en Costa Rica.",   en: "Handcrafted in Costa Rica." },
  },

  // ── Categorías (labels) ───────────────────────────────────────────
  categories: {
    sofas:           { es: "Sofás",                       en: "Sofas" },
    "divan-ottoman": { es: "Sofá Diván · Sofá Ottoman",   en: "Diván / Ottoman Sofa" },
    esquineros:      { es: "Esquineros",                  en: "Corner Sofas" },
    "sofa-camas":    { es: "Sofá Camas",                  en: "Sofa Beds" },
    comedores:       { es: "Comedores",                   en: "Dining Sets" },
    camas:           { es: "Camas",                       en: "Beds" },
    butacas:         { es: "Butacas",                     en: "Armchairs" },
    tendencia:       { es: "Tendencia",                   en: "Trending" },
    // Legacy
    salas:           { es: "Salas",                       en: "Living Rooms" },
    "sofas-tantricos": { es: "Tántricos",                 en: "Lounge Sofas" },
    madera:          { es: "Madera",                      en: "Wood Furniture" },
    camillas:        { es: "Camillas",                    en: "Spa Beds" },
  },
} as const;

export type Translations = typeof translations;

export function t<
  Section extends keyof Translations,
  Key extends keyof Translations[Section],
>(section: Section, key: Key, lang: Lang): string {
  const entry = translations[section][key] as Record<Lang, string>;
  return entry[lang] ?? entry.es;
}
