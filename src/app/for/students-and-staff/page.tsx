import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Students & Staff Portal",
  description:
    "Quick links for current Chelmsford College students and staff: Canvas VLE, Student Hub, Term Dates, Careers Advice Zone, Library and IT support.",
};

export default function StudentsAndStaffPage() {
  const studentLinks = [
    { title: "Canvas Virtual Learning Environment (VLE)", desc: "Access your course modules, submit assignments, and view tutor feedback.", icon: "book" as const },
    { title: "Student Hub & Timetables", desc: "View your weekly class schedule, attendance records, and college notices.", icon: "calendar" as const },
    { title: "College Careers Advice Zone", desc: "Book 1-on-1 careers guidance, CV workshops, and university progression sessions.", icon: "sparkle" as const },
    { title: "Campus Library & Digital Resources", desc: "Search books, access digital research journals, and reserve quiet study booths.", icon: "arrow-up-right" as const },
    { title: "Student Support & Wellbeing", desc: "Pastoral mentoring, financial bursary advice, mental health first aiders, and SEND teams.", icon: "check-circle" as const },
    { title: "Online Payments Facility", desc: "Pay workshop material fees, kit costs, trips, and educational excursions securely.", icon: "lock" as const, href: "/payments" },
  ];

  const staffLinks = [
    { title: "Staff Intranet & HR Portal", desc: "Staff policies, annual leave booking, payroll, and college governance.", icon: "lock" as const },
    { title: "Staff IT Helpdesk & Service Desk", desc: "Classroom AV support, computer network accounts, and digital hardware requests.", icon: "sparkle" as const },
    { title: "Term Dates & College Calendar", desc: "Official academic calendar, staff CPD development days, and term dates.", icon: "calendar" as const },
  ];

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-surface">
        <div className="shell">
          <div className="page-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Students & Staff Portal</span>
          </div>

          <header className="system-heading" style={{ paddingBottom: "2rem" }}>
            <p className="eyebrow">College Portals & Services</p>
            <h1>
              Current students & staff <em>resources.</em>
            </h1>
            <p style={{ maxWidth: "680px" }}>
              Quick access to essential college learning systems, student wellbeing services, term timetables, and staff portals across Moulsham Street and Princes Road campuses.
            </p>
          </header>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.6rem", color: "var(--navy)", marginBottom: "1.25rem" }}>
              Current Students
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {studentLinks.map((item) => (
                <article
                  key={item.title}
                  style={{
                    padding: "1.5rem",
                    background: "#ffffff",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--blue-700)" }}>
                    <Icon name={item.icon} size={20} />
                    <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy)" }}>{item.title}</h3>
                  </div>
                  <p style={{ margin: 0, color: "var(--body)", fontSize: "0.92rem", lineHeight: "1.55" }}>
                    {item.desc}
                  </p>
                  {item.href ? (
                    <Link href={item.href} className="text-link" style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                      Access service <Icon name="arrow-up-right" size={15} />
                    </Link>
                  ) : (
                    <span style={{ fontSize: "0.82rem", color: "var(--color-neutral-muted)", marginTop: "auto", paddingTop: "0.5rem" }}>
                      Single Sign-On (requires student ID @chelmsford.ac.uk)
                    </span>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.6rem", color: "var(--navy)", marginBottom: "1.25rem" }}>
              Staff Services
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {staffLinks.map((item) => (
                <article
                  key={item.title}
                  style={{
                    padding: "1.5rem",
                    background: "#ffffff",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--green-700)" }}>
                    <Icon name={item.icon} size={20} />
                    <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy)" }}>{item.title}</h3>
                  </div>
                  <p style={{ margin: 0, color: "var(--body)", fontSize: "0.92rem", lineHeight: "1.55" }}>
                    {item.desc}
                  </p>
                  <span style={{ fontSize: "0.82rem", color: "var(--color-neutral-muted)", marginTop: "auto", paddingTop: "0.5rem" }}>
                    Staff credentials required
                  </span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
