import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { courseById, courses } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = courseById(id);
  if (!course) {
    return {
      title: "Course Not Found",
    };
  }
  return {
    title: course.title,
    description: course.metaDesc || course.overview.slice(0, 160),
  };
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    id: course.id,
  }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
                <Icon name="back" size={17} /> Back to all courses
              </Link>
              <div className="course-tags">
                <span className="tag tag-blue">{course.subject}</span>
                <span className="tag tag-green">{course.level}</span>
                <span className="tag tag-neutral">{course.mode}</span>
              </div>
              <h1>{course.title}</h1>
              <p className="course-detail-qual">{course.qualification}</p>

              {/* Key facts area prominently showing Start Date */}
              <div className="course-detail-facts">
                <div>
                  <span>Start date</span>
                  <strong style={{ color: "var(--color-primary-blue)" }}>{course.startDate}</strong>
                </div>
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
                  <strong>
                    {course.campus}
                    <small style={{ display: "block", fontSize: "0.74rem", fontWeight: 500, color: "var(--color-neutral-muted)" }}>
                      * Illustrative campus
                    </small>
                  </strong>
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
              {/* Study Overview */}
              <section className="detail-copy-section" id="overview">
                <p className="eyebrow">Study overview</p>
                <h2>
                  A qualification in <em>{course.subject.toLowerCase()}.</em>
                </h2>
                {course.studyOverviewHtml ? (
                  <div
                    className="course-rich-content"
                    dangerouslySetInnerHTML={{ __html: course.studyOverviewHtml }}
                  />
                ) : (
                  <p>{course.overview}</p>
                )}
              </section>

              {/* Skills You'll Gain */}
              {course.skills && course.skills.length > 0 && (
                <section
                  className="course-skills-section"
                  aria-labelledby="skills-heading"
                  style={{
                    margin: "2rem 0",
                    padding: "1.75rem",
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                  }}
                >
                  <p className="eyebrow" style={{ color: "var(--color-primary-green)" }}>
                    Course outcomes
                  </p>
                  <h3 id="skills-heading" style={{ margin: "0 0 1rem", fontSize: "1.35rem", color: "var(--navy)" }}>
                    Skills you&rsquo;ll gain
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.6rem",
                    }}
                  >
                    {course.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.45rem 0.85rem",
                          background: "#ffffff",
                          border: "1px solid var(--line)",
                          borderRadius: "999px",
                          fontSize: "0.88rem",
                          fontWeight: 600,
                          color: "var(--navy)",
                        }}
                      >
                        <Icon name="check-circle" size={15} style={{ color: "var(--color-primary-green)" }} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Ready to take your next step notice */}
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

              {/* Course information sections mapped from all source columns */}
              <div className="course-accordion-list" aria-label="Course information sections">
                {/* Is this course for me? */}
                {course.courseForMeHtml && (
                  <details className="course-accordion" open>
                    <summary>
                      <span>Is this course for me?</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      <div
                        className="course-rich-content"
                        dangerouslySetInnerHTML={{ __html: course.courseForMeHtml }}
                      />
                    </div>
                  </details>
                )}

                {/* Entry requirements and eligibility */}
                {(course.eligibilityHtml || (course.entryRequirements && course.entryRequirements.length > 0)) && (
                  <details className="course-accordion" open>
                    <summary>
                      <span>Entry requirements & eligibility</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      {course.eligibilityHtml ? (
                        <div
                          className="course-rich-content"
                          dangerouslySetInnerHTML={{ __html: course.eligibilityHtml }}
                        />
                      ) : (
                        <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0", lineHeight: "1.7" }}>
                          {course.entryRequirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      )}
                      {course.eligibilitySpecificHtml && (
                        <div
                          className="course-rich-content"
                          style={{ marginTop: "0.75rem" }}
                          dangerouslySetInnerHTML={{ __html: course.eligibilitySpecificHtml }}
                        />
                      )}
                      <p style={{ marginTop: "0.75rem", fontSize: "0.92rem", color: "var(--color-neutral-muted)" }}>
                        Don&rsquo;t worry if you don&rsquo;t meet all grades exactly. We review every applicant individually and offer stepping-stone qualifications.
                      </p>
                    </div>
                  </details>
                )}

                {/* Assessment methods */}
                {course.assessment && (
                  <details className="course-accordion">
                    <summary>
                      <span>How you&rsquo;ll be assessed</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      {course.assessmentHtml ? (
                        <div
                          className="course-rich-content"
                          dangerouslySetInnerHTML={{ __html: course.assessmentHtml }}
                        />
                      ) : (
                        <p>{course.assessment}</p>
                      )}
                    </div>
                  </details>
                )}

                {/* Employability and career opportunities */}
                {course.progression && (
                  <details className="course-accordion">
                    <summary>
                      <span>Employability & career opportunities</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      {course.employabilityHtml ? (
                        <div
                          className="course-rich-content"
                          dangerouslySetInnerHTML={{ __html: course.employabilityHtml }}
                        />
                      ) : (
                        <p>{course.progression}</p>
                      )}
                    </div>
                  </details>
                )}

                {/* Course fees & Additional fees */}
                {(course.fees || course.additionalFees) && (
                  <details className="course-accordion">
                    <summary>
                      <span>Course fees & financial support</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      {course.feesHtml ? (
                        <div
                          className="course-rich-content"
                          dangerouslySetInnerHTML={{ __html: course.feesHtml }}
                        />
                      ) : (
                        <p>{course.fees}</p>
                      )}

                      {course.additionalFees && (
                        <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--line)" }}>
                          <strong>Additional course fees & kit costs:</strong>
                          {course.additionalFeesHtml ? (
                            <div
                              className="course-rich-content"
                              dangerouslySetInnerHTML={{ __html: course.additionalFeesHtml }}
                            />
                          ) : (
                            <p>{course.additionalFees}</p>
                          )}
                        </div>
                      )}

                      <p style={{ marginTop: "0.75rem", fontSize: "0.92rem", color: "var(--color-neutral-muted)" }}>
                        Learner Support Funds, kit bursaries and travel subsidies are available to help eligible students with workshop tools, uniforms and travel passes.
                      </p>
                    </div>
                  </details>
                )}

                {/* Funding information */}
                {course.funding && (
                  <details className="course-accordion">
                    <summary>
                      <span>Funding eligibility</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      <p>{course.funding}</p>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
                        {course.fundingTags?.map((tag) => (
                          <span key={tag} className="tag tag-blue">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </details>
                )}

                {/* Additional qualifications */}
                {course.additionalQuals && (
                  <details className="course-accordion">
                    <summary>
                      <span>Additional qualifications included</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      <p>{course.additionalQuals}</p>
                    </div>
                  </details>
                )}

                {/* Course contact */}
                {course.contact && (
                  <details className="course-accordion">
                    <summary>
                      <span>Course contact & enquiries</span>
                      <Icon name="plus" size={18} />
                    </summary>
                    <div className="accordion-content">
                      <p>
                        For questions about this course, contact the department directly at{" "}
                        <a href={`mailto:${course.contact}`} style={{ color: "var(--blue-700)", fontWeight: 700 }}>
                          {course.contact}
                        </a>{" "}
                        or speak to the College Careers Advice Zone on 01245 29 30 31.
                      </p>
                    </div>
                  </details>
                )}

                {/* Campus and learning facilities */}
                <details className="course-accordion">
                  <summary>
                    <span>Campus & learning facilities</span>
                    <Icon name="plus" size={18} />
                  </summary>
                  <div className="accordion-content">
                    <p>
                      Delivered at our <strong>{course.campus}</strong>. Students benefit from specialist studios, modern computer suites, learner resource centres, and student social spaces.
                    </p>
                    <small style={{ color: "var(--color-neutral-muted)" }}>
                      * Campus assignment is illustrative based on college department locations.
                    </small>
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
                <p className="eyebrow">Course key facts</p>
                <div className="visit-info-block">
                  <span className="visit-icon"><Icon name="calendar" size={18} /></span>
                  <div>
                    <strong>Start date</strong>
                    <p style={{ fontWeight: 700, color: "var(--color-primary-blue)" }}>{course.startDate}</p>
                  </div>
                </div>
                <div className="visit-info-block">
                  <span className="visit-icon"><Icon name="location" size={18} /></span>
                  <div>
                    <strong>Campus location</strong>
                    <p>{course.campus}</p>
                    <small style={{ fontSize: "0.78rem", color: "var(--color-neutral-muted)" }}>Illustrative assignment</small>
                  </div>
                </div>
                <div className="visit-info-block">
                  <span className="visit-icon"><Icon name="clock" size={18} /></span>
                  <div>
                    <strong>Duration & mode</strong>
                    <p>{course.duration} · {course.mode}</p>
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
