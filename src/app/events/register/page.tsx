import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { EventRegistrationForm } from "@/components/event-registration-form";
import { eventBySlug, collegeEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a Place | College Events",
  description:
    "Book your free place for Chelmsford College open evenings, discovery mornings and campus tours across Moulsham Street and Princes Road campuses.",
};

export default async function EventRegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  const { event: eventSlug } = await searchParams;
  // If no event or if past event, default to next upcoming event
  const matchedEvent = eventSlug ? eventBySlug(eventSlug) : undefined;
  const initialEvent = matchedEvent && !matchedEvent.isPastEvent
    ? matchedEvent
    : collegeEvents.find((e) => !e.isPastEvent) ?? collegeEvents[0];

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-surface form-page">
        <div className="shell">
          <div className="page-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/events">Events</Link>
            <span>/</span>
            <span>Book a place</span>
          </div>

          <header className="form-page-header">
            <div className="form-header-copy">
              <span className="eyebrow"><i className="eyebrow-dot" /> Event booking</span>
              <h1>Book a place</h1>
              <p>
                Reserve your arrival time and presentation slots for college open events. Bookings are completely free and you are welcome to bring family or guests.
              </p>
            </div>
            <div className="form-header-assurance">
              <Icon name="check-circle" size={18} />
              <span>Free admission · Instant email booking confirmation</span>
            </div>
          </header>

          <EventRegistrationForm event={initialEvent} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
