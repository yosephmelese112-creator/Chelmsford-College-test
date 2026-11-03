import Link from "next/link";
import { Icon } from "@/components/icon";
import { EventRegistrationForm } from "@/components/event-registration-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { showcaseEvent } from "@/lib/content";

export default function EventRegistrationPage() {
  return <><SiteHeader /><main id="main-content" className="page-surface form-page"><div className="shell"><div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/events">Events</Link><span>/</span><span>Register interest</span></div><div className="registration-layout"><div className="registration-context"><Link className="back-link" href={`/events/${showcaseEvent.slug}`}><Icon name="back" size={17} /> Back to event details</Link><p className="eyebrow">Come and say hello</p><h1>Register your <em>interest.</em></h1><p>Share your details so the college can follow up about the Showcase Open Evening.</p><div className="registration-event-summary"><span className="summary-icon"><Icon name="calendar" size={20} /></span><div><strong>{showcaseEvent.title}</strong><span>{showcaseEvent.dateLabel}</span><span>{showcaseEvent.time} · {showcaseEvent.location}</span></div></div><div className="registration-trust"><Icon name="check-circle" size={19} /><span>Prototype demonstration. No booking platform or external registration link is connected.</span></div></div><div className="registration-form-panel"><div className="form-panel-heading"><p className="eyebrow">Your details</p><h2>Let’s keep in touch.</h2></div><EventRegistrationForm /></div></div></div></main><SiteFooter /></>;
}
