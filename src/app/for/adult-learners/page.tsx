import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Adult Learners & Higher Education",
  description:
    "Explore qualifications for adults (19+), Access to Higher Education Diplomas (studied online), Advanced Learner Loans, and career changes at Chelmsford College.",
};

export default function AdultLearnersPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-surface">
        <div className="shell">
          <div className="page-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Adult Learners & Higher Education</span>
          </div>

          <header className="system-heading" style={{ paddingBottom: "2rem" }}>
            <p className="eyebrow">Adult Education & Professional Development</p>
            <h1>
              Never too late to learn, retrain or <em>reach university.</em>
            </h1>
            <p style={{ maxWidth: "680px" }}>
              Whether you want to change career, qualify for a university degree, or upskill around work and family, Chelmsford College offers flexible adult learning pathways with generous government funding and loan support.
            </p>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
              margin: "2rem 0 3.5rem",
            }}
          >
            {/* Pathway 1: Access to HE */}
            <article
              style={{
                padding: "2rem",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "var(--blue-50)",
                  color: "var(--blue-700)",
                }}
              >
                <Icon name="book" size={22} />
              </span>
              <h2 style={{ fontSize: "1.35rem", margin: 0, color: "var(--navy)" }}>Access to Higher Education (Online)</h2>
              <p style={{ color: "var(--body)", lineHeight: "1.6", margin: 0 }}>
                Did not achieve traditional A Levels? Our Access to HE Diplomas (Health Professions, Nursing) are studied independently online, giving you university entry qualifications in 1 year.
              </p>
              <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", color: "var(--body)", fontSize: "0.95rem" }}>
                <li>Multiple intakes: October 2026, January 2027, and April 2027</li>
                <li>Qualifies you for NHS, nursing, physiotherapy and healthcare degrees</li>
                <li>Write off your loan if you progress to complete a university degree!</li>
              </ul>
              <Link href="/courses/access-to-higher-education-diploma-527" className="button button-primary" style={{ marginTop: "auto" }}>
                View Access to HE Diploma <Icon name="arrow" size={17} />
              </Link>
            </article>

            {/* Pathway 2: Free Level 3 Entitlement & Funding */}
            <article
              style={{
                padding: "2rem",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "var(--green-50)",
                  color: "var(--green-700)",
                }}
              >
                <Icon name="check-circle" size={22} />
              </span>
              <h2 style={{ fontSize: "1.35rem", margin: 0, color: "var(--navy)" }}>Free Level 3 entitlement & loans</h2>
              <p style={{ color: "var(--body)", lineHeight: "1.6", margin: 0 }}>
                If you are aged 19 to 23 and don&rsquo;t yet hold a full Level 3 qualification, your tuition could be 100% free under the National Skills Fund.
              </p>
              <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", color: "var(--body)", fontSize: "0.95rem" }}>
                <li>Advanced Learner Loans available for learners aged 19+ (no upfront fees)</li>
                <li>Repayments only start once you earn over £25,000 per year</li>
                <li>Low-income fee remissions for learners receiving eligible benefits</li>
              </ul>
              <Link href="/courses" className="button button-green" style={{ marginTop: "auto" }}>
                Browse all adult courses <Icon name="arrow" size={17} />
              </Link>
            </article>

            {/* Pathway 3: Technical Trades & Evening Certifications */}
            <article
              style={{
                padding: "2rem",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "var(--surface)",
                  color: "var(--navy)",
                }}
              >
                <Icon name="sparkle" size={22} />
              </span>
              <h2 style={{ fontSize: "1.35rem", margin: 0, color: "var(--navy)" }}>Trades, Electrical & Beauty</h2>
              <p style={{ color: "var(--body)", lineHeight: "1.6", margin: 0 }}>
                Train in high-demand trades at our Princes Road and Moulsham Street facilities. Study Level 2 and Level 3 diplomas in Electrical Installation, Carpentry, Plumbing, and Beauty Therapy.
              </p>
              <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", color: "var(--body)", fontSize: "0.95rem" }}>
                <li>Industry-standard workshop equipment and safety certified tutors</li>
                <li>Links with local building contractors and commercial salons</li>
                <li>Evening and modular course options to fit your working week</li>
              </ul>
              <Link href="/enquire?type=enquiry" className="button button-outline" style={{ marginTop: "auto" }}>
                Ask our adult admissions team <Icon name="arrow" size={17} />
              </Link>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
