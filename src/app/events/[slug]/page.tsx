import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { showcaseEvent } from "@/lib/content";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== showcaseEvent.slug) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="event-detail-page">
        <div className="shell">
          <div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/events">Events</Link><span>/</span><span>{showcaseEvent.title}</span></div>
          <section className="event-detail-hero">
            <div className="event-detail-image"><img src={showcaseEvent.image} alt={showcaseEvent.imageAlt} fetchPriority="high" /><span className="event-image-caption">Illustrative student photography</span></div>
            <div className="event-detail-heading"><span className="tag tag-green">{showcaseEvent.type}</span><h1>{showcaseEvent.title}</h1><p>Come see what Chelmsford College is like.</p><div className="event-detail-meta"><div><span className="event-meta-icon"><Icon name="calendar" size={19} /></span><div><span>Date</span><strong>{showcaseEvent.dateLabel}</strong></div></div><div><span className="event-meta-icon"><Icon name="clock" size={19} /></span><div><span>Time</span><strong>{showcaseEvent.time}</strong></div></div><div><span className="event-meta-icon"><Icon name="location" size={19} /></span><div><span>Location</span><strong>{showcaseEvent.location}</strong></div></div></div><Link className="button button-green event-register-cta" href="/events/register">Register your interest <Icon name="arrow" size={18} /></Link><p className="event-prototype-note">Prototype registration only — not a booking-platform confirmation.</p></div>
          </section>
          <div className="event-detail-layout">
            <article className="event-detail-main">
              <section className="event-description-block"><p className="eyebrow">What to expect</p><h2>Come curious.<br /><em>Leave with ideas.</em></h2><p>{showcaseEvent.description}</p></section>
              <section className="presentation-section" aria-labelledby="presentations-heading"><div className="presentation-heading"><div><p className="eyebrow">On the evening</p><h2 id="presentations-heading">Presentation schedule</h2></div><span className="schedule-place"><Icon name="location" size={16} /> {showcaseEvent.location}</span></div><div className="presentation-list">{showcaseEvent.presentations.map((presentation, index) => <div className="presentation-row" key={presentation.department}><span className="presentation-number">0{index + 1}</span><strong>{presentation.department}</strong><span className="presentation-times">{presentation.times.length ? presentation.times.join(" · ") : "No time supplied"}</span></div>)}</div><p className="schedule-note">Presentation location: {showcaseEvent.location}.</p></section>
            </article>
            <aside className="event-detail-sidebar">
              <div className="event-info-card"><p className="eyebrow">Plan your visit</p><h2>Good to know</h2><div className="visit-info-block"><span className="visit-icon"><Icon name="location" size={18} /></span><div><strong>Parking</strong><p>{showcaseEvent.parking}</p></div></div><div className="visit-info-block"><span className="visit-icon"><Icon name="mail" size={18} /></span><div><strong>Questions?</strong><p>{showcaseEvent.contact.name}</p><a href={`tel:${showcaseEvent.contact.phone.replaceAll(" ", "")}`}>{showcaseEvent.contact.phone}</a><a href={`mailto:${showcaseEvent.contact.email}`}>{showcaseEvent.contact.email}</a></div></div><Link className="button button-green button-block" href="/events/register">Register your interest <Icon name="arrow" size={18} /></Link></div>
              <div className="event-visitor-note"><Icon name="sparkle" size={19} /><p>Bring your questions. Tutors and support staff will be there to talk through your next steps.</p></div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
