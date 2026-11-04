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
