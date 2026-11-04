"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { collegeEvents } from "@/lib/content";
import { Icon } from "@/components/icon";
import { CustomSelect } from "@/components/custom-select";

const whenOptions = [
  { value: "", label: "Any date" },
  { value: "2026-11", label: "November 2026" },
  { value: "2026-12", label: "December 2026" },
];

const eventTypeOptions = [
  { value: "", label: "All event types" },
  { value: "Open evening", label: "Open evening" },
  { value: "Workshop", label: "Workshop" },
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

  const events = useMemo(() => {
    return collegeEvents.filter((item) => {
      const matchMonth = !month || item.date.startsWith(month);
      const matchType = !eventType || item.type.toLowerCase() === eventType.toLowerCase();
      return matchMonth && matchType;
    });
  }, [month, eventType]);

  const hasActiveFilters = Boolean(month || eventType);

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
          <h1>Make time<br />for a <em>first look.</em></h1>
        </div>
        <p>Come and explore the campus, talk with tutors and find out more about support and student life.</p>
      </header>

      <div className="events-toolbar">
        <div>
          <p className="eyebrow">What’s coming up</p>
          <h2>{events.length} upcoming {events.length === 1 ? "event" : "events"}</h2>
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
          {hasActiveFilters && (
            <button
              type="button"
              className="clear-filters"
              onClick={() => {
                setMonth("");
                setEventType("");
              }}
              style={{ alignSelf: "flex-end", height: "46px", padding: "0 12px", border: "none", background: "none", color: "var(--color-primary-blue)", cursor: "pointer", fontWeight: 600 }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="events-results" aria-live="polite">
        {events.length ? (
          events.map((item) => {
            const dateParts = parseEventDate(item.date);
            return (
              <article className="event-listing" key={item.slug}>
                <Link href={`/events/${item.slug}`} className="event-listing-image" aria-label={`Explore ${item.title}`}>
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                  <span className="event-image-caption">A chance to see more</span>
                </Link>
                <div className="event-listing-date">
                  <span>{dateParts.dayName}</span>
                  <strong>{dateParts.day}</strong>
                  <span>{dateParts.monthName}</span>
                  <i>{dateParts.year}</i>
                </div>
                <div className="event-listing-content">
                  <span className="tag tag-blue">{item.type}</span>
                  <h2><Link href={`/events/${item.slug}`}>{item.title}</Link></h2>
                  <p>{item.description}</p>
                  <div className="event-meta-line">
                    <span><Icon name="clock" size={16} />{item.time}</span>
                    <span><Icon name="location" size={16} />{item.location}</span>
                  </div>
                  <Link className="text-link" href={`/events/${item.slug}`}>
                    View event details <Icon name="arrow" size={18} />
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <div className="empty-state event-empty">
            <span className="empty-state-icon"><Icon name="calendar" size={23} /></span>
            <p className="eyebrow">No events in this selection</p>
            <h3>Try a different date or event type.</h3>
            <p>No college events match the selected filters. Use the button below to view all upcoming dates.</p>
            <button
              className="button button-outline"
              type="button"
              onClick={() => {
                setMonth("");
                setEventType("");
              }}
            >
              Show all events <Icon name="arrow" size={17} />
            </button>
          </div>
        )}
      </div>

      <div className="event-contact-strip">
        <span className="event-contact-icon"><Icon name="mail" size={19} /></span>
        <div>
          <strong>Need help choosing a visit?</strong>
          <p>Contact the Careers Advice Zone for support.</p>
        </div>
        <a className="text-link" href="mailto:careersadvicezone@chelmsford.ac.uk">
          Get in touch <Icon name="arrow-up-right" size={16} />
        </a>
      </div>
    </div>
  );
}
