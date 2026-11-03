import Link from "next/link";
import { Icon } from "@/components/icon";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { courseById } from "@/lib/content";

type SearchParams = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] ?? "" : value ?? "";

export default async function EnquirePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const requestedKind = first(params.type);
  const kind = requestedKind === "application" ? "application" : "enquiry";
  const courseId = first(params.course);
  const course = courseById(courseId);
  return (
    <><SiteHeader /><main id="main-content" className="page-surface form-page"><div className="shell"><div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span><span>{kind === "application" ? "Apply / enquire" : "Ask a question"}</span></div><div className="enquiry-layout"><div className="enquiry-context"><Link className="back-link" href={course ? `/courses/${course.id}` : "/courses"}><Icon name="back" size={17} /> {course ? "Back to course" : "Explore courses"}</Link><p className="eyebrow">{kind === "application" ? "Take your next step" : "We’re here to help"}</p><h1>{kind === "application" ? <>Start a conversation<br />about your <em>future.</em></> : <>A question can<br />be a <em>first step.</em></>}</h1><p>{kind === "application" ? "Share your details and the college team can follow up about your course interest." : "Tell us what you’d like to know. The college team can help point you in the right direction."}</p><div className="enquiry-support-note"><span><Icon name="sparkle" size={19} /></span><p>Course-specific details such as entry requirements, fees, campus and start date were not included in the sample data. Use the form to ask about the latest information.</p></div><div className="enquiry-help-link"><span>Prefer to browse first?</span><Link href="/courses">Explore the courses <Icon name="arrow-up-right" size={16} /></Link></div></div><div className="enquiry-form-panel"><div className="form-panel-heading"><p className="eyebrow">A few details</p><h2>Let’s get started.</h2><p>Fields marked required are needed to send your request.</p></div><EnquiryForm kind={kind} courseId={course?.id} courseTitle={course?.title} /></div></div></div></main><SiteFooter /></>
  );
}
