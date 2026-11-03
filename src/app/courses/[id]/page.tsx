import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { courseById } from "@/lib/content";

const unavailableSections = [
  ["What you’ll learn", "Module and learning-outcome information was not included in the available course sample."],
  ["Course structure and study information", "The supplied sample confirms the study mode and duration shown above. Timetable and study-structure details were not provided."],
  ["Entry requirements", "Entry requirements were not included in the available course sample. Contact the college for current advice."],
  ["Additional qualifications", "Additional qualification information was not supplied for this course in the available sample."],
  ["Career opportunities", "Course-specific employability information was not included in the available sample."],
  ["Assessment", "Assessment-method information was not supplied for this course in the available sample."],
  ["Fees, additional costs and funding", "No course fee, additional-cost or funding information was supplied. Contact the college for current guidance."],
];

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courseById(id);
  if (!course) notFound();
  const enquiryUrl = `/enquire?type=application&course=${encodeURIComponent(course.id)}`;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="course-detail-page">
        <div className="shell">
          <div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/courses">Courses</Link><span>/</span><span>{course.subject}</span></div>
          <section className="course-detail-hero">
            <div className="course-detail-intro">
              <Link className="back-link" href="/courses"><Icon name="back" size={17} /> Back to courses</Link>
              <div className="course-tags"><span className="tag tag-blue">{course.subject}</span><span className="tag tag-green">{course.level}</span></div>
              <h1>{course.title}</h1>
              <p className="course-detail-qual">{course.qualification}</p>
              <div className="course-detail-facts"><div><span>Duration</span><strong>{course.duration}</strong></div><div><span>Study mode</span><strong>{course.mode}</strong></div><div><span>Level</span><strong>{course.level}</strong></div></div>
              <div className="detail-hero-actions"><Link className="button button-green" href={enquiryUrl}>Apply for this course <Icon name="arrow" size={18} /></Link><Link className="text-link" href={`/enquire?type=enquiry&course=${encodeURIComponent(course.id)}`}>Ask a question <Icon name="arrow-up-right" size={17} /></Link></div>
            </div>
            <figure className="course-detail-image"><img src={course.image} alt={course.imageAlt} fetchPriority="high" /><figcaption>Explore the course</figcaption></figure>
          </section>
          <div className="course-detail-layout">
            <article className="course-detail-main">
              <section className="detail-copy-section" id="overview"><p className="eyebrow">Course overview</p><h2>A course to explore <em>{course.subject.toLowerCase()}.</em></h2><p>The course sample provided for this prototype confirms the qualification, level, duration and study mode shown above. A longer course description was not included, so no additional course-specific claims are shown here.</p></section>
              <div className="course-info-notice"><span className="notice-icon"><Icon name="sparkle" size={20} /></span><div><strong>Looking for a specific detail?</strong><p>Course information can change. Ask the college for the latest entry, start-date, campus, fee and application details.</p><Link className="text-link" href={`/enquire?type=enquiry&course=${encodeURIComponent(course.id)}`}>Contact the college about this course <Icon name="arrow" size={17} /></Link></div></div>
              <div className="course-accordion-list" aria-label="Course information sections">
                {unavailableSections.map(([heading, copy]) => <details className="course-accordion" key={heading}><summary><span>{heading}</span><Icon name="plus" size={18} /></summary><div className="accordion-content"><p>{copy}</p><Link href={`/enquire?type=enquiry&course=${encodeURIComponent(course.id)}`} className="inline-link">Ask us about {heading.toLowerCase()}</Link></div></details>)}
                <details className="course-accordion"><summary><span>Contact and course advice</span><Icon name="plus" size={18} /></summary><div className="accordion-content"><p>Use the enquiry form and the college team can help with course-specific questions. General college contact details were not present in the supplied project data.</p><Link href={`/enquire?type=enquiry&course=${encodeURIComponent(course.id)}`} className="inline-link">Enquire about this course</Link></div></details>
              </div>
            </article>
            <aside className="course-action-sidebar" aria-label="Course application actions">
              <div className="course-action-card"><p className="eyebrow">Your next step</p><h2>Want to find out more?</h2><p>Ask about this course or send an application enquiry. Course details not included in the sample can be confirmed by the college.</p><Link className="button button-green button-block" href={enquiryUrl}>Apply for this course <Icon name="arrow" size={18} /></Link><Link className="button button-secondary button-block" href={`/enquire?type=enquiry&course=${encodeURIComponent(course.id)}`}>Enquire about this course</Link><div className="action-assurance"><Icon name="check-circle" size={17} /><span>Your details go to the college team.</span></div></div>
              <p className="sidebar-data-note">Campus and start-date information were not included in the available sample.</p>
            </aside>
          </div>
        </div>
        <div className="mobile-course-action"><Link className="button button-green" href={enquiryUrl}>Apply for this course <Icon name="arrow" size={18} /></Link></div>
      </main>
      <SiteFooter />
    </>
  );
}
