import { NextResponse } from "next/server";
import { z } from "zod";

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

  const lead = parsed.data;

  // Placeholder — log to server console.
  // TODO: Plug in CRM / email here. Examples:
  //   - Resend:    await resend.emails.send({ ... })
  //   - HubSpot:   await fetch("https://api.hubapi.com/...", { ... })
  //   - Salesforce: write to Lead object via REST API
  //   - Notion DB: await notion.pages.create({ ... })
  // Use environment variables for any API keys (e.g. process.env.RESEND_API_KEY).
  console.log("[lead] new submission", {
    receivedAt: new Date().toISOString(),
    ...lead,
  });

  return NextResponse.json({ ok: true });
}
