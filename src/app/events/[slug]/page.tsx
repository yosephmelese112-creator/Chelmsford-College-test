import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { eventBySlug, collegeEvents } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) {
    return { title: "Event Not Found" };
  }
  return {
    title: `${event.title}`,
    description: event.description.slice(0, 160),
  };
}

export async function generateStaticParams() {
  return collegeEvents.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) notFound();

  const bookingUrl = `/events/register?event=${encodeURIComponent(event.slug)}`;
  const calendarUrl = `/api/events/${encodeURIComponent(event.slug)}/calendar`;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="event-detail-page">
        <div className="shell">
          <div className="page-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/events">Events</Link>
            <span>/</span>
            <span>{event.title}</span>
          </div>

          <section className="event-detail-hero">
            <div className="event-detail-image">
              <img src={event.image} alt={event.imageAlt} fetchPriority="high" />
              <span className="event-image-caption">
                {event.isPastEvent ? "Archived event photography" : "College event photography"}
              </span>
            </div>

            <div className="event-detail-heading">
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <span className="tag tag-green">{event.type}</span>
                {event.isPastEvent ? (
                  <span className="tag tag-neutral" style={{ fontWeight: 700 }}>
                    Past event · Archived
                  </span>
                ) : event.isSample ? (
                  <span className="tag tag-blue" style={{ fontWeight: 700 }}>
                    {event.sampleBadge || "Sample event · Illustrative"}
                  </span>
                ) : null}
              </div>

              <h1>{event.title}</h1>
              <p>Come see what Chelmsford College is like across our campuses.</p>

              <div className="event-detail-meta">
                <div>
                  <span className="event-meta-icon">
                    <Icon name="calendar" size={19} />
                  </span>
                  <div>
                    <span>Date</span>
                    <strong>{event.dateLabel}</strong>
                  </div>
                </div>
                <div>
                  <span className="event-meta-icon">
                    <Icon name="clock" size={19} />
                  </span>
                  <div>
                    <span>Time</span>
                    <strong>{event.time}</strong>
                  </div>
                </div>
                <div>
                  <span className="event-meta-icon">
                    <Icon name="location" size={19} />
                  </span>
                  <div>
                    <span>Location</span>
                    <strong>{event.location}</strong>
                  </div>
                </div>
              </div>

              {event.isPastEvent ? (
                <div
                  style={{
                    padding: "1rem 1.25rem",
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    marginTop: "1.25rem",
                  }}
                >
                  <p style={{ margin: "0 0 0.5rem", fontWeight: 700, color: "var(--navy)" }}>
                    This event took place on Wednesday 4 November 2026.
                  </p>
                  <p style={{ margin: "0 0 1rem", fontSize: "0.92rem", color: "var(--body)" }}>
                    The historical presentation schedule below remains available for reference. Book onto our next upcoming discovery morning:
                  </p>
                  <Link className="button button-green" href="/events">
                    Browse upcoming college events <Icon name="arrow" size={17} />
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginTop: "1.5rem" }}>
                  <Link className="button button-green event-register-cta" href={bookingUrl}>
                    Book a place <Icon name="arrow" size={18} />
                  </Link>
                  <a
                    className="button button-outline"
                    href={calendarUrl}
                    download={`${event.slug}.ics`}
                    aria-label={`Add to calendar: ${event.title}`}
                  >
                    <Icon name="calendar" size={17} /> Add to calendar
                  </a>
                </div>
              )}
            </div>
          </section>

          <div className="event-detail-layout">
            <article className="event-detail-main">
              <section className="event-description-block">
                <p className="eyebrow">What to expect</p>
                <h2>
                  Come curious.<br />
                  <em>Leave with ideas.</em>
                </h2>
                <p>{event.description}</p>
              </section>

              {/* Two-Campus Presentation Timetable */}
              <section className="presentation-section" aria-labelledby="presentations-heading">
                <div className="presentation-heading">
                  <div>
                    <p className="eyebrow">Presentation Timetable</p>
                    <h2 id="presentations-heading">Department talk schedule</h2>
                  </div>
                  <span className="schedule-place">
                    <Icon name="location" size={16} /> Both campuses represented
                  </span>
                </div>

                <div
                  className="schedule-table-wrapper"
                  tabIndex={0}
                  role="region"
                  aria-label="Presentation timetable across Moulsham Street and Princes Road campuses. Use arrow keys to scroll on smaller screens."
                  style={{
                    overflowX: "auto",
                    marginTop: "1.25rem",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    background: "#ffffff",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      minWidth: "620px",
                      borderCollapse: "collapse",
                      textAlign: "left",
                      fontSize: "0.92rem",
                    }}
                  >
                    <thead>
                      <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--line)" }}>
                        <th style={{ padding: "0.9rem 1.1rem", color: "var(--navy)", fontWeight: 800 }}>
                          Department / Specialism
                        </th>
                        <th style={{ padding: "0.9rem 1.1rem", color: "var(--blue-700)", fontWeight: 800 }}>
                          Moulsham Street campus
                        </th>
                        <th style={{ padding: "0.9rem 1.1rem", color: "var(--green-700)", fontWeight: 800 }}>
                          Princes Road campus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.scheduleRows.map((row, idx) => (
                        <tr
                          key={row.department}
                          style={{
                            borderBottom: idx < event.scheduleRows.length - 1 ? "1px solid var(--line)" : "none",
                            background: idx % 2 === 1 ? "var(--surface)" : "#ffffff",
                          }}
                        >
                          <td style={{ padding: "0.85rem 1.1rem", fontWeight: 700, color: "var(--navy)" }}>
                            {row.department}
                            {row.note && (
                              <span style={{ display: "block", fontSize: "0.8rem", color: "var(--color-neutral-muted)", fontWeight: 500 }}>
                                {row.note}
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "0.85rem 1.1rem", color: "var(--body)" }}>
                            {row.moulshamTimes.length > 0 ? (
                              row.moulshamTimes.join(" · ")
                            ) : (
                              <span style={{ color: "var(--color-neutral-muted)" }}>—</span>
                            )}
                          </td>
                          <td style={{ padding: "0.85rem 1.1rem", color: "var(--body)" }}>
                            {row.princesRoadTimes.length > 0 ? (
                              <strong style={{ color: "var(--green-700)" }}>
                                {row.princesRoadTimes.join(" · ")}
                              </strong>
                            ) : (
                              <span style={{ color: "var(--color-neutral-muted)" }}>—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="schedule-note" style={{ marginTop: "1rem" }}>
                  <Icon name="sparkle" size={15} style={{ color: "var(--color-primary-green)" }} /> Your booked arrival time represents when you can enter the building. You may stay as long as you like and visit presentations across either campus.
                </p>
              </section>
            </article>

            <aside className="event-detail-sidebar">
              <div className="event-info-card">
                <p className="eyebrow">Plan your visit</p>
                <h2>Good to know</h2>

                <div className="visit-info-block">
                  <span className="visit-icon">
                    <Icon name="location" size={18} />
                  </span>
                  <div>
                    <strong>Parking & Transport</strong>
                    <p>{event.parking}</p>
                  </div>
                </div>

                <div className="visit-info-block">
                  <span className="visit-icon">
                    <Icon name="mail" size={18} />
                  </span>
                  <div>
                    <strong>More help or questions?</strong>
                    <p>{event.contact.name}</p>
                    <a href={`tel:${event.contact.phone.replaceAll(" ", "")}`}>
                      {event.contact.phone}
                    </a>
                    <a href={`mailto:${event.contact.email}`}>
                      {event.contact.email}
                    </a>
                  </div>
                </div>

                {!event.isPastEvent ? (
                  <Link className="button button-green button-block" href={bookingUrl}>
                    Book a place <Icon name="arrow" size={18} />
                  </Link>
                ) : (
                  <Link className="button button-primary button-block" href="/events">
                    View upcoming events <Icon name="arrow" size={18} />
                  </Link>
                )}

                <a
                  className="button button-outline button-block"
                  href={calendarUrl}
                  download={`${event.slug}.ics`}
                  style={{ marginTop: "0.5rem" }}
                  aria-label={`Add to calendar (.ics): ${event.title}`}
                >
                  <Icon name="calendar" size={16} /> Add to calendar (.ics)
                </a>
              </div>

              <div className="event-visitor-note">
                <Icon name="sparkle" size={19} />
                <p>
                  If you need assistance to gain access to the College, please call the Careers Advice Zone on 01245 29 30 31. Our Equality & Diversity policy is in place to support all visitors.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
