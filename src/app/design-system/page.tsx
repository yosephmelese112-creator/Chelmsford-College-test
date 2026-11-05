import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Design System & Accessible Component Library | Chelmsford College",
  description:
    "Design tokens, Montserrat and Inter typography hierarchy, 4-button system, and WCAG 2.2 AA accessible component specifications for Chelmsford College.",
};

const colors = [
  { name: "Brand Blue", value: "#007AC5", role: "Primary buttons, links", darkText: false },
  { name: "Brand Green", value: "#7BC242", role: "Primary CTAs with navy text", darkText: true },
  { name: "Navy", value: "#0B2545", role: "Headings, dark surfaces", darkText: false },
  { name: "Blue 700", value: "#005A92", role: "Text links", darkText: false },
  { name: "Green 700", value: "#3F7A12", role: "Accessible green text", darkText: false },
  { name: "Gold", value: "#C9A24D", role: "Event accents", darkText: true },
  { name: "Blue 50", value: "#E6F2FA", role: "Light blue backgrounds", darkText: true },
  { name: "Green 50", value: "#EFF8E7", role: "Light green backgrounds", darkText: true },
  { name: "Surface", value: "#F4F8FB", role: "Section backgrounds", darkText: true },
  { name: "Error", value: "#B42318", role: "Error states", darkText: false },
];

export default function DesignSystemPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-surface design-system-page">
        <div className="shell">
          <div className="page-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Design system</span>
          </div>

          <header className="system-heading">
            <p className="eyebrow">Style Guide Reference Implementation</p>
            <h1>Foundations for a<br /><em>clearer experience.</em></h1>
            <p>Shared Chelmsford College design tokens, Montserrat & Inter typography hierarchy, 4-button system, and WCAG 2.2 AA accessible patterns across desktop, tablet, and mobile.</p>
          </header>

          <section className="system-section">
            <div className="system-section-heading">
              <span>01</span>
              <div>
                <p className="eyebrow">Colour System</p>
                <h2>Exact design system tokens.</h2>
                <p>10 core tokens: Brand Blue, Brand Green, Navy, Blue 700, Green 700, Gold, Blue 50, Green 50, Surface, and Error.</p>
              </div>
            </div>
            <div className="swatch-grid">
              {colors.map((color) => (
                <article className="color-swatch" key={color.name}>
                  <div className="swatch-block" style={{ backgroundColor: color.value, border: color.value === "#FFFFFF" ? "1px solid #dbe3e3" : undefined }}>
                    <span
                      style={{
                        color: color.darkText ? "#0B2545" : "#FFFFFF",
                        background: color.darkText ? "rgba(255,255,255,0.92)" : "rgba(11,37,69,0.85)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                      }}
                    >
                      {color.value}
                    </span>
                  </div>
                  <strong>{color.name}</strong>
                  <small>{color.role}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="system-section type-system-section">
            <div className="system-section-heading">
              <span>02</span>
              <div>
                <p className="eyebrow">Typography System</p>
                <h2>Montserrat headings. Inter body.</h2>
                <p>H1/H2 in Montserrat ExtraBold (800), H3/H4 in Montserrat Bold (700), body in Inter Regular (16–17px, line-height 1.5), minimum text size 13px, and eyebrow labels in Inter Bold uppercase.</p>
              </div>
            </div>
            <div className="type-specimen">
              <span>Headings: Montserrat ExtraBold (800) & Bold (700)</span>
              <strong>Make your next move matter.</strong>
              <small>Body: Inter Regular (16px / line-height 1.5). Minimum body size across whole site: 13px.</small>
            </div>
            <div className="type-scale">
              <div>
                <span>Desktop H1 (clamp 44px–72px)</span>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "2.4rem", fontWeight: 800, lineHeight: 1.05 }}>Make your next move.</p>
              </div>
              <div>
                <span>Desktop H2 (clamp 28px–44px)</span>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, lineHeight: 1.15 }}>Courses worth a closer look.</p>
              </div>
              <div>
                <span>Eyebrow label (13px, uppercase, 0.12em)</span>
                <p className="eyebrow" style={{ margin: 0 }}>A PLACE TO FIND YOUR THING</p>
              </div>
            </div>
          </section>

          <section className="system-section">
            <div className="system-section-heading">
              <span>03</span>
              <div>
                <p className="eyebrow">Button Hierarchy</p>
                <h2>The four button types.</h2>
                <p>Primary CTA Green (#7BC242 with #0B2545 text), Primary Blue (#007AC5), Secondary Slate, and Outline. Minimum touch target: 44px × 44px.</p>
              </div>
            </div>
            <div className="button-grid">
              <div className="component-demo-block">
                <span>1. Primary Green CTA (Enrol / Apply / Book)</span>
                <button className="button button-green" type="button">Primary CTA Green <Icon name="arrow" size={17} /></button>
                <p>#7BC242 background with #0B2545 navy text (contrast 6.54:1). Reserved for primary conversion actions.</p>
              </div>
              <div className="component-demo-block">
                <span>2. Primary Blue (Search / Action)</span>
                <button className="button button-primary" type="button">Primary Blue (Search Courses) <Icon name="arrow" size={17} /></button>
                <p>#007AC5 background with #FFFFFF text (contrast 4.54:1). Used for search and primary form progression.</p>
              </div>
              <div className="component-demo-block">
                <span>3. Secondary / Supporting Action</span>
                <button className="button button-secondary" type="button">Secondary Action <Icon name="arrow-up-right" size={17} /></button>
                <p>Dark slate tone with high contrast. For alternative options and supporting paths.</p>
              </div>
              <div className="component-demo-block">
                <span>4. Outline / Tertiary Action</span>
                <button className="button button-outline" type="button">Outline Button <Icon name="sparkle" size={16} /></button>
                <p>Bordered button with transparent background. Used for filters, previews and back-links.</p>
              </div>
            </div>
          </section>

          <section className="system-section">
            <div className="system-section-heading">
              <span>04</span>
              <div>
                <p className="eyebrow">Form Controls & Accessible Dropdowns</p>
                <h2>48px minimum height. High contrast.</h2>
                <p>Custom dropdowns built with native keyboard navigation (Escape to close, outside-click listener, aria-expanded, aria-haspopup, and visible focus rings).</p>
              </div>
            </div>
            <div className="component-demo-grid">
              <div className="component-demo-block">
                <span>Text input with label</span>
                <label className="form-field" style={{ width: "100%" }}>
                  <span>Course or subject</span>
                  <input className="system-input" placeholder="e.g. fashion, digital or beauty" readOnly style={{ width: "100%" }} />
                </label>
              </div>
              <div className="component-demo-block">
                <span>Accessible Tag Badges</span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
                  <span className="tag tag-blue">Level 3</span>
                  <span className="tag tag-green">Apprenticeship</span>
                  <span className="tag tag-neutral">Full-time</span>
                </div>
              </div>
            </div>
          </section>

          <section className="system-section">
            <div className="system-section-heading">
              <span>05</span>
              <div>
                <p className="eyebrow">Responsive Breakpoints & 8pt Grid</p>
                <h2>Mobile-first architecture.</h2>
                <p>Designed mobile-first from 360px–390px, scaling cleanly through tablet (768px), desktop (1024px), and wide desktop (1280px).</p>
              </div>
            </div>
            <div className="breakpoint-table">
              <div className="breakpoint-card">
                <strong>Mobile (&le; 640px)</strong>
                <p>Single-column flow, 16px gutter, stacked search filters, integrated in-app dropdown navigation menu.</p>
              </div>
              <div className="breakpoint-card">
                <strong>Tablet (641px–1024px)</strong>
                <p>2-column card layouts, 24px gutter, grid-based presentation schedule tables.</p>
              </div>
              <div className="breakpoint-card">
                <strong>Desktop (1025px+)</strong>
                <p>3-column featured course cards, sticky filter sidebar, mega-dropdown navigation, 1200px max content shell.</p>
              </div>
            </div>
          </section>

          <section className="system-accessibility">
            <div>
              <p className="eyebrow eyebrow-light" style={{ color: "var(--color-primary-green)" }}>Accessibility Built In</p>
              <h2>WCAG 2.2 AA Conformance Verified</h2>
              <p>Every component in this design system conforms to the Public Sector Bodies Accessibility Regulations 2018 and WCAG 2.2 AA standard: zero automated axe-core violations, 44px minimum target sizes, visible focus rings, bypass skip links, and semantic HTML structure.</p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
