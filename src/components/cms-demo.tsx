"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { showcaseEvent } from "@/lib/content";

type Panel = "dashboard" | "content" | "campaign" | "event" | "media";
type PreviewSize = "desktop" | "tablet" | "mobile";

const panelLabels: Record<Panel, string> = {
  dashboard: "Dashboard",
  content: "Content",
  campaign: "Homepage campaign",
  event: "Events",
  media: "Media library",
};

const mediaItems = [
  { src: "/images/students-collaborating.jpg", title: "Student life on campus", alt: "Chelmsford College students laughing and chatting together on campus." },
  { src: "/images/campus-learning.jpg", title: "Salon practical learning", alt: "A tutor guiding a student during a practical hair and beauty styling session." },
  { src: "/images/creative-classroom.jpg", title: "Digital collaboration", alt: "Students collaborating with a laptop in a modern digital classroom space." },
  { src: "/images/fashion-studio.jpg", title: "Technical workshop", alt: "A student and tutor working together in a practical college technical workshop." },
  { src: "/images/student-library.jpg", title: "Awards & achievement", alt: "A student celebrating their award and certificate with tutors at Chelmsford College." },
];

export function CmsDemo() {
  const [panel, setPanel] = useState<Panel>("dashboard");
  const [preview, setPreview] = useState(false);
  const [eventPreview, setEventPreview] = useState(false);
  const [previewSize, setPreviewSize] = useState<PreviewSize>("desktop");
  const [campaignTitle, setCampaignTitle] = useState("Make your next move matter.");
  const [campaignIntro, setCampaignIntro] = useState("Find the subject that sparks something. Build skills you can take anywhere. Your next chapter starts here.");
  const [eventTitle, setEventTitle] = useState(showcaseEvent.title);
  const [eventDate, setEventDate] = useState(showcaseEvent.dateLabel);
  const [published, setPublished] = useState(false);
  const [saved, setSaved] = useState(false);
  const [localImage, setLocalImage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  function saveDraft() {
    setSaved(true);
    setStatusMessage("Draft saved in this browser session. No live CMS content was changed.");
  }

  function togglePublish() {
    const next = !published;
    setPublished(next);
    setStatusMessage(next
      ? "Demo content marked as published. This does not publish to a live website."
      : "Demo content marked as unpublished. This does not change a live website.");
  }

  function selectPanel(next: Panel) {
    setPanel(next);
    setPreview(false);
    setEventPreview(false);
    setStatusMessage("");
  }

  const statusChip = (
    <span className={`cms-status-chip ${published ? "is-published" : ""}`}>
      <i />{published ? "Published · demo" : saved ? "Draft saved · demo" : "Draft · demo"}
    </span>
  );

  return (
    <div className="shell cms-page">
      <div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span><span>CMS demonstration</span></div>
      <header className="cms-page-heading">
        <div><p className="eyebrow">Supporting experience</p><h1>A clearer way<br />to manage <em>content.</em></h1></div>
        <div className="cms-prototype-label"><span className="prototype-dot" /> CMS concept · not a live system</div>
      </header>

      <div className="cms-shell">
        <aside className="cms-sidebar" aria-label="CMS demonstration navigation">
          <div className="cms-sidebar-top"><span className="cms-mark">CC</span><div><strong>Content studio</strong><small>Demonstration area</small></div></div>
          <nav className="cms-nav" aria-label="Content management screens">
            {(Object.keys(panelLabels) as Panel[]).map((key) => (
              <button className={panel === key ? "is-current" : ""} type="button" key={key} onClick={() => selectPanel(key)}>
                <span className="cms-nav-dot" />{panelLabels[key]}{panel === key && <Icon name="arrow" size={16} />}
              </button>
            ))}
          </nav>
          <div className="cms-sidebar-bottom"><span className="cms-user-dot">M</span><span><strong>Marketing team</strong><small>Example editor</small></span></div>
        </aside>

        <div className="cms-main">
          <div className="cms-topbar">
            <div><span className="cms-mobile-mark">CC</span><p className="cms-breadcrumb-label">{panelLabels[panel]}{preview || eventPreview ? " / Preview" : ""}</p></div>
            <div className="cms-topbar-actions">{statusChip}<Link className="cms-view-site" href="/">View site <Icon name="arrow-up-right" size={15} /></Link></div>
          </div>
          {statusMessage && <p className="cms-status-message" role="status" aria-live="polite"><Icon name="check-circle" size={17} />{statusMessage}</p>}

          {panel === "dashboard" && (
            <section className="cms-panel-content">
              <div className="cms-welcome-row"><div><p className="eyebrow">Good morning</p><h2>What would you like to update?</h2><p>Choose a content area to review. All examples are local to this prototype.</p></div><span className="cms-dashboard-orb"><Icon name="sparkle" size={25} /></span></div>
              <div className="cms-workflow">
                <div className="cms-workflow-heading"><div><p className="eyebrow">A simple publishing flow</p><h3>From draft to live.</h3></div><span className="cms-flow-caption">Draft → Edit → Preview → Publish</span></div>
                <div className="workflow-steps">
                  {[{ num: "01", title: "Draft", text: "Start from a clear template." }, { num: "02", title: "Edit", text: "Update content in context." }, { num: "03", title: "Preview", text: "Check desktop, tablet and mobile." }, { num: "04", title: "Publish", text: "Review, then confirm." }].map((item, index) => (
                    <div className="workflow-step" key={item.num}><span>{item.num}</span><strong>{item.title}</strong><small>{item.text}</small>{index < 3 && <i aria-hidden="true">→</i>}</div>
                  ))}
                </div>
              </div>
              <div className="cms-dashboard-grid">
                <button className="cms-dashboard-card campaign-dashboard-card" type="button" onClick={() => selectPanel("campaign")}><span className="cms-card-kicker">Homepage campaign</span><strong>Make your next move matter.</strong><small>Draft content · Open editor <Icon name="arrow-up-right" size={15} /></small></button>
                <button className="cms-dashboard-card" type="button" onClick={() => selectPanel("event")}><span className="cms-card-kicker">Event content</span><strong>{showcaseEvent.title}</strong><small>Supplied event sample · Edit <Icon name="arrow-up-right" size={15} /></small></button>
                <button className="cms-dashboard-card" type="button" onClick={() => selectPanel("media")}><span className="cms-card-kicker">Media library</span><strong>Images & accessibility</strong><small>Manage illustrative media · Open <Icon name="arrow-up-right" size={15} /></small></button>
              </div>
              <div className="cms-data-note"><Icon name="lock" size={17} /><p>Course details remain separate from marketing content. No college course SQL export was supplied, so this prototype uses the five examples from the project brief.</p></div>
            </section>
          )}

          {panel === "content" && (
            <section className="cms-panel-content">
              <div className="cms-section-heading"><div><p className="eyebrow">Content listing</p><h2>Pages and content.</h2><p>Representative screens only—these are not live publishing records.</p></div><button type="button" className="button button-primary button-small" onClick={() => selectPanel("campaign")}><Icon name="plus" size={16} /> New draft</button></div>
              <div className="cms-content-table">
                <div className="cms-table-head"><span>Content</span><span>Type</span><span>Example status</span><span /></div>
                <button className="cms-content-row" type="button" onClick={() => selectPanel("campaign")}><span><strong>Homepage campaign</strong><small>Make your next move matter.</small></span><span>Campaign</span><span className="table-status status-draft">Draft · demo</span><Icon name="arrow-up-right" size={18} /></button>
                <button className="cms-content-row" type="button" onClick={() => selectPanel("event")}><span><strong>{showcaseEvent.title}</strong><small>{showcaseEvent.dateLabel}</small></span><span>Event</span><span className="table-status status-example">Sample content</span><Icon name="arrow-up-right" size={18} /></button>
                <Link className="cms-content-row" href="/courses"><span><strong>Course examples</strong><small>Five examples from the project brief</small></span><span>Sample content</span><span className="table-status status-example">Illustrative data</span><Icon name="arrow-up-right" size={18} /></Link>
              </div>
            </section>
          )}

          {panel === "campaign" && (
            <section className="cms-panel-content">
              <div className="cms-section-heading"><div><p className="eyebrow">Homepage campaign</p><h2>{preview ? "Preview campaign" : "Edit campaign."}</h2><p>Update campaign copy, save a draft and preview across breakpoints.</p></div>{statusChip}</div>
              {preview ? (
                <div className="cms-preview-wrap">
                  <div className="cms-preview-toolbar"><span>Responsive preview</span><div className="preview-size-toggle" role="group" aria-label="Choose preview size">{(["desktop", "tablet", "mobile"] as PreviewSize[]).map((size) => <button className={previewSize === size ? "is-selected" : ""} type="button" key={size} aria-pressed={previewSize === size} onClick={() => setPreviewSize(size)}>{size}</button>)}</div></div>
                  <div className={`cms-live-preview preview-${previewSize}`}>
                    <div className="preview-browser-bar"><span /><span /><span /><small>chelmsford.ac.uk</small></div>
                    <div className="live-preview-content"><div><p className="eyebrow">A place to find your thing</p><h3>{campaignTitle}</h3><p>{campaignIntro}</p><span className="preview-cta">Find your course <Icon name="arrow" size={15} /></span></div><img src="/images/students-collaborating.jpg" alt="Illustrative preview image of students working together." /></div>
                  </div>
                  <div className="cms-editor-actions"><button className="button button-outline" type="button" onClick={() => setPreview(false)}><Icon name="back" size={16} /> Back to edit</button><button className="button button-primary" type="button" onClick={togglePublish}>{published ? "Unpublish demo" : "Publish demo"}<Icon name="arrow" size={17} /></button></div>
                </div>
              ) : (
                <div className="cms-editor-form">
                  <label className="form-field"><span>Campaign headline</span><input value={campaignTitle} onChange={(event) => { setCampaignTitle(event.target.value); setSaved(false); }} maxLength={120} /></label>
                  <label className="form-field"><span>Supporting copy</span><textarea value={campaignIntro} onChange={(event) => { setCampaignIntro(event.target.value); setSaved(false); }} rows={4} maxLength={500} /></label>
                  <div className="cms-image-select"><img src="/images/students-collaborating.jpg" alt="Selected illustrative students image." /><div><strong>Campaign image</strong><span>Illustrative image · Pexels</span><button className="inline-link" type="button" onClick={() => selectPanel("media")}>Choose media <Icon name="arrow-up-right" size={15} /></button></div></div>
                  <div className="cms-editor-actions"><button className="button button-outline" type="button" onClick={saveDraft}>Save draft <Icon name="check" size={16} /></button><button className="button button-primary" type="button" onClick={() => { setPreview(true); setPreviewSize("desktop"); }}>Preview & review <Icon name="play" size={17} /></button></div>
                </div>
              )}
            </section>
          )}

          {panel === "event" && (
            <section className="cms-panel-content">
              <div className="cms-section-heading"><div><p className="eyebrow">Event editor</p><h2>{eventPreview ? "Preview event" : "Event details."}</h2><p>Edit the supplied sample in this browser-only demonstration.</p></div><span className="table-status status-example">Prototype content</span></div>
              <div className="cms-event-editor">
                <div className="cms-editor-form">
                  <label className="form-field"><span>Event title</span><input value={eventTitle} onChange={(event) => { setEventTitle(event.target.value); setSaved(false); }} maxLength={180} /></label>
                  <label className="form-field"><span>Date shown to visitors</span><input value={eventDate} onChange={(event) => { setEventDate(event.target.value); setSaved(false); }} maxLength={100} /></label>
                  <label className="form-field"><span>Event description</span><textarea defaultValue={showcaseEvent.description} rows={7} readOnly aria-describedby="cms-event-readonly" /></label>
                  <small id="cms-event-readonly">Description is supplied content; edits are disabled in this CMS concept.</small>
                  <div className="cms-editor-actions"><button className="button button-outline" type="button" onClick={saveDraft}>Save draft <Icon name="check" size={16} /></button><button className="button button-outline" type="button" onClick={() => setEventPreview((open) => !open)}><Icon name="play" size={16} />{eventPreview ? "Close preview" : "Preview event"}</button><button className="button button-primary" type="button" onClick={togglePublish}>{published ? "Unpublish demo" : "Publish demo"}<Icon name="arrow" size={17} /></button></div>
                </div>
                <div className={`cms-event-preview ${eventPreview ? "is-previewing" : ""}`}><span className="tag tag-blue">{showcaseEvent.type}</span><h3>{eventTitle || "Untitled event"}</h3><p><Icon name="calendar" size={16} /> {eventDate || "Date to be confirmed"}</p><p><Icon name="clock" size={16} /> {showcaseEvent.time}</p><p><Icon name="location" size={16} /> {showcaseEvent.location}</p>{eventPreview && <p className="cms-preview-explainer">Responsive event preview · layout shown in this editor.</p>}<Link href={`/events/${showcaseEvent.slug}`} className="text-link">Open event prototype <Icon name="arrow-up-right" size={15} /></Link></div>
              </div>
            </section>
          )}

          {panel === "media" && (
            <section className="cms-panel-content">
              <div className="cms-section-heading"><div><p className="eyebrow">Image & media management</p><h2>Choose imagery thoughtfully.</h2><p>Check the crop, caption and alternative text before content is published.</p></div><label className="button button-outline cms-upload-button"><span>Choose image</span><input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) { setLocalImage(URL.createObjectURL(file)); setStatusMessage("Image preview loaded in this browser only. It has not been uploaded or saved."); } }} /></label></div>
              <div className="media-grid">{mediaItems.map((item) => <article className="media-item" key={item.title}><img src={item.src} alt={item.alt} /><div><strong>{item.title}</strong><small>{item.alt}</small><span className="table-status status-linked">Alt text present</span></div></article>)}{localImage && <article className="media-item"><img src={localImage} alt="A local image preview selected in the CMS demonstration." /><div><strong>Local preview</strong><small>Temporary browser preview, not uploaded.</small><span className="table-status status-draft">Not saved</span></div></article>}</div>
              <p className="cms-media-note"><Icon name="sparkle" size={16} /> Demo media is illustrative stock imagery. College-supplied photography and production media permissions need to be confirmed separately.</p>
            </section>
          )}

          <div className="cms-bottom-note"><Icon name="sparkle" size={16} /><span>Concept screens for procurement demonstration. No live CMS or production publishing connection is implemented.</span></div>
        </div>
      </div>
    </div>
  );
}
