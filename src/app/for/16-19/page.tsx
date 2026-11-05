import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "16 to 19 Learners & Parents",
  description:
    "Information for school leavers (ages 16–19) and parents exploring vocational diplomas, T Levels, free tuition, pastoral care, and college life at Chelmsford College.",
};

export default function SixteentoNineteenPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-surface">
        <div className="shell">
          <div className="page-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>16 to 19 Learners & Parents</span>
          </div>

          <header className="system-heading" style={{ paddingBottom: "2rem" }}>
            <p className="eyebrow">School Leavers & Parents</p>
            <h1>
              Your next chapter after year 11 starts <em>right here.</em>
            </h1>
            <p style={{ maxWidth: "680px" }}>
              At Chelmsford College, all tuition for eligible 16 to 18 year olds is 100% free. Whether you choose a hands-on vocational diploma, an industry-focused T Level, or an apprenticeship, you will learn practical skills in real technical workshops with expert tutors.
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
            {/* Card 1: Free Tuition & Financial Support */}
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
              <h2 style={{ fontSize: "1.35rem", margin: 0, color: "var(--navy)" }}>100% Free tuition for 16–18s</h2>
              <p style={{ color: "var(--body)", lineHeight: "1.6", margin: 0 }}>
                Under UK government policy, students aged 16–18 on 31 August of their enrolling year pay zero course tuition fees for full-time courses.
              </p>
              <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", color: "var(--body)", fontSize: "0.95rem" }}>
                <li>16–19 Bursary Fund to assist with travel, kit, and equipment</li>
                <li>Free College bus passes for eligible rural Essex postcodes</li>
                <li>Free college lunches support for qualifying households</li>
              </ul>
              <Link href="/courses" className="button button-green" style={{ marginTop: "auto" }}>
                Explore 16–18 courses <Icon name="arrow" size={17} />
              </Link>
            </article>

            {/* Card 2: Guidance for Parents & Carers */}
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
              <h2 style={{ fontSize: "1.35rem", margin: 0, color: "var(--navy)" }}>Information for parents & carers</h2>
              <p style={{ color: "var(--body)", lineHeight: "1.6", margin: 0 }}>
                We work in close partnership with parents and guardians to support every student&rsquo;s transition from secondary school to college independence.
              </p>
              <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", color: "var(--body)", fontSize: "0.95rem" }}>
                <li>Dedicated Personal Tutor and progress reviews each term</li>
                <li>Proactive attendance monitoring and guardian communications</li>
                <li>Comprehensive SEND support and transition mentoring</li>
              </ul>
              <Link href="/events" className="button button-primary" style={{ marginTop: "auto" }}>
                Meet tutors at an open event <Icon name="arrow" size={17} />
              </Link>
            </article>

            {/* Card 3: Pathways to University & Careers */}
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
                <Icon name="arrow-up-right" size={22} />
              </span>
              <h2 style={{ fontSize: "1.35rem", margin: 0, color: "var(--navy)" }}>Progression to degree or work</h2>
              <p style={{ color: "var(--body)", lineHeight: "1.6", margin: 0 }}>
                Our Level 3 Extended Diplomas and T Levels carry full UCAS Tariff points equivalent to three A Levels, enabling students to progress directly into Russell Group universities, degree apprenticeships, or skilled employment.
              </p>
              <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", color: "var(--body)", fontSize: "0.95rem" }}>
                <li>Dedicated Careers Advice Zone on campus</li>
                <li>One-to-one UCAS personal statement guidance</li>
                <li>Industry networking and mock interviews with employers</li>
              </ul>
              <Link href="/enquire?type=application" className="button button-outline" style={{ marginTop: "auto" }}>
                Submit an application enquiry <Icon name="arrow" size={17} />
              </Link>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

