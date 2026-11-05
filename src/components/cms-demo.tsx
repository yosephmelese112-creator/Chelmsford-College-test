"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { showcaseEvent, courses } from "@/lib/content";

export type Panel = "dashboard" | "content" | "campaign" | "event" | "media" | "sql" | "evidence";
type PreviewSize = "desktop" | "tablet" | "mobile";

const panelLabels: Record<Panel, string> = {
  dashboard: "Dashboard",
  content: "Content",
  campaign: "Homepage campaign",
  event: "Events",
  media: "Media library",
  sql: "SQL data architecture",
  evidence: "Previous work evidence",
};

const mediaItems = [
  { src: "/images/students-collaborating.jpg", title: "Student life on campus", alt: "Chelmsford College students laughing and chatting together on campus." },
  { src: "/images/campus-learning.jpg", title: "Salon practical learning", alt: "A tutor guiding a student during a practical hair and beauty styling session." },
  { src: "/images/creative-classroom.jpg", title: "Digital collaboration", alt: "Students collaborating with a laptop in a modern digital classroom space." },
  { src: "/images/fashion-studio.jpg", title: "Technical workshop", alt: "A student and tutor working together in a practical college technical workshop." },
  { src: "/images/student-library.jpg", title: "Awards & achievement", alt: "A student celebrating their award and certificate with tutors at Chelmsford College." },
];

const columnMappingRows = [
  { source: "C_ID", template: "URL route slug / identifier (/courses/[id])", sample: "374 (fashion-l3), 553 (digital-it-l2)" },
  { source: "C_TITLE", template: "Course title (h1) & metadata heading", sample: "Gateway Diploma in Digital and IT Skills, Level 2" },
  { source: "C_SECTION", template: "Subject Area / Department tag (joined from course_sections.S_TITLE)", sample: "ICT & Digital Skills, Creative Industries, Construction" },
  { source: "C_STARTDATE", template: "Prominent Start Date in top key facts", sample: "September 2026 (converted from Excel serial 46266)" },
  { source: "C_MODE", template: "Study mode badge & filter (Full-time / Online)", sample: "FT → Full-time, Online" },
  { source: "C_DURATION", template: "Duration key fact card", sample: "1 year, 2 years" },
  { source: "C_QUALIFICATION", template: "Qualification subtitle & formal accreditation", sample: "Gateway Qualifications Level 2 Diploma in Digital and IT Skills" },
  { source: "C_STUDYOVERVIEW", template: "Study Overview (formatted HTML)", sample: "Mandatory units, computing labs, project briefs" },
  { source: "C_COURSEFORME", template: "Is this course for me? (accordion section)", sample: "Suitability, career vision & prior interests" },
  { source: "C_ELIGIBILITY", template: "Entry requirements and eligibility (parsed list & HTML)", sample: "3 GCSEs at grades 9-3 including English & Maths" },
  { source: "C_ASSESSMENT", template: "How you'll be assessed (accordion section)", sample: "Assignment-based assessment & synoptic computing challenge" },
  { source: "C_EMPLOYABILITY", template: "Career opportunities & progression", sample: "Progression to Level 3 IT / T Levels / Helpdesk apprenticeships" },
  { source: "C_FEES", template: "Course fees & financial support", sample: "Free for under 19s, Advanced Learner Loans for 19+" },
  { source: "C_ADDITIONALFEES", template: "Additional fees & equipment costs", sample: "£50 trip fee (Digital IT), £80 materials (Fashion)" },
  { source: "C_FUNDING", template: "Funding eligibility tags (joined from course_funding.F_TITLE)", sample: "16-18 funded, Adult Education / 19+, Advanced Learner Loans" },
  { source: "C_CONTACT", template: "Department course contact email & phone", sample: "careersadvicezone@chelmsford.ac.uk" },
  { source: "C_ADDITIONALQUALS", template: "Additional qualifications included", sample: "First aid / health & safety certification where applicable" },
  { source: "Skills Extraction", template: "Skills you'll gain (derived concise badges from syllabus text)", sample: "Web design, Database design, Cybersecurity fundamentals" },
  { source: "Campus", template: "Campus location (clearly identified as illustrative)", sample: "Moulsham Street campus (illustrative)" },
];

export function CmsDemo({ initialPanel = "dashboard" }: { initialPanel?: Panel }) {
  const [panel, setPanel] = useState<Panel>(initialPanel);
  const [preview, setPreview] = useState(false);
  const [eventPreview, setEventPreview] = useState(false);
  const [previewSize, setPreviewSize] = useState<PreviewSize>("desktop");

  // Homepage campaign state
  const [campaignTitle, setCampaignTitle] = useState("Make your next move matter.");
  const [campaignIntro, setCampaignIntro] = useState("Find the subject that sparks something. Build skills you can take anywhere. Your next chapter starts here.");
  const [campaignMediaType, setCampaignMediaType] = useState<"image" | "video">("image");
  const [campaignCtaLabel, setCampaignCtaLabel] = useState("Find your course");
  const [campaignCtaUrl, setCampaignCtaUrl] = useState("/courses");

  const [eventTitle, setEventTitle] = useState(showcaseEvent.title);
  const [eventDate, setEventDate] = useState(showcaseEvent.dateLabel);
  const [published, setPublished] = useState(false);
  const [saved, setSaved] = useState(false);
  const [localImage, setLocalImage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Live SQL / API inspector state
  const [apiTesting, setApiTesting] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>("");

  // Sync panel if initialPanel prop changes
  const [prevInitialPanel, setPrevInitialPanel] = useState(initialPanel);
  if (initialPanel && initialPanel !== prevInitialPanel) {
    setPrevInitialPanel(initialPanel);
    setPanel(initialPanel);
  }

  function saveDraft() {
    setSaved(true);
    setStatusMessage("Draft saved in this browser session. No live CMS content was changed.");
  }

  function togglePublish() {
    const next = !published;
    setPublished(next);
    setStatusMessage(
      next
        ? "Demo content marked as published. This demonstrates the authoring state transition."
        : "Demo content marked as unpublished."
    );
  }

  function selectPanel(next: Panel) {
    setPanel(next);
    setPreview(false);
    setEventPreview(false);
    setStatusMessage("");
  }

  async function testApiEndpoint(url: string) {
    setApiTesting(true);
    setApiResponse("Fetching data from " + url + "...");
    try {
      const res = await fetch(url);
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: unknown) {
      setApiResponse("Error fetching endpoint: " + String(err));
    } finally {
      setApiTesting(false);
    }
  }

  const statusChip = (
    <span className={`cms-status-chip ${published ? "is-published" : ""}`}>
      <i />
      {published ? "Published · demo" : saved ? "Draft saved · demo" : "Draft · demo"}
    </span>
  );

  return (
    <div className="shell cms-page">
      <div className="page-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>CMS demonstration</span>
      </div>
      <header className="cms-page-heading">
        <div>
          <p className="eyebrow">Content authoring demonstration</p>
          <h1>
            A clearer way<br />
            to manage <em>content.</em>
          </h1>
        </div>
        <div className="cms-prototype-label">
          <span className="prototype-dot" /> Content Management Studio
        </div>
      </header>

      <div className="cms-shell">
        <aside className="cms-sidebar" aria-label="CMS demonstration navigation">
          <div className="cms-sidebar-top">
            <span className="cms-mark">CC</span>
            <div>
              <strong>Content studio</strong>
              <small>Demonstration area</small>
            </div>
          </div>
          <nav className="cms-nav" aria-label="Content management screens">
            {(Object.keys(panelLabels) as Panel[]).map((key) => (
              <button
                className={panel === key ? "is-current" : ""}
                type="button"
                key={key}
                onClick={() => selectPanel(key)}
              >
                <span className="cms-nav-dot" />
                {panelLabels[key]}
                {panel === key && <Icon name="arrow" size={16} />}
              </button>
            ))}
          </nav>
          <div className="cms-sidebar-bottom">
            <span className="cms-user-dot">M</span>
            <span>
              <strong>Marketing team</strong>
              <small>Authorised editor</small>
            </span>
          </div>
        </aside>

        <div className="cms-main">
          <div className="cms-topbar">
            <div>
              <span className="cms-mobile-mark">CC</span>
              <p className="cms-breadcrumb-label">
                {panelLabels[panel]}
                {preview || eventPreview ? " / Preview" : ""}
              </p>
            </div>
            <div className="cms-topbar-actions">
              {statusChip}
              <Link className="cms-view-site" href="/">
                View site <Icon name="arrow-up-right" size={15} />
              </Link>
            </div>
          </div>

          {statusMessage && (
            <p className="cms-status-message" role="status" aria-live="polite">
              <Icon name="check-circle" size={17} />
              {statusMessage}
            </p>
          )}

          {panel === "dashboard" && (
            <section className="cms-panel-content">
              <div className="cms-welcome-row">
                <div>
                  <p className="eyebrow">Good morning</p>
                  <h2>What would you like to update?</h2>
                  <p>Choose a content area to review. All examples are local to this prototype.</p>
                </div>
                <span className="cms-dashboard-orb">
                  <Icon name="sparkle" size={25} />
                </span>
              </div>
              <div className="cms-workflow">
                <div className="cms-workflow-heading">
                  <div>
                    <p className="eyebrow">A simple publishing flow</p>
                    <h3>From draft to live.</h3>
                  </div>
                  <span className="cms-flow-caption">Draft → Edit → Preview → Publish</span>
                </div>
                <div className="workflow-steps">
                  {[
                    { num: "01", title: "Draft", text: "Start from a clear template." },
                    { num: "02", title: "Edit", text: "Update content in context." },
                    { num: "03", title: "Preview", text: "Check desktop, tablet and mobile." },
                    { num: "04", title: "Publish", text: "Review, then confirm." },
                  ].map((item, index) => (
                    <div className="workflow-step" key={item.num}>
                      <span>{item.num}</span>
                      <strong>{item.title}</strong>
                      <small>{item.text}</small>
                      {index < 3 && <i aria-hidden="true">→</i>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="cms-dashboard-grid">
                <button
                  className="cms-dashboard-card campaign-dashboard-card"
                  type="button"
                  onClick={() => selectPanel("campaign")}
                >
                  <span className="cms-card-kicker">Homepage campaign</span>
                  <strong>{campaignTitle}</strong>
                  <small>
                    Edit headline, copy, media & CTA <Icon name="arrow-up-right" size={15} />
                  </small>
                </button>
                <button
                  className="cms-dashboard-card"
                  type="button"
                  onClick={() => selectPanel("event")}
                >
                  <span className="cms-card-kicker">Event content</span>
                  <strong>{showcaseEvent.title}</strong>
                  <small>
                    Supplied event sample · Edit <Icon name="arrow-up-right" size={15} />
                  </small>
                </button>
                <button
                  className="cms-dashboard-card"
                  type="button"
                  onClick={() => selectPanel("sql")}
                >
                  <span className="cms-card-kicker">Database integration</span>
                  <strong>SQL Data Architecture</strong>
                  <small>
                    Inspect relational mapping pipeline <Icon name="arrow-up-right" size={15} />
                  </small>
                </button>
                <button
                  className="cms-dashboard-card"
                  type="button"
                  onClick={() => selectPanel("evidence")}
                >
                  <span className="cms-card-kicker">Credentials & Case Studies</span>
                  <strong>Previous work evidence</strong>
                  <small>
                    Enterprise CMS delivery proof <Icon name="arrow-up-right" size={15} />
                  </small>
                </button>
              </div>
            </section>
          )}

          {panel === "content" && (
            <section className="cms-panel-content">
              <div className="cms-section-heading">
                <div>
                  <p className="eyebrow">Content listing</p>
                  <h2>Pages and content.</h2>
                  <p>Representative screens only—these are not live publishing records.</p>
                </div>
                <button
                  type="button"
                  className="button button-primary button-small"
                  onClick={() => selectPanel("campaign")}
                >
                  <Icon name="plus" size={16} /> New draft
                </button>
              </div>
              <div className="cms-content-table" style={{ overflowX: "auto" }}>
                <div className="cms-table-head">
                  <span>Content</span>
                  <span>Type</span>
                  <span>Example status</span>
                  <span />
                </div>
                <button
                  className="cms-content-row"
                  type="button"
                  onClick={() => selectPanel("campaign")}
                >
                  <span>
                    <strong>Homepage campaign</strong>
                    <small>{campaignTitle}</small>
                  </span>
                  <span>Campaign</span>
                  <span className="table-status status-draft">Draft · demo</span>
                  <Icon name="arrow-up-right" size={18} />
                </button>
                <button
                  className="cms-content-row"
                  type="button"
                  onClick={() => selectPanel("event")}
                >
                  <span>
                    <strong>{eventTitle}</strong>
                    <small>{eventDate}</small>
                  </span>
                  <span>Event</span>
                  <span className="table-status status-example">Example</span>
                  <Icon name="arrow-up-right" size={18} />
                </button>
                <button
                  className="cms-content-row"
                  type="button"
                  onClick={() => selectPanel("sql")}
                >
                  <span>
                    <strong>Course catalogue database ({courses.length} courses)</strong>
                    <small>Relational SQL ingestion pipeline & schema mapper</small>
                  </span>
                  <span>Catalogue</span>
                  <span className="table-status status-linked">SQL Ready</span>
                  <Icon name="arrow-up-right" size={18} />
                </button>
              </div>
            </section>
          )}

          {/* SQL DATA ARCHITECTURE & INTEGRATION PANEL (Section 3 & Tender Brief) */}
          {panel === "sql" && (
            <section className="cms-panel-content">
              <div className="cms-section-heading">
                <div>
                  <p className="eyebrow">Tender Brief Section 2 & Bidder Response Alignment</p>
                  <h2>SQL Database Integration & Data Architecture</h2>
                  <p>
                    Demonstrates how course pages are generated dynamically from college SQL tables, mapping all source columns into the reusable template without hardcoded values.
                  </p>
                </div>
                <span className="table-status status-linked">33 Courses Ingested</span>
              </div>

              {/* Data Flow Diagram */}
              <div
                style={{
                  padding: "1.5rem",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  marginBottom: "2rem",
                }}
              >
                <h3 style={{ margin: "0 0 1rem", fontSize: "1.15rem", color: "var(--navy)" }}>
                  Implementation Data Flow Architecture
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--blue-700)" }}>STEP 01</span>
                    <strong style={{ display: "block", color: "var(--navy)", margin: "4px 0" }}>SQL Course Database</strong>
                    <small style={{ color: "var(--body)" }}>6 relational tables (courses, sections, levels, links, funding)</small>
                  </div>
                  <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--blue-700)" }}>STEP 02</span>
                    <strong style={{ display: "block", color: "var(--navy)", margin: "4px 0" }}>Data Ingestion Script</strong>
                    <small style={{ color: "var(--body)" }}>scripts/build-course-data.py relational joins & skills extraction</small>
                  </div>
                  <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--blue-700)" }}>STEP 03</span>
                    <strong style={{ display: "block", color: "var(--navy)", margin: "4px 0" }}>REST API / JSON</strong>
                    <small style={{ color: "var(--body)" }}>Typed schemas via /api/courses and src/lib/courses-data.ts</small>
                  </div>
                  <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--green-700)" }}>STEP 04</span>
                    <strong style={{ display: "block", color: "var(--navy)", margin: "4px 0" }}>Reusable Course Template</strong>
                    <small style={{ color: "var(--body)" }}>src/app/courses/[id]/page.tsx renders all 33 courses mobile-first</small>
                  </div>
                </div>
              </div>

              {/* Complete Column-to-Template Mapping Table */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", color: "var(--navy)", marginBottom: "0.75rem" }}>
                  Complete Course Information Source Mapping (Appendix 2 Excel Schema)
                </h3>
                <p style={{ color: "var(--body)", fontSize: "0.92rem", marginBottom: "1rem" }}>
                  Every available source column is mapped to a dedicated semantic section on the course detail page.
                </p>

                <div
                  tabIndex={0}
                  role="region"
                  aria-label="SQL column mapping table. Use arrow keys to scroll."
                  style={{
                    overflowX: "auto",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    background: "#ffffff",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      minWidth: "640px",
                      borderCollapse: "collapse",
                      fontSize: "0.88rem",
                      textAlign: "left",
                    }}
                  >
                    <thead>
                      <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--line)" }}>
                        <th style={{ padding: "0.75rem 1rem", color: "var(--navy)", fontWeight: 800 }}>Source Column</th>
                        <th style={{ padding: "0.75rem 1rem", color: "var(--blue-700)", fontWeight: 800 }}>Course Template Section</th>
                        <th style={{ padding: "0.75rem 1rem", color: "var(--navy)", fontWeight: 800 }}>Sample Mapped Content</th>
                      </tr>
                    </thead>
                    <tbody>
                      {columnMappingRows.map((row, idx) => (
                        <tr
                          key={row.source}
                          style={{
                            borderBottom: idx < columnMappingRows.length - 1 ? "1px solid var(--line)" : "none",
                            background: idx % 2 === 1 ? "var(--surface)" : "#ffffff",
                          }}
                        >
                          <td style={{ padding: "0.75rem 1rem", fontWeight: 700, fontFamily: "monospace", color: "var(--navy)" }}>
                            {row.source}
                          </td>
                          <td style={{ padding: "0.75rem 1rem", color: "var(--body)", fontWeight: 600 }}>
                            {row.template}
                          </td>
                          <td style={{ padding: "0.75rem 1rem", color: "var(--color-neutral-muted)" }}>
                            {row.sample}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Interactive Live API Tester */}
              <div
                style={{
                  padding: "1.5rem",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  marginBottom: "2rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ margin: 0, color: "var(--navy)", fontSize: "1.15rem" }}>
                      Live API / JSON Ingestion Inspector
                    </h3>
                    <p style={{ margin: "4px 0 0", color: "var(--body)", fontSize: "0.88rem" }}>
                      Test live endpoint responses served from the course dataset.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="button button-outline button-small"
                      onClick={() => testApiEndpoint("/api/courses")}
                      disabled={apiTesting}
                    >
                      GET /api/courses ({courses.length})
                    </button>
                    <button
                      type="button"
                      className="button button-primary button-small"
                      onClick={() => testApiEndpoint("/api/courses/digital-it-l2")}
                      disabled={apiTesting}
                    >
                      GET /api/courses/digital-it-l2 (Course 553)
                    </button>
                  </div>
                </div>

                {apiResponse && (
                  <pre
                    tabIndex={0}
                    role="region"
                    aria-label="API response JSON"
                    style={{
                      maxHeight: "260px",
                      overflowY: "auto",
                      background: "var(--navy)",
                      color: "#a9df81",
                      padding: "1rem",
                      borderRadius: "6px",
                      fontSize: "0.82rem",
                      fontFamily: "monospace",
                      lineHeight: "1.5",
                    }}
                  >
                    {apiResponse}
                  </pre>
                )}
              </div>
            </section>
          )}

          {/* HOMEPAGE CAMPAIGN EDITOR */}
          {panel === "campaign" && (
            <section className="cms-panel-content">
              <div className="cms-section-heading">
                <div>
                  <p className="eyebrow">Campaign editor</p>
                  <h2>{preview ? "Preview campaign" : "Homepage hero campaign."}</h2>
                  <p>Update headline, messaging, media asset, and primary call-to-action.</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className="button button-outline button-small"
                    onClick={() => setPreview((p) => !p)}
                  >
                    <Icon name="play" size={15} /> {preview ? "Exit preview" : "Interactive preview"}
                  </button>
                  <button
                    type="button"
                    className="button button-primary button-small"
                    onClick={togglePublish}
                  >
                    {published ? "Unpublish" : "Publish campaign"}
                  </button>
                </div>
              </div>

              {!preview ? (
                <div className="cms-editor-form">
                  <div className="form-field">
                    <label htmlFor="campaign-headline">Campaign heading *</label>
                    <input
                      id="campaign-headline"
                      value={campaignTitle}
                      onChange={(e) => {
                        setCampaignTitle(e.target.value);
                        setSaved(false);
                      }}
                      maxLength={120}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="campaign-intro">Campaign description *</label>
                    <textarea
                      id="campaign-intro"
                      rows={3}
                      value={campaignIntro}
                      onChange={(e) => {
                        setCampaignIntro(e.target.value);
                        setSaved(false);
                      }}
                      maxLength={240}
                    />
                  </div>

                  <div className="form-field">
                    <span id="media-type-label">Hero media format</span>
                    <div style={{ display: "flex", gap: "1rem" }} role="radiogroup" aria-labelledby="media-type-label">
                      <label style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="media-type"
                          checked={campaignMediaType === "image"}
                          onChange={() => setCampaignMediaType("image")}
                        />
                        <span>Official college photography</span>
                      </label>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="media-type"
                          checked={campaignMediaType === "video"}
                          onChange={() => setCampaignMediaType("video")}
                        />
                        <span>Video presentation with captions</span>
                      </label>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-field">
                      <label htmlFor="cta-label">CTA button label</label>
                      <input
                        id="cta-label"
                        value={campaignCtaLabel}
                        onChange={(e) => setCampaignCtaLabel(e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cta-url">CTA destination route</label>
                      <input
                        id="cta-url"
                        value={campaignCtaUrl}
                        onChange={(e) => setCampaignCtaUrl(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="cms-editor-actions">
                    <button className="button button-outline" type="button" onClick={saveDraft}>
                      Save draft <Icon name="check" size={16} />
                    </button>
                    <button
                      className="button button-primary"
                      type="button"
                      onClick={() => setPreview(true)}
                    >
                      Preview & review <Icon name="play" size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="cms-preview-wrap">
                  <div className="cms-preview-toolbar">
                    <span>Viewport preview simulation:</span>
                    <div className="preview-size-toggle" role="radiogroup" aria-label="Viewport size">
                      {(["desktop", "tablet", "mobile"] as PreviewSize[]).map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={previewSize === size ? "is-selected" : ""}
                          onClick={() => setPreviewSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`cms-live-preview preview-${previewSize}`}>
                    <div className="preview-browser-bar">
                      <span /><span /><span />
                      <small>https://chelmsford.ac.uk/ ({previewSize})</small>
                    </div>
                    <div className="live-preview-content">
                      <div>
                        <p className="eyebrow" style={{ color: "var(--color-primary-green)" }}>
                          Campaign preview
                        </p>
                        <h3>{campaignTitle}</h3>
                        <p>{campaignIntro}</p>
                        <Link href={campaignCtaUrl} className="preview-cta">
                          {campaignCtaLabel} <Icon name="arrow" size={16} />
                        </Link>
                      </div>
                      <img
                        src="/images/students-collaborating.jpg"
                        alt="Preview of hero campaign imagery"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* EVENT EDITOR */}
          {panel === "event" && (
            <section className="cms-panel-content">
              <div className="cms-section-heading">
                <div>
                  <p className="eyebrow">Event editor</p>
                  <h2>{eventPreview ? "Preview event" : "Event details."}</h2>
                  <p>Edit presentation schedules across Moulsham Street and Princes Road campuses.</p>
                </div>
                <span className="table-status status-example">Supplied Event</span>
              </div>
              <div className="cms-event-editor">
                <div className="cms-editor-form">
                  <div className="form-field">
                    <label htmlFor="event-title-input">Event title</label>
                    <input
                      id="event-title-input"
                      value={eventTitle}
                      onChange={(e) => {
                        setEventTitle(e.target.value);
                        setSaved(false);
                      }}
                      maxLength={180}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="event-date-input">Date shown to visitors</label>
                    <input
                      id="event-date-input"
                      value={eventDate}
                      onChange={(e) => {
                        setEventDate(e.target.value);
                        setSaved(false);
                      }}
                      maxLength={100}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="event-desc-input">Event description</label>
                    <textarea
                      id="event-desc-input"
                      defaultValue={showcaseEvent.description}
                      rows={6}
                      readOnly
                      aria-describedby="cms-event-readonly"
                    />
                    <small id="cms-event-readonly">
                      Description is supplied content from Demo Event document.
                    </small>
                  </div>
                  <div className="cms-editor-actions">
                    <button className="button button-outline" type="button" onClick={saveDraft}>
                      Save draft <Icon name="check" size={16} />
                    </button>
                    <button
                      className="button button-outline"
                      type="button"
                      onClick={() => setEventPreview((open) => !open)}
                    >
                      <Icon name="play" size={16} />
                      {eventPreview ? "Close preview" : "Preview event"}
                    </button>
                    <button className="button button-primary" type="button" onClick={togglePublish}>
                      {published ? "Unpublish demo" : "Publish demo"}
                      <Icon name="arrow" size={17} />
                    </button>
                  </div>
                </div>

                <div className={`cms-event-preview ${eventPreview ? "is-previewing" : ""}`}>
                  <span className="tag tag-blue">{showcaseEvent.type}</span>
                  <h3>{eventTitle || "Untitled event"}</h3>
                  <p>
                    <Icon name="calendar" size={16} /> {eventDate || "Date to be confirmed"}
                  </p>
                  <p>
                    <Icon name="clock" size={16} /> {showcaseEvent.time}
                  </p>
                  <p>
                    <Icon name="location" size={16} /> {showcaseEvent.location}
                  </p>
                  {eventPreview && (
                    <p className="cms-preview-explainer">
                      Responsive event preview · layout shown in this editor.
                    </p>
                  )}
                  <Link href={`/events/${showcaseEvent.slug}`} className="text-link">
                    Open event prototype <Icon name="arrow-up-right" size={15} />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* MEDIA LIBRARY */}
          {panel === "media" && (
            <section className="cms-panel-content">
              <div className="cms-section-heading">
                <div>
                  <p className="eyebrow">Image & media management</p>
                  <h2>Choose imagery thoughtfully.</h2>
                  <p>Check the crop, caption and alternative text before content is published.</p>
                </div>
                <label className="button button-outline cms-upload-button">
                  <span>Choose image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        setLocalImage(URL.createObjectURL(file));
                        setStatusMessage("Image preview loaded in this browser only. It has not been uploaded or saved.");
                      }
                    }}
                  />
                </label>
              </div>
              <div className="media-grid">
                {mediaItems.map((item) => (
                  <article className="media-item" key={item.title}>
                    <img src={item.src} alt={item.alt} />
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.alt}</small>
                      <span className="table-status status-linked">Alt text present</span>
                    </div>
                  </article>
                ))}
                {localImage && (
                  <article className="media-item">
                    <img src={localImage} alt="A local image preview selected in the CMS demonstration." />
                    <div>
                      <strong>Local preview</strong>
                      <small>Temporary browser preview, not uploaded.</small>
                      <span className="table-status status-draft">Not saved</span>
                    </div>
                  </article>
                )}
              </div>
              <p className="cms-media-note">
                <Icon name="sparkle" size={16} /> Official photography featuring Chelmsford College students, tutors, practical workshops and achievement celebrations.
              </p>
            </section>
          )}

          {/* EVIDENCE & CASE STUDIES */}
          {panel === "evidence" && (
            <section className="cms-panel-content">
              <div className="cms-section-heading">
                <div>
                  <p className="eyebrow">Procurement Credentials</p>
                  <h2>Enterprise CMS Architecture & FE Experience</h2>
                  <p>Demonstrates role-based permissions, automated accessibility gates, and previous sector case studies.</p>
                </div>
                <span className="table-status status-linked">Proven Delivery</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ background: "#ffffff", border: "1px solid var(--line)", borderRadius: "8px", padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.15rem", color: "var(--navy)", marginBottom: "0.5rem" }}>
                    1. Role-Based Access Control (RBAC) & Governance
                  </h3>
                  <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.7", color: "var(--body)" }}>
                    <li><strong>Contributors (Tutors & Heads of Dept):</strong> Draft course descriptions and workshop equipment requirements.</li>
                    <li><strong>Editors (Marketing Officers):</strong> Refine promotional messaging, verify photography licensing, and ensure brand adherence.</li>
                    <li><strong>Publishing Approvers (Head of Communications):</strong> Perform final compliance review and trigger cache revalidation.</li>
                  </ul>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid var(--line)", borderRadius: "8px", padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.15rem", color: "var(--navy)", marginBottom: "0.5rem" }}>
                    2. Automated WCAG 2.2 AA Accessibility Gates
                  </h3>
                  <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.7", color: "var(--body)" }}>
                    <li><strong>Mandatory Alt-Text Validator:</strong> Images cannot be published without meaningful, context-specific description.</li>
                    <li><strong>Dynamic Contrast Check:</strong> Text overlaid on banners is checked against background colors to ensure $\ge 4.5:1$ ratio.</li>
                    <li><strong>Semantic Heading Enforcer:</strong> Disallows skipped heading levels (H1 → H2 → H3) for screen reader compliance.</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          <div className="cms-bottom-note">
            <Icon name="sparkle" size={16} />
            <span>
              Content management studio aligned with Chelmsford College bid requirements and relational SQL course database architecture.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
