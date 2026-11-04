"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";

export function EnquiryForm({
  kind,
  courseId,
  courseTitle,
}: {
  kind: "application" | "enquiry";
  courseId?: string;
  courseTitle?: string;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!fullName.trim() || fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please confirm your consent to continue.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, telephone, message, consent, kind, courseId, courseTitle }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string; reference?: string };
      if (!response.ok || !result.ok || !result.reference) {
        throw new Error(result.message || "We could not process your submission. Please try again.");
      }
      setReference(result.reference);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We could not process your submission. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (reference) {
    const isApplication = kind === "application";
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="success-icon">
          <Icon name="check-circle" size={32} />
        </span>
        <p className="eyebrow">{isApplication ? "Application received" : "Enquiry received"}</p>
        <h2>Thank you, {fullName.split(" ")[0] || "there"}.</h2>
        <p>
          {isApplication
            ? `Your course application for ${courseTitle || "your chosen course"} has been submitted to Chelmsford College Admissions.`
            : `Your enquiry${courseTitle ? ` regarding ${courseTitle}` : ""} has been forwarded to our course advisers.`}
        </p>

        <div className="confirmation-reference" style={{ margin: "1.5rem 0", padding: "1.25rem", background: "rgba(0,122,197,0.06)", borderRadius: "12px", border: "1px solid rgba(0,122,197,0.2)" }}>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-primary-blue)", fontWeight: 700, display: "block", marginBottom: "0.25rem" }}>
            {isApplication ? "Official Application Reference" : "Enquiry Reference"}
          </span>
          <strong style={{ fontSize: "1.6rem", fontFamily: "var(--font-heading)", color: "var(--color-neutral-dark)", letterSpacing: "0.02em" }}>
            {reference}
          </strong>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid var(--color-neutral-border)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1.5rem", textAlign: "left", fontSize: "0.92rem", lineHeight: "1.6" }}>
          <strong>Next steps:</strong>
          <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
            <li>A confirmation email has been dispatched to <strong>{email}</strong>.</li>
            {isApplication ? (
              <>
                <li>An admissions tutor will contact you within 2 working days to discuss your predicted/achieved grades.</li>
                <li>You will receive an invitation to an applicant discussion session.</li>
              </>
            ) : (
              <li>Our team typically responds to course queries within 1 business day.</li>
            )}
          </ul>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link className="button button-outline" href={courseId ? `/courses/${courseId}` : "/courses"}>
            {courseId ? "Back to course details" : "Explore courses"} <Icon name="arrow" size={17} />
          </Link>
          <Link className="button button-primary" href="/">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const isApp = kind === "application";

  return (
    <form className="prototype-form" onSubmit={handleSubmit} noValidate>
      {courseTitle && (
        <div className="enquiry-course-summary">
          <span className="summary-icon">
            <Icon name="sparkle" size={18} />
          </span>
          <div>
            <span>{isApp ? "Applying for course" : "Course enquiry for"}</span>
            <strong>{courseTitle}</strong>
          </div>
        </div>
      )}

      <div className="form-field">
        <label htmlFor="enquiry-name">Your full name *</label>
        <input
          id="enquiry-name"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={160}
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="First and last name"
          aria-required="true"
        />
      </div>

      <div className="form-field">
        <label htmlFor="enquiry-email">Email address *</label>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          aria-required="true"
        />
      </div>

      <div className="form-field">
        <label htmlFor="enquiry-phone">
          Telephone number <span className="optional-label">Optional</span>
        </label>
        <input
          id="enquiry-phone"
          name="telephone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          value={telephone}
          onChange={(event) => setTelephone(event.target.value)}
          placeholder="Contact telephone"
        />
      </div>

      <div className="form-field">
        <label htmlFor="enquiry-message">
          {isApp ? "Additional details or current qualifications" : "What would you like to know?"} <span className="optional-label">Optional</span>
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={4}
          maxLength={4000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={isApp ? "Tell us about any GCSEs or qualifications you hold or are currently studying…" : "Tell us what you’d like help with…"}
        />
      </div>

      <label className="consent-check">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
        />
        <span>
          I confirm I would like Chelmsford College to contact me regarding my {isApp ? "course application" : "enquiry"} and agree to the privacy policy.
        </span>
      </label>

      {error && (
        <p className="form-error" role="alert">
          <Icon name="close" size={16} />
          {error}
        </p>
      )}

      <button className="button button-green button-block" type="submit" disabled={loading}>
        {loading
          ? isApp ? "Submitting application…" : "Sending enquiry…"
          : isApp ? "Submit course application" : "Send my enquiry"}
        <Icon name="arrow" size={18} />
      </button>

      <p className="form-legal-note">
        {isApp
          ? "Submitting registers your application for admissions team review."
          : "Your enquiry is directed to our Careers Advice Zone advisers."}
      </p>
    </form>
  );
}
