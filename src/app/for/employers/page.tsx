import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Employers & Apprenticeships",
  description:
    "Partner with Chelmsford College to recruit apprentices, host 45-day T Level industry placements, and upskill your Essex workforce.",
};

export default function EmployersPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-surface">
        <div className="shell">
          <div className="page-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Employers & Apprenticeships</span>
          </div>

          <header className="system-heading" style={{ paddingBottom: "2rem" }}>
            <p className="eyebrow">Workforce Solutions & Apprenticeships</p>
            <h1>
              Build your future workforce with <em>Chelmsford College.</em>
            </h1>
            <p style={{ maxWidth: "680px" }}>
              We partner with over 400 employers across Essex and the East of England to supply skilled apprentices, host 45-day T Level industry placements, and deliver bespoke professional training.
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
            {/* Offering 1: Apprenticeships */}
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
                <Icon name="sparkle" size={22} />
              </span>
              <h2 style={{ fontSize: "1.4rem", margin: 0, color: "var(--navy)" }}>Hire an apprentice</h2>
              <p style={{ color: "var(--body)", lineHeight: "1.6", margin: 0 }}>
                Recruit motivated talent across Electrical, Construction, Engineering, Business, IT, Childcare, and Catering. We handle candidate screening, training delivery, and funding claims.
              </p>
              <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", color: "var(--body)", fontSize: "0.95rem" }}>
                <li>Up to 95–100% government co-investment for small employers</li>
                <li>Apprenticeship Levy transfer support for large organisations</li>
                <li>Dedicated College Workplace Assessor for every apprentice</li>
              </ul>
              <Link
                href="/enquire?type=enquiry"
                className="button button-primary"
                style={{ marginTop: "auto" }}
              >
                Discuss hiring an apprentice <Icon name="arrow" size={17} />
              </Link>
            </article>

            {/* Offering 2: T Level Placements */}
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
              <h2 style={{ fontSize: "1.4rem", margin: 0, color: "var(--navy)" }}>T Level industry placements</h2>
              <p style={{ color: "var(--body)", lineHeight: "1.6", margin: 0 }}>
                Host our high-achieving 16–18 students for a 45-day (minimum 315 hours) industry placement. Experience prospective recruits in real workplace projects with zero salary obligations.
              </p>
              <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", color: "var(--body)", fontSize: "0.95rem" }}>
                <li>Specialisms: Digital Support, Management & Administration, Legal Services, Media, Engineering</li>
                <li>Students arrive with foundational technical and health & safety training</li>
                <li>Dedicated College Placement Officer to support compliance and mentoring</li>
              </ul>
              <Link
                href="/enquire?type=enquiry"
                className="button button-green"
                style={{ marginTop: "auto" }}
              >
                Host a T Level student <Icon name="arrow" size={17} />
              </Link>
            </article>

            {/* Offering 3: Commercial Training & Upskilling */}
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
                <Icon name="book" size={22} />
              </span>
              <h2 style={{ fontSize: "1.4rem", margin: 0, color: "var(--navy)" }}>Workforce training & upskilling</h2>
              <p style={{ color: "var(--body)", lineHeight: "1.6", margin: 0 }}>
                Develop your existing staff through accredited certifications, BS7671 wiring regulations, health & safety, management qualifications, and flexible online diplomas.
              </p>
              <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", color: "var(--body)", fontSize: "0.95rem" }}>
                <li>Flexible delivery: evening, day-release or online independent study</li>
                <li>Free Level 3 entitlement and Adult Education Budget funding options</li>
                <li>Tailored corporate cohorts for Essex companies</li>
              </ul>
              <Link
                href="/courses?mode=Online"
                className="button button-outline"
                style={{ marginTop: "auto" }}
              >
                Browse workforce courses <Icon name="arrow-up-right" size={17} />
              </Link>
            </article>
          </div>

          {/* Employer Contact Card */}
          <section
            style={{
              padding: "2.5rem",
              background: "var(--navy)",
              color: "#ffffff",
              borderRadius: "8px",
              marginBottom: "4rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <div style={{ maxWidth: "560px" }}>
              <p className="eyebrow" style={{ color: "var(--color-primary-green)" }}>
                Get in touch with our team
              </p>
              <h2 style={{ margin: "0 0 1rem", fontSize: "2rem", color: "#ffffff" }}>
                Speak to our Employer Engagement team today
              </h2>
              <p style={{ margin: 0, color: "#e2e8f0", lineHeight: "1.6" }}>
                Contact our Business Development team to discuss apprentice vacancies, placement matching, or arranging an employer advisory consultation.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href="mailto:employers@chelmsford.ac.uk"
                className="button button-green"
                style={{ minWidth: "220px", justifyContent: "center" }}
              >
                <Icon name="mail" size={18} /> employers@chelmsford.ac.uk
              </a>
              <a
                href="tel:01245293031"
                className="button button-outline"
                style={{ minWidth: "220px", justifyContent: "center", color: "#ffffff", borderColor: "rgba(255,255,255,0.4)" }}
              >
                Call 01245 29 30 31
              </a>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
