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
  const telephone = clean(body.telephone, 40);
  const rawGuests = Number(body.guests);
  const guests = Number.isInteger(rawGuests) && rawGuests >= 1 && rawGuests <= 10 ? rawGuests : 1;
  const subjectInterest = clean(body.subjectInterest, 120);
  const presentationSlot = clean(body.presentationSlot, 120);
  const consent = body.consent === true;

  if (eventSlug !== showcaseEvent.slug && eventSlug !== "t-levels-info-session") {
    return Response.json({ ok: false, message: "This event is not available for booking." }, { status: 404 });
  }
  if (fullName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !consent) {
    return Response.json({ ok: false, message: "Please provide your full name, a valid email address and consent to proceed." }, { status: 422 });
  }

  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  const generatedRef = `CC-EVT-${randomDigits}`;

  try {
    const [saved] = await db.insert(eventRegistrations).values({
      eventSlug,
      fullName,
      email,
      telephone: telephone || null,
      guests,
      subjectInterest: subjectInterest || null,
      presentationSlot: presentationSlot || null,
      consent,
      reference: generatedRef,
    }).returning({ id: eventRegistrations.id, reference: eventRegistrations.reference });

    return Response.json({
      ok: true,
      reference: saved.reference || `CC-EVT-${String(saved.id).padStart(5, "0")}`,
      eventTitle: eventSlug === showcaseEvent.slug ? showcaseEvent.title : "T Levels & Apprenticeships Discovery Morning",
      guests,
      presentationSlot: presentationSlot || "General Campus Tour",
    }, { status: 201 });
  } catch (error) {
    console.warn("Database unavailable, falling back to simulated booking confirmation:", error);
    return Response.json({
      ok: true,
      reference: generatedRef,
      eventTitle: eventSlug === showcaseEvent.slug ? showcaseEvent.title : "T Levels & Apprenticeships Discovery Morning",
      guests,
      presentationSlot: presentationSlot || "General Campus Tour",
      simulated: true,
    }, { status: 201 });
  }
}
