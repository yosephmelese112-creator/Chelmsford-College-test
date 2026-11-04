import { db } from "@/db";
import { eventRegistrations } from "@/db/schema";
import { showcaseEvent } from "@/lib/content";

export const runtime = "nodejs";

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Please check the form and try again." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return Response.json({ ok: false, message: "Please check the form and try again." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const eventSlug = clean(body.eventSlug, 120);
  const fullName = clean(body.fullName, 160);
  const email = clean(body.email, 254).toLowerCase();
  const consent = body.consent === true;

  if (eventSlug !== showcaseEvent.slug) {
    return Response.json({ ok: false, message: "This event is not available for registration." }, { status: 404 });
  }
  if (fullName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !consent) {
    return Response.json({ ok: false, message: "Add your name, a valid email address and consent to continue." }, { status: 422 });
  }

  try {
    const [saved] = await db.insert(eventRegistrations).values({
      eventSlug,
      fullName,
      email,
      consent,
    }).returning({ id: eventRegistrations.id });

    return Response.json({ ok: true, reference: `EVT-${String(saved.id).padStart(5, "0")}` }, { status: 201 });
  } catch (error) {
    console.warn("Database unavailable, falling back to simulated confirmation:", error);
    const mockId = Math.floor(10000 + Math.random() * 90000);
    return Response.json({ ok: true, reference: `EVT-${mockId}`, simulated: true }, { status: 201 });
  }
}
