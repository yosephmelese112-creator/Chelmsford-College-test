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
    setLoading(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, telephone, message, consent, kind, courseId, courseTitle }),
      });
      const result = await response.json() as { ok?: boolean; message?: string; reference?: string };
      if (!response.ok || !result.ok || !result.reference) throw new Error(result.message || "We could not send your details. Please try again.");
      setReference(result.reference);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We could not send your details. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (reference) return (
    <div className="form-success" role="status" aria-live="polite">
      <span className="success-icon"><Icon name="check-circle" size={29} /></span><p className="eyebrow">{kind === "application" ? "Application enquiry received" : "Enquiry received"}</p><h2>Thanks, {fullName.split(" ")[0] || "there"}.</h2><p>Your details have been recorded for the college team{courseTitle ? ` about ${courseTitle}` : ""}.</p><div className="confirmation-reference"><span>Enquiry reference</span><strong>{reference}</strong></div>{kind === "application" && <p className="form-legal-note">This demonstration records an application enquiry; it is not a formal course application.</p>}<Link className="button button-outline" href={courseId ? `/courses/${courseId}` : "/courses"}>{courseId ? "Back to course" : "Explore courses"}<Icon name="arrow" size={17} /></Link>
    </div>
  );

  return (
    <form className="prototype-form" onSubmit={handleSubmit}>
      {courseTitle && <div className="enquiry-course-summary"><span className="summary-icon"><Icon name="sparkle" size={18} /></span><div><span>{kind === "application" ? "Application enquiry for" : "Course enquiry for"}</span><strong>{courseTitle}</strong></div></div>}
      <div className="form-field"><label htmlFor="enquiry-name">Your name</label><input id="enquiry-name" name="name" autoComplete="name" required minLength={2} maxLength={160} value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="First and last name" /></div>
      <div className="form-field"><label htmlFor="enquiry-email">Email address</label><input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
      <div className="form-field"><label htmlFor="enquiry-phone">Phone number <span className="optional-label">Optional</span></label><input id="enquiry-phone" name="telephone" type="tel" autoComplete="tel" maxLength={40} value={telephone} onChange={(event) => setTelephone(event.target.value)} placeholder="A number we can reach you on" /></div>
      <div className="form-field"><label htmlFor="enquiry-message">What would you like to know? <span className="optional-label">Optional</span></label><textarea id="enquiry-message" name="message" rows={4} maxLength={4000} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell us what you’d like help with…" /></div>
      <label className="consent-check"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><span>I’m happy for Chelmsford College to use these details to respond to my {kind}.</span></label>
      {error && <p className="form-error" role="alert"><Icon name="close" size={16} />{error}</p>}
      <button className="button button-green button-block" type="submit" disabled={loading}>{loading ? "Sending your details…" : kind === "application" ? "Send application enquiry" : "Send my enquiry"}<Icon name="arrow" size={18} /></button>
      <p className="form-legal-note">This prototype saves your request for follow-up. It does not submit a formal application.</p>
    </form>
  );
}
