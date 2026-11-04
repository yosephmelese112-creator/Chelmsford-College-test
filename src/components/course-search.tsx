"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { courses, subjectAreas } from "@/lib/content";
import type { Course } from "@/lib/content";
import { Icon } from "@/components/icon";
import { CustomSelect } from "@/components/custom-select";

const subjectSelectOptions = [
  { value: "", label: "All subjects" },
  ...subjectAreas.map((area) => ({ value: area.name, label: area.name })),
];

const levelSelectOptions = [
  { value: "", label: "Any level" },
  { value: "Level 2", label: "Level 2" },
  { value: "Level 3", label: "Level 3" },
];

const modeSelectOptions = [
  { value: "", label: "Any study mode" },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "title", label: "Course A–Z" },
  { value: "duration", label: "Duration" },
];

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
      <div className="form-field">
        <span>Subject area</span>
        <CustomSelect
          value={subject}
          onChange={onSubject}
          options={subjectSelectOptions}
          placeholder="All subjects"
          aria-label="Filter by subject area"
        />
      </div>
      <div className="form-field">
        <span>Qualification level</span>
        <CustomSelect
          value={level}
          onChange={onLevel}
          options={levelSelectOptions}
          placeholder="Any level"
          aria-label="Filter by qualification level"
        />
      </div>
      <div className="form-field">
        <span>Study mode</span>
        <CustomSelect
          value={mode}
          onChange={onMode}
          options={modeSelectOptions}
          placeholder="Any study mode"
          aria-label="Filter by study mode"
        />
      </div>
      <div className="form-field">
        <span>Campus</span>
        <CustomSelect
          value=""
          onChange={() => {}}
          options={[{ value: "", label: "Campus details not supplied" }]}
          placeholder="Campus details not supplied"
          disabled
          aria-label="Campus filter — campus data has not been supplied"
        />
        <small>Campus values were not included in the available course data.</small>
      </div>
    </div>
  );
}

function ResultCard({ course }: { course: Course }) {
  return (
    <article className="course-result">
      <Link href={`/courses/${course.id}`} className="course-result-image" aria-label={`View ${course.title}`}>
        <img src={course.image} alt={course.imageAlt} loading="lazy" />
      </Link>
      <div className="course-result-content">
        <div className="course-result-meta">
          <span className="tag tag-blue">{course.subject}</span>
          <span className="tag tag-neutral">{course.level}</span>
        </div>
        <h2><Link href={`/courses/${course.id}`}>{course.title}</Link></h2>
        <p className="course-result-qualification">{course.qualification}</p>
        <div className="course-result-facts">
          <span><Icon name="calendar" size={16} /> {course.duration}</span>
          <span><Icon name="sparkle" size={15} /> {course.mode}</span>
        </div>
        <Link className="text-link" href={`/courses/${course.id}`}>
          View course details <Icon name="arrow" size={18} />
        </Link>
      </div>
      <Link className="result-arrow" href={`/courses/${course.id}`} aria-label={`View ${course.title} details`}>
        <Icon name="arrow-up-right" size={19} />
      </Link>
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

  // Staged / draft filters selected in the form controls
  const [draftSubject, setDraftSubject] = useState(initialSubject);
  const [draftLevel, setDraftLevel] = useState(initialLevel);
  const [draftMode, setDraftMode] = useState(initialMode);

  // Active filters applied to the course results
  const [appliedSubject, setAppliedSubject] = useState(initialSubject);
  const [appliedLevel, setAppliedLevel] = useState(initialLevel);
  const [appliedMode, setAppliedMode] = useState(initialMode);

  const [sort, setSort] = useState("recommended");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (!filterOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFilterOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filterOpen]);

  const activeFilterCount = [appliedSubject, appliedLevel, appliedMode].filter(Boolean).length;

  const applyFilters = () => {
    setAppliedSubject(draftSubject);
    setAppliedLevel(draftLevel);
    setAppliedMode(draftMode);
  };

  const applyMobileFilters = () => {
    applyFilters();
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setQuery("");
    setDraftSubject("");
    setDraftLevel("");
    setDraftMode("");
    setAppliedSubject("");
    setAppliedLevel("");
    setAppliedMode("");
  };

  const removeFilter = (filterType: "subject" | "level" | "mode") => {
    if (filterType === "subject") {
      setDraftSubject("");
      setAppliedSubject("");
    } else if (filterType === "level") {
      setDraftLevel("");
      setAppliedLevel("");
    } else if (filterType === "mode") {
      setDraftMode("");
      setAppliedMode("");
    }
  };

  const openMobileFilters = () => {
    setDraftSubject(appliedSubject);
    setDraftLevel(appliedLevel);
    setDraftMode(appliedMode);
    setFilterOpen(true);
  };

  const visibleCourses = useMemo(() => {
    const search = query.trim().toLowerCase();
    const matched = courses.filter((course) => {
      const matchesSearch =
        !search ||
        `${course.title} ${course.subject} ${course.qualification} ${course.level}`
          .toLowerCase()
          .includes(search);
      return (
        matchesSearch &&
        (!appliedSubject || course.subject === appliedSubject) &&
        (!appliedLevel || course.level === appliedLevel) &&
        (!appliedMode || course.mode === appliedMode)
      );
    });
    if (sort === "title") matched.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "duration") matched.sort((a, b) => a.duration.localeCompare(b.duration));
    return matched;
  }, [appliedLevel, appliedMode, appliedSubject, query, sort]);

  const hasDraftChanges =
    draftSubject !== appliedSubject ||
    draftLevel !== appliedLevel ||
    draftMode !== appliedMode;

  const fields = (prefix: string) => (
    <FilterFields
      subject={draftSubject}
      level={draftLevel}
      mode={draftMode}
      onSubject={setDraftSubject}
      onLevel={setDraftLevel}
      onMode={setDraftMode}
      key={prefix}
    />
  );

  return (
    <div className="shell course-search-page">
      <div className="page-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Courses</span>
      </div>

      <header className="search-page-heading">
        <div>
          <p className="eyebrow">Find your direction</p>
          <h1>
            Courses to help<br className="desktop-break" /> you <em>take off.</em>
          </h1>
        </div>
        <p>
          Search the available course sample by keyword, subject, level or study mode. If you’re not sure, start with a subject that interests you.
        </p>
      </header>

      <form
        className="results-searchbar"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          applyFilters();
        }}
      >
        <label className="sr-only" htmlFor="course-query">
          Search by course, subject or qualification
        </label>
        <Icon name="search" size={21} />
        <input
          id="course-query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search courses, subjects or qualifications"
        />
        {query && (
          <button className="clear-query" type="button" onClick={() => setQuery("")}>
            Clear
          </button>
        )}
        <button className="button button-primary searchbar-button" type="submit">
          Search <Icon name="arrow" size={17} />
        </button>
      </form>

      <div className="results-layout">
        <aside className="filters-sidebar" aria-label="Filter courses">
          <div className="filter-heading">
            <div>
              <span className="filter-heading-icon"><Icon name="filter" size={19} /></span>
              <h2>Filter courses</h2>
            </div>
            {(appliedSubject || appliedLevel || appliedMode || draftSubject || draftLevel || draftMode) && (
              <button type="button" className="clear-filters" onClick={clearFilters}>
                Clear all
              </button>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              applyFilters();
            }}
          >
            {fields("desktop")}
            <div className="filter-sidebar-actions">
              <button
                type="submit"
                className="button button-primary button-block apply-filters-button"
              >
                Apply filters <Icon name="arrow" size={17} />
              </button>
            </div>
          </form>

          <div className="filter-sidebar-note">
            <span className="note-check"><Icon name="check" size={15} /></span>
            <p>
              {hasDraftChanges
                ? "Click apply filters to update your results."
                : "Choose your criteria and click apply filters to update results."}
            </p>
          </div>
        </aside>

        <section className="results-content" aria-labelledby="results-heading">
          <div className="mobile-filter-row">
            <button
              type="button"
              className="filter-open-button"
              aria-expanded={filterOpen}
              aria-controls="mobile-filters"
              onClick={openMobileFilters}
            >
              <Icon name="filter" size={18} />
              <span>Filters</span>
              {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
            </button>
            <div className="sort-control">
              <span>Sort</span>
              <CustomSelect
                value={sort}
                onChange={setSort}
                options={sortOptions}
                placeholder="Sort"
                aria-label="Sort courses"
                className="sort-select"
              />
            </div>
          </div>

          <div className="results-toolbar">
            <div>
              <p className="eyebrow">Course directory</p>
              <h2 id="results-heading">
                {visibleCourses.length} {visibleCourses.length === 1 ? "course" : "courses"}
                {query.trim() ? <span className="query-label"> for “{query.trim()}”</span> : null}
              </h2>
            </div>
            <div className="sort-control desktop-sort">
              <span>Sort by</span>
              <CustomSelect
                value={sort}
                onChange={setSort}
                options={sortOptions}
                placeholder="Sort by"
                aria-label="Sort courses"
                className="sort-select"
              />
            </div>
          </div>

          {(appliedSubject || appliedLevel || appliedMode) && (
            <div className="active-filters" aria-label="Active filters">
              <span>Active:</span>
              {appliedSubject && (
                <button type="button" onClick={() => removeFilter("subject")}>
                  {appliedSubject}<Icon name="close" size={14} />
                </button>
              )}
              {appliedLevel && (
                <button type="button" onClick={() => removeFilter("level")}>
                  {appliedLevel}<Icon name="close" size={14} />
                </button>
              )}
              {appliedMode && (
                <button type="button" onClick={() => removeFilter("mode")}>
                  {appliedMode}<Icon name="close" size={14} />
                </button>
              )}
              <button type="button" className="active-clear" onClick={clearFilters}>
                Clear all
              </button>
            </div>
          )}

          {visibleCourses.length > 0 ? (
            <div className="course-results-list">
              {visibleCourses.map((course) => (
                <ResultCard course={course} key={course.id} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state-icon"><Icon name="search" size={23} /></span>
              <p className="eyebrow">No matches just yet</p>
              <h3>Try a different search.</h3>
              <p>Change your keywords or clear the filters to see all courses in this sample.</p>
              <button type="button" className="button button-outline" onClick={clearFilters}>
                Clear search and filters <Icon name="arrow" size={17} />
              </button>
            </div>
          )}

          <p className="results-data-note">
            This demonstration uses five course examples supplied in the project brief. Course campus, start date, fees and other details were not included in the source sample.
          </p>
        </section>
      </div>

      {filterOpen && (
        <div className="mobile-filter-overlay" onClick={() => setFilterOpen(false)}>
          <aside
            id="mobile-filters"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filter-title"
            className="mobile-filter-sheet"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-filter-title-row">
              <div>
                <p className="eyebrow">Narrow your search</p>
                <h2 id="mobile-filter-title">Course filters</h2>
              </div>
              <button
                type="button"
                className="icon-button"
                aria-label="Close filters"
                onClick={() => setFilterOpen(false)}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                applyMobileFilters();
              }}
            >
              {fields("mobile")}
              <div className="filter-sidebar-actions">
                <button
                  type="submit"
                  className="button button-primary button-block filter-show-results"
                >
                  Apply filters <Icon name="arrow" size={18} />
                </button>
                <button
                  type="button"
                  className="mobile-filter-clear"
                  onClick={() => {
                    clearFilters();
                    setFilterOpen(false);
                  }}
                >
                  Clear all filters
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}
