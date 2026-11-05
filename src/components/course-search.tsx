"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { courses, subjectAreas } from "@/lib/content";
import type { Course } from "@/lib/content";
import { Icon } from "@/components/icon";
import { CustomSelect } from "@/components/custom-select";

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "title", label: "Course A–Z" },
  { value: "duration", label: "Duration" },
];

function ResultCard({ course }: { course: Course }) {
  return (
    <article className="course-result">
      <Link
        href={`/courses/${course.id}`}
        className="course-result-image"
        aria-label={`View details for ${course.title}`}
      >
        <img src={course.image} alt={course.imageAlt} loading="lazy" />
      </Link>
      <div className="course-result-content">
        <div className="course-result-meta">
          <span className="tag tag-blue">{course.subject}</span>
          <span className="tag tag-green">{course.level}</span>
          <span className="tag tag-neutral">{course.mode}</span>
        </div>
        <h2>
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </h2>
        <p className="course-result-qualification">{course.qualification}</p>
        <div className="course-result-facts">
          <span>
            <Icon name="calendar" size={16} /> Starts: {course.startDate}
          </span>
          <span>
            <Icon name="sparkle" size={15} /> {course.duration} · {course.mode}
          </span>
          <span>
            <Icon name="location" size={15} /> {course.campus}
            <small style={{ fontSize: "0.74rem", color: "var(--color-neutral-muted)", marginLeft: "4px" }}>
              (illustrative)
            </small>
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

  // Active filters applied to the dataset
  const [activeSubject, setActiveSubject] = useState(initialSubject);
  const [activeLevel, setActiveLevel] = useState(initialLevel);
  const [activeMode, setActiveMode] = useState(initialMode);
  const [activeCampus, setActiveCampus] = useState(initialCampus);
  const [activeFunding, setActiveFunding] = useState(initialFunding);

  // Staged / draft filters selected in the form controls
  const [draftSubject, setDraftSubject] = useState(initialSubject);
  const [draftLevel, setDraftLevel] = useState(initialLevel);
  const [draftMode, setDraftMode] = useState(initialMode);
  const [draftCampus, setDraftCampus] = useState(initialCampus);
  const [draftFunding, setDraftFunding] = useState(initialFunding);

  const [sortBy, setSortBy] = useState("recommended");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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
    setActiveSubject(initialSubject);
    setActiveLevel(initialLevel);
    setActiveMode(initialMode);
    setActiveCampus(initialCampus);
    setActiveFunding(initialFunding);
    setDraftSubject(initialSubject);
    setDraftLevel(initialLevel);
    setDraftMode(initialMode);
    setDraftCampus(initialCampus);
    setDraftFunding(initialFunding);
  }

  function openMobileFilters() {
    setDraftSubject(activeSubject);
    setDraftLevel(activeLevel);
    setDraftMode(activeMode);
    setDraftCampus(activeCampus);
    setDraftFunding(activeFunding);
    setMobileFilterOpen(true);
  }

  // Compute available dynamic filter options that actually return results
  const dynamicFilterOptions = useMemo(() => {
    // Collect unique available values across all courses
    const allSubjects = Array.from(new Set(courses.map((c) => c.subject))).sort();
    const allLevels = Array.from(new Set(courses.map((c) => c.level))).sort();
    // Study mode: strictly Full-time and Online (no Part-time)
    const allModes = ["Full-time", "Online"];
    const allCampuses = [
      { value: "Moulsham Street campus", label: "Moulsham Street campus (illustrative)" },
      { value: "Princes Road campus", label: "Princes Road campus (illustrative)" },
    ];
    const allFundings = [
      "16-18 funded",
      "Adult Education / 19+",
      "Advanced Learner Loans",
    ];

    return {
      subjects: [
        { value: "", label: "All subjects" },
        ...allSubjects.map((s) => ({ value: s, label: s })),
      ],
      levels: [
        { value: "", label: "Any level" },
        ...allLevels.map((l) => ({ value: l, label: l })),
      ],
      modes: [
        { value: "", label: "Any study mode" },
        ...allModes.map((m) => ({ value: m, label: m })),
      ],
      campuses: [
        { value: "", label: "All campuses (illustrative)" },
        ...allCampuses,
      ],
      fundings: [
        { value: "", label: "All funding types" },
        ...allFundings.map((f) => ({ value: f, label: f })),
      ],
    };
  }, []);

  // Filter courses with all active criteria working together
  const visibleCourses = useMemo(() => {
    const q = query.trim().toLowerCase();

    return courses
      .filter((course) => {
        const matchesQuery =
          !q ||
          course.title.toLowerCase().includes(q) ||
          course.subject.toLowerCase().includes(q) ||
          course.qualification.toLowerCase().includes(q) ||
          course.overview.toLowerCase().includes(q) ||
          course.skills.some((sk) => sk.toLowerCase().includes(q));

        const matchesSubject =
          !activeSubject || course.subject.toLowerCase() === activeSubject.toLowerCase();

        const matchesLevel =
          !activeLevel || course.level.toLowerCase() === activeLevel.toLowerCase();

        const matchesMode =
          !activeMode || course.mode.toLowerCase() === activeMode.toLowerCase();

        const matchesCampus =
          !activeCampus ||
          course.campus.toLowerCase().includes(activeCampus.toLowerCase()) ||
          activeCampus.toLowerCase().includes(course.campus.toLowerCase());

        const matchesFunding =
          !activeFunding ||
          course.fundingTags?.some((tag) =>
            tag.toLowerCase().includes(activeFunding.toLowerCase())
          );

        return (
          matchesQuery &&
          matchesSubject &&
          matchesLevel &&
          matchesMode &&
          matchesCampus &&
          matchesFunding
        );
      })
      .sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "duration") return a.duration.localeCompare(b.duration);
        return 0;
      });
  }, [query, activeSubject, activeLevel, activeMode, activeCampus, activeFunding, sortBy]);

  // Apply staged filter changes
  function applyFilters() {
    setActiveSubject(draftSubject);
    setActiveLevel(draftLevel);
    setActiveMode(draftMode);
    setActiveCampus(draftCampus);
    setActiveFunding(draftFunding);
    setMobileFilterOpen(false);
  }

  function clearAllFilters() {
    setQuery("");
    setDraftSubject("");
    setDraftLevel("");
    setDraftMode("");
    setDraftCampus("");
    setDraftFunding("");
    setActiveSubject("");
    setActiveLevel("");
    setActiveMode("");
    setActiveCampus("");
    setActiveFunding("");
    setMobileFilterOpen(false);
  }

  const hasActiveFilters = Boolean(
    query || activeSubject || activeLevel || activeMode || activeCampus || activeFunding
  );

  return (
    <div className="shell courses-page">
      <div className="page-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Courses</span>
        {activeSubject && (
          <>
            <span>/</span>
            <span>{activeSubject}</span>
          </>
        )}
      </div>

      <header className="courses-heading">
        <div className="courses-heading-copy">
          <p className="eyebrow">Find your course</p>
          <h1>
            Courses to help<br className="desktop-break" /> you <em>take off.</em>
          </h1>
          <p>
            Explore all {courses.length} qualifications across both campuses. Filter by subject, level, study mode, illustrative campus, and funding support.
          </p>
        </div>

        <div className="courses-search-bar" role="search">
          <label className="courses-search-input" htmlFor="course-search-field">
            <Icon name="search" size={20} />
            <input
              id="course-search-field"
              type="search"
              placeholder="Search by course title, subject, or skill (e.g. fashion, graphic design, plumbing, IT)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search courses by keyword, qualification or skill"
            />
            {query && (
              <button
                type="button"
                className="clear-query-button"
                onClick={() => setQuery("")}
                aria-label="Clear search keyword"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </label>
        </div>
      </header>

      {/* Main Results Layout */}
      <div className="results-layout">
        {/* Desktop Filter Sidebar */}
        <aside className="filter-sidebar" aria-label="Course filters">
          <div className="filter-sidebar-header">
            <h2 id="desktop-filter-heading">Filters</h2>
            {hasActiveFilters && (
              <button
                type="button"
                className="clear-filters-link"
                onClick={clearAllFilters}
                aria-label="Clear all course filters"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="filter-fields">
            {/* Subject Filter */}
            <div className="form-field">
              <span id="subject-label">Subject area</span>
              <CustomSelect
                value={draftSubject}
                onChange={(val) => {
                  setDraftSubject(val);
                  setActiveSubject(val);
                }}
                options={dynamicFilterOptions.subjects}
                placeholder="All subjects"
                aria-label="Subject area"
              />
            </div>

            {/* Level Filter */}
            <div className="form-field">
              <span id="level-label">Qualification level</span>
              <CustomSelect
                value={draftLevel}
                onChange={(val) => {
                  setDraftLevel(val);
                  setActiveLevel(val);
                }}
                options={dynamicFilterOptions.levels}
                placeholder="Any level"
                aria-label="Qualification level"
              />
            </div>

            {/* Study Mode Filter - Full-time & Online only */}
            <div className="form-field">
              <span id="mode-label">Study mode</span>
              <CustomSelect
                value={draftMode}
                onChange={(val) => {
                  setDraftMode(val);
                  setActiveMode(val);
                }}
                options={dynamicFilterOptions.modes}
                placeholder="Any study mode"
                aria-label="Study mode"
              />
            </div>

            {/* Campus Filter - Illustrative campus note */}
            <div className="form-field">
              <span id="campus-label">Campus (illustrative)</span>
              <CustomSelect
                value={draftCampus}
                onChange={(val) => {
                  setDraftCampus(val);
                  setActiveCampus(val);
                }}
                options={dynamicFilterOptions.campuses}
                placeholder="All campuses (illustrative)"
                aria-label="Campus location (illustrative)"
              />
            </div>

            {/* Funding Filter */}
            <div className="form-field">
              <span id="funding-label">Funding support</span>
              <CustomSelect
                value={draftFunding}
                onChange={(val) => {
                  setDraftFunding(val);
                  setActiveFunding(val);
                }}
                options={dynamicFilterOptions.fundings}
                placeholder="All funding types"
                aria-label="Funding support"
              />
            </div>
          </div>

          <div
            className="filter-sidebar-note"
            style={{
              marginTop: "1.25rem",
              padding: "0.85rem",
              background: "var(--surface)",
              borderRadius: "6px",
              fontSize: "0.82rem",
              color: "var(--color-neutral-muted)",
              lineHeight: "1.45",
            }}
          >
            <Icon name="sparkle" size={14} style={{ color: "var(--color-primary-green)", marginRight: "4px" }} />
            Campus assignments reflect college department facilities and are identified as illustrative.
          </div>
        </aside>

        {/* Results Stream */}
        <section className="results-stream" aria-labelledby="results-heading">
          <div className="results-toolbar">
            <div>
              <p className="eyebrow">Course directory</p>
              <h2 id="results-heading">
                {visibleCourses.length} {visibleCourses.length === 1 ? "course" : "courses"} found
              </h2>
            </div>

            <div className="results-sort-bar">
              {/* Mobile Filter Toggle Button */}
              <button
                type="button"
                className="button button-outline mobile-filter-toggle"
                onClick={openMobileFilters}
                aria-label={`Open course filters (${hasActiveFilters ? "filters active" : "none active"})`}
              >
                <Icon name="sparkle" size={16} /> Filters
                {hasActiveFilters && <span className="filter-indicator-dot" />}
              </button>

              <div className="form-field sort-field">
                <span className="sr-only">Sort courses by</span>
                <CustomSelect
                  value={sortBy}
                  onChange={setSortBy}
                  options={sortOptions}
                  placeholder="Sort courses"
                  aria-label="Sort courses by"
                />
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="active-filters-row" aria-label="Currently active filters">
              <span className="active-filters-label">Active filters:</span>
              {query && (
                <button
                  type="button"
                  className="filter-chip"
                  onClick={() => setQuery("")}
                  aria-label={`Remove keyword filter: ${query}`}
                >
                  <span>Keyword: {query}</span>
                  <Icon name="close" size={14} />
                </button>
              )}
              {activeSubject && (
                <button
                  type="button"
                  className="filter-chip"
                  onClick={() => {
                    setActiveSubject("");
                    setDraftSubject("");
                  }}
                  aria-label={`Remove subject filter: ${activeSubject}`}
                >
                  <span>Subject: {activeSubject}</span>
                  <Icon name="close" size={14} />
                </button>
              )}
              {activeLevel && (
                <button
                  type="button"
                  className="filter-chip"
                  onClick={() => {
                    setActiveLevel("");
                    setDraftLevel("");
                  }}
                  aria-label={`Remove level filter: ${activeLevel}`}
                >
                  <span>Level: {activeLevel}</span>
                  <Icon name="close" size={14} />
                </button>
              )}
              {activeMode && (
                <button
                  type="button"
                  className="filter-chip"
                  onClick={() => {
                    setActiveMode("");
                    setDraftMode("");
                  }}
                  aria-label={`Remove study mode filter: ${activeMode}`}
                >
                  <span>Mode: {activeMode}</span>
                  <Icon name="close" size={14} />
                </button>
              )}
              {activeCampus && (
                <button
                  type="button"
                  className="filter-chip"
                  onClick={() => {
                    setActiveCampus("");
                    setDraftCampus("");
                  }}
                  aria-label={`Remove campus filter: ${activeCampus}`}
                >
                  <span>Campus: {activeCampus}</span>
                  <Icon name="close" size={14} />
                </button>
              )}
              {activeFunding && (
                <button
                  type="button"
                  className="filter-chip"
                  onClick={() => {
                    setActiveFunding("");
                    setDraftFunding("");
                  }}
                  aria-label={`Remove funding filter: ${activeFunding}`}
                >
                  <span>Funding: {activeFunding}</span>
                  <Icon name="close" size={14} />
                </button>
              )}
              <button
                type="button"
                className="clear-all-chips"
                onClick={clearAllFilters}
                aria-label="Clear all active filters"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Results List */}
          <div className="course-results-list" aria-live="polite">
            {visibleCourses.length > 0 ? (
              visibleCourses.map((course) => (
                <ResultCard course={course} key={course.id} />
              ))
            ) : (
              <div className="empty-state">
                <span className="empty-state-icon">
                  <Icon name="search" size={24} />
                </span>
                <p className="eyebrow">No matching courses</p>
                <h3>Try broadening your search or adjusting filters.</h3>
                <p>
                  No qualifications match your current combination of filters. You can clear individual filters or reset all criteria to view the complete catalogue of {courses.length} courses.
                </p>
                <button
                  className="button button-outline"
                  type="button"
                  onClick={clearAllFilters}
                  aria-label="Clear all filters to view all courses"
                >
                  Show all {courses.length} courses <Icon name="arrow" size={17} />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div
          className="mobile-filter-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-title"
        >
          <div
            className="mobile-filter-backdrop"
            onClick={() => setMobileFilterOpen(false)}
            aria-hidden="true"
          />
          <div className="mobile-filter-sheet">
            <div className="mobile-filter-header">
              <h2 id="mobile-filter-title">Course filters</h2>
              <button
                type="button"
                className="mobile-filter-close"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters dialog"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="mobile-filter-body">
              <div className="form-field">
                <span>Subject area</span>
                <CustomSelect
                  value={draftSubject}
                  onChange={setDraftSubject}
                  options={dynamicFilterOptions.subjects}
                  placeholder="All subjects"
                  aria-label="Subject area"
                />
              </div>

              <div className="form-field">
                <span>Qualification level</span>
                <CustomSelect
                  value={draftLevel}
                  onChange={setDraftLevel}
                  options={dynamicFilterOptions.levels}
                  placeholder="Any level"
                  aria-label="Qualification level"
                />
              </div>

              <div className="form-field">
                <span>Study mode</span>
                <CustomSelect
                  value={draftMode}
                  onChange={setDraftMode}
                  options={dynamicFilterOptions.modes}
                  placeholder="Any study mode"
                  aria-label="Study mode"
                />
              </div>

              <div className="form-field">
                <span>Campus (illustrative)</span>
                <CustomSelect
                  value={draftCampus}
                  onChange={setDraftCampus}
                  options={dynamicFilterOptions.campuses}
                  placeholder="All campuses (illustrative)"
                  aria-label="Campus location (illustrative)"
                />
              </div>

              <div className="form-field">
                <span>Funding support</span>
                <CustomSelect
                  value={draftFunding}
                  onChange={setDraftFunding}
                  options={dynamicFilterOptions.fundings}
                  placeholder="All funding types"
                  aria-label="Funding support"
                />
              </div>
            </div>

            <div className="mobile-filter-footer">
              <button
                type="button"
                className="button button-outline"
                onClick={clearAllFilters}
                aria-label="Reset all filters"
              >
                Reset
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={applyFilters}
                aria-label="Apply selected filters"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
