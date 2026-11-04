import Link from "next/link";
import { Icon } from "@/components/icon";
import { EventRegistrationForm } from "@/components/event-registration-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { eventBySlug, showcaseEvent } from "@/lib/content";

type SearchParams = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] ?? "" : value ?? "");

export default async function EventRegistrationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const eventSlug = first(params.event) || showcaseEvent.slug;
  const event = eventBySlug(eventSlug) || showcaseEvent;

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
            <span>Book free place</span>
          </div>
          <div className="registration-layout">
            <div className="registration-context">
              <Link className="back-link" href={`/events/${event.slug}`}>
                <Icon name="back" size={17} /> Back to event details
              </Link>
              <p className="eyebrow">Meet us in person</p>
              <h1>
                Book your free <em>place.</em>
              </h1>
              <p>
                Complete your details below to reserve your entry to the {event.title}. Bring family or friends along.
              </p>
              <div className="registration-event-summary">
                <span className="summary-icon">
                  <Icon name="calendar" size={20} />
                </span>
                <div>
                  <strong>{event.title}</strong>
                  <span>{event.dateLabel}</span>
                  <span>
                    {event.time} · {event.location}
                  </span>
                </div>
              </div>
              <div className="registration-trust">
                <Icon name="check-circle" size={19} />
                <span>
                  Complete 6-stage booking flow demonstration. Confirmed booking reference generated upon submission.
                </span>
              </div>
            </div>
            <div className="registration-form-panel">
              <div className="form-panel-heading">
                <p className="eyebrow">Stage 3 of 6: Attendee details</p>
                <h2>Reserve your places.</h2>
              </div>
              <EventRegistrationForm event={event} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
