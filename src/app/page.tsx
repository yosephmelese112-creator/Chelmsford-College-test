import Link from "next/link";
import type { Metadata } from "next";
import { CourseCard } from "@/components/course-card";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HomeSearchForm } from "@/components/home-search-form";
import { HeroCampaignMedia } from "@/components/hero-campaign-media";
import { courses, showcaseEvent, subjectAreas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Home | Chelmsford College",
  description:
    "Chelmsford College offers vocational courses, apprenticeships, T Levels, and adult education across Moulsham Street and Princes Road campuses in Essex.",
};

export default function HomePage() {
  const featuredCourses = [courses[0], courses[2], courses[17]];

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="home-hero shell" aria-labelledby="hero-heading">
          <div className="hero-kicker-row">
            <span className="eyebrow">
              <i className="eyebrow-dot" /> A place to find your thing
            </span>
            <Link className="quiet-link hero-event-link" href={`/events/${showcaseEvent.slug}`}>
              Come and see for yourself <Icon name="arrow-up-right" size={16} />
            </Link>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 id="hero-heading">
                Make your <span>next move</span> matter.
              </h1>
              <p className="hero-lede">
                Find the subject that sparks something. Build skills you can take anywhere. Your next chapter starts here.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/courses">
                  Find your course <Icon name="arrow" size={19} />
                </Link>
                <Link className="button button-secondary" href={`/events/${showcaseEvent.slug}`}>
                  Explore college life <Icon name="arrow-up-right" size={18} />
                </Link>
              </div>
              <div className="hero-footnote">
                <span className="hero-footnote-mark">
                  <Icon name="sparkle" size={17} />
                </span>
                <span>For school leavers, adult learners, parents and carers.</span>
              </div>
            </div>
            <HeroCampaignMedia />
          </div>

          <div className="home-search-panel" id="course-search">
            <div className="search-panel-intro">
              <span className="search-symbol">
                <Icon name="search" size={22} />
              </span>
              <div>
                <p className="eyebrow">Start with a search</p>
                <h2>What would you like to learn?</h2>
              </div>
            </div>
            <HomeSearchForm subjectAreas={subjectAreas} />
            <div className="search-panel-foot">
              <span>Need a wider view?</span>
              <Link href="/courses">
                Browse all {courses.length} available courses <Icon name="arrow-up-right" size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="section section-subjects shell" aria-labelledby="subjects-heading">
          <div className="section-heading subject-heading">
            <div>
              <p className="eyebrow">A good place to begin</p>
              <h2 id="subjects-heading">
                Find the subject<br className="desktop-break" /> that feels like <em>you.</em>
              </h2>
            </div>
            <p className="section-intro">
              Start with what you enjoy. Explore our 18 subject departments across Moulsham Street and Princes Road campuses.
            </p>
          </div>
          <div className="subject-editorial-grid">
            <div className="subject-list" aria-label="Explore subjects">
              {subjectAreas.slice(0, 7).map((subject, index) => (
                <Link
                  className="subject-row"
                  href={`/courses?subject=${encodeURIComponent(subject.name)}`}
                  key={subject.name}
                >
                  <span className="subject-number">0{index + 1}</span>
                  <span className="subject-row-copy">
                    <strong>{subject.name}</strong>
                    <small>{subject.label}</small>
                  </span>
                  <span className="subject-row-arrow">
                    <Icon name="arrow-up-right" size={18} />
                  </span>
                </Link>
              ))}
              <Link className="text-link subject-browse-link" href="/courses">
                See all {courses.length} available courses <Icon name="arrow" size={18} />
              </Link>
            </div>
            <figure className="subject-image-block">
              <img
                src="/images/fashion-studio.jpg"
                alt="A student and tutor working together in a practical college workshop."
                loading="lazy"
              />
              <figcaption>
                <span>Make. Experiment. Find your own way.</span>
                <span>01 / 18</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="featured-section" aria-labelledby="featured-heading">
          <div className="shell">
            <div className="section-heading featured-heading">
              <div>
                <p className="eyebrow">A few places to start</p>
                <h2 id="featured-heading">
                  Courses worth<br className="desktop-break" /> a closer look.
                </h2>
              </div>
              <Link className="button button-secondary" href="/courses">
                Explore all {courses.length} courses <Icon name="arrow" size={18} />
              </Link>
            </div>
            <div className="course-card-grid">
              {featuredCourses.map((course, index) => (
                <CourseCard course={course} index={index} key={course.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section shell" id="college-life" aria-labelledby="experience-heading">
          <div className="experience-image-wrap">
            <img
              src="/images/campus-learning.jpg"
              alt="A tutor guiding a student during a hands-on hair and beauty salon styling session at Chelmsford College."
              loading="lazy"
            />
            <span className="image-index">Learning happens by doing</span>
          </div>
          <div className="experience-copy">
            <p className="eyebrow">More than a timetable</p>
            <h2 id="experience-heading">
              See what a college day could <em>feel like.</em>
            </h2>
            <p>
              Step into the departments, meet the tutors and take time to explore the campus. Learning is about the people, places and experiences that help you find your next step.
            </p>
            <div className="experience-highlight">
              <span className="highlight-icon">
                <Icon name="sparkle" size={20} />
              </span>
              <p>At our open events, you can tour technical workshops and the recently refurbished leisure centre.</p>
            </div>
            <Link className="text-link" href={`/events/${showcaseEvent.slug}`}>
              Plan a visit <Icon name="arrow" size={18} />
            </Link>
          </div>
        </section>

        <section className="event-feature-section" aria-labelledby="event-heading">
          <div className="shell event-feature-grid">
            <div className="event-feature-date">
              <span>WED</span>
              <strong>04</strong>
              <span>NOV 2026</span>
            </div>
            <div className="event-feature-copy">
              <p className="eyebrow eyebrow-light">Past event · Archived</p>
              <h2 id="event-heading">
                Showcase Open Evening.<br />
                <em>Preserved timetable.</em>
              </h2>
              <p>
                Explore presentation schedules for Moulsham Street and Princes Road campuses from the 4 November Showcase.
              </p>
              <div className="event-feature-meta">
                <span>
                  <Icon name="clock" size={17} /> 6:00 PM – 8:30 PM
                </span>
                <span>
                  <Icon name="location" size={17} /> Both campuses
                </span>
              </div>
              <div className="event-feature-actions">
                <Link className="button button-green" href={`/events/${showcaseEvent.slug}`}>
                  View Showcase timetable <Icon name="arrow" size={18} />
                </Link>
                <Link className="event-list-link" href="/events">
                  All upcoming events <Icon name="arrow-up-right" size={16} />
                </Link>
              </div>
            </div>
            <div className="event-feature-image">
              <img
                src="/images/student-library.jpg"
                alt="Celebrating student success and certificates at Chelmsford College."
                loading="lazy"
              />
              <span>Campus tours and department presentations.</span>
            </div>
          </div>
        </section>

        <section className="payment-teaser shell" aria-label="Payments and student support">
          <div className="payment-teaser-icon">
            <Icon name="check-circle" size={25} />
          </div>
          <div>
            <p className="eyebrow">Online college payments</p>
            <h2>Pay course deposits, materials fees & trips securely.</h2>
            <p>
              Parents, carers and students can pay online using student ID or admissions reference numbers.
            </p>
          </div>
          <Link className="button button-secondary" href="/payments">
            Go to payments <Icon name="arrow" size={18} />
          </Link>
        </section>

        <section className="closing-cta shell" id="employers" aria-labelledby="closing-heading">
          <div className="closing-cta-pattern" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className="closing-cta-content">
            <p className="eyebrow closing-eyebrow">Your next step starts somewhere</p>
            <h2 id="closing-heading">
              Ready to see<br />what’s <em>possible?</em>
            </h2>
            <p>Explore your options across 33 qualifications or talk to our admissions team.</p>
            <div className="closing-actions">
              <Link className="button button-green" href="/courses">
                Find your course <Icon name="arrow" size={18} />
              </Link>
              <Link className="closing-secondary" href="/enquire?type=enquiry">
                Ask a question <Icon name="arrow-up-right" size={17} />
              </Link>
            </div>
          </div>
          <div className="closing-cta-mark" aria-hidden="true">
            CC<span>.</span>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
