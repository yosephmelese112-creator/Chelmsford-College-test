"use client";

import { useState, useRef } from "react";
import { Icon } from "@/components/icon";

export function HeroCampaignMedia() {
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
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
              setIsPlaying(false); // No autoplay per brief section 6
            }}
            aria-label="Watch campus video"
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
          {/* Accessible video presentation with NO autoplay per section 6 */}
          <video
            ref={videoRef}
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            poster="/images/students-collaborating.jpg"
            autoPlay={false}
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

          {/* Centered big play button overlay when paused */}
          {!isPlaying && (
            <button
              type="button"
              onClick={handlePlayToggle}
              aria-label="Play Chelmsford College campus video"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 1.4rem",
                background: "var(--color-primary-green)",
                color: "#0b2545",
                border: "none",
                borderRadius: "999px",
                fontSize: "1rem",
                fontWeight: 800,
                fontFamily: "var(--font-heading)",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
              }}
            >
              <Icon name="play" size={20} />
              <span>Play Video Presentation</span>
            </button>
          )}

          {/* Accessible Subtitles / Captions Box */}
          {captionsEnabled && isPlaying && (
            <div
              className="hero-video-captions"
              role="region"
              aria-label="Video closed captions"
              aria-live="polite"
              style={{
                position: "absolute",
                bottom: "4.5rem",
                left: "1rem",
                right: "1rem",
                background: "rgba(0, 0, 0, 0.85)",
                color: "#ffffff",
                padding: "0.55rem 0.95rem",
                borderRadius: "8px",
                fontSize: "0.88rem",
                lineHeight: "1.4",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              [Video narration]: Welcome to Chelmsford College — explore our dedicated technical workshops, refurbished leisure facilities, and student community across Moulsham Street and Princes Road.
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
              background: "linear-gradient(to top, rgba(11,37,69,0.98), rgba(11,37,69,0))",
              padding: "0.85rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 3,
              gap: "0.5rem",
              flexWrap: "wrap",
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
                  color: "#0b2545",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.45rem 0.75rem",
                  fontSize: "0.85rem",
                  fontWeight: 800,
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
                  border: "1px solid rgba(255,255,255,0.35)",
                  borderRadius: "6px",
                  padding: "0.45rem 0.65rem",
                  fontSize: "0.8rem",
                  fontWeight: 700,
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
                  border: "1px solid rgba(255,255,255,0.35)",
                  borderRadius: "6px",
                  padding: "0.45rem 0.65rem",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>

              <button
                type="button"
                onClick={() => setTranscriptOpen(!transcriptOpen)}
                aria-label={transcriptOpen ? "Hide video text transcript" : "Show video text transcript"}
                aria-expanded={transcriptOpen}
                style={{
                  background: transcriptOpen ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.35)",
                  borderRadius: "6px",
                  padding: "0.45rem 0.65rem",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                Transcript
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (videoRef.current) videoRef.current.pause();
                setIsVideoMode(false);
                setIsPlaying(false);
              }}
              aria-label="Close video and return to campus photography"
              style={{
                background: "none",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "6px",
                padding: "0.45rem 0.75rem",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                minHeight: "44px",
              }}
            >
              Back to photo
            </button>
          </div>

          {/* Accessible Text Transcript Drawer */}
          {transcriptOpen && (
            <div
              className="video-transcript-drawer"
              role="region"
              aria-label="Video transcript text"
              tabIndex={0}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: "4rem",
                background: "rgba(11, 37, 69, 0.96)",
                color: "#ffffff",
                padding: "1.25rem",
                overflowY: "auto",
                zIndex: 4,
                fontSize: "0.9rem",
                lineHeight: "1.6",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <strong style={{ fontSize: "1rem", color: "var(--color-primary-green)" }}>
                  Video Transcript · Chelmsford College Campus Tour
                </strong>
                <button
                  type="button"
                  onClick={() => setTranscriptOpen(false)}
                  aria-label="Close transcript"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
              <p style={{ margin: "0 0 0.75rem" }}>
                <strong>[00:00 – Narration]:</strong> Welcome to Chelmsford College. Across our two vibrant campuses in Essex — Moulsham Street and Princes Road — we provide specialist training environments that prepare you for the real world.
              </p>
              <p style={{ margin: "0 0 0.75rem" }}>
                <strong>[00:15]:</strong> At our Princes Road campus, students develop trade excellence in electrical installation rigs, plumbing science laboratories, carpentry workshops, and motor vehicle diagnostics.
              </p>
              <p style={{ margin: "0 0 0.75rem" }}>
                <strong>[00:32]:</strong> At Moulsham Street, discover creative fashion studios, Mac design suites, commercial hair and beauty salons at The Hub, science laboratories, and refurbished leisure facilities.
              </p>
              <p style={{ margin: "0" }}>
                <strong>[00:48]:</strong> Whether pursuing full-time vocational diplomas, high-level T Levels, or apprenticeships with Essex employers, your future begins here. Visit us on campus to see for yourself.
              </p>
            </div>
          )}
        </div>
      )}
    </figure>
  );
}
