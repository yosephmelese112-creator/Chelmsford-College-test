"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";

export function HeroCampaignMedia() {
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeEmbedUrl =
    "https://www.youtube-nocookie.com/embed/M_9ipxMmRXI?autoplay=1&rel=0&modestbranding=1";

  return (
    <figure className="hero-photo" style={{ position: "relative" }}>
      {!isPlaying ? (
        <>
          <img
            src="/images/students-collaborating.jpg"
            alt="Chelmsford College students laughing and enjoying college life together on campus."
            fetchPriority="high"
          />

          {/* Watch campus video button - positioned at bottom for both web and responsive views */}
          <button
            type="button"
            className="hero-video-toggle"
            onClick={() => setIsPlaying(true)}
            aria-label="Watch campus video"
          >
            <span className="hero-video-play-disc" aria-hidden="true">
              <Icon name="play" size={14} />
            </span>
            <span>Watch campus video</span>
          </button>
        </>
      ) : (
        <div className="hero-video-embed-wrap">
          <iframe
            src={youtubeEmbedUrl}
            title="Chelmsford College campus video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="hero-video-iframe"
          />
          <button
            type="button"
            className="hero-video-close-btn"
            onClick={() => setIsPlaying(false)}
            aria-label="Close video"
          >
            <span>Close video</span>
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
    </figure>
  );
}
