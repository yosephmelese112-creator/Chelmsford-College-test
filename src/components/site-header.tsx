"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import { subjectAreas } from "@/lib/content";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/events", label: "Events" },
  { href: "/#college-life", label: "College life" },
  { href: "/for/employers", label: "Employers & Apprenticeships" },
  { href: "/payments", label: "Payments" },
];

const audienceLinks = [
  { href: "/for/16-19", label: "16 to 19 learners & parents" },
  { href: "/for/adult-learners", label: "Adult learners" },
  { href: "/for/employers", label: "Employers & apprenticeships" },
  { href: "/for/students-and-staff", label: "Students & staff" },
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Chelmsford College home">
      <Image
        src="/images/chelmsford-college-logo.png"
        alt="Chelmsford College"
        width={213}
        height={42}
        priority
        className="brand-logo"
      />
    </Link>
  );
}

export function SiteHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [headerSearchOpen, setHeaderSearchOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");
  const subjectsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Click outside listener for subjects dropdown
  useEffect(() => {
    if (!subjectsOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (subjectsRef.current && !subjectsRef.current.contains(e.target as Node)) {
        setSubjectsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [subjectsOpen]);

  // Focus search input when toggled open
  useEffect(() => {
    if (headerSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [headerSearchOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  function handleHeaderSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (headerSearchQuery.trim()) {
      router.push(`/courses?q=${encodeURIComponent(headerSearchQuery.trim())}`);
      setHeaderSearchOpen(false);
      setHeaderSearchQuery("");
      closeMenu();
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Global Audience Navigation Bar - Compact and visible on all pages */}
      <div className="audience-nav-bar" aria-label="Audience navigation">
        <div className="shell audience-nav-inner">
          <span className="audience-bar-intro">
            <Icon name="sparkle" size={13} /> Information for:
          </span>
          <nav className="audience-links" aria-label="Audiences">
            {audienceLinks.map((item) => (
              <Link href={item.href} key={item.label} className="audience-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <header className="site-header">
        <div className="shell header-inner">
          <Brand />

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/courses" className="desktop-nav-link">
              Courses
            </Link>

            {/* Subject Browsing Dropdown in navigation menu */}
            <div className="subjects-nav-wrapper" ref={subjectsRef}>
              <button
                type="button"
                className={`subjects-nav-trigger ${subjectsOpen ? "is-open" : ""}`}
                onClick={() => setSubjectsOpen((prev) => !prev)}
                aria-expanded={subjectsOpen}
                aria-haspopup="true"
              >
                <span>Browse subjects</span>
                <Icon name="chevron" size={14} />
              </button>

              {subjectsOpen && (
                <div className="subjects-mega-dropdown" role="region" aria-label="Subject areas">
                  <div className="subjects-grid">
                    {subjectAreas.map((area) => (
                      <Link
                        href={`/courses?subject=${encodeURIComponent(area.name)}`}
                        key={area.name}
                        onClick={() => setSubjectsOpen(false)}
                        className="subject-item-link"
                      >
                        <strong>{area.name}</strong>
                        <small>{area.label}</small>
                      </Link>
                    ))}
                  </div>
                  <div className="subjects-dropdown-footer">
                    <Link
                      href="/courses"
                      onClick={() => setSubjectsOpen(false)}
                      className="text-link"
                    >
                      View all 33 college courses <Icon name="arrow" size={15} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {links.slice(1).map((link) => (
              <Link href={link.href} key={link.label} className="desktop-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Persistent Header Search & Actions */}
          <div className="header-actions">
            {headerSearchOpen ? (
              <form
                className="header-search-form"
                onSubmit={handleHeaderSearchSubmit}
                role="search"
              >
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search 33 courses..."
                  value={headerSearchQuery}
                  onChange={(e) => setHeaderSearchQuery(e.target.value)}
                  aria-label="Persistent course search"
                  className="header-search-input"
                />
                <button
                  type="submit"
                  className="header-search-submit"
                  aria-label="Submit course search"
                >
                  <Icon name="search" size={16} />
                </button>
                <button
                  type="button"
                  className="header-search-close"
                  onClick={() => setHeaderSearchOpen(false)}
                  aria-label="Close persistent search bar"
                >
                  <Icon name="close" size={16} />
                </button>
              </form>
            ) : (
              <button
                type="button"
                className="header-search-toggle"
                onClick={() => setHeaderSearchOpen(true)}
                aria-label="Search courses"
              >
                <Icon name="search" size={18} />
                <span className="desktop-search-label">Search courses</span>
              </button>
            )}

            <button
              className={`mobile-menu-toggle ${menuOpen ? "is-active" : ""}`}
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={toggleMenu}
            >
              <Icon name={menuOpen ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Integrated In-App Dropdown Navigation Menu */}
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav-dropdown"
            aria-label="Mobile navigation"
          >
            {/* Mobile Persistent Search Bar */}
            <form
              className="mobile-menu-search"
              onSubmit={handleHeaderSearchSubmit}
              role="search"
            >
              <span className="input-with-icon">
                <Icon name="search" size={18} />
                <input
                  type="search"
                  placeholder="Search all 33 courses..."
                  value={headerSearchQuery}
                  onChange={(e) => setHeaderSearchQuery(e.target.value)}
                  aria-label="Search courses from navigation menu"
                />
              </span>
              <button type="submit" className="button button-primary button-small">
                Search
              </button>
            </form>

            <div className="mobile-nav-links">
              {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  onClick={closeMenu}
                  className="mobile-nav-link"
                >
                  <span>{link.label}</span>
                  <Icon name="arrow-up-right" size={18} />
                </Link>
              ))}
            </div>

            {/* Mobile Subject Browsing Accordion */}
            <details className="mobile-subjects-accordion">
              <summary className="mobile-subjects-summary">
                <span>Browse courses by subject</span>
                <Icon name="chevron" size={16} />
              </summary>
              <div className="mobile-subjects-list">
                {subjectAreas.map((area) => (
                  <Link
                    href={`/courses?subject=${encodeURIComponent(area.name)}`}
                    key={area.name}
                    onClick={closeMenu}
                    className="mobile-subject-link"
                  >
                    <span>{area.name}</span>
                    <small>({area.count})</small>
                  </Link>
                ))}
              </div>
            </details>

            {/* Mobile Audience Nav Section */}
            <div className="mobile-audience-section">
              <p className="eyebrow" style={{ fontSize: "0.75rem", marginBottom: "0.5rem" }}>
                Information for
              </p>
              <div className="mobile-audience-links">
                {audienceLinks.map((item) => (
                  <Link
                    href={item.href}
                    key={item.label}
                    onClick={closeMenu}
                    className="mobile-audience-link"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mobile-nav-footer">
              <Link
                href="/events/discovery-morning"
                onClick={closeMenu}
                className="mobile-nav-event-card"
              >
                <span className="event-badge">Upcoming event</span>
                <strong>Apprenticeships Discovery Morning</strong>
                <small>21 November 2026 · Princes Road campus</small>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Backdrop rendered outside <header> so it covers the full viewport cleanly */}
      {menuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
