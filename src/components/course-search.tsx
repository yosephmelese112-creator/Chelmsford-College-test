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
  { value: "Level 1", label: "Level 1" },
  { value: "Level 2", label: "Level 2" },
  { value: "Level 3", label: "Level 3" },
  { value: "Entry / RARPA", label: "Entry Level / RARPA" },
];

const modeSelectOptions = [
  { value: "", label: "Any study mode" },
  { value: "Full-time", label: "Full-time" },
  { value: "Online", label: "Online" },
];

const campusSelectOptions = [
  { value: "", label: "All campuses" },
  { value: "Moulsham Street campus", label: "Moulsham Street campus (illustrative)" },
  { value: "Princes Road campus", label: "Princes Road campus (illustrative)" },
];

const fundingSelectOptions = [
  { value: "", label: "All funding types" },
  { value: "16-18", label: "Free for 16–18 Learners" },
  { value: "Level 3", label: "Free Level 3 Entitlement" },
  { value: "Loans", label: "Advanced Learner Loans" },
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
  campus,
  funding,
  onSubject,
  onLevel,
  onMode,
  onCampus,
  onFunding,
}: {
  subject: string;
  level: string;
  mode: string;
  campus: string;
  funding: string;
  onSubject: (value: string) => void;
  onLevel: (value: string) => void;
  onMode: (value: string) => void;
  onCampus: (value: string) => void;
  onFunding: (value: string) => void;
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
          aria-label="Subject area"
        />
      </div>
      <div className="form-field">
        <span>Qualification level</span>
        <CustomSelect
          value={level}
          onChange={onLevel}
          options={levelSelectOptions}
          placeholder="Any level"
          aria-label="Qualification level"
        />
      </div>
      <div className="form-field">
        <span>Study mode</span>
        <CustomSelect
          value={mode}
          onChange={onMode}
          options={modeSelectOptions}
          placeholder="Any study mode"
          aria-label="Study mode"
        />
      </div>
      <div className="form-field">
        <span>Campus</span>
        <CustomSelect
          value={campus}
          onChange={onCampus}
          options={campusSelectOptions}
          placeholder="All campuses"
          aria-label="Campus"
        />
      </div>
      <div className="form-field">
        <span>Funding support</span>
        <CustomSelect
          value={funding}
          onChange={onFunding}
          options={fundingSelectOptions}
          placeholder="All funding types"
          aria-label="Funding support"
        />
      </div>
    </div>
  );
}

function ResultCard({ course }: { course: Course }) {
  return (
    <article className="course-result">
      <Link
        href={`/courses/${course.id}`}
        className="course-result-image"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={course.image} alt="" loading="lazy" />
      </Link>
      <div className="course-result-content">
        <div className="course-result-meta">
          <span className="tag tag-blue">{course.subject}</span>
          <span className="tag tag-neutral">{course.level}</span>
        </div>
        <h2>
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </h2>
        <p className="course-result-qualification">{course.qualification}</p>
        <div className="course-result-facts">
          <span>
            <Icon name="calendar" size={16} /> {course.duration}
          </span>
          <span>
            <Icon name="sparkle" size={15} /> {course.mode}
          </span>
          <span>
            <Icon name="location" size={15} /> {course.campus}
          </span>
        </div>
        <Link className="text-link" href={`/courses/${course.id}`}>
          View course details <Icon name="arrow" size={18} />
        </Link>
      </div>
      <Link
        className="result-arrow"
        href={`/courses/${course.id}`}
        aria-label={`View ${course.title} details`}
      >
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
  initialCampus = "",
  initialFunding = "",
}: {
  initialQuery?: string;
  initialSubject?: string;
  initialLevel?: string;
  initialMode?: string;
  initialCampus?: string;
  initialFunding?: string;
}) {
  const [query, setQuery] = useState(initialQuery);

  // Staged / draft filters selected in the form controls
  const [draftSubject, setDraftSubject] = useState(initialSubject);
  const [draftLevel, setDraftLevel] = useState(initialLevel);
  const [draftMode, setDraftMode] = useState(initialMode);
  const [draftCampus, setDraftCampus] = useState(initialCampus);
  const [draftFunding, setDraftFunding] = useState(initialFunding);

  // Active filters applied to the course results
  const [appliedSubject, setAppliedSubject] = useState(initialSubject);
  const [appliedLevel, setAppliedLevel] = useState(initialLevel);
  const [appliedMode, setAppliedMode] = useState(initialMode);
  const [appliedCampus, setAppliedCampus] = useState(initialCampus);
  const [appliedFunding, setAppliedFunding] = useState(initialFunding);

  const [sort, setSort] = useState("recommended");
  const [filterOpen, setFilterOpen] = useState(false);

  // Sync state if initial props change (e.g. navigation via URL search params)
  const [prevParams, setPrevParams] = useState({
    query: initialQuery,
    subject: initialSubject,
    level: initialLevel,
    mode: initialMode,
    campus: initialCampus,
    funding: initialFunding,
  });

  if (
    prevParams.query !== initialQuery ||
    prevParams.subject !== initialSubject ||
    prevParams.level !== initialLevel ||
    prevParams.mode !== initialMode ||
    prevParams.campus !== initialCampus ||
    prevParams.funding !== initialFunding
  ) {
    setPrevParams({
      query: initialQuery,
      subject: initialSubject,
      level: initialLevel,
      mode: initialMode,
      campus: initialCampus,
      funding: initialFunding,
    });
    setQuery(initialQuery);
    setDraftSubject(initialSubject);
    setDraftLevel(initialLevel);
    setDraftMode(initialMode);
    setDraftCampus(initialCampus);
    setDraftFunding(initialFunding);
    setAppliedSubject(initialSubject);
    setAppliedLevel(initialLevel);
    setAppliedMode(initialMode);
    setAppliedCampus(initialCampus);
    setAppliedFunding(initialFunding);
  }

  // Handle mobile dialog scroll locking and Escape key
  useEffect(() => {
    if (!filterOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFilterOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filterOpen]);

  const activeFilterCount = [
    appliedSubject,
    appliedLevel,
    appliedMode,
    appliedCampus,
    appliedFunding,
  ].filter(Boolean).length;

  const applyFilters = () => {
    setAppliedSubject(draftSubject);
    setAppliedLevel(draftLevel);
    setAppliedMode(draftMode);
    setAppliedCampus(draftCampus);
    setAppliedFunding(draftFunding);
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
    setDraftCampus("");
    setDraftFunding("");
    setAppliedSubject("");
    setAppliedLevel("");
    setAppliedMode("");
    setAppliedCampus("");
    setAppliedFunding("");
  };

  const removeFilter = (
    filterType: "subject" | "level" | "mode" | "campus" | "funding"
  ) => {
    if (filterType === "subject") {
      setDraftSubject("");
      setAppliedSubject("");
    } else if (filterType === "level") {
      setDraftLevel("");
      setAppliedLevel("");
    } else if (filterType === "mode") {
      setDraftMode("");
      setAppliedMode("");
    } else if (filterType === "campus") {
      setDraftCampus("");
      setAppliedCampus("");
    } else if (filterType === "funding") {
      setDraftFunding("");
      setAppliedFunding("");
    }
  };

  const openMobileFilters = () => {
    setDraftSubject(appliedSubject);
    setDraftLevel(appliedLevel);
    setDraftMode(appliedMode);
    setDraftCampus(appliedCampus);
    setDraftFunding(appliedFunding);
    setFilterOpen(true);
  };

  const visibleCourses = useMemo(() => {
    const search = query.trim().toLowerCase();
    const matched = courses.filter((course) => {
      const matchesSearch =
        !search ||
        `${course.title} ${course.subject} ${course.qualification} ${course.level} ${course.campus} ${course.mode} ${course.skills?.join(" ")}`
          .toLowerCase()
          .includes(search);

      const matchesSubject = !appliedSubject || course.subject === appliedSubject;
      const matchesLevel =
        !appliedLevel ||
        course.level === appliedLevel ||
        (appliedLevel === "Entry / RARPA" &&
          (course.level.includes("Entry") || course.level.includes("RARPA")));
      const matchesMode = !appliedMode || course.mode === appliedMode;
      const matchesCampus =
        !appliedCampus ||
        course.campus.toLowerCase().includes(appliedCampus.toLowerCase().replace(" (illustrative)", ""));
      const matchesFunding =
        !appliedFunding ||
        (course.funding && course.funding.toLowerCase().includes(appliedFunding.toLowerCase()));

      return (
        matchesSearch &&
        matchesSubject &&
        matchesLevel &&
        matchesMode &&
        matchesCampus &&
        matchesFunding
      );
    });

    if (sort === "title") matched.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "duration") matched.sort((a, b) => a.duration.localeCompare(b.duration));
    return matched;
  }, [appliedCampus, appliedFunding, appliedLevel, appliedMode, appliedSubject, query, sort]);

  const hasDraftChanges =
    draftSubject !== appliedSubject ||
    draftLevel !== appliedLevel ||
    draftMode !== appliedMode ||
    draftCampus !== appliedCampus ||
    draftFunding !== appliedFunding;

  const fields = (prefix: string) => (
    <FilterFields
      subject={draftSubject}
      level={draftLevel}
      mode={draftMode}
      campus={draftCampus}
      funding={draftFunding}
      onSubject={setDraftSubject}
      onLevel={setDraftLevel}
      onMode={setDraftMode}
      onCampus={setDraftCampus}
      onFunding={setDraftFunding}
      key={prefix}
    />
  );

  return (
    <div className="shell course-search-page">
      <div className="page-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Courses</span>
        {appliedSubject && (
          <>
            <span>/</span>
            <span>{appliedSubject}</span>
          </>
        )}
      </div>

      <header className="search-page-heading">
        <div>
          <p className="eyebrow">Find your direction</p>
          <h1>
            Courses to help<br className="desktop-break" /> you <em>take off.</em>
          </h1>
        </div>
        <p>
          Search the available course sample by keyword, subject, level, study mode or campus. If you’re not sure, start with a subject that interests you.
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
          Search by course, subject, qualification or campus
        </label>
        <Icon name="search" size={21} />
        <input
          id="course-query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search courses, subjects, qualifications or campus"
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
              <span className="filter-heading-icon">
                <Icon name="filter" size={19} />
              </span>
              <h2>Filter courses</h2>
            </div>
            {(appliedSubject ||
              appliedLevel ||
              appliedMode ||
              appliedCampus ||
              appliedFunding ||
              draftSubject ||
              draftLevel ||
              draftMode ||
              draftCampus ||
              draftFunding) && (
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
            <span className="note-check">
              <Icon name="check" size={15} />
            </span>
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

          {(appliedSubject ||
            appliedLevel ||
            appliedMode ||
            appliedCampus ||
            appliedFunding) && (
            <div className="active-filters" aria-label="Active filters">
              <span>Active:</span>
              {appliedSubject && (
                <button type="button" onClick={() => removeFilter("subject")}>
                  {appliedSubject}
                  <Icon name="close" size={14} />
                </button>
              )}
              {appliedLevel && (
                <button type="button" onClick={() => removeFilter("level")}>
                  {appliedLevel}
                  <Icon name="close" size={14} />
                </button>
              )}
              {appliedMode && (
                <button type="button" onClick={() => removeFilter("mode")}>
                  {appliedMode}
                  <Icon name="close" size={14} />
                </button>
              )}
              {appliedCampus && (
                <button type="button" onClick={() => removeFilter("campus")}>
                  {appliedCampus}
                  <Icon name="close" size={14} />
                </button>
              )}
              {appliedFunding && (
                <button type="button" onClick={() => removeFilter("funding")}>
                  {appliedFunding}
                  <Icon name="close" size={14} />
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
              <span className="empty-state-icon">
                <Icon name="search" size={23} />
              </span>
              <p className="eyebrow">No matches just yet</p>
              <h3>Try a different search or filter.</h3>
              <p>Change your keywords or clear your filters to view all courses in this sample.</p>
              <button type="button" className="button button-outline" onClick={clearFilters}>
                Clear search and filters <Icon name="arrow" size={17} />
              </button>
            </div>
          )}
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
