"use client";

import { useState, useRef } from "react";
import { Icon } from "@/components/icon";

export function HeroCampaignMedia() {
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlayToggle() {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }

  function handleMuteToggle() {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  return (
    <figure className="hero-photo" style={{ position: "relative" }}>
      {!isVideoMode ? (
        <>
          <img
            src="/images/students-collaborating.jpg"
            alt="Chelmsford College students laughing and enjoying college life together on campus."
            fetchPriority="high"
          />
          <figcaption className="hero-photo-label">
            <span className="photo-label-dot" /> Learn together. Find your direction.
          </figcaption>

          {/* Accessible Video presentation toggle button */}
          <button
            type="button"
            className="hero-video-toggle"
            onClick={() => {
              setIsVideoMode(true);
              setIsPlaying(true);
            }}
            aria-label="Play Chelmsford College campus video presentation"
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              zIndex: 3,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1rem",
              background: "rgba(11, 37, 69, 0.88)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "999px",
              backdropFilter: "blur(8px)",
              fontSize: "0.85rem",
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              minHeight: "44px",
              minWidth: "44px",
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
                background: "var(--color-primary-green)",
                color: "#ffffff",
              }}
            >
              <Icon name="play" size={14} />
            </span>
            <span>Watch campus video</span>
          </button>

          <div className="hero-photo-note">
            <span>Curious minds</span>
            <span>Practical skills</span>
          </div>
        </>
      ) : (
        <div
          className="hero-video-container"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            overflow: "hidden",
            background: "#0b2545",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Accessible video presentation with fallback poster */}
          <video
            ref={videoRef}
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            poster="/images/students-collaborating.jpg"
            autoPlay
            playsInline
            muted={isMuted}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            aria-label="Chelmsford College campus and learning facilities overview video"
          />

          {/* Accessible Subtitles / Captions Box */}
          {captionsEnabled && (
            <div
              className="hero-video-captions"
              role="region"
              aria-label="Video captions"
              aria-live="polite"
              style={{
                position: "absolute",
                bottom: "4.5rem",
                left: "1rem",
                right: "1rem",
                background: "rgba(0, 0, 0, 0.78)",
                color: "#ffffff",
                padding: "0.5rem 0.85rem",
                borderRadius: "8px",
                fontSize: "0.85rem",
                lineHeight: "1.4",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              [Video narration]: Welcome to Chelmsford College — explore our dedicated technical workshops, refurbished leisure facilities, and student community.
            </div>
          )}

          {/* Accessible Video Player Controls Bar */}
          <div
            className="hero-video-controls"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(11,37,69,0.95), rgba(11,37,69,0))",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 3,
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={handlePlayToggle}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                aria-pressed={isPlaying}
                style={{
                  background: "var(--color-primary-green)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.45rem 0.75rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  minHeight: "44px",
                  minWidth: "44px",
                }}
              >
                <Icon name={isPlaying ? "close" : "play"} size={16} />
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <button
                type="button"
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                aria-label={captionsEnabled ? "Disable closed captions" : "Enable closed captions"}
                aria-pressed={captionsEnabled}
                style={{
                  background: captionsEnabled ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "6px",
                  padding: "0.45rem 0.65rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                CC {captionsEnabled ? "ON" : "OFF"}
              </button>

              <button
                type="button"
                onClick={handleMuteToggle}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                aria-pressed={!isMuted}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "6px",
                  padding: "0.45rem 0.65rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (videoRef.current) videoRef.current.pause();
                setIsVideoMode(false);
              }}
              aria-label="Close video and return to campus photography"
              style={{
                background: "none",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "6px",
                padding: "0.45rem 0.75rem",
                fontSize: "0.82rem",
                cursor: "pointer",
                minHeight: "44px",
              }}
            >
              Back to photo
            </button>
          </div>
        </div>
      )}
    </figure>
  );
}
