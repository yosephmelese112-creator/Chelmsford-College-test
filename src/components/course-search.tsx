"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { courses, subjectAreas } from "@/lib/content";
import type { Course } from "@/lib/content";
import { Icon } from "@/components/icon";

function FilterFields({
  subject,
  level,
  mode,
  onSubject,
  onLevel,
  onMode,
}: {
  subject: string;
  level: string;
  mode: string;
  onSubject: (value: string) => void;
  onLevel: (value: string) => void;
  onMode: (value: string) => void;
}) {
  return (
    <div className="filter-fields">
      <label className="form-field"><span>Subject area</span><select value={subject} onChange={(event) => onSubject(event.target.value)}><option value="">All subjects</option>{subjectAreas.map((area) => <option value={area.name} key={area.name}>{area.name}</option>)}</select></label>
      <label className="form-field"><span>Qualification level</span><select value={level} onChange={(event) => onLevel(event.target.value)}><option value="">Any level</option><option>Level 2</option><option>Level 3</option></select></label>
      <label className="form-field"><span>Study mode</span><select value={mode} onChange={(event) => onMode(event.target.value)}><option value="">Any study mode</option><option>Full-time</option><option>Part-time</option></select></label>
      <label className="form-field"><span>Campus</span><select disabled aria-label="Campus filter — campus data has not been supplied"><option>Campus details not supplied</option></select><small>Campus values were not included in the available course data.</small></label>
    </div>
  );
}

function ResultCard({ course }: { course: Course }) {
  return (
    <article className="course-result">
      <Link href={`/courses/${course.id}`} className="course-result-image" aria-label={`View ${course.title}`}><img src={course.image} alt={course.imageAlt} loading="lazy" /></Link>
      <div className="course-result-content">
        <div className="course-result-meta"><span className="tag tag-blue">{course.subject}</span><span className="tag tag-neutral">{course.level}</span></div>
        <h2><Link href={`/courses/${course.id}`}>{course.title}</Link></h2>
        <p className="course-result-qualification">{course.qualification}</p>
        <div className="course-result-facts"><span><Icon name="calendar" size={16} /> {course.duration}</span><span><Icon name="sparkle" size={15} /> {course.mode}</span></div>
        <Link className="text-link" href={`/courses/${course.id}`}>View course details <Icon name="arrow" size={18} /></Link>
      </div>
      <Link className="result-arrow" href={`/courses/${course.id}`} aria-label={`View ${course.title} details`}><Icon name="arrow-up-right" size={19} /></Link>
    </article>
  );
}

export function CourseSearch({
  initialQuery = "",
  initialSubject = "",
  initialLevel = "",
  initialMode = "",
}: {
  initialQuery?: string;
  initialSubject?: string;
  initialLevel?: string;
  initialMode?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [subject, setSubject] = useState(initialSubject);
  const [level, setLevel] = useState(initialLevel);
  const [mode, setMode] = useState(initialMode);
  const [sort, setSort] = useState("recommended");
  const [filterOpen, setFilterOpen] = useState(false);
  const activeFilterCount = [subject, level, mode].filter(Boolean).length;

  useEffect(() => {
    if (!filterOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setFilterOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filterOpen]);

  const visibleCourses = useMemo(() => {
    const search = query.trim().toLowerCase();
    const matched = courses.filter((course) => {
      const matchesSearch = !search || `${course.title} ${course.subject} ${course.qualification} ${course.level}`.toLowerCase().includes(search);
      return matchesSearch && (!subject || course.subject === subject) && (!level || course.level === level) && (!mode || course.mode === mode);
    });
    if (sort === "title") matched.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "duration") matched.sort((a, b) => a.duration.localeCompare(b.duration));
    return matched;
  }, [level, mode, query, sort, subject]);

  const clearFilters = () => { setQuery(""); setSubject(""); setLevel(""); setMode(""); };
  const fields = (prefix: string) => <FilterFields subject={subject} level={level} mode={mode} onSubject={setSubject} onLevel={setLevel} onMode={setMode} key={prefix} />;

  return (
    <div className="shell course-search-page">
      <div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Courses</span></div>
      <header className="search-page-heading">
        <div><p className="eyebrow">Find your direction</p><h1>Courses to help<br className="desktop-break" /> you <em>take off.</em></h1></div>
        <p>Search the available course sample by keyword, subject, level or study mode. If you’re not sure, start with a subject that interests you.</p>
      </header>
      <form className="results-searchbar" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="course-query">Search by course, subject or qualification</label>
        <Icon name="search" size={21} />
        <input id="course-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses, subjects or qualifications" />
        {query && <button className="clear-query" type="button" onClick={() => setQuery("")}>Clear</button>}
        <button className="button button-primary searchbar-button" type="submit">Search <Icon name="arrow" size={17} /></button>
      </form>
      <div className="results-layout">
        <aside className="filters-sidebar" aria-label="Filter courses">
          <div className="filter-heading"><div><span className="filter-heading-icon"><Icon name="filter" size={19} /></span><h2>Filter courses</h2></div><button type="button" className="clear-filters" onClick={clearFilters}>Clear all</button></div>
          {fields("desktop")}
          <div className="filter-sidebar-note"><span className="note-check"><Icon name="check" size={15} /></span><p>Filters update your results as you choose them.</p></div>
        </aside>
        <section className="results-content" aria-labelledby="results-heading">
          <div className="mobile-filter-row">
            <button type="button" className="filter-open-button" aria-expanded={filterOpen} aria-controls="mobile-filters" onClick={() => setFilterOpen(true)}><Icon name="filter" size={18} /> Filters{activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}</button>
            <label className="sort-control"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="title">Course A–Z</option><option value="duration">Duration</option></select></label>
          </div>
          <div className="results-toolbar"><div><p className="eyebrow">Course directory</p><h2 id="results-heading">{visibleCourses.length} {visibleCourses.length === 1 ? "course" : "courses"}{query.trim() ? <span className="query-label"> for “{query.trim()}”</span> : null}</h2></div><label className="sort-control desktop-sort"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="title">Course A–Z</option><option value="duration">Duration</option></select></label></div>
          {(subject || level || mode) && <div className="active-filters" aria-label="Active filters"><span>Active:</span>{subject && <button type="button" onClick={() => setSubject("")}>{subject}<Icon name="close" size={14} /></button>}{level && <button type="button" onClick={() => setLevel("")}>{level}<Icon name="close" size={14} /></button>}{mode && <button type="button" onClick={() => setMode("")}>{mode}<Icon name="close" size={14} /></button>}<button type="button" className="active-clear" onClick={clearFilters}>Clear all</button></div>}
          {visibleCourses.length > 0 ? <div className="course-results-list">{visibleCourses.map((course) => <ResultCard course={course} key={course.id} />)}</div> : <div className="empty-state"><span className="empty-state-icon"><Icon name="search" size={23} /></span><p className="eyebrow">No matches just yet</p><h3>Try a different search.</h3><p>Change your keywords or clear the filters to see all courses in this sample.</p><button type="button" className="button button-outline" onClick={clearFilters}>Clear search and filters <Icon name="arrow" size={17} /></button></div>}
          <p className="results-data-note">This demonstration uses five course examples supplied in the project brief. Course campus, start date, fees and other details were not included in the source sample.</p>
        </section>
      </div>
      {filterOpen && <div className="mobile-filter-overlay" onClick={() => setFilterOpen(false)}>
        <aside id="mobile-filters" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title" className="mobile-filter-sheet" onClick={(event) => event.stopPropagation()}>
          <div className="mobile-filter-title-row"><div><p className="eyebrow">Narrow your search</p><h2 id="mobile-filter-title">Course filters</h2></div><button type="button" className="icon-button" aria-label="Close filters" onClick={() => setFilterOpen(false)}><Icon name="close" size={20} /></button></div>
          {fields("mobile")}
          <button type="button" className="button button-primary filter-show-results" onClick={() => setFilterOpen(false)}>Show {visibleCourses.length} {visibleCourses.length === 1 ? "course" : "courses"} <Icon name="arrow" size={18} /></button>
          <button type="button" className="mobile-filter-clear" onClick={() => { clearFilters(); setFilterOpen(false); }}>Clear all filters</button>
        </aside>
      </div>}
    </div>
  );
}
