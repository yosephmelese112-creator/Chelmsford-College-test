import Link from "next/link";
import { Icon } from "@/components/icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const colors = [
  { name: "Brand Blue", value: "#007AC5", role: "Primary buttons, links" },
  { name: "Brand Green", value: "#7BC242", role: "Primary CTAs with navy text" },
  { name: "Navy", value: "#0B2545", role: "Headings, dark surfaces" },
  { name: "Blue 700", value: "#005A92", role: "Text links" },
  { name: "Green 700", value: "#3F7A12", role: "Accessible green text" },
  { name: "Gold", value: "#C9A24D", role: "Event accents" },
  { name: "Blue 50", value: "#E6F2FA", role: "Light blue backgrounds" },
  { name: "Green 50", value: "#EFF8E7", role: "Light green backgrounds" },
  { name: "Surface", value: "#F4F8FB", role: "Section backgrounds" },
  { name: "Error", value: "#B42318", role: "Error states" },
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
                    <span>{color.value}</span>
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
              <span>Display · Montserrat ExtraBold 800</span>
              <strong>Make your next move matter.</strong>
              <small>clamp(3.25rem, 8vw, 5.5rem) · Montserrat 800 · Navy #0B2545</small>
            </div>
            <div className="type-scale">
              <div>
                <span>H1, H2 / Headings</span>
                <strong>Montserrat ExtraBold 800</strong>
                <small>Primary headings in deep Navy (#0B2545)</small>
              </div>
              <div>
                <span>H3, H4 / Secondary Headings</span>
                <strong>Montserrat Bold 700</strong>
                <small>Card titles and subsections in Navy (#0B2545)</small>
              </div>
              <div>
                <span>Body Text / Inter Regular</span>
                <p>Inter Regular, 16–17px, line-height 1.5. Minimum text size strictly 13px across all responsive views.</p>
                <small>Eyebrows: Inter Bold 700 uppercase with letter-spacing</small>
              </div>
            </div>
          </section>

          <section className="system-section">
            <div className="system-section-heading">
              <span>03</span>
              <div>
                <p className="eyebrow">Spacing & Layout</p>
                <h2>Room to think.</h2>
                <p>A 4px foundation scales into consistent component and page rhythm.</p>
              </div>
            </div>
            <div className="spacing-demo">
              {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
                <div className="spacing-item" key={size}>
                  <span>{size}px</span>
                  <i style={{ width: `min(${size * 2}px, 14vw)` }} />
                </div>
              ))}
            </div>
            <div className="breakpoint-table">
              <div>
                <strong>Mobile</strong>
                <span>≤ 640px · single column, 44×44px touch targets, minimum 13px text</span>
              </div>
              <div>
                <strong>Tablet</strong>
                <span>641–1023px · compact navigation, fluid 2-column layouts</span>
              </div>
              <div>
                <strong>Desktop</strong>
                <span>≥ 1024px · full navigation, editorial grid and sidebars</span>
              </div>
            </div>
          </section>

          <section className="system-section component-library-section">
            <div className="system-section-heading">
              <span>04</span>
              <div>
                <p className="eyebrow">Button System</p>
                <h2>Standardised 4-button variants.</h2>
                <p>Standard heights, padding, 8px radius, Montserrat Bold typography, and 44×44px minimum touch targets.</p>
              </div>
            </div>
            <div className="component-showcase">
              <div className="component-demo-block">
                <span className="component-caption">Button Variants</span>
                <div className="component-row">
                  <button className="button button-green" type="button">Primary Green (Apply Now) <Icon name="arrow" size={17} /></button>
                  <button className="button button-primary" type="button">Primary Blue (Search Courses) <Icon name="arrow" size={17} /></button>
                  <button className="button button-secondary" type="button">Secondary <Icon name="arrow-up-right" size={17} /></button>
                  <button className="button button-dark" type="button">Dark <Icon name="arrow" size={17} /></button>
                </div>
                <p>Primary Green (#7BC242 on #0B2545) · Primary Blue (#007AC5) · Secondary (Border #007AC5, Text #005A92) · Dark (#0B2545)</p>
              </div>
              <div className="component-demo-block">
                <span className="component-caption">Status & Category Tags</span>
                <div className="component-row">
                  <span className="tag tag-blue">Level 3</span>
                  <span className="tag tag-green">Open Evening</span>
                  <span className="status-demo status-success"><Icon name="check-circle" size={16} /> Request Received</span>
                </div>
                <p>Accessible Blue 50 / Blue 700 and Green 50 / Green 700 pairings.</p>
              </div>
              <div className="component-demo-block">
                <span className="component-caption">Form Controls</span>
                <label className="form-field system-input">
                  <span>Course or subject</span>
                  <div className="input-with-icon">
                    <Icon name="search" size={17} />
                    <input type="text" placeholder="Search courses" />
                  </div>
                </label>
                <p>Every control has a visible label above the field and 4px keyboard focus ring.</p>
              </div>
              <div className="component-demo-block">
                <span className="component-caption">Focus Indicator</span>
                <button type="button" className="button button-secondary demo-focus-button">Tab to this control</button>
                <p>Visible 4px keyboard focus ring with 2px offset (WCAG 2.2 AA).</p>
              </div>
            </div>
          </section>

          <section className="system-accessibility">
            <span><Icon name="check-circle" size={21} /></span>
            <div>
              <p className="eyebrow eyebrow-light">Accessibility Built In</p>
              <h2>Designed toward WCAG 2.2 AA.</h2>
              <p>Keyboard access, visible 4px focus ring, labels above fields, readable contrast, minimum 44×44px touch targets, minimum 13px text size across all viewports, reduced motion, and screen-reader announcements.</p>
            </div>
            <Link className="button button-green" href="/courses">Explore the experience <Icon name="arrow" size={17} /></Link>
          </section>

          <p className="system-note">Visual refinement following the Chelmsford College Style Guide reference. Real college student photography and official college logo applied across the prototype.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
