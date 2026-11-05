"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";

type PaymentCategory = "deposit" | "materials" | "trip";
type PayerType = "student" | "parent";
type DepositRefType = "studentNumber" | "appReference";
type Step = 1 | 2 | 3 | 4 | 5 | 6;
type PaymentOutcome = "success" | "declined" | "cancelled";

interface MaterialFeeOption {
  courseTitle: string;
  amount: number;
  label: string;
}

interface TripFeeOption {
  tripTitle: string;
  amount: number;
  label: string;
}

const materialFeeOptions: MaterialFeeOption[] = [
  { courseTitle: "Creative Industries, Art & Fashion", amount: 80.0, label: "£80.00 — Art, Fashion & Media materials fee" },
  { courseTitle: "Graphic Design (UAL Level 3)", amount: 75.0, label: "£75.00 — Graphic Design studio & Mac suite fee" },
  { courseTitle: "Hairdressing & Beauty Therapy", amount: 85.0, label: "£85.00 — The Hub commercial salon uniform & kit" },
  { courseTitle: "Performing & Production Arts", amount: 175.0, label: "£175.00 — Technical production materials & 3 theatre trips" },
  { courseTitle: "Construction, Plumbing & Carpentry", amount: 35.0, label: "£35.00 — Workshop PPE, polo shirts & safety gear" },
];

const tripFeeOptions: TripFeeOption[] = [
  { tripTitle: "Gateway Level 2 Digital & IT Skills Trip", amount: 50.0, label: "£50.00 — Digital industry visit & exhibition" },
  { tripTitle: "BTEC Level 3 IT Educational Excursion", amount: 100.0, label: "£100.00 — National Computing Museum & technology trip" },
  { tripTitle: "T Level Legal Services & Business Enrichment", amount: 25.0, label: "£25.00 — Law courts visit & guest masterclass" },
  { tripTitle: "Uniformed Services Field Expedition", amount: 45.0, label: "£45.00 — Outdoor expedition & fitness residential" },
];

const steps = ["Choose payment", "Who’s paying?", "Reference", "Review", "Secure handoff", "Confirmation"];

export function PaymentWizard() {
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState<PaymentCategory>("deposit");
  const [payer, setPayer] = useState<PayerType>("student");

  // Specific amount selections for Materials and Trips from course dataset
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0);
  const [selectedTripIndex, setSelectedTripIndex] = useState(0);

  // Payer details form
  const [studentName, setStudentName] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerEmail, setPayerEmail] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [relationship, setRelationship] = useState("Parent");
  const [payerError, setPayerError] = useState("");

  // Deposit-specific reference identification (Section 8.B)
  const [depositRefType, setDepositRefType] = useState<DepositRefType>("studentNumber");
  const [studentNumber, setStudentNumber] = useState("");
  const [appReference, setAppReference] = useState("");

  // General reference for Materials & Trips
  const [generalReference, setGeneralReference] = useState("");
  const [referenceError, setReferenceError] = useState("");

  // Review & confirmation
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const [simulatedOutcome, setSimulatedOutcome] = useState<PaymentOutcome>("success");
  const [transactionId, setTransactionId] = useState("");

  // Determine current active amount and description
  const depositAmount = 150.0;
  const currentMaterial = materialFeeOptions[selectedMaterialIndex];
  const currentTrip = tripFeeOptions[selectedTripIndex];

  const currentAmount =
    category === "deposit"
      ? depositAmount
      : category === "materials"
      ? currentMaterial.amount
      : currentTrip.amount;

  const currentAmountFormatted = `£${currentAmount.toFixed(2)}`;
  const currentTitle =
    category === "deposit"
      ? "Course deposit"
      : category === "materials"
      ? "Materials fee"
      : "Trips & one-off payments";

  const currentTiming =
    category === "deposit"
      ? "Before enrolment"
      : category === "materials"
      ? "After enrolment"
      : "One-off payment";

  const currentDescription =
    category === "deposit"
      ? "Secures your place on your chosen qualification prior to formal enrolment."
      : category === "materials"
      ? currentMaterial.label
      : currentTrip.label;

  const resolvedReference =
    category === "deposit"
      ? depositRefType === "studentNumber"
        ? studentNumber.trim()
        : appReference.trim()
      : generalReference.trim();

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

    if (category === "deposit") {
      if (depositRefType === "studentNumber") {
        const num = studentNumber.trim();
        if (!num) {
          setReferenceError("Please enter the student ID number found on your college letter or email.");
          return;
        }
        if (!/^\d{6,8}$/.test(num)) {
          setReferenceError("Student ID numbers must be 6 to 8 digits (for example: 20268492).");
          return;
        }
      } else {
        const appRef = appReference.trim();
        if (!appRef) {
          setReferenceError("Please enter your Application Reference from your admissions confirmation.");
          return;
        }
        if (appRef.length < 5) {
          setReferenceError("Application references are formatted like APP-2026-9812 or CC104829.");
          return;
        }
      }
    } else {
      const trimmed = generalReference.trim();
      if (!trimmed) {
        setReferenceError("Please enter your student ID or course payment reference.");
        return;
      }
      if (trimmed.length < 4) {
        setReferenceError("References are typically 6-8 digits (student ID) or formatted like CC104829.");
        return;
      }
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
      {/* Mobile keyboard-scrollable step progress indicator (Section 9.D) */}
      <div
        className="payment-progress"
        tabIndex={0}
        role="region"
        aria-label={`Payment steps progress, step ${step} of 6. Use left and right arrow keys to scroll steps on smaller screens.`}
      >
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

      {/* STAGE 1: CATEGORY & AMOUNT SELECTION */}
      {step === 1 && (
        <div className="payment-step-layout">
          <section className="payment-step-main">
            <p className="eyebrow">Payment category</p>
            <h2>What would you like to pay?</h2>
            <p className="payment-step-intro">
              Select the category indicated on your college letter or payment email. Amounts for materials and trips reflect actual fees from the course catalogue.
            </p>

            <div className="payment-category-list" role="radiogroup" aria-label="Choose a payment category">
              {/* Option 1: Course Deposit */}
              <button
                type="button"
                role="radio"
                aria-checked={category === "deposit"}
                className={`payment-category-option ${category === "deposit" ? "is-selected" : ""}`}
                onClick={() => setCategory("deposit")}
              >
                <span className="payment-category-radio">{category === "deposit" && <i />}</span>
                <div className="payment-category-info">
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                    <strong>Course deposit</strong>
                    <span className="tag tag-neutral" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                      Illustrative amount
                    </span>
                  </div>
                  <small>Secures your place on your chosen qualification prior to formal enrolment.</small>
                  <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "var(--color-neutral-muted)" }}>
                    * College has not supplied a fixed deposit fee; £150.00 is displayed as an illustrative example.
                  </p>
                </div>
                <div className="payment-category-amount" style={{ textAlign: "right" }}>
                  <strong>£150.00</strong>
                  <small>Illustrative</small>
                </div>
              </button>

              {/* Option 2: Materials Fee */}
              <button
                type="button"
                role="radio"
                aria-checked={category === "materials"}
                className={`payment-category-option ${category === "materials" ? "is-selected" : ""}`}
                onClick={() => setCategory("materials")}
              >
                <span className="payment-category-radio">{category === "materials" && <i />}</span>
                <div className="payment-category-info">
                  <strong>Materials fee</strong>
                  <small>For specialist workshop tools, salon kits, Mac suites, and protective wear.</small>
                  <span className="tag tag-blue" style={{ fontSize: "0.75rem", fontWeight: 700, marginTop: "4px" }}>
                    Actual course fee: {currentMaterial.amount > 0 ? `£${currentMaterial.amount.toFixed(2)}` : "Course specific"}
                  </span>
                </div>
                <div className="payment-category-amount" style={{ textAlign: "right" }}>
                  <strong>£{currentMaterial.amount.toFixed(2)}</strong>
                  <small>From syllabus</small>
                </div>
              </button>

              {/* Option 3: Trips & One-Off */}
              <button
                type="button"
                role="radio"
                aria-checked={category === "trip"}
                className={`payment-category-option ${category === "trip" ? "is-selected" : ""}`}
                onClick={() => setCategory("trip")}
              >
                <span className="payment-category-radio">{category === "trip" && <i />}</span>
                <div className="payment-category-info">
                  <strong>Trips & one-off payments</strong>
                  <small>For educational excursions, industry visits, residentials, and theatre trips.</small>
                  <span className="tag tag-green" style={{ fontSize: "0.75rem", fontWeight: 700, marginTop: "4px" }}>
                    Actual trip fee: £{currentTrip.amount.toFixed(2)}
                  </span>
                </div>
                <div className="payment-category-amount" style={{ textAlign: "right" }}>
                  <strong>£{currentTrip.amount.toFixed(2)}</strong>
                  <small>From syllabus</small>
                </div>
              </button>
            </div>

            {/* If Materials Fee selected: pick syllabus course item */}
            {category === "materials" && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1.25rem",
                  background: "var(--surface)",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                }}
              >
                <label htmlFor="material-select" style={{ display: "block", fontWeight: 700, marginBottom: "0.5rem", color: "var(--navy)" }}>
                  Select your course materials fee:
                </label>
                <select
                  id="material-select"
                  value={selectedMaterialIndex}
                  onChange={(e) => setSelectedMaterialIndex(Number(e.target.value))}
                  style={{
                    width: "100%",
                    height: "46px",
                    padding: "0 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid var(--line)",
                    background: "#ffffff",
                    fontSize: "0.95rem",
                  }}
                >
                  {materialFeeOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* If Trip selected: pick syllabus trip item */}
            {category === "trip" && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1.25rem",
                  background: "var(--surface)",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                }}
              >
                <label htmlFor="trip-select" style={{ display: "block", fontWeight: 700, marginBottom: "0.5rem", color: "var(--navy)" }}>
                  Select your educational excursion or trip:
                </label>
                <select
                  id="trip-select"
                  value={selectedTripIndex}
                  onChange={(e) => setSelectedTripIndex(Number(e.target.value))}
                  style={{
                    width: "100%",
                    height: "46px",
                    padding: "0 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid var(--line)",
                    background: "#ffffff",
                    fontSize: "0.95rem",
                  }}
                >
                  {tripFeeOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ marginTop: "1.75rem" }}>
              <button
                className="button button-primary"
                type="button"
                onClick={() => setStep(2)}
              >
                Continue to payer details <Icon name="arrow" size={18} />
              </button>
            </div>
          </section>

          <aside className="payment-help-panel payment-summary-aside">
            <p className="eyebrow">Payment overview</p>
            <h3>{currentTitle}</h3>
            <p>{currentTiming}</p>
            <div className="summary-divider" />
            <p className="summary-small-label">Selected Amount</p>
            <strong style={{ fontSize: "1.5rem", color: "var(--color-primary-blue)", display: "block", marginBottom: "0.5rem" }}>
              {currentAmountFormatted}
            </strong>
            {category === "deposit" && (
              <small style={{ display: "block", color: "var(--color-neutral-muted)", marginBottom: "0.75rem" }}>
                * Illustrative amount for prototype demonstration.
              </small>
            )}
            <p className="summary-small-label">Description</p>
            <p style={{ fontSize: "0.88rem", color: "var(--body)" }}>{currentDescription}</p>
          </aside>
        </div>
      )}

      {/* STAGE 2: WHO IS PAYING? (STUDENT VS PARENT/CARER) */}
      {step === 2 && (
        <div className="payment-step-layout">
          <section className="payment-step-main">
            <button type="button" className="back-link payment-back" onClick={back}>
              <Icon name="back" size={17} /> Change payment type
            </button>
            <p className="eyebrow">Payer details</p>
            <h2>Who is making this payment?</h2>
            <p className="payment-step-intro">
              Parents, carers, and legal guardians can pay securely on behalf of enrolled students.
            </p>

            <div className="payer-choice-list" role="radiogroup" aria-label="Who is making this payment?">
              {[
                { id: "student" as const, title: "I am a student", body: "I am paying for my own college course, materials, or trip." },
                { id: "parent" as const, title: "I am a parent or carer", body: "I am paying on behalf of an enrolled student." },
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
                      aria-required="true"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="student-payer-email">Email address for receipt delivery *</label>
                    <input
                      id="student-payer-email"
                      type="email"
                      value={payerEmail}
                      onChange={(e) => setPayerEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="student-payer-phone">
                      Telephone number <span className="optional-label">Optional</span>
                    </label>
                    <input
                      id="student-payer-phone"
                      type="tel"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="Mobile number"
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
                      placeholder="Your first and last name"
                      required
                      aria-required="true"
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
                        borderRadius: "6px",
                        border: "1px solid var(--line)",
                        background: "#ffffff",
                      }}
                    >
                      <option value="Parent">Parent</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                      <option value="Carer">Carer</option>
                      <option value="Other Family Member">Other Family Member</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="student-enrolled-name">Student full name (enrolled) *</label>
                    <input
                      id="student-enrolled-name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Student's first and last name"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="parent-email">Parent / Carer email address (for card receipt) *</label>
                    <input
                      id="parent-email"
                      type="email"
                      value={payerEmail}
                      onChange={(e) => setPayerEmail(e.target.value)}
                      placeholder="parent@example.com"
                      required
                      aria-required="true"
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
            <h3>{currentTitle}</h3>
            <p>{currentTiming}</p>
            <div className="summary-divider" />
            <p className="summary-small-label">Amount</p>
            <strong style={{ fontSize: "1.4rem", color: "var(--color-primary-blue)", display: "block", marginBottom: "0.5rem" }}>
              {currentAmountFormatted}
            </strong>
            <p className="summary-small-label">Payer context</p>
            <strong>{payer === "student" ? "Enrolled Student" : `Parent / Carer (${relationship})`}</strong>
          </aside>
        </div>
      )}

      {/* STAGE 3: REFERENCE IDENTIFICATION (SPECIFIC STUDENT ID OR APPLICATION REF) */}
      {step === 3 && (
        <div className="payment-step-layout">
          <section className="payment-step-main">
            <button type="button" className="back-link payment-back" onClick={back}>
              <Icon name="back" size={17} /> Edit payer details
            </button>
            <p className="eyebrow">Reference identification</p>
            <h2>
              {category === "deposit"
                ? "Enter student number or application reference."
                : "Enter college student reference."}
            </h2>
            <p className="payment-step-intro">
              {category === "deposit"
                ? "To allocate your course deposit correctly, provide either your college Student ID Number (from your offer email) or your admissions Application Reference."
                : "Enter the Student ID Number found on your college ID card, enrolment confirmation, or fee invoice."}
            </p>

            <form className="reference-form" onSubmit={handleReferenceSubmit} noValidate>
              {category === "deposit" ? (
                <>
                  {/* Radio Choice between Student Number & Application Reference */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.75rem",
                      marginBottom: "1.25rem",
                    }}
                    role="radiogroup"
                    aria-label="Choose identification type"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={depositRefType === "studentNumber"}
                      className={`payer-choice ${depositRefType === "studentNumber" ? "is-selected" : ""}`}
                      onClick={() => {
                        setDepositRefType("studentNumber");
                        setReferenceError("");
                      }}
                      style={{ padding: "0.85rem 1rem" }}
                    >
                      <span className="payment-category-radio">{depositRefType === "studentNumber" && <i />}</span>
                      <span>
                        <strong>Student Number</strong>
                        <small>6 to 8 digit college ID</small>
                      </span>
                    </button>

                    <button
                      type="button"
                      role="radio"
                      aria-checked={depositRefType === "appReference"}
                      className={`payer-choice ${depositRefType === "appReference" ? "is-selected" : ""}`}
                      onClick={() => {
                        setDepositRefType("appReference");
                        setReferenceError("");
                      }}
                      style={{ padding: "0.85rem 1rem" }}
                    >
                      <span className="payment-category-radio">{depositRefType === "appReference" && <i />}</span>
                      <span>
                        <strong>Application Reference</strong>
                        <small>e.g. APP-2026-9812</small>
                      </span>
                    </button>
                  </div>

                  {depositRefType === "studentNumber" ? (
                    <div className="form-field">
                      <label htmlFor="student-number-input">College Student Number (6 to 8 digits) *</label>
                      <input
                        id="student-number-input"
                        value={studentNumber}
                        onChange={(e) => {
                          setStudentNumber(e.target.value.replace(/\D/g, ""));
                          setReferenceError("");
                        }}
                        maxLength={8}
                        placeholder="e.g. 20268492"
                        autoComplete="off"
                        aria-describedby="student-number-help"
                      />
                      <small id="student-number-help" className="form-helper">
                        Format: numeric only, 6 to 8 digits (printed on your admissions letter).
                      </small>
                    </div>
                  ) : (
                    <div className="form-field">
                      <label htmlFor="app-ref-input">Application Reference Code *</label>
                      <input
                        id="app-ref-input"
                        value={appReference}
                        onChange={(e) => {
                          setAppReference(e.target.value.toUpperCase());
                          setReferenceError("");
                        }}
                        maxLength={24}
                        placeholder="e.g. APP-2026-9812"
                        autoComplete="off"
                        aria-describedby="app-ref-help"
                      />
                      <small id="app-ref-help" className="form-helper">
                        Format: issued upon online application submission (e.g. APP-2026-XXXX or CC-XXXXXX).
                      </small>
                    </div>
                  )}

                  <div style={{ margin: "0.75rem 0 1.25rem" }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (depositRefType === "studentNumber") {
                          setStudentNumber("20268492");
                        } else {
                          setAppReference("APP-2026-9812");
                        }
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
                      Fill sample {depositRefType === "studentNumber" ? "Student ID (20268492)" : "Application Ref (APP-2026-9812)"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-field">
                    <label htmlFor="general-reference-input">Student ID or Payment Reference *</label>
                    <input
                      id="general-reference-input"
                      value={generalReference}
                      onChange={(e) => {
                        setGeneralReference(e.target.value);
                        setReferenceError("");
                      }}
                      maxLength={32}
                      placeholder="e.g. 20268492 or CC-MAT-401"
                      autoComplete="off"
                    />
                    <small className="form-helper">
                      Printed on your course kit letter or provided by your department tutor.
                    </small>
                  </div>
                  <div style={{ margin: "0.75rem 0 1.25rem" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setGeneralReference("20268492");
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
                      Fill sample Student ID (20268492)
                    </button>
                  </div>
                </>
              )}

              {referenceError && (
                <p className="form-error" role="alert" style={{ marginBottom: "1rem" }}>
                  <Icon name="close" size={16} /> {referenceError}
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
            <p style={{ fontSize: "0.88rem", lineHeight: "1.55" }}>
              {category === "deposit"
                ? "Your Student ID (6–8 digits) is located at the top right of your Chelmsford College offer letter. If you applied recently and do not have a student ID yet, use the Application Reference from your confirmation email."
                : "Check your enrolment confirmation letter or department kit list. For assistance, contact the Finance Office on 01245 29 30 31."}
            </p>
          </aside>
        </div>
      )}

      {/* STAGE 4: PAYMENT REVIEW & VALIDATION */}
      {step === 4 && (
        <div className="payment-step-layout">
          <section className="payment-step-main">
            <button type="button" className="back-link payment-back" onClick={back}>
              <Icon name="back" size={17} /> Edit reference
            </button>
            <p className="eyebrow">Check before you continue</p>
            <h2>Review your payment.</h2>
            <p className="payment-step-intro">
              Verify your payment details before handing off to the secure college payment portal.
            </p>

            <div
              style={{
                border: "1px solid var(--line)",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#ffffff",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
                <span className="eyebrow" style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                  Payment summary
                </span>
                <h3 style={{ margin: 0, color: "var(--navy)", fontSize: "1.25rem" }}>
                  {currentTitle}
                </h3>
              </div>

              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "var(--color-neutral-muted)" }}>Total amount to pay</span>
                  <strong style={{ fontSize: "1.25rem", color: "var(--color-primary-blue)" }}>
                    {currentAmountFormatted}
                  </strong>
                </div>

                {category === "deposit" && (
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem" }}>
                    <span style={{ color: "var(--color-neutral-muted)" }}>Fee status</span>
                    <span className="tag tag-neutral" style={{ fontWeight: 700 }}>
                      Illustrative deposit amount
                    </span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "var(--color-neutral-muted)" }}>Item description</span>
                  <span style={{ fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>
                    {currentDescription}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "var(--color-neutral-muted)" }}>Enrolled student</span>
                  <strong>{studentName}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "var(--color-neutral-muted)" }}>Payer</span>
                  <strong>{payer === "student" ? "Self (Student)" : `${payerName} (${relationship})`}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "var(--color-neutral-muted)" }}>
                    {category === "deposit"
                      ? depositRefType === "studentNumber"
                        ? "Student ID Number"
                        : "Application Reference"
                      : "Reference"}
                  </span>
                  <code style={{ fontWeight: 700, background: "var(--surface)", padding: "2px 6px", borderRadius: "4px" }}>
                    {resolvedReference}
                  </code>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-neutral-muted)" }}>Receipt email</span>
                  <strong>{payerEmail}</strong>
                </div>
              </div>
            </div>

            <label className="consent-check" style={{ marginBottom: "1.5rem" }}>
              <input
                type="checkbox"
                checked={reviewConfirmed}
                onChange={(e) => setReviewConfirmed(e.target.checked)}
              />
              <span>
                I confirm the student and payment details above are correct and understand this transaction will be processed via the Chelmsford College secure payment service.
              </span>
            </label>

            <button
              className="button button-green"
              type="button"
              disabled={!reviewConfirmed}
              onClick={() => setStep(5)}
            >
              Proceed to secure checkout <Icon name="arrow" size={18} />
            </button>
          </section>

          <aside className="payment-help-panel payment-summary-aside">
            <p className="eyebrow">Payment security</p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--green-700)", fontWeight: 700, margin: "0.5rem 0" }}>
              <Icon name="check-circle" size={18} />
              <span>PCI-DSS Level 1 Encrypted</span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
              Card transactions are handled through 256-bit SSL encryption. The college does not store full credit or debit card numbers on website servers.
            </p>
          </aside>
        </div>
      )}

      {/* STAGE 5: SECURE GATEWAY HANDOFF & SIMULATION */}
      {step === 5 && (
        <div className="payment-step-layout">
          <section className="payment-step-main">
            <button type="button" className="back-link payment-back" onClick={back}>
              <Icon name="back" size={17} /> Return to review
            </button>
            <p className="eyebrow">Secure payment gateway</p>
            <h2>Checkout demonstration.</h2>
            <p className="payment-step-intro">
              This interactive screen demonstrates the secure bank handoff and transaction processing states (success, decline, or cancellation).
            </p>

            <div
              style={{
                padding: "1.75rem",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <strong style={{ fontSize: "1.1rem", color: "var(--navy)" }}>Chelmsford College Payment Gateway</strong>
                  <span style={{ display: "block", fontSize: "0.85rem", color: "var(--color-neutral-muted)" }}>
                    Merchant ID: CC-ONLINE-MERCHANT-01
                  </span>
                </div>
                <strong style={{ fontSize: "1.5rem", color: "var(--color-primary-blue)" }}>
                  {currentAmountFormatted}
                </strong>
              </div>

              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1rem" }}>
                <p style={{ margin: "0 0 0.5rem", fontWeight: 700, fontSize: "0.92rem" }}>
                  Demonstration outcome selector:
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className="button button-green button-small"
                    onClick={() => triggerHandoff("success")}
                  >
                    Simulate Success <Icon name="check" size={16} />
                  </button>
                  <button
                    type="button"
                    className="button button-outline button-small"
                    onClick={() => triggerHandoff("declined")}
                    style={{ color: "var(--color-primary-error)", borderColor: "var(--color-primary-error)" }}
                  >
                    Simulate Decline <Icon name="close" size={16} />
                  </button>
                  <button
                    type="button"
                    className="button button-outline button-small"
                    onClick={() => triggerHandoff("cancelled")}
                  >
                    Simulate Cancel
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="payment-help-panel payment-summary-aside">
            <p className="eyebrow">Procurement demonstration</p>
            <h3>Simulated Gateway</h3>
            <p style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
              To protect bidder security, real payment gateway credentials are not connected in public prototype mode. Simulated outcomes verify all transaction handling flows.
            </p>
          </aside>
        </div>
      )}

      {/* STAGE 6: TRANSACTION CONFIRMATION / OUTCOME */}
      {step === 6 && (
        <div className="payment-confirmation">
          {simulatedOutcome === "success" ? (
            <div
              style={{
                padding: "2.5rem",
                textAlign: "center",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "var(--green-50)",
                  color: "var(--green-700)",
                  marginBottom: "1rem",
                }}
              >
                <Icon name="check-circle" size={32} />
              </span>
              <p className="eyebrow" style={{ color: "var(--color-primary-green)" }}>
                Payment authorised
              </p>
              <h2 style={{ fontSize: "2rem", color: "var(--navy)", margin: "0 0 0.5rem" }}>
                Payment successful
              </h2>
              <p style={{ color: "var(--body)", maxWidth: "520px", margin: "0 auto 1.5rem" }}>
                Thank you. Your transaction of <strong>{currentAmountFormatted}</strong> for <strong>{currentTitle}</strong> has been confirmed. A receipt has been dispatched to <strong>{payerEmail}</strong>.
              </p>

              <div
                style={{
                  maxWidth: "480px",
                  margin: "0 auto 2rem",
                  padding: "1.25rem",
                  background: "var(--surface)",
                  borderRadius: "8px",
                  textAlign: "left",
                  fontSize: "0.92rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-neutral-muted)" }}>Transaction ID</span>
                  <code style={{ fontWeight: 700 }}>{transactionId}</code>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-neutral-muted)" }}>Student</span>
                  <strong>{studentName}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-neutral-muted)" }}>Reference</span>
                  <strong>{resolvedReference}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-neutral-muted)" }}>Amount paid</span>
                  <strong style={{ color: "var(--green-700)" }}>{currentAmountFormatted}</strong>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="button button-outline"
                  onClick={() => window.print()}
                >
                  Print payment receipt <Icon name="arrow-up-right" size={16} />
                </button>
                <Link className="button button-primary" href="/">
                  Return to homepage <Icon name="arrow" size={17} />
                </Link>
              </div>
            </div>
          ) : simulatedOutcome === "declined" ? (
            <div
              style={{
                padding: "2.5rem",
                textAlign: "center",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#fef2f2",
                  color: "var(--color-primary-error)",
                  marginBottom: "1rem",
                }}
              >
                <Icon name="close" size={32} />
              </span>
              <p className="eyebrow" style={{ color: "var(--color-primary-error)" }}>
                Transaction not authorised
              </p>
              <h2 style={{ fontSize: "2rem", color: "var(--navy)", margin: "0 0 0.5rem" }}>
                Payment declined
              </h2>
              <p style={{ color: "var(--body)", maxWidth: "520px", margin: "0 auto 1.5rem" }}>
                Your payment provider declined the transaction. No charges have been made. Please check your card details or try a different payment method.
              </p>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => setStep(5)}
                >
                  Try again <Icon name="arrow" size={17} />
                </button>
                <Link className="button button-outline" href="/">
                  Cancel and return home
                </Link>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: "2.5rem",
                textAlign: "center",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "8px",
              }}
            >
              <p className="eyebrow">Payment cancelled</p>
              <h2 style={{ fontSize: "2rem", color: "var(--navy)", margin: "0 0 0.5rem" }}>
                Transaction cancelled
              </h2>
              <p style={{ color: "var(--body)", maxWidth: "520px", margin: "0 auto 1.5rem" }}>
                You have cancelled the checkout process. No funds were debited. You can restart your payment whenever you are ready.
              </p>
              <button
                type="button"
                className="button button-primary"
                onClick={() => setStep(1)}
              >
                Start new payment <Icon name="arrow" size={17} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
