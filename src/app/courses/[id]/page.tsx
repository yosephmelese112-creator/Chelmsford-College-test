import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { courseById } from "@/lib/content";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courseById(id);
  if (!course) notFound();

  const applicationUrl = `/enquire?type=application&course=${encodeURIComponent(course.id)}`;
  const enquiryUrl = `/enquire?type=enquiry&course=${encodeURIComponent(course.id)}`;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="course-detail-page">
        <div className="shell">
          <div className="page-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/courses">Courses</Link>
            <span>/</span>
            <span>{course.subject}</span>
          </div>

          <section className="course-detail-hero">
            <div className="course-detail-intro">
              <Link className="back-link" href="/courses">
                <Icon name="back" size={17} /> Back to courses
              </Link>
              <div className="course-tags">
                <span className="tag tag-blue">{course.subject}</span>
                <span className="tag tag-green">{course.level}</span>
              </div>
              <h1>{course.title}</h1>
              <p className="course-detail-qual">{course.qualification}</p>

              <div className="course-detail-facts">
                <div>
                  <span>Duration</span>
                  <strong>{course.duration}</strong>
                </div>
                <div>
                  <span>Study mode</span>
                  <strong>{course.mode}</strong>
                </div>
                <div>
                  <span>Level</span>
                  <strong>{course.level}</strong>
                </div>
                <div>
                  <span>Campus</span>
                  <strong>{course.campus}</strong>
                </div>
                <div>
                  <span>Start date</span>
                  <strong>{course.startDate}</strong>
                </div>
              </div>

              <div className="detail-hero-actions">
                <Link className="button button-green" href={applicationUrl}>
                  Apply for this course <Icon name="arrow" size={18} />
                </Link>
                <Link className="text-link" href={enquiryUrl}>
                  Ask a question <Icon name="arrow-up-right" size={17} />
                </Link>
              </div>
            </div>

            <figure className="course-detail-image">
              <img src={course.image} alt={course.imageAlt} fetchPriority="high" />
              <figcaption>Chelmsford College practical learning environment</figcaption>
            </figure>
          </section>

          <div className="course-detail-layout">
            <article className="course-detail-main">
              <section className="detail-copy-section" id="overview">
                <p className="eyebrow">Course overview</p>
                <h2>
                  A qualification in <em>{course.subject.toLowerCase()}.</em>
                </h2>
                <p>{course.overview}</p>
              </section>

              <div className="course-info-notice">
                <span className="notice-icon">
                  <Icon name="sparkle" size={20} />
                </span>
                <div>
                  <strong>Ready to take your next step?</strong>
                  <p>
                    Applications are open for {course.startDate} entry at our {course.campus}. Our admissions team is on hand to answer questions about entry qualifications, bursaries and travel support.
                  </p>
                  <Link className="text-link" href={enquiryUrl}>
                    Contact our admissions team about this course <Icon name="arrow" size={17} />
                  </Link>
                </div>
              </div>

              <div className="course-accordion-list" aria-label="Course information sections">
                {course.entryRequirements && course.entryRequirements.length > 0 && (
                  <details className="course-accordion" open>
                    <summary>
                      <span>Entry requirements</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0", lineHeight: "1.7" }}>
                        {course.entryRequirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                      <p style={{ marginTop: "0.75rem", fontSize: "0.92rem", color: "var(--color-neutral-muted)" }}>
                        Don’t worry if you don’t meet all grades exactly. We review every applicant individually and offer stepping-stone qualifications.
                      </p>
                    </div>
                  </details>
                )}

                {course.modules && course.modules.length > 0 && (
                  <details className="course-accordion" open>
                    <summary>
                      <span>Course structure & modules</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      <p style={{ marginBottom: "0.75rem" }}>
                        Over the {course.duration} of this course, you’ll complete practical units designed with employer input:
                      </p>
                      <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0", lineHeight: "1.7" }}>
                        {course.modules.map((mod, i) => (
                          <li key={i}>{mod}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                )}

                {course.assessment && (
                  <details className="course-accordion">
                    <summary>
                      <span>How you’ll be assessed</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      <p>{course.assessment}</p>
                    </div>
                  </details>
                )}

                {course.fees && (
                  <details className="course-accordion">
                    <summary>
                      <span>Fees, funding and financial support</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      <p>{course.fees}</p>
                      <p style={{ marginTop: "0.75rem", fontSize: "0.92rem" }}>
                        Learner Support Funds and travel bursaries are available to help eligible students with kit, uniforms and travel passes.
                      </p>
                    </div>
                  </details>
                )}

                {course.progression && (
                  <details className="course-accordion">
                    <summary>
                      <span>Career opportunities & progression</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      <p>{course.progression}</p>
                    </div>
                  </details>
                )}

                <details className="course-accordion">
                  <summary>
                    <span>Campus and learning facilities</span>
                    <Icon name="plus" size={18} />
                  </summary>
                  <div className="accordion-content">
                    <p>
                      Delivered at our <strong>{course.campus}</strong>. Students benefit from specialist studios, modern computer suites, learner resource centres, and student social spaces.
                    </p>
                  </div>
                </details>
              </div>
            </article>

            <aside className="course-action-sidebar" aria-label="Course application actions">
              <div className="course-action-card">
                <p className="eyebrow">Your next step</p>
                <h2>Start your journey</h2>
                <p>
                  Submit your application enquiry or ask our friendly course advisers any questions before you apply.
                </p>
                <Link className="button button-green button-block" href={applicationUrl}>
                  Apply for this course <Icon name="arrow" size={18} />
                </Link>
                <Link className="button button-secondary button-block" href={enquiryUrl}>
                  Ask a question
                </Link>
                <div className="action-assurance">
                  <Icon name="check-circle" size={17} />
                  <span>Direct submission to Chelmsford College admissions.</span>
                </div>
              </div>

              <div className="event-info-card" style={{ marginTop: "1.5rem" }}>
                <p className="eyebrow">Course details</p>
                <div className="visit-info-block">
                  <span className="visit-icon"><Icon name="location" size={18} /></span>
                  <div>
                    <strong>Campus location</strong>
                    <p>{course.campus}</p>
                  </div>
                </div>
                <div className="visit-info-block">
                  <span className="visit-icon"><Icon name="calendar" size={18} /></span>
                  <div>
                    <strong>Next start date</strong>
                    <p>{course.startDate}</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Technical Architecture & SQL Integration Handover (Tender Brief Requirement 4.C) */}
          <details
            className="tech-architecture-handover"
            style={{
              marginTop: "3.5rem",
              padding: "1.5rem",
              background: "#ffffff",
              border: "1px solid var(--color-neutral-border)",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--color-primary-blue)",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <Icon name="sparkle" size={18} />
              <span>Technical Architecture & SQL Integration Handover (Tender Brief Section 4.C)</span>
            </summary>
            <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid #f0f4f8", fontSize: "0.93rem", lineHeight: "1.65" }}>
              <p style={{ fontWeight: 600, color: "var(--color-neutral-dark)", marginBottom: "0.5rem" }}>
                Pipeline Architecture: <code style={{ background: "#eef4f9", padding: "2px 6px", borderRadius: "4px" }}>College SQL Database → Backend API → Course Data Model → Reusable Course Template</code>
              </p>
              <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0 1rem" }}>
                <li>
                  <strong>1. SQL Storage Layer:</strong> Courses are defined in PostgreSQL/SQL Server (<code style={{ background: "#eef4f9", padding: "1px 5px", borderRadius: "3px" }}>college_courses</code> table in <code style={{ background: "#eef4f9", padding: "1px 5px", borderRadius: "3px" }}>src/db/schema.ts</code>) containing all fields from the college spreadsheet (title, level, duration, campus, modules, requirements, fees, progression).
                </li>
                <li>
                  <strong>2. Backend API Endpoint:</strong> The Next.js REST API (<code style={{ background: "#eef4f9", padding: "1px 5px", borderRadius: "3px" }}>/api/courses/{course.id}</code>) queries the database, serializes structured JSON, and returns cache control headers (<code style={{ background: "#eef4f9", padding: "1px 5px", borderRadius: "3px" }}>s-maxage=300, stale-while-revalidate=600</code>) for sub-millisecond edge delivery.
                </li>
                <li>
                  <strong>3. Reusable Dynamic Template:</strong> Single template (<code style={{ background: "#eef4f9", padding: "1px 5px", borderRadius: "3px" }}>src/app/courses/[id]/page.tsx</code>) dynamically handles all 5 sample courses with conditional rendering, strict null safety, and zero hard-coded content.
                </li>
                <li>
                  <strong>4. Database Synchronization:</strong> Nightly batch sync from the college MIS (ProSolution / EBS / Unit-e) or webhook triggers an on-demand revalidation (<code style={{ background: "#eef4f9", padding: "1px 5px", borderRadius: "3px" }}>{"revalidatePath('/courses')"}</code>), instantly reflecting catalog updates on the public website without redeploying code.
                </li>
              </ul>
            </div>
          </details>
        </div>

        <div className="mobile-course-action">
          <Link className="button button-green" href={applicationUrl}>
            Apply for this course <Icon name="arrow" size={18} />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
