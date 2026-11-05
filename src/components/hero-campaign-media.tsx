"use client";

import { Icon } from "@/components/icon";

export function HeroCampaignMedia() {
  const youtubeUrl = "https://www.youtube.com/watch?v=M_9ipxMmRXI";

  return (
    <figure className="hero-photo" style={{ position: "relative" }}>
      <img
        src="/images/students-collaborating.jpg"
        alt="Chelmsford College students laughing and enjoying college life together on campus."
        fetchPriority="high"
      />
      <figcaption className="hero-photo-label">
        <span className="photo-label-dot" /> Learn together. Find your direction.
      </figcaption>

      {/* YouTube Deep Link Button */}
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-video-toggle"
        aria-label="Watch campus video on YouTube"
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          zIndex: 3,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.6rem 1rem",
          background: "rgba(11, 37, 69, 0.9)",
          color: "#ffffff",
          border: "1px solid rgba(255, 255, 255, 0.28)",
          borderRadius: "999px",
          backdropFilter: "blur(8px)",
          fontSize: "0.85rem",
          fontWeight: 700,
          fontFamily: "var(--font-heading)",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          minHeight: "44px",
          minWidth: "44px",
          textDecoration: "none",
          transition: "transform 0.16s ease, background-color 0.16s ease, box-shadow 0.16s ease",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "var(--color-primary-green, #7bc242)",
            color: "#ffffff",
          }}
          aria-hidden="true"
        >
          <Icon name="play" size={13} />
        </span>
        <span>Watch campus video</span>
        <Icon name="arrow-up-right" size={15} style={{ opacity: 0.85 }} aria-hidden="true" />
      </a>

      <div className="hero-photo-note">
        <span>Curious minds</span>
        <span>Practical skills</span>
      </div>
    </figure>
  );
}
