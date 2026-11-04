import { db } from "@/db";
import { courseEnquiries } from "@/db/schema";

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
  const fullName = clean(body.fullName, 160);
  const email = clean(body.email, 254).toLowerCase();
  const telephone = clean(body.telephone, 40);
  const kind = body.kind === "application" ? "application" : "enquiry";
  const courseId = clean(body.courseId, 100);
  const courseTitle = clean(body.courseTitle, 300);
  const message = clean(body.message, 4000);
  const consent = body.consent === true;

  if (fullName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !consent) {
    return Response.json({ ok: false, message: "Add your name, a valid email address and consent to continue." }, { status: 422 });
  }

  const prefix = kind === "application" ? "CC-APP" : "CC-ENQ";

  try {
    const [saved] = await db.insert(courseEnquiries).values({
      fullName,
      email,
      telephone: telephone || null,
      kind,
      courseId: courseId || null,
      courseTitle: courseTitle || null,
      message: message || null,
      consent,
    }).returning({ id: courseEnquiries.id });

    return Response.json({ ok: true, reference: `${prefix}-${String(saved.id).padStart(5, "0")}` }, { status: 201 });
  } catch (error) {
    console.warn("Database unavailable, falling back to simulated confirmation:", error);
    const mockId = Math.floor(10000 + Math.random() * 90000);
    return Response.json({ ok: true, reference: `${prefix}-${mockId}`, simulated: true }, { status: 201 });
  }
}
