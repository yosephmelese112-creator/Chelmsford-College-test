"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { showcaseEvent } from "@/lib/content";
import { Icon } from "@/components/icon";

export function EventRegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventSlug: showcaseEvent.slug, fullName, email, consent }),
      });
      const result = await response.json() as { ok?: boolean; message?: string; reference?: string };
      if (!response.ok || !result.ok || !result.reference) throw new Error(result.message || "We could not record your interest. Please try again.");
      setReference(result.reference);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We could not record your interest. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (reference) return (
    <div className="form-success" role="status" aria-live="polite">
      <span className="success-icon"><Icon name="check-circle" size={29} /></span><p className="eyebrow">Interest recorded</p><h2>Thanks, {fullName.split(" ")[0] || "there"}.</h2><p>Your interest in the Showcase Open Evening has been recorded by this prototype.</p><div className="confirmation-reference"><span>Prototype reference</span><strong>{reference}</strong></div><p className="form-legal-note">This is not a booking-platform confirmation or a confirmed place. The college’s live event-booking service has not been connected.</p><Link className="button button-outline" href="/events">Back to events <Icon name="arrow" size={17} /></Link>
    </div>
  );

  return (
    <form className="prototype-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field"><label htmlFor="event-name">Your name</label><input id="event-name" name="name" autoComplete="name" required minLength={2} maxLength={160} value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="First and last name" /></div>
      <div className="form-field"><label htmlFor="event-email">Email address</label><input id="event-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
      <label className="consent-check"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><span>I’m happy for Chelmsford College to use these details to respond to my event interest.</span></label>
      {error && <p className="form-error" role="alert"><Icon name="close" size={16} />{error}</p>}
      <button className="button button-green button-block" type="submit" disabled={loading}>{loading ? "Recording your interest…" : "Send my interest"}<Icon name="arrow" size={18} /></button>
      <p className="form-legal-note">This prototype stores an interest request to demonstrate the flow; it does not reserve a place.</p>
    </form>
  );
}
