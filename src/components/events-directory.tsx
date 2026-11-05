"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { collegeEvents, type CollegeEvent } from "@/lib/content";
import { Icon } from "@/components/icon";
import { CustomSelect } from "@/components/custom-select";
import { triggerCalendarDownload } from "@/lib/calendar";

const whenOptions = [
  { value: "", label: "Any date" },
  { value: "2026-11", label: "November 2026" },
  { value: "2026-12", label: "December 2026" },
  { value: "2027-01", label: "January 2027" },
];

const eventTypeOptions = [
  { value: "", label: "All event types" },
  { value: "Workshop", label: "Workshop" },
  { value: "Information session", label: "Information session" },
  { value: "Taster day", label: "Taster day" },
  { value: "Open evening", label: "Open evening (Past)" },
];

const campusOptions = [
  { value: "", label: "All campuses" },
  { value: "Moulsham Street", label: "Moulsham Street campus" },
  { value: "Princes Road", label: "Princes Road campus" },
];

function parseEventDate(dateStr: string) {
  const parts = dateStr.split("-");
  const year = parts[0] || "2026";
  const monthIndex = Number(parts[1] || 11) - 1;
  const day = parts[2] || "04";
  const dateObj = new Date(Number(year), monthIndex, Number(day));
  const dayName = dateObj.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase();
  const monthName = dateObj.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
  return { dayName, day, monthName, year };
}

export function EventsDirectory() {
  const [month, setMonth] = useState("");
  const [eventType, setEventType] = useState("");
  const [campus, setCampus] = useState("");

  // Upcoming events (filter applied)
  const upcomingEvents = useMemo(() => {
    return collegeEvents.filter((item) => {
      if (item.isPastEvent) return false;
      const matchMonth = !month || item.date.startsWith(month);
      const matchType = !eventType || item.type.toLowerCase() === eventType.toLowerCase();
      const matchCampus =
        !campus || item.location.toLowerCase().includes(campus.toLowerCase());
      return matchMonth && matchType && matchCampus;
    });
  }, [month, eventType, campus]);

  // Past events (Showcase Open Evening)
  const pastEvents = useMemo(() => {
    return collegeEvents.filter((item) => {
      if (!item.isPastEvent) return false;
      const matchMonth = !month || item.date.startsWith(month);
      const matchType = !eventType || item.type.toLowerCase() === eventType.toLowerCase();
      const matchCampus =
        !campus || item.location.toLowerCase().includes(campus.toLowerCase());
      return matchMonth && matchType && matchCampus;
    });
  }, [month, eventType, campus]);

  const hasActiveFilters = Boolean(month || eventType || campus);

  function clearAllFilters() {
    setMonth("");
    setEventType("");
    setCampus("");
  }

  function renderEventCard(item: CollegeEvent) {
    const dateParts = parseEventDate(item.date);
    const bookingUrl = `/events/register?event=${encodeURIComponent(item.slug)}`;

    return (
      <article className="event-listing" key={item.slug}>
        <Link
          href={`/events/${item.slug}`}
          className="event-listing-image"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img src={item.image} alt="" loading="lazy" />
          <span className="event-image-caption">
            {item.isPastEvent ? "Archived event" : "A chance to see more"}
          </span>
        </Link>
        <div className="event-listing-date">
          <span>{dateParts.dayName}</span>
          <strong>{dateParts.day}</strong>
          <span>{dateParts.monthName}</span>
          <i>{dateParts.year}</i>
        </div>
        <div className="event-listing-content">
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <span className="tag tag-blue">{item.type}</span>
            {item.isPastEvent ? (
              <span className="tag tag-neutral" style={{ fontWeight: 700 }}>
                Past event · Archived
              </span>
            ) : item.isSample ? (
              <span
                className="tag tag-green"
                style={{ fontSize: "0.75rem", fontWeight: 700 }}
              >
                {item.sampleBadge || "Sample event · Illustrative"}
              </span>
            ) : null}
          </div>
          <h2>
            <Link href={`/events/${item.slug}`}>{item.title}</Link>
          </h2>
          <p>{item.description}</p>
          <div className="event-meta-line">
            <span>
              <Icon name="clock" size={16} />
              {item.time}
            </span>
            <span>
              <Icon name="location" size={16} />
              {item.location}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {!item.isPastEvent ? (
              <Link className="button button-green button-small" href={bookingUrl}>
                Book a place <Icon name="arrow" size={16} />
              </Link>
            ) : null}

            <Link className="text-link" href={`/events/${item.slug}`}>
              View event schedule <Icon name="arrow" size={16} />
            </Link>

            <button
              type="button"
              className="text-link"
              onClick={() => triggerCalendarDownload(item)}
              aria-label={`Add to calendar: ${item.title}`}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "var(--color-primary-blue)",
                fontWeight: 600,
                fontSize: "0.92rem",
              }}
            >
              <Icon name="calendar" size={16} /> Add to calendar
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="shell events-page">
      <div className="page-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Events</span>
      </div>
      <header className="events-page-heading">
        <div>
          <p className="eyebrow">Meet us in person</p>
          <h1>
            Make time<br />for a <em>first look.</em>
          </h1>
        </div>
        <p>
          Come and explore the campus, tour technical workshops, talk with tutors, and find out more about apprenticeships, T Levels, student finance, and travel support.
        </p>
      </header>

      <div className="events-toolbar">
        <div>
          <p className="eyebrow">Filter college events</p>
          <h2>
            {upcomingEvents.length} upcoming {upcomingEvents.length === 1 ? "event" : "events"}
          </h2>
        </div>
        <div className="event-filter-fields">
          <div className="form-field">
            <span>When</span>
            <CustomSelect
              value={month}
              onChange={setMonth}
              options={whenOptions}
              placeholder="Any date"
              aria-label="Filter events by date"
            />
          </div>
          <div className="form-field">
            <span>Event type</span>
            <CustomSelect
              value={eventType}
              onChange={setEventType}
              options={eventTypeOptions}
              placeholder="All event types"
              aria-label="Filter events by type"
            />
          </div>
          <div className="form-field">
            <span>Campus</span>
            <CustomSelect
              value={campus}
              onChange={setCampus}
              options={campusOptions}
              placeholder="All campuses"
              aria-label="Filter events by campus"
            />
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              className="clear-filters"
              onClick={clearAllFilters}
              aria-label="Clear all event filters"
              style={{
                alignSelf: "flex-end",
                height: "46px",
                padding: "0 12px",
                border: "none",
                background: "none",
                color: "var(--color-primary-blue)",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Upcoming Events Stream */}
      <section aria-labelledby="upcoming-events-heading">
        <h2 id="upcoming-events-heading" className="sr-only">
          Upcoming College Events
        </h2>
        <div className="events-results" aria-live="polite">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(renderEventCard)
          ) : (
            <div className="empty-state event-empty">
              <span className="empty-state-icon">
                <Icon name="calendar" size={23} />
              </span>
              <p className="eyebrow">No events in this selection</p>
              <h3>Try adjusting your date or campus filter.</h3>
              <p>No upcoming dates match your selection. Use the button below to view all upcoming dates.</p>
              <button
                className="button button-outline"
                type="button"
                onClick={clearAllFilters}
                aria-label="Show all upcoming events"
              >
                Show all events <Icon name="arrow" size={17} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Past & Archived Events Section */}
      <section
        className="past-events-section"
        aria-labelledby="past-events-heading"
        style={{ marginTop: "4rem", paddingTop: "2.5rem", borderTop: "2px solid var(--line)" }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <p className="eyebrow" style={{ color: "var(--color-neutral-muted)" }}>
            Event Archive
          </p>
          <h2 id="past-events-heading" style={{ fontSize: "1.75rem", color: "var(--navy)", margin: 0 }}>
            Past events & presentation schedules
          </h2>
          <p style={{ color: "var(--body)", marginTop: "0.5rem" }}>
            The Showcase Open Evening on 4 November 2026 has concluded. Explore the historical schedule below or book onto our upcoming discovery mornings.
          </p>
        </div>

        <div className="events-results" aria-live="polite">
          {pastEvents.map(renderEventCard)}
        </div>
      </section>
    </div>
  );
}
