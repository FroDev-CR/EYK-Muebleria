import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

interface LeadPayload {
  nombre: string;
  telefono: string;
  email?: string;
  tipo: string;
  medidas?: string;
  tela?: string;
  madera?: string;
  detalles: string;
  presupuesto?: string;
  ciudad?: string;
}

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // Sin Supabase configurado, no guardamos pero no fallamos al usuario.
    // El form usa WhatsApp como fallback principal.
    return NextResponse.json({ ok: true, stored: false });
  }

  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  if (!body.nombre || !body.telefono || !body.detalles) {
    return NextResponse.json(
      { ok: false, error: "Campos requeridos faltantes" },
      { status: 400 },
    );
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from("leads").insert({
      nombre: body.nombre,
      telefono: body.telefono,
      email: body.email || null,
      tipo: body.tipo || null,
      medidas: body.medidas || null,
      tela: body.tela || null,
      madera: body.madera || null,
      detalles: body.detalles,
      presupuesto: body.presupuesto || null,
      ciudad: body.ciudad || null,
      source: "web",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ ok: false, error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
