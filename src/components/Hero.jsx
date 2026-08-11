import { useEffect, useRef, useState } from "react";
import "./Hero.css";
import { notifyMuted, notifyUnmuted } from "../audioCoordinator";

export default function Hero() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPaused(false)).catch(() => {});
        } else {
          video.pause();
          setIsPaused(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPaused(false)).catch(() => {});
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const toggleSound = (event) => {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (video.muted) {
      notifyMuted(video);
    } else {
      notifyUnmuted(video, () => setIsMuted(true));
    }
    video.play().then(() => setIsPaused(false)).catch(() => {});
  };

  return (
    <section className="hero" id="home">
      <div className="hero__dotgrid" aria-hidden="true" />
      <div className="hero__glow hero__glow--a" aria-hidden="true" />
      <div className="hero__glow hero__glow--b" aria-hidden="true" />

      <div className="hero__grid">
        <div className="hero__copy">
          <span className="hero__badge">
            <span className="hero__badge-dot" />
            Three years of experience &amp; growth
          </span>

          <h1 className="hero__lines">
            <span className="hero__line">
              <span className="hero__lead">we don't just edit videos</span>
              <span className="hero__reveal">
                we build <span className="hero__mark">stories</span>
              </span>
            </span>
            <span className="hero__line">
              <span className="hero__lead">we don't just design</span>
              <span className="hero__reveal">
                we create <span className="hero__mark">identity</span>
              </span>
            </span>
            <span className="hero__line">
              <span className="hero__lead">we don't just write</span>
              <span className="hero__reveal">
                we shape <span className="hero__mark">powerful ideas</span>
              </span>
            </span>
          </h1>

          <p className="hero__sub">
            A creative team for video editing, script writing, and thumbnail design.
          </p>

          <div className="hero__actions">
            <a className="hero__cta" href="#contact">
              Start a project
              <span aria-hidden="true">→</span>
            </a>
            <a className="hero__link" href="#work">
              See the work
            </a>
          </div>
        </div>

        <div className="hero__portrait">
          <div className="hero__media">
            <div className="hero__video-wrap">
              <video
                ref={videoRef}
                className="hero__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/ceo-photo.png"
                onClick={togglePlayback}
              >
                <source src="https://res.cloudinary.com/kswndjtj/video/upload/v1786389007/a72bbdbbaa557cb3.mp4" type="video/mp4" />
              </video>
              <button
                className="hero__sound-toggle"
                type="button"
                onClick={toggleSound}
                aria-label={isMuted ? "Turn on reel sound" : "Mute reel sound"}
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
              {isPaused && <span className="hero__play-indicator">Play</span>}
            </div>

              <div className="hero__bio">
                <div className="hero__bio-head">
                  <h3 className="hero__bio-name">Roohid Basha</h3>
                  <span className="hero__bio-role">Founder &amp; CEO</span>
                </div>
                <p className="hero__bio-text">
                  <strong>Roohid Basha</strong>, Founder &amp; CEO of{" "}
                  <strong>EditScriptStudio</strong>, brings <strong>3+ years</strong> of
                  video editing and creative production experience across industries,
                  plus <strong>multiple awards</strong> in video editing and short
                  filmmaking. He leads the studio in blending creative storytelling with
                  modern technology to deliver results-driven content.
                </p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
