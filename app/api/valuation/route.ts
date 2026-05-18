import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  housePrice: z.number().positive(),
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

  // Placeholder — log to server console.
  // TODO: Plug in CRM / email here (Resend, HubSpot, Salesforce, Notion, ...).
  console.log("[valuation] new submission", {
    receivedAt: new Date().toISOString(),
    ...parsed.data,
  });

  return NextResponse.json({ ok: true });
}
