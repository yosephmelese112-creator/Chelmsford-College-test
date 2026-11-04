"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { showcaseEvent, type Presentation } from "@/lib/content";
import { Icon } from "@/components/icon";
import { CustomSelect } from "@/components/custom-select";

interface EventInfo {
  slug: string;
  title: string;
  dateLabel: string;
  time: string;
  location: string;
  parking: string;
  presentations?: Presentation[];
}

const guestOptions = [
  { value: "1", label: "1 place (just me)" },
  { value: "2", label: "2 places (me + 1 guest)" },
  { value: "3", label: "3 places (me + 2 guests)" },
  { value: "4", label: "4 places (me + 3 guests)" },
  { value: "5", label: "5 places (family group)" },
];

const subjectInterestOptions = [
  { value: "All subjects / Undecided", label: "General campus tour / Undecided" },
  { value: "Fashion & Creative Arts", label: "Fashion & Creative Arts" },
  { value: "Graphic Design & Digital Media", label: "Graphic Design & Digital Media" },
  { value: "Digital and IT & Computing", label: "Digital and IT & Computing" },
  { value: "Beauty Therapy & Hairdressing", label: "Beauty Therapy & Hairdressing" },
  { value: "Travel and Tourism", label: "Travel and Tourism" },
  { value: "Apprenticeships & T Levels", label: "Apprenticeships & T Levels" },
];

export function EventRegistrationForm({ event = showcaseEvent }: { event?: EventInfo }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [guests, setGuests] = useState("2");
  const [subjectInterest, setSubjectInterest] = useState("All subjects / Undecided");
  const [presentationSlot, setPresentationSlot] = useState("");
  const [consent, setConsent] = useState(false);

  const [bookingRef, setBookingRef] = useState("");
  const [confirmedGuests, setConfirmedGuests] = useState(2);
  const [confirmedSlot, setConfirmedSlot] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract presentation slots for select options
  const presentationOptions = [
    { value: "", label: "General drop-in arrival (no specific talk)" },
    ...(event.presentations?.flatMap((p) =>
      p.times.map((t) => ({
        value: `${p.department} — ${t}`,
        label: `${p.department} (${t})`,
      }))
    ) ?? []),
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address so we can send your confirmation.");
      return;
    }
    if (!consent) {
      setError("Please confirm your consent to receive event details.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug: event.slug,
          fullName: fullName.trim(),
          email: email.trim(),
          telephone: telephone.trim(),
          guests: Number(guests) || 1,
          subjectInterest,
          presentationSlot: presentationSlot || "General Campus Tour",
          consent,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        reference?: string;
        guests?: number;
        presentationSlot?: string;
      };

      if (!response.ok || !result.ok || !result.reference) {
        throw new Error(result.message || "We could not complete your booking. Please try again.");
      }

      setBookingRef(result.reference);
      setConfirmedGuests(result.guests ?? Number(guests) ?? 1);
      setConfirmedSlot(result.presentationSlot ?? (presentationSlot || "General Campus Tour"));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We could not complete your booking. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (bookingRef) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="success-icon">
          <Icon name="check-circle" size={32} />
        </span>
        <p className="eyebrow">Booking confirmed</p>
        <h2>You’re booked in, {fullName.split(" ")[0] || "there"}!</h2>
        <p>
          We’ve reserved your free places for the <strong>{event.title}</strong>. A confirmation has been prepared for your visit.
        </p>

        <div className="confirmation-reference" style={{ margin: "1.5rem 0", padding: "1.25rem", background: "rgba(0,122,197,0.06)", borderRadius: "12px", border: "1px solid rgba(0,122,197,0.2)" }}>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-primary-blue)", fontWeight: 700, display: "block", marginBottom: "0.25rem" }}>
            Booking Reference
          </span>
          <strong style={{ fontSize: "1.6rem", fontFamily: "var(--font-heading)", color: "var(--color-neutral-dark)", letterSpacing: "0.02em" }}>
            {bookingRef}
          </strong>
        </div>

        <div className="event-booking-summary-card" style={{ background: "#ffffff", border: "1px solid var(--color-neutral-border)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1.5rem", textAlign: "left" }}>
          <div style={{ display: "grid", gap: "0.75rem", fontSize: "0.92rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f0f4f8", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--color-neutral-muted)" }}>Event</span>
              <strong>{event.title}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f0f4f8", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--color-neutral-muted)" }}>Date & Time</span>
              <strong>{event.dateLabel} · {event.time}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f0f4f8", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--color-neutral-muted)" }}>Location</span>
              <strong>{event.location}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f0f4f8", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--color-neutral-muted)" }}>Places reserved</span>
              <strong>{confirmedGuests} {confirmedGuests === 1 ? "person" : "people"}</strong>
            </div>
            {confirmedSlot && (
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f0f4f8", paddingBottom: "0.5rem" }}>
                <span style={{ color: "var(--color-neutral-muted)" }}>Presentation slot</span>
                <strong>{confirmedSlot}</strong>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-neutral-muted)" }}>Confirmation email</span>
              <strong>{email}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            className="button button-outline"
            onClick={() => window.print()}
          >
            Print confirmation <Icon name="arrow-up-right" size={16} />
          </button>
          <Link className="button button-primary" href="/events">
            Back to events <Icon name="arrow" size={17} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="prototype-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="booking-name">Your full name *</label>
        <input
          id="booking-name"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={160}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="First and last name"
          aria-required="true"
        />
      </div>

      <div className="form-field">
        <label htmlFor="booking-email">Email address *</label>
        <input
          id="booking-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-required="true"
        />
      </div>

      <div className="form-field">
        <label htmlFor="booking-phone">
          Telephone number <span className="optional-label">Optional</span>
        </label>
        <input
          id="booking-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Mobile or landline"
        />
      </div>

      <div className="form-field">
        <label id="guests-label">How many people are attending?</label>
        <CustomSelect
          value={guests}
          onChange={setGuests}
          options={guestOptions}
          placeholder="Select number of places"
          aria-labelledby="guests-label"
        />
      </div>

      <div className="form-field">
        <label id="subject-interest-label">Main subject area of interest</label>
        <CustomSelect
          value={subjectInterest}
          onChange={setSubjectInterest}
          options={subjectInterestOptions}
          placeholder="Select subject of interest"
          aria-labelledby="subject-interest-label"
        />
      </div>

      {presentationOptions.length > 1 && (
        <div className="form-field">
          <label id="slot-label">Department presentation talk (optional)</label>
          <CustomSelect
            value={presentationSlot}
            onChange={setPresentationSlot}
            options={presentationOptions}
            placeholder="Select a presentation talk or drop-in"
            aria-labelledby="slot-label"
          />
        </div>
      )}

      <label className="consent-check">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
        />
        <span>
          I confirm I would like to book my free place and agree to Chelmsford College sending me event details and arrival directions.
        </span>
      </label>

      {error && (
        <p className="form-error" role="alert">
          <Icon name="close" size={16} />
          {error}
        </p>
      )}

      <button className="button button-green button-block" type="submit" disabled={loading}>
        {loading ? "Confirming your booking…" : "Complete free booking"}
        <Icon name="arrow" size={18} />
      </button>

      <p className="form-legal-note">
        Your details will only be used by Chelmsford College to manage your visit.
      </p>
    </form>
  );
}