import Link from "next/link";
import { Icon } from "@/components/icon";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { courseById } from "@/lib/content";

type SearchParams = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] ?? "" : value ?? "");

export default async function EnquirePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const requestedKind = first(params.type);
  const kind = requestedKind === "application" ? "application" : "enquiry";
  const courseId = first(params.course);
  const course = courseById(courseId);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-surface form-page">
        <div className="shell">
          <div className="page-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>{kind === "application" ? "Course application" : "Admissions enquiry"}</span>
          </div>
          <div className="enquiry-layout">
            <div className="enquiry-context">
              <Link className="back-link" href={course ? `/courses/${course.id}` : "/courses"}>
                <Icon name="back" size={17} /> {course ? `Back to ${course.title}` : "Explore courses"}
              </Link>
              <p className="eyebrow">{kind === "application" ? "Admissions process" : "We’re here to help"}</p>
              <h1>
                {kind === "application" ? (
                  <>
                    Start your <em>application.</em>
                  </>
                ) : (
                  <>
                    Ask an admissions <em>question.</em>
                  </>
                )}
              </h1>
              <p>
                {kind === "application"
                  ? "Submit your details for September 2026 entry. Our admissions tutors will review your subject interest, verify eligibility and guide you through the enrolment steps."
                  : "Have a question about courses, campuses, entry requirements or support? Send a note to our friendly admissions team."}
              </p>

              <div className="enquiry-support-note">
                <span>
                  <Icon name="sparkle" size={19} />
                </span>
                <div>
                  <strong>{kind === "application" ? "Formal application guidance" : "Admissions advice"}</strong>
                  <p>
                    {kind === "application"
                      ? "This prototype registers your formal course application interest. You will receive an application reference and direct instructions to submit your qualification certificates."
                      : "General and course-specific advice is provided free of charge by the Chelmsford College Careers Advice Zone."}
                  </p>
                </div>
              </div>

              <div className="enquiry-help-link">
                <span>Looking for other courses?</span>
                <Link href="/courses">
                  Explore all courses <Icon name="arrow-up-right" size={16} />
                </Link>
              </div>
            </div>

            <div className="enquiry-form-panel">
              <div className="form-panel-heading">
                <p className="eyebrow">{kind === "application" ? "Step 1 of 2: Application details" : "A few details"}</p>
                <h2>{kind === "application" ? "Apply for September 2026" : "Let’s get started"}</h2>
                <p>Required fields are marked with an asterisk (*).</p>
              </div>
              <EnquiryForm kind={kind} courseId={course?.id} courseTitle={course?.title} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
