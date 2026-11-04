"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icon";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/events", label: "Events" },
  { href: "/#college-life", label: "College life" },
  { href: "/#employers", label: "Employers" },
  { href: "/payments", label: "Payments" },
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
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <div className="notice-bar">
        <div className="shell notice-inner">
          <span><Icon name="sparkle" size={15} /> Find your next step at Chelmsford College</span>
          <Link href="/events/showcase-open-evening">
            Showcase Open Evening · 4 November 2026 <Icon name="arrow-up-right" size={15} />
          </Link>
        </div>
      </div>

      <header className="site-header">
        <div className="shell header-inner">
          <Brand />

          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
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

            <div className="mobile-nav-footer">
              <Link
                href="/events/showcase-open-evening"
                onClick={closeMenu}
                className="mobile-nav-event-card"
              >
                <span className="event-badge">Upcoming</span>
                <strong>Showcase Open Evening</strong>
                <small>4 November 2026 · Moulsham Street campus</small>
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
