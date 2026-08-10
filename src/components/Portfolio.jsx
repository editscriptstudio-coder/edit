import { useEffect, useRef, useState } from "react";
import "./Portfolio.css";

const projects = [
  { id: "u7Z8HUbvzaY", title: "Daily Vlog", tag: "Vlog" },
  { id: "HyRnN1G0dR4", title: "Full-Length Video", tag: "YouTube" },
  { id: "0bmZ4DXpnzs", title: "Short Film Title Glimpse", tag: "Short Film" },
  { id: "DAJW7hriU_0", title: "Short Film Trailer", tag: "Trailer" },
];

const reelCategories = [
  {
    id: "ai",
    label: "AI Video Editing",
    detail: "AI-assisted visuals with a polished final cut.",
    folder: "ai videos",
    videos: [
      { file: "coffe ad.mp4", title: "Coffee Ad", detail: "AI-assisted visuals with a polished final cut." },
    ],
  },
  {
    id: "bf",
    label: "Before & After",
    detail: "See how raw footage becomes a refined story.",
    folder: "before-after",
    videos: [
      { file: "roohid head talking b-and-f.mp4", title: "Roohid: Before & After", detail: "A direct-to-camera transformation, shot to final cut." },
      { file: "anusha 1st b-and-f.mp4", title: "Anusha: Before & After", detail: "Raw footage reshaped into a polished story." },
      { file: "raju before and after.mp4", title: "Raju: Before & After", detail: "Raw footage reshaped into a polished story." },
      { file: "science promo b-and-f.mp4", title: "Science Promo: Before & After", detail: "A transformation edit for a science-themed promo." },
      { file: "srinu sir b-and-f.mp4", title: "Srinu Sir: Before & After", detail: "A client's story reshaped into a polished before-and-after." },
    ],
  },
  {
    id: "event",
    label: "Event Promo",
    detail: "High-energy edits built to announce and hype events.",
    folder: "event promos",
    videos: [
      { file: "op6 anivversery promo.mp4", title: "OP6 Anniversary Promo", detail: "High-energy edit built to announce and hype the event." },
      { file: "promo1 by roohid.mp4", title: "Promo by Roohid", detail: "A punchy promo edit designed to hook and convert." },
      { file: "event announcement.mp4", title: "Event Announcement", detail: "A crisp announcement edit built to spread the word." },
      { file: "iste event.mp4", title: "ISTE Event", detail: "Event coverage cut for maximum energy." },
      { file: "signature day 1.mp4", title: "Signature Day", detail: "Highlights from Signature Day, cut for social." },
      { file: "dance video.mp4", title: "Dance Video", detail: "A fast-paced dance edit built to stop the scroll." },
      { file: "Podcast coming soon✨#podcastshow #contentcreator #videoediting #hyderabad #mbu.mp4", title: "Podcast Coming Soon", detail: "A teaser promo for an upcoming podcast." },
    ],
  },
  {
    id: "head-talking",
    label: "Head-Talking Reel",
    detail: "Direct-to-camera storytelling that keeps viewers hooked.",
    folder: "head talking videos",
    videos: [
      { file: "reel for N2.mp4", title: "Reel for N2", detail: "Direct-to-camera storytelling that keeps viewers hooked." },
      { file: "roohid head talking.mp4", title: "Roohid: Head-Talking", detail: "Direct-to-camera storytelling, cut for engagement." },
      { file: "roohid reel op5.mp4", title: "Roohid Reel", detail: "High-energy short-form edit with dynamic pacing." },
      { file: "starting promo for insta.mp4", title: "Instagram Promo", detail: "A punchy promo edit designed to hook and convert." },
      { file: "anusha maay day promo.mp4", title: "Anusha: May Day Promo", detail: "A themed promo edit cut for social." },
      { file: "anusha maadam qurey.mp4", title: "Anusha: Client Query", detail: "A direct-to-camera client query edit." },
      { file: "anudha about sonum.mp4", title: "Anudha: About Sonum", detail: "A direct-to-camera storytelling edit." },
    ],
  },
];

function reelSrc(folder, file) {
  return `/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

const THUMBNAIL_FALLBACKS = ["hqdefault.jpg", "mqdefault.jpg", "default.jpg"];

function YoutubeThumbnail({ videoId, alt }) {
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFallbackIndex(0);
    setIsLoaded(false);
  }, [videoId]);

  if (fallbackIndex >= THUMBNAIL_FALLBACKS.length) return null;

  return (
    <img
      className={`portfolio__thumbnail-image${isLoaded ? " is-loaded" : ""}`}
      src={`https://i.ytimg.com/vi/${videoId}/${THUMBNAIL_FALLBACKS[fallbackIndex]}`}
      alt={alt}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      onError={() => setFallbackIndex((current) => current + 1)}
    />
  );
}

function EditExample({ video, onSeeMore }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.play().then(() => setIsPaused(false)).catch(() => {});
      } else {
        element.pause();
        setIsPaused(true);
      }
    }, { threshold: 0.35 });
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
    <article className="portfolio__edit-card">
      <video ref={videoRef} className="portfolio__edit-video" muted loop playsInline preload="metadata" onClick={togglePlayback}>
        <source src={video.src} type="video/mp4" />
      </video>
      <button className="portfolio__sound-toggle" type="button" onClick={toggleSound} aria-label={isMuted ? `Turn on sound for ${video.title}` : `Mute ${video.title}`}>
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <div className="portfolio__edit-overlay">
        <h3>{video.title}</h3>
        <p>{video.detail}</p>
        {onSeeMore && (
          <button
            className="portfolio__edit-more"
            type="button"
            onClick={(event) => { event.stopPropagation(); onSeeMore(); }}
          >
            See more reels <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
      {isPaused && <span className="portfolio__play-indicator">Play</span>}
    </article>
  );
}

export default function Portfolio() {
  const [playingId, setPlayingId] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [reelsView, setReelsView] = useState("main");
  const [editStartIndex, setEditStartIndex] = useState(0);
  const [editsPerView, setEditsPerView] = useState(4);
  const editTouchStartX = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 700px)");
    const updateEditsPerView = () => setEditsPerView(mql.matches ? 1 : 4);
    updateEditsPerView();
    mql.addEventListener("change", updateEditsPerView);
    return () => mql.removeEventListener("change", updateEditsPerView);
  }, []);

  useEffect(() => {
    setEditStartIndex(0);
  }, [reelsView]);

  const activeCategory = reelsView === "main" ? null : reelCategories.find((category) => category.id === reelsView);

  const mainReelCards = reelCategories.map((category) => ({
    key: category.id,
    title: category.label,
    detail: category.detail,
    src: reelSrc(category.folder, category.videos[0].file),
    hasMore: category.videos.length > 1,
    onSeeMore: () => setReelsView(category.id),
  }));

  const folderReelCards = activeCategory
    ? activeCategory.videos.map((video, index) => ({
        key: `${activeCategory.id}-${index}`,
        title: video.title,
        detail: video.detail,
        src: reelSrc(activeCategory.folder, video.file),
      }))
    : [];

  const editCards = activeCategory ? folderReelCards : mainReelCards;

  const goBackToReels = () => setReelsView("main");

  const showPrev = () => {
    setStartIndex((current) => (current - 1 + projects.length) % projects.length);
  };

  const showNext = () => {
    setStartIndex((current) => (current + 1) % projects.length);
  };

  const showEditPrev = () => {
    setEditStartIndex((current) => (current - 1 + editCards.length) % editCards.length);
  };

  const showEditNext = () => {
    setEditStartIndex((current) => (current + 1) % editCards.length);
  };

  const onEditTouchStart = (event) => {
    editTouchStartX.current = event.touches[0].clientX;
  };

  const onEditTouchEnd = (event) => {
    if (editTouchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - editTouchStartX.current;
    editTouchStartX.current = null;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) showEditNext();
    else showEditPrev();
  };

  const visibleProjects = [0, 1, 2].map((offset) => projects[(startIndex + offset) % projects.length]);
  const editsWindow = Math.min(editsPerView, editCards.length);
  const visibleEdits = Array.from({ length: editsWindow }, (_, offset) => editCards[(editStartIndex + offset) % editCards.length]);
  const showEditNav = editCards.length > editsWindow;
  const playingProject = projects.find((project) => project.id === playingId) || null;

  useEffect(() => {
    if (!playingProject) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setPlayingId(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [playingProject]);

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__inner">
        <span className="portfolio__eyebrow">Our work</span>
        <h2 className="portfolio__heading">Editing in action.</h2>
        <p className="portfolio__intro">A selection of AI, short-form, vlog, and transformation edits created by our team.</p>

        {activeCategory && (
          <div className="portfolio__reels-subheader">
            <button className="portfolio__reels-back" type="button" onClick={goBackToReels}>
              <svg viewBox="0 0 24 24" fill="none"><path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back to Reels
            </button>
            <span className="portfolio__reels-subtitle">{activeCategory.label} — all reels</span>
          </div>
        )}

        <div className="portfolio__reels">
          {showEditNav && (
            <button className="portfolio__nav portfolio__nav--prev" type="button" onClick={showEditPrev} aria-label="Previous reel">
              <svg viewBox="0 0 24 24" fill="none"><path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}

          <div className="portfolio__edit-grid" onTouchStart={onEditTouchStart} onTouchEnd={onEditTouchEnd}>
            {visibleEdits.map((video) => (
              <EditExample key={video.key} video={video} onSeeMore={video.hasMore ? video.onSeeMore : null} />
            ))}
          </div>

          {showEditNav && (
            <button className="portfolio__nav portfolio__nav--next" type="button" onClick={showEditNext} aria-label="Next reel">
              <svg viewBox="0 0 24 24" fill="none"><path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
        </div>

        <div className="portfolio__youtube-heading">
          <span>YouTube &amp; short-film work</span>
          <p>Watch longer stories, trailers, and client-ready final cuts.</p>
        </div>
        <div className="portfolio__carousel">
          <button className="portfolio__nav portfolio__nav--prev" type="button" onClick={showPrev} aria-label="Previous video">
            <svg viewBox="0 0 24 24" fill="none"><path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <div className="portfolio__carousel-track">
            {visibleProjects.map((project, index) => {
              const position = index === 0 ? "start" : index === 2 ? "end" : "mid";
              return (
                <article className={`portfolio__carousel-card portfolio__carousel-card--${position}`} key={project.id}>
                  <div className="portfolio__thumb">
                    <button className="portfolio__video-button" type="button" onClick={() => setPlayingId(project.id)} aria-label={`Play ${project.title}`}>
                      <YoutubeThumbnail videoId={project.id} alt="" />
                      <span className="portfolio__thumb-shade" />
                      <span className="portfolio__play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5.5L18 12L8 18.5V5.5Z" fill="white" /></svg></span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <button className="portfolio__nav portfolio__nav--next" type="button" onClick={showNext} aria-label="Next video">
            <svg viewBox="0 0 24 24" fill="none"><path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      {playingProject && (
        <div className="portfolio__lightbox" onClick={() => setPlayingId(null)}>
          <div className="portfolio__lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button className="portfolio__lightbox-close" type="button" onClick={() => setPlayingId(null)} aria-label="Close video">
              <svg viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <iframe
              className="portfolio__lightbox-player"
              src={`https://www.youtube-nocookie.com/embed/${playingProject.id}?autoplay=1&rel=0`}
              title={playingProject.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
