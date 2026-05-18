import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  budget: z.enum(["under-500k", "500k-1m", "1m-3m", "3m-plus"]),
  interest: z.enum(["buying", "selling", "investing"]),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { fullName, email, phone, budget, interest } = parsed.data;

  const { error } = await supabase.from("leads").insert({
    full_name: fullName,
    email,
    phone,
    budget,
    interest,
  });

  if (error) {
    console.error("[lead] insert failed", error);
    return NextResponse.json({ ok: false, error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
