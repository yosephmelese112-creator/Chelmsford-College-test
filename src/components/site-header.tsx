"use client";

import { useState } from "react";
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

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="notice-bar">
        <div className="shell notice-inner">
          <span><Icon name="sparkle" size={15} /> Find your next step at Chelmsford College</span>
          <Link href="/events/showcase-open-evening">Showcase Open Evening · 4 November 2026 <Icon name="arrow-up-right" size={15} /></Link>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
          </nav>
          <div className="header-actions">
            <Link className="button button-small button-green" href="/enquire?type=application">Apply / enquire <Icon name="arrow-up-right" size={17} /></Link>
            <button
              className="mobile-menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? "close" : "menu"} size={23} />
            </button>
          </div>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
          <div className="mobile-nav-links">
            {links.map((link) => <Link href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>{link.label}<Icon name="arrow-up-right" size={17} /></Link>)}
            <Link href="/enquire?type=application" className="mobile-apply" onClick={() => setMenuOpen(false)}>Apply or enquire <Icon name="arrow" size={19} /></Link>
          </div>
        </nav>
      </header>
    </>
  );
}
