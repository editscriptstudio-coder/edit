import { useState, useEffect, useRef } from "react";
import "./Services.css";

const services = [
  {
    key: "video-editing",
    title: "Video Editing",
    desc: "Corporate, real estate, and AI-assisted edits — cut for the platform they're built for.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="white" strokeWidth="1.8" />
        <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="white" />
      </svg>
    ),
    types: [
      { label: "Corporate Ads" },
      { label: "Promos & Trailers" },
      { label: "AI Video Editing", note: "Corporate" },
      { label: "Real Estate", note: "Promotional Content" },
      { label: "Vlogs" },
    ],
  },
  {
    key: "script-writing",
    title: "Script Writing",
    desc: "Words built to be filmed — from a 15-second hook to a full episode outline.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 20L14.5 9.5 17.5 12.5 7 23H4v-3z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M13 4l2.5-2.5L19 5l-2.5 2.5" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    types: [
      { label: "Promotional Content" },
      { label: "Reels & Series" },
      { label: "Ads" },
      { label: "Short Film" },
      { label: "YouTube Long Videos" },
    ],
  },
  {
    key: "graphic-design",
    title: "Graphic Design",
    desc: "Posters and thumbnails designed to stop the scroll and hold the frame.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="1.8" />
        <circle cx="8.5" cy="9.5" r="1.5" fill="white" />
        <path d="M21 15l-5-5-8 8" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    types: [
      { label: "Film Posters" },
      { label: "Brand Posters" },
      { label: "Thumbnails", note: "YouTube & Instagram" },
    ],
  },
];

const showcaseVideos = [
  {
    title: "AI Video Editing",
    detail: "AI-assisted visuals with a polished final cut.",
    src: "/AI.mp4",
  },
  {
    title: "Before & After",
    detail: "See how raw footage becomes a refined story.",
    src: "/before%20and%20after.mp4",
  },
  {
    title: "Daily Vlogs",
    detail: "Fast-paced edits that keep every moment moving.",
    src: "/daily.mp4",
  },
  {
    title: "Reels",
    detail: "Short-form edits designed to stop the scroll.",
    src: "/reels.mp4",
  },
];

function ShowcaseVideo({ video }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.play().then(() => setIsPaused(false)).catch(() => {});
        } else {
          element.pause();
          setIsPaused(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      element.play().then(() => setIsPaused(false)).catch(() => {});
    } else {
      element.pause();
      setIsPaused(true);
    }
  };

  const toggleSound = (event) => {
    event.stopPropagation();
    const element = videoRef.current;
    if (!element) return;

    element.muted = !element.muted;
    setIsMuted(element.muted);
    element.play().then(() => setIsPaused(false)).catch(() => {});
  };

  return (
    <article className="services__showcase-card">
      <video
        ref={videoRef}
        className="services__showcase-video"
        muted
        loop
        playsInline
        preload="metadata"
        onClick={togglePlayback}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <button
        className="services__sound-toggle"
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? `Turn on sound for ${video.title}` : `Mute ${video.title}`}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <div className="services__showcase-overlay">
        <h3>{video.title}</h3>
        <p>{video.detail}</p>
      </div>
      {isPaused && <span className="services__play-indicator">Play</span>}
    </article>
  );
}

export default function Services() {
  const [activeKey, setActiveKey] = useState(null);
  const active = services.find((s) => s.key === activeKey) || null;

  useEffect(() => {
    document.documentElement.style.overflow = active ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setActiveKey(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="services" id="services">
      <div className="services__inner">
        <span className="services__eyebrow">What we do</span>
        <h2 className="services__heading">One team, every format your content needs.</h2>

        <div className="services__grid">
          {services.map((s) => (
            <div className="services__card" key={s.key}>
              <span className="services__icon">{s.icon}</span>
              <h3 className="services__title">{s.title}</h3>
              <p className="services__desc">{s.desc}</p>
              <button
                type="button"
                className="services__more"
                onClick={() => setActiveKey(s.key)}
              >
                Know more
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ))}
        </div>

      </div>

      {active && (
        <div
          className="services__overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="services-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveKey(null);
          }}
        >
          <div className="services__modal">
            <button
              type="button"
              className="services__close"
              onClick={() => setActiveKey(null)}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <span className="services__modal-icon">{active.icon}</span>
            <h3 id="services-modal-title" className="services__modal-title">
              {active.title}
            </h3>
            <p className="services__modal-desc">{active.desc}</p>

            <div className="services__type-grid">
              {active.types.map((t, i) => (
                <div
                  className="services__type-card"
                  key={t.label}
                  style={{
                    "--dir": i % 2 === 0 ? -1 : 1,
                    animationDelay: `${0.46 + i * 0.07}s`,
                  }}
                >
                  <span className="services__type-label">{t.label}</span>
                  {t.note && <span className="services__type-note">{t.note}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
