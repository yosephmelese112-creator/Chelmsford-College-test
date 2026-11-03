"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";

type PaymentCategory = "deposit" | "materials" | "trip";
type PayerType = "student" | "parent";
type Step = 1 | 2 | 3 | 4 | 5 | 6;
type DemoOutcome = "not-checked" | "invalid-reference" | "no-payment" | "already-paid" | "pending" | "unsuccessful";

const categories: { id: PaymentCategory; title: string; timing: string; description: string; badge: string }[] = [
  { id: "deposit", title: "Course deposit", timing: "Before enrolment", description: "For a deposit requested by the college before you enrol.", badge: "Before you start" },
  { id: "materials", title: "Materials fee", timing: "After enrolment", description: "For course materials fees after enrolment.", badge: "While you study" },
  { id: "trip", title: "Trips & other payments", timing: "One-off payment", description: "For college trips and other one-off payments.", badge: "One-off" },
];

const steps = ["Choose payment", "Who’s paying?", "Reference", "Review", "Secure handoff", "Confirmation"];

export function PaymentWizard() {
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState<PaymentCategory>("deposit");
  const [payer, setPayer] = useState<PayerType>("student");
  const [reference, setReference] = useState("");
  const [referenceError, setReferenceError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [outcome, setOutcome] = useState<DemoOutcome>("not-checked");
  const [outcomeOpen, setOutcomeOpen] = useState(false);
  const selectedCategory = categories.find((item) => item.id === category) ?? categories[0];
  const payerLabel = payer === "student" ? "Student" : "Parent or carer";

  function lookupReference(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reference.trim()) {
      setReferenceError("Enter the payment or student reference supplied by the college.");
      return;
    }
    setReferenceError("");
    setOutcome("not-checked");
    setConfirmed(false);
    setStep(4);
  }

  function showOutcome(next: DemoOutcome) {
    setOutcome(next);
    setOutcomeOpen(false);
    setConfirmed(false);
  }

  function back() {
    if (step === 6) { setStep(5); return; }
    setStep((current) => Math.max(1, current - 1) as Step);
  }

  return (
    <div className="payment-wizard">
      <div className="payment-progress" aria-label={`Payment prototype step ${step} of 6`}>
        {steps.map((label, index) => <div className={`progress-step ${step === index + 1 ? "is-current" : step > index + 1 ? "is-complete" : ""}`} key={label}><span className="progress-marker">{step > index + 1 ? <Icon name="check" size={13} /> : index + 1}</span><span className="progress-label">{label}</span></div>)}
      </div>

      {step === 1 && <div className="payment-step-layout"><section className="payment-step-main"><p className="eyebrow">Payment type</p><h2>What would you like to pay?</h2><p className="payment-step-intro">Choose the payment category shown on the information supplied by the college.</p><div className="payment-category-list" role="radiogroup" aria-label="Choose a payment category">{categories.map((item) => <button type="button" role="radio" aria-checked={category === item.id} className={`payment-category-option ${category === item.id ? "is-selected" : ""}`} key={item.id} onClick={() => setCategory(item.id)}><span className="payment-category-radio">{category === item.id && <i />}</span><span className="payment-category-copy"><strong>{item.title}</strong><span>{item.description}</span></span><span className="payment-category-timing">{item.badge}<small>{item.timing}</small></span><Icon name="arrow-up-right" size={18} /></button>)}</div><button className="button button-primary" type="button" onClick={() => setStep(2)}>Continue <Icon name="arrow" size={18} /></button></section><aside className="payment-help-panel"><span className="help-panel-icon"><Icon name="lock" size={20} /></span><p className="eyebrow">Before you begin</p><h3>Have your college reference ready.</h3><p>You’ll find it on the payment information supplied by the college. This prototype does not check live payment records or take payment.</p><Link href="/events">Need another kind of help? <Icon name="arrow-up-right" size={15} /></Link></aside></div>}

      {step === 2 && <div className="payment-step-layout"><section className="payment-step-main"><button type="button" className="back-link payment-back" onClick={back}><Icon name="back" size={17} /> Back</button><p className="eyebrow">Payment for {selectedCategory.title.toLowerCase()}</p><h2>Who is making this payment?</h2><p className="payment-step-intro">You can pay as a student or on behalf of a student. No account is needed for this prototype.</p><div className="payer-choice-list" role="radiogroup" aria-label="Who is paying?">{([{ id: "student" as const, title: "I am a student", body: "I’m paying for my own college payment." }, { id: "parent" as const, title: "I am a parent or carer", body: "I’m paying on behalf of a student." }]).map((item) => <button className={`payer-choice ${payer === item.id ? "is-selected" : ""}`} role="radio" aria-checked={payer === item.id} type="button" key={item.id} onClick={() => setPayer(item.id)}><span className="payment-category-radio">{payer === item.id && <i />}</span><span><strong>{item.title}</strong><small>{item.body}</small></span><Icon name="arrow-up-right" size={18} /></button>)}</div><button className="button button-primary" type="button" onClick={() => setStep(3)}>Continue <Icon name="arrow" size={18} /></button></section><aside className="payment-help-panel payment-summary-aside"><p className="eyebrow">Your selection</p><h3>{selectedCategory.title}</h3><p>{selectedCategory.timing}</p><div className="summary-divider" /><p className="summary-small-label">Payer</p><strong>{payerLabel}</strong></aside></div>}

      {step === 3 && <div className="payment-step-layout"><section className="payment-step-main"><button type="button" className="back-link payment-back" onClick={back}><Icon name="back" size={17} /> Back</button><p className="eyebrow">Look up your payment</p><h2>Enter your reference.</h2><p className="payment-step-intro">Use the payment or student reference supplied by the college. The prototype cannot verify a live account or reveal student information.</p><form className="reference-form" onSubmit={lookupReference}><label className="form-field" htmlFor="payment-reference"><span>Payment or student reference</span><input id="payment-reference" value={reference} onChange={(event) => { setReference(event.target.value); setReferenceError(""); }} autoComplete="off" maxLength={120} placeholder="Enter the reference from the college" aria-describedby={referenceError ? "reference-error" : "reference-help"} aria-invalid={Boolean(referenceError)} /></label><small id="reference-help" className="form-helper">You’ll find this on your payment information or college communication.</small>{referenceError && <p className="form-error" id="reference-error" role="alert"><Icon name="close" size={16} />{referenceError}</p>}<button className="button button-primary" type="submit">Continue to review <Icon name="arrow" size={18} /></button></form><div className="prototype-alert"><span><Icon name="sparkle" size={18} /></span><p><strong>Prototype only.</strong> A live payment-reference lookup is not connected. No student record will be searched.</p></div></section><aside className="payment-help-panel payment-summary-aside"><p className="eyebrow">Step 3 of 6</p><h3>Keep your reference close.</h3><p>Only enter a reference given to you directly by the college. This demo does not ask for a password or date of birth.</p></aside></div>}

      {step === 4 && <div className="payment-step-layout"><section className="payment-step-main"><button type="button" className="back-link payment-back" onClick={back}><Icon name="back" size={17} /> Edit reference</button><p className="eyebrow">Check before you continue</p><h2>Review your payment.</h2>{outcome === "not-checked" ? <div className="prototype-alert review-alert"><span><Icon name="sparkle" size={19} /></span><div><strong>No live payment record is connected.</strong><p>This preview cannot confirm a student, course, outstanding balance, due date or payment status. No amount has been supplied and none is displayed.</p></div></div> : <div className={`payment-state-alert state-${outcome}`} role="status"><span>{outcome === "already-paid" ? <Icon name="check-circle" size={19} /> : <Icon name="sparkle" size={19} />}</span><div><strong>{outcome === "invalid-reference" ? "Reference not recognised" : outcome === "no-payment" ? "No outstanding payment" : outcome === "already-paid" ? "Payment already completed" : outcome === "pending" ? "Payment pending" : "Payment unsuccessful"}</strong><p>{outcome === "invalid-reference" ? "This prototype cannot validate that reference. Check the reference supplied by the college or contact the college team." : "This is a demonstration state only. The live payment record has not been checked."}</p></div></div>}
        <div className="payment-review-card"><div className="review-card-heading"><span>Payment summary</span><span className="tag tag-neutral">Prototype</span></div><dl><div><dt>Payment category</dt><dd>{selectedCategory.title}</dd></div><div><dt>Payment description</dt><dd>College-issued payment details not available in this prototype</dd></div><div><dt>Reference entered</dt><dd>{reference.trim() || "Not supplied"}</dd></div><div><dt>Student/payment association</dt><dd>Not available — no live record lookup</dd></div><div><dt>Amount due</dt><dd>Not supplied</dd></div><div><dt>Payment status</dt><dd>Not checked</dd></div><div><dt>Due date</dt><dd>Not supplied</dd></div><div><dt>Payer</dt><dd>{payerLabel}</dd></div></dl><div className="payment-review-total"><span>Amount to be charged in this demo</span><strong>£—</strong><small>No amount or payment record has been supplied.</small></div></div>
        {outcome === "not-checked" && <label className="consent-check payment-confirm-check"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /><span>I understand this is a non-live demonstration and no payment will be taken.</span></label>}
        <div className="payment-review-actions"><button className="button button-outline" type="button" onClick={back}><Icon name="back" size={17} /> Edit details</button>{outcome === "not-checked" && <button className="button button-primary" type="button" disabled={!confirmed} onClick={() => setStep(5)}>Continue to secure handoff <Icon name="arrow" size={18} /></button>}</div>
        <details className="outcome-preview"><summary>Preview other payment states</summary><p>These are labelled prototype examples. They do not look up or change any real payment.</p><div className="outcome-preview-buttons"><button type="button" onClick={() => showOutcome("invalid-reference")}>Invalid reference</button><button type="button" onClick={() => showOutcome("no-payment")}>No payment due</button><button type="button" onClick={() => showOutcome("already-paid")}>Already paid</button><button type="button" onClick={() => showOutcome("pending")}>Pending</button><button type="button" onClick={() => showOutcome("unsuccessful")}>Unsuccessful</button></div></details>
      </section><aside className="payment-help-panel payment-summary-aside"><span className="help-panel-icon"><Icon name="lock" size={20} /></span><p className="eyebrow">Your safety</p><h3>No card details here.</h3><p>Card information must only be entered on a confirmed, secure payment-provider service.</p></aside></div>}

      {step === 5 && <div className="payment-handoff-panel"><span className="handoff-lock"><Icon name="lock" size={28} /></span><p className="eyebrow">Secure payment handoff</p><h2>Continue to the college’s<br /><em>secure payment provider.</em></h2><p className="handoff-description">The college has not selected or connected a payment provider in this prototype. No card details are requested, stored or transmitted here.</p><div className="handoff-summary"><span>{selectedCategory.title}</span><span>Reference: {reference.trim()}</span><strong>Amount: not available in demo</strong></div><div className="prototype-alert handoff-alert"><span><Icon name="sparkle" size={17} /></span><p><strong>Integration to be confirmed.</strong> This screen is a placeholder, not a real payment gateway.</p></div><div className="handoff-actions"><button type="button" className="button button-outline" onClick={back}><Icon name="back" size={17} /> Back to review</button><button type="button" className="button button-primary" onClick={() => setStep(6)}>Simulate confirmation <Icon name="arrow" size={18} /></button></div><p className="form-legal-note">Continuing only demonstrates the flow. No payment will be taken.</p></div>}

      {step === 6 && <div className="payment-confirmation" role="status" aria-live="polite"><span className="confirmation-check"><Icon name="check" size={28} /></span><p className="eyebrow">Prototype confirmation</p><h2>Journey complete.<br /><em>No payment was taken.</em></h2><p>This is a simulated successful state for the prototype. No live payment was processed or confirmed.</p><div className="payment-confirmation-card"><div><span>Payment description</span><strong>{selectedCategory.title} · {reference.trim()}</strong></div><div><span>Payer context</span><strong>{payerLabel}</strong></div><div><span>Payment amount</span><strong>Not available in this demo</strong></div><div><span>Transaction reference</span><strong>DEMO-REFERENCE-PLACEHOLDER</strong></div></div><p className="form-legal-note">A real receipt and transaction reference can only be shown after integration with the college’s chosen payment provider.</p><div className="payment-review-actions"><button className="button button-outline" type="button" onClick={() => { setStep(1); setReference(""); setOutcome("not-checked"); setConfirmed(false); }}>Start another demo <Icon name="arrow" size={17} /></button><Link className="button button-primary" href="/">Back to home <Icon name="arrow" size={17} /></Link></div></div>}
    </div>
  );
}
