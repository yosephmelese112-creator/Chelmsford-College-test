import Link from "next/link";
import type { Course } from "@/lib/content";
import { Icon } from "@/components/icon";

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  return (
    <article className={`course-card ${index === 1 ? "course-card-offset" : ""}`}>
      <Link className="course-card-image" href={`/courses/${course.id}`} aria-label={`View ${course.title}`}>
        <img src={course.image} alt={course.imageAlt} loading="lazy" />
        <span className="course-image-arrow" aria-hidden="true"><Icon name="arrow-up-right" size={19} /></span>
      </Link>
      <div className="course-card-body">
        <div className="course-card-meta"><span>{course.subject}</span><span>{course.level}</span></div>
        <h3><Link href={`/courses/${course.id}`}>{course.title}</Link></h3>
        <div className="course-card-facts"><span>{course.duration}</span><span className="fact-dot" aria-hidden="true" /><span>{course.mode}</span></div>
        <Link className="text-link" href={`/courses/${course.id}`}>Explore course <Icon name="arrow" size={18} /></Link>
      </div>
    </article>
  );
}
