"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { CustomSelect } from "@/components/custom-select";
import { campuses } from "@/lib/content";

export interface SubjectAreaOption {
  name: string;
  label?: string;
  image?: string;
}

export function HomeSearchForm({ subjectAreas }: { subjectAreas: SubjectAreaOption[] }) {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [campus, setCampus] = useState("");

  const subjectOptions = [
    { value: "", label: "All subjects" },
    ...subjectAreas.map((s) => ({ value: s.name, label: s.name })),
  ];

  const levelOptions = [
    { value: "", label: "Any level" },
    { value: "Level 2", label: "Level 2" },
    { value: "Level 3", label: "Level 3" },
  ];

  const campusOptions = [
    { value: "", label: "All campuses" },
    ...campuses.map((c) => ({ value: c.name, label: c.name })),
  ];

  return (
    <form className="course-search-form" action="/courses" method="get" role="search">
      <label className="search-field search-keyword-field">
        <span>Course or subject</span>
        <span className="input-with-icon">
          <Icon name="search" size={19} />
          <input name="q" type="search" placeholder="Try fashion, digital or travel" />
        </span>
      </label>

      <div className="search-field search-subject-field">
        <span>Subject area</span>
        <CustomSelect
          name="subject"
          value={subject}
          onChange={setSubject}
          options={subjectOptions}
          placeholder="All subjects"
          aria-label="Filter by subject area"
        />
      </div>

      <div className="search-field search-level-field">
        <span>Qualification level</span>
        <CustomSelect
          name="level"
          value={level}
          onChange={setLevel}
          options={levelOptions}
          placeholder="Any level"
          aria-label="Filter by qualification level"
        />
      </div>

      <div className="search-field search-campus-field">
        <span>Campus</span>
        <CustomSelect
          name="campus"
          value={campus}
          onChange={setCampus}
          options={campusOptions}
          placeholder="All campuses"
          aria-label="Filter by college campus"
        />
      </div>

      <button className="button button-primary search-submit" type="submit">
        Search courses <Icon name="arrow" size={18} />
      </button>
    </form>
  );
}
