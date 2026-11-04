"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";

type PaymentCategory = "deposit" | "materials" | "trip";
type PayerType = "student" | "parent";
type Step = 1 | 2 | 3 | 4 | 5 | 6;
type PaymentOutcome = "success" | "declined" | "cancelled";

interface CategoryInfo {
  id: PaymentCategory;
  title: string;
  timing: string;
  amount: string;
  amountNumber: number;
  description: string;
  badge: string;
}

const categories: CategoryInfo[] = [
  {
    id: "deposit",
    title: "Course deposit",
    timing: "Before enrolment",
    amount: "£150.00",
    amountNumber: 150.0,
    description: "Secures your place on your chosen qualification prior to formal enrolment.",
    badge: "Before you start",
  },
  {
    id: "materials",
    title: "Materials fee",
    timing: "After enrolment",
    amount: "£85.00",
    amountNumber: 85.0,
    description: "For specialist workshop tools, studio kits and digital licenses for your enrolled study.",
    badge: "While you study",
  },
  {
    id: "trip",
    title: "Trips & one-off payments",
    timing: "One-off payment",
    amount: "£45.00",
    amountNumber: 45.0,
    description: "For educational excursions, industry visits, guest masterclasses and exam resits.",
    badge: "One-off",
  },
];

const steps = ["Choose payment", "Who’s paying?", "Reference", "Review", "Secure handoff", "Confirmation"];

export function PaymentWizard() {
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState<PaymentCategory>("deposit");
  const [payer, setPayer] = useState<PayerType>("student");

  // Payer details form
  const [studentName, setStudentName] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerEmail, setPayerEmail] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [relationship, setRelationship] = useState("Parent");
  const [payerError, setPayerError] = useState("");

  // Reference lookup
  const [reference, setReference] = useState("");
  const [referenceError, setReferenceError] = useState("");

  // Review & confirmation
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const [simulatedOutcome, setSimulatedOutcome] = useState<PaymentOutcome>("success");
  const [transactionId, setTransactionId] = useState("");

  const selectedCategory = categories.find((item) => item.id === category) ?? categories[0];
  const payerLabel = payer === "student" ? "Student" : `Parent or carer (${relationship})`;

  function handlePayerSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPayerError("");

    if (payer === "student") {
      if (!studentName.trim() || studentName.trim().length < 2) {
        setPayerError("Please enter your full name.");
        return;
      }
      if (!payerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail)) {
        setPayerError("Please enter a valid email address for receipt delivery.");
        return;
      }
    } else {
      if (!payerName.trim() || payerName.trim().length < 2) {
        setPayerError("Please enter your full name as the parent or carer.");
        return;
      }
      if (!studentName.trim() || studentName.trim().length < 2) {
        setPayerError("Please enter the full name of the student you are paying for.");
        return;
      }
      if (!payerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail)) {
        setPayerError("Please enter a valid email address for receipt delivery.");
        return;
      }
    }

    setStep(3);
  }

  function handleReferenceSubmit(e: React.FormEvent) {
    e.preventDefault();
    setReferenceError("");

    const trimmed = reference.trim();
    if (!trimmed) {
      setReferenceError("Enter the payment or student reference supplied by the college.");
      return;
    }
    if (trimmed.length < 5) {
      setReferenceError("References are typically formatted like CC104829 or 6-digit student ID.");
      return;
    }

    setStep(4);
  }

  function triggerHandoff(outcome: PaymentOutcome) {
    setSimulatedOutcome(outcome);
    const rand = Math.floor(100000 + Math.random() * 900000);
    setTransactionId(`TXN-WPM-${rand}`);
    setStep(6);
  }

  function back() {
    if (step === 6) {
      setStep(5);
      return;
    }
    setStep((current) => Math.max(1, current - 1) as Step);
  }

  return (
    <div className="payment-wizard">
      <div className="payment-progress" aria-label={`Payment step ${step} of 6`}>
        {steps.map((label, index) => (
          <div
            className={`progress-step ${
              step === index + 1 ? "is-current" : step > index + 1 ? "is-complete" : ""
            }`}
            key={label}
          >
            <span className="progress-marker">
              {step > index + 1 ? <Icon name="check" size={13} /> : index + 1}
            </span>
            <span className="progress-label">{label}</span>
          </div>
        ))}
      </div>

      {/* STAGE 1: CATEGORY SELECTION */}
      {step === 1 && (
        <div className="payment-step-layout">
          <section className="payment-step-main">
            <p className="eyebrow">Payment category</p>
            <h2>What would you like to pay?</h2>
            <p className="payment-step-intro">
              Select the payment category indicated on your college letter or email communication.
            </p>

            <div className="payment-category-list" role="radiogroup" aria-label="Choose a payment category">
              {categories.map((item) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={category === item.id}
                  className={`payment-category-option ${category === item.id ? "is-selected" : ""}`}
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                >
                  <span className="payment-category-radio">{category === item.id && <i />}</span>
                  <span className="payment-category-copy">
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </span>
                  <span className="payment-category-timing">
                    {item.badge}
                    <small>{item.timing}</small>
                    <strong style={{ display: "block", marginTop: "0.25rem", color: "var(--color-primary-blue)" }}>
                      {item.amount}
                    </strong>
                  </span>
                  <Icon name="arrow-up-right" size={18} />
                </button>
              ))}
            </div>

            <button className="button button-primary" type="button" onClick={() => setStep(2)}>
              Continue <Icon name="arrow" size={18} />
            </button>
          </section>

          <aside className="payment-help-panel">
            <span className="help-panel-icon">
              <Icon name="lock" size={20} />
            </span>
            <p className="eyebrow">Payment guidance</p>
            <h3>Have your reference ready</h3>
            <p>
              Your college reference is required in step 3. Standard course deposits are £150.00, materials fees are £85.00, and educational trips are £45.00.
            </p>
            <Link href="/events">
              Need finance advice? <Icon name="arrow-up-right" size={15} />
            </Link>
          </aside>
        </div>
      )}

      {/* STAGE 2: PAYER DETAILS */}
      {step === 2 && (
        <div className="payment-step-layout">
          <section className="payment-step-main">
            <button type="button" className="back-link payment-back" onClick={back}>
              <Icon name="back" size={17} /> Back
            </button>
            <p className="eyebrow">Payer details</p>
            <h2>Who is making this payment?</h2>
            <p className="payment-step-intro">
              Payments can be completed by the student directly or by a parent, carer or guardian on their behalf.
            </p>

            <div className="payer-choice-list" role="radiogroup" aria-label="Who is paying?">
              {[
                { id: "student" as const, title: "I am a student", body: "I’m paying for my own college course or trip." },
                { id: "parent" as const, title: "I am a parent or carer", body: "I’m paying on behalf of a student." },
              ].map((item) => (
                <button
                  className={`payer-choice ${payer === item.id ? "is-selected" : ""}`}
                  role="radio"
                  aria-checked={payer === item.id}
                  type="button"
                  key={item.id}
                  onClick={() => setPayer(item.id)}
                >
                  <span className="payment-category-radio">{payer === item.id && <i />}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.body}</small>
                  </span>
                  <Icon name="arrow-up-right" size={18} />
                </button>
              ))}
            </div>

            <form onSubmit={handlePayerSubmit} style={{ marginTop: "1.5rem" }} noValidate>
              {payer === "student" ? (
                <>
                  <div className="form-field">
                    <label htmlFor="student-payer-name">Student full name *</label>
                    <input
                      id="student-payer-name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Your first and last name"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="student-payer-email">Receipt email address *</label>
                    <input
                      id="student-payer-email"
                      type="email"
                      value={payerEmail}
                      onChange={(e) => setPayerEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="student-payer-phone">Telephone number <span className="optional-label">Optional</span></label>
                    <input
                      id="student-payer-phone"
                      type="tel"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="Mobile or home number"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-field">
                    <label htmlFor="parent-name">Parent / Carer full name *</label>
                    <input
                      id="parent-name"
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="student-name">Student full name *</label>
                    <input
                      id="student-name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Name of student enrolled"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="parent-relationship">Relationship to student</label>
                    <select
                      id="parent-relationship"
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      style={{
                        width: "100%",
                        height: "46px",
                        padding: "0 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid var(--color-neutral-border)",
                        background: "#ffffff",
                      }}
                    >
                      <option value="Parent">Parent</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                      <option value="Carer">Carer</option>
                      <option value="Other Relative">Other Relative</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="parent-email">Parent / Carer email address *</label>
                    <input
                      id="parent-email"
                      type="email"
                      value={payerEmail}
                      onChange={(e) => setPayerEmail(e.target.value)}
                      placeholder="parent@example.com"
                      required
                    />
                  </div>
                </>
              )}

              {payerError && (
                <p className="form-error" role="alert" style={{ marginBottom: "1rem" }}>
                  <Icon name="close" size={16} /> {payerError}
                </p>
              )}

              <button className="button button-primary" type="submit">
                Continue to reference <Icon name="arrow" size={18} />
              </button>
            </form>
          </section>

          <aside className="payment-help-panel payment-summary-aside">
            <p className="eyebrow">Your selection</p>
            <h3>{selectedCategory.title}</h3>
            <p>{selectedCategory.timing}</p>
            <div className="summary-divider" />
            <p className="summary-small-label">Amount</p>
            <strong style={{ fontSize: "1.4rem", color: "var(--color-primary-blue)", display: "block", marginBottom: "0.5rem" }}>
              {selectedCategory.amount}
            </strong>
            <p className="summary-small-label">Payer context</p>
            <strong>{payer === "student" ? "Enrolled Student" : "Parent / Carer"}</strong>
          </aside>
        </div>
      )}

      {/* STAGE 3: REFERENCE LOOKUP */}
      {step === 3 && (
        <div className="payment-step-layout">
          <section className="payment-step-main">
            <button type="button" className="back-link payment-back" onClick={back}>
              <Icon name="back" size={17} /> Back
            </button>
            <p className="eyebrow">Reference lookup</p>
            <h2>Enter your college reference.</h2>
            <p className="payment-step-intro">
              Enter the student ID or payment reference found on your college letter or payment email.
            </p>

            <form className="reference-form" onSubmit={handleReferenceSubmit} noValidate>
              <label className="form-field" htmlFor="payment-reference">
                <span>College or student reference *</span>
                <input
                  id="payment-reference"
                  value={reference}
                  onChange={(event) => {
                    setReference(event.target.value);
                    setReferenceError("");
                  }}
                  autoComplete="off"
                  maxLength={120}
                  placeholder="e.g. CC104829 or 6-digit student ID"
                  aria-describedby={referenceError ? "reference-error" : "reference-help"}
                  aria-invalid={Boolean(referenceError)}
                />
              </label>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <small id="reference-help" className="form-helper" style={{ margin: 0 }}>
                  Format: CC followed by 6 digits (e.g. CC104829)
                </small>
                <button
                  type="button"
                  onClick={() => {
                    setReference("CC104829");
                    setReferenceError("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-primary-blue)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Use sample ref CC104829
                </button>
              </div>

              {referenceError && (
                <p className="form-error" id="reference-error" role="alert">
                  <Icon name="close" size={16} />
                  {referenceError}
                </p>
              )}

              <button className="button button-primary" type="submit">
                Continue to review <Icon name="arrow" size={18} />
              </button>
            </form>
          </section>

          <aside className="payment-help-panel payment-summary-aside">
            <p className="eyebrow">Step 3 of 6</p>
            <h3>Where is my reference?</h3>
            <p>
              Look on the top right corner of your college offer letter or your enrolment confirmation email.
            </p>
          </aside>
        </div>
      )}

      {/* STAGE 4: PAYMENT REVIEW */}
      {step === 4 && (
        <div className="payment-step-layout">
          <section className="payment-step-main">
            <button type="button" className="back-link payment-back" onClick={back}>
              <Icon name="back" size={17} /> Edit reference
            </button>
            <p className="eyebrow">Check before you continue</p>
            <h2>Review your payment.</h2>

            <div className="payment-review-card">
              <div className="review-card-heading">
                <span>Itemised summary</span>
              </div>
              <dl>
                <div>
                  <dt>Payment category</dt>
                  <dd>
                    <strong>{selectedCategory.title}</strong>
                    <button type="button" onClick={() => setStep(1)} style={{ marginLeft: "0.5rem", border: "none", background: "none", color: "var(--color-primary-blue)", cursor: "pointer", fontSize: "0.82rem", textDecoration: "underline" }}>
                      Edit
                    </button>
                  </dd>
                </div>
                <div>
                  <dt>Purpose</dt>
                  <dd>{selectedCategory.description}</dd>
                </div>
                <div>
                  <dt>Reference</dt>
                  <dd>
                    <code>{reference.trim()}</code>
                    <button type="button" onClick={() => setStep(3)} style={{ marginLeft: "0.5rem", border: "none", background: "none", color: "var(--color-primary-blue)", cursor: "pointer", fontSize: "0.82rem", textDecoration: "underline" }}>
                      Edit
                    </button>
                  </dd>
                </div>
                <div>
                  <dt>Payer</dt>
                  <dd>{payer === "student" ? studentName : `${payerName} (${relationship})`}</dd>
                </div>
                {payer === "parent" && (
                  <div>
                    <dt>Student name</dt>
                    <dd>{studentName}</dd>
                  </div>
                )}
                <div>
                  <dt>Receipt email</dt>
                  <dd>{payerEmail}</dd>
                </div>
                <div>
                  <dt>Payment timing</dt>
                  <dd>{selectedCategory.timing}</dd>
                </div>
              </dl>
              <div className="payment-review-total">
                <span>Total amount to be charged</span>
                <strong>{selectedCategory.amount}</strong>
              </div>
            </div>

            <label className="consent-check payment-confirm-check" style={{ margin: "1.25rem 0" }}>
              <input
                type="checkbox"
                checked={reviewConfirmed}
                onChange={(event) => setReviewConfirmed(event.target.checked)}
              />
              <span>
                I have checked these details and confirm they are correct before proceeding to payment.
              </span>
            </label>

            <div className="payment-review-actions">
              <button className="button button-outline" type="button" onClick={() => setStep(2)}>
                <Icon name="back" size={17} /> Edit payer details
              </button>
              <button
                className="button button-primary"
                type="button"
                disabled={!reviewConfirmed}
                onClick={() => setStep(5)}
              >
                Proceed to payment <Icon name="arrow" size={18} />
              </button>
            </div>
          </section>

          <aside className="payment-help-panel payment-summary-aside">
            <span className="help-panel-icon">
              <Icon name="lock" size={20} />
            </span>
            <p className="eyebrow">Security standard</p>
            <h3>Zero card handling on website</h3>
            <p>
              Chelmsford College never stores or processes payment card details. All transactions are handed off to external Level 1 PCI-DSS certified banking gateways.
            </p>
          </aside>
        </div>
      )}

      {/* STAGE 5: SECURE PAYMENT GATEWAY */}
      {step === 5 && (
        <div className="payment-handoff-panel">
          <span className="handoff-lock">
            <Icon name="lock" size={28} />
          </span>
          <p className="eyebrow">External payment gateway</p>
          <h2>
            Pay securely<br />
            <em>online.</em>
          </h2>
          <p className="handoff-description">
            You will now complete your card payment on our secure banking provider service. Card details are processed directly by certified banking gateways and never stored on college servers.
          </p>

          <div className="handoff-summary">
            <span>{selectedCategory.title}</span>
            <span>Reference: {reference.trim()}</span>
            <span>Payer: {payer === "student" ? studentName : payerName}</span>
            <strong>Amount: {selectedCategory.amount}</strong>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              maxWidth: "460px",
              margin: "1.75rem auto 2rem",
            }}
          >
            <button
              type="button"
              className="button button-green button-block"
              onClick={() => triggerHandoff("success")}
              style={{ minHeight: "48px" }}
            >
              Pay now ({selectedCategory.amount}) <Icon name="arrow" size={18} />
            </button>

            <details style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--color-neutral-muted)" }}>
              <summary style={{ cursor: "pointer", textAlign: "center" }}>Test simulated gateway responses</summary>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                <button
                  type="button"
                  className="button button-outline button-block"
                  onClick={() => triggerHandoff("declined")}
                  style={{ minHeight: "40px", fontSize: "0.82rem", borderColor: "#e53e3e", color: "#c53030" }}
                >
                  Test card decline <Icon name="close" size={15} />
                </button>
                <button
                  type="button"
                  className="button button-outline button-block"
                  onClick={() => triggerHandoff("cancelled")}
                  style={{ minHeight: "40px", fontSize: "0.82rem" }}
                >
                  Test cancellation <Icon name="back" size={15} />
                </button>
              </div>
            </details>
          </div>

          <div className="handoff-actions">
            <button type="button" className="button button-outline" onClick={back}>
              <Icon name="back" size={17} /> Back to review
            </button>
          </div>
        </div>
      )}

      {/* STAGE 6: CONFIRMATION STATES */}
      {step === 6 && (
        <div className="payment-confirmation" role="status" aria-live="polite">
          {simulatedOutcome === "success" && (
            <>
              <span className="confirmation-check">
                <Icon name="check" size={28} />
              </span>
              <p className="eyebrow">Payment confirmed</p>
              <h2>
                Payment successful.<br />
                <em>Thank you.</em>
              </h2>
              <p>
                Your payment for <strong>{selectedCategory.title}</strong> has been successfully processed.
              </p>

              <div className="payment-confirmation-card">
                <div>
                  <span>Transaction ID</span>
                  <strong>{transactionId}</strong>
                </div>
                <div>
                  <span>Payment category</span>
                  <strong>{selectedCategory.title}</strong>
                </div>
                <div>
                  <span>College reference</span>
                  <strong>{reference.trim()}</strong>
                </div>
                <div>
                  <span>Amount paid</span>
                  <strong>{selectedCategory.amount}</strong>
                </div>
                <div>
                  <span>Payer</span>
                  <strong>{payerLabel}: {payer === "student" ? studentName : payerName}</strong>
                </div>
                {payer === "parent" && (
                  <div>
                    <span>Student name</span>
                    <strong>{studentName}</strong>
                  </div>
                )}
                <div>
                  <span>Receipt destination</span>
                  <strong>{payerEmail}</strong>
                </div>
                <div>
                  <span>Timestamp</span>
                  <strong>{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</strong>
                </div>
              </div>

              <div className="payment-review-actions">
                <button
                  className="button button-outline"
                  type="button"
                  onClick={() => window.print()}
                >
                  Print / Save receipt <Icon name="arrow-up-right" size={16} />
                </button>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setReference("");
                    setReviewConfirmed(false);
                  }}
                >
                  Make another payment <Icon name="arrow" size={17} />
                </button>
                <Link className="button button-outline" href="/">
                  Return home
                </Link>
              </div>
            </>
          )}

          {simulatedOutcome === "declined" && (
            <>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#fed7d7",
                  color: "#c53030",
                  margin: "0 auto 1.25rem",
                }}
              >
                <Icon name="close" size={28} />
              </span>
              <p className="eyebrow">Payment declined</p>
              <h2>
                Transaction unsuccessful.<br />
                <em>No funds were taken.</em>
              </h2>
              <p>
                The card issuer declined this transaction.
              </p>

              <div
                className="payment-confirmation-card"
                style={{ borderColor: "#feb2b2", background: "#fff5f5" }}
              >
                <div>
                  <span>Decline code</span>
                  <strong style={{ color: "#c53030" }}>DECLINED_05: Card Refused by Issuer</strong>
                </div>
                <div>
                  <span>Category</span>
                  <strong>{selectedCategory.title}</strong>
                </div>
                <div>
                  <span>Reference</span>
                  <strong>{reference.trim()}</strong>
                </div>
                <div>
                  <span>Attempted amount</span>
                  <strong>{selectedCategory.amount}</strong>
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--color-neutral-border)",
                  borderRadius: "12px",
                  padding: "1.25rem",
                  margin: "1.5rem 0",
                  textAlign: "left",
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                }}
              >
                <strong>What you can do:</strong>
                <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
                  <li>Check that your card details and billing address are correct.</li>
                  <li>Verify 3D Secure approval with your mobile banking application.</li>
                  <li>Contact the Chelmsford College Finance Office at 01245 265611 (Ext. 204) for payment support.</li>
                </ul>
              </div>

              <div className="payment-review-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => setStep(5)}
                >
                  Retry payment handoff <Icon name="arrow" size={17} />
                </button>
                <button
                  className="button button-outline"
                  type="button"
                  onClick={() => setStep(4)}
                >
                  Edit payment details
                </button>
              </div>
            </>
          )}

          {simulatedOutcome === "cancelled" && (
            <>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#edf2f7",
                  color: "#4a5568",
                  margin: "0 auto 1.25rem",
                }}
              >
                <Icon name="back" size={28} />
              </span>
              <p className="eyebrow">Payment cancelled</p>
              <h2>
                Transaction cancelled.<br />
                <em>No funds were debited.</em>
              </h2>
              <p>
                You cancelled the external payment process before completion. Your {selectedCategory.title.toLowerCase()} remains outstanding.
              </p>

              <div className="payment-confirmation-card">
                <div>
                  <span>Status</span>
                  <strong>Cancelled by user</strong>
                </div>
                <div>
                  <span>Payment category</span>
                  <strong>{selectedCategory.title}</strong>
                </div>
                <div>
                  <span>Reference</span>
                  <strong>{reference.trim()}</strong>
                </div>
                <div>
                  <span>Amount outstanding</span>
                  <strong>{selectedCategory.amount}</strong>
                </div>
              </div>

              <div className="payment-review-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => setStep(4)}
                >
                  Return to payment review <Icon name="arrow" size={17} />
                </button>
                <button
                  className="button button-outline"
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setReference("");
                    setReviewConfirmed(false);
                  }}
                >
                  Start over
                </button>
                <Link className="button button-outline" href="/">
                  Return home
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
