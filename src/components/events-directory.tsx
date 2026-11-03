"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { showcaseEvent } from "@/lib/content";
import { Icon } from "@/components/icon";

export function EventsDirectory() {
  const [month, setMonth] = useState("");
  const [eventType, setEventType] = useState("");
  const eventVisible = (!month || month === "2026-11") && (!eventType || eventType === showcaseEvent.type);
  const events = useMemo(() => eventVisible ? [showcaseEvent] : [], [eventVisible]);

  return (
    <div className="shell events-page">
      <div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Events</span></div>
      <header className="events-page-heading"><div><p className="eyebrow">Meet us in person</p><h1>Make time<br />for a <em>first look.</em></h1></div><p>Come and explore the campus, talk with tutors and find out more about support and student life.</p></header>
      <div className="events-toolbar">
        <div><p className="eyebrow">What’s coming up</p><h2>{events.length} upcoming {events.length === 1 ? "event" : "events"}</h2></div>
        <div className="event-filter-fields">
          <label className="form-field"><span>When</span><select value={month} onChange={(event) => setMonth(event.target.value)}><option value="">Any date</option><option value="2026-11">November 2026</option><option value="other">Other dates</option></select></label>
          <label className="form-field"><span>Event type</span><select value={eventType} onChange={(event) => setEventType(event.target.value)}><option value="">All event types</option><option value="Open evening">Open evening</option><option value="Workshop">Workshop</option></select></label>
        </div>
      </div>
      <div className="events-results" aria-live="polite">
        {events.length ? events.map((item) => <article className="event-listing" key={item.slug}>
          <Link href={`/events/${item.slug}`} className="event-listing-image" aria-label={`Explore ${item.title}`}><img src={item.image} alt={item.imageAlt} loading="lazy" /><span className="event-image-caption">A chance to see more</span></Link>
          <div className="event-listing-date"><span>WED</span><strong>04</strong><span>NOV</span><i>2026</i></div>
          <div className="event-listing-content"><span className="tag tag-blue">{item.type}</span><h2><Link href={`/events/${item.slug}`}>{item.title}</Link></h2><p>{item.description}</p><div className="event-meta-line"><span><Icon name="clock" size={16} />{item.time}</span><span><Icon name="location" size={16} />{item.location}</span></div><Link className="text-link" href={`/events/${item.slug}`}>View event details <Icon name="arrow" size={18} /></Link></div>
        </article>) : <div className="empty-state event-empty"><span className="empty-state-icon"><Icon name="calendar" size={23} /></span><p className="eyebrow">No events in this selection</p><h3>Try a different date or event type.</h3><p>Only the Showcase Open Evening has been supplied in this prototype event sample.</p><button className="button button-outline" type="button" onClick={() => { setMonth(""); setEventType(""); }}>Show all events <Icon name="arrow" size={17} /></button></div>}
      </div>
      <div className="event-contact-strip"><span className="event-contact-icon"><Icon name="mail" size={19} /></span><div><strong>Need help choosing a visit?</strong><p>Contact the Careers Advice Zone for support.</p></div><a className="text-link" href={`mailto:${showcaseEvent.contact.email}`}>Get in touch <Icon name="arrow-up-right" size={16} /></a></div>
    </div>
  );
}
