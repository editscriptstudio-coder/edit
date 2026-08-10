import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

export default function Contact() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_tzvu8ui",   // your EmailJS service ID
        "template_h8rmg9r",  // your EmailJS template ID
        e.target,
        "OLF6Qs6SJj5jSprNh"  // your EmailJS public key
      )
      .then(
        () => {
          setToast({ type: "success", message: "Message sent! We'll reply within a day." });
          e.target.reset();
        },
        (error) => {
          console.error("EmailJS error:", error);
          setToast({ type: "error", message: "Something went wrong. Please try again." });
        }
      );
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__panel">
        <div className="contact__glow" aria-hidden="true" />

        <div className="contact__intro">
          <span className="contact__eyebrow">Get in touch</span>
          <h2 className="contact__heading">Tell us about your project.</h2>
          <p className="contact__sub">
            YouTube, shorts, a film, a podcast — or all of it. Send the details
            and we'll get back to you within a day.
          </p>

          <div className="contact__detail">
            <span className="contact__detail-label">EMAIL</span>
            <span className="contact__detail-value">
              editscriptstudio@gmail.com
            </span>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
              />
            </div>
            <div className="contact__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="contact__field">
            <label htmlFor="projectType">Project type</label>
            <select id="projectType" name="projectType" defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              <option value="youtube">YouTube Editing</option>
              <option value="short-film">Short Film</option>
              <option value="reels">Reels &amp; Shorts</option>
              <option value="podcast">Podcast Editing</option>
              <option value="script">Script Writing</option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div className="contact__field">
            <label htmlFor="message">Project details</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="What are you working on?"
              required
            />
          </div>

          <button className="contact__submit" type="submit">
            Send message <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>

      {toast && (
        <div className={`contact__toast contact__toast--${toast.type}`} role="status">
          <span className="contact__toast-icon" aria-hidden="true">
            {toast.type === "success" ? (
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 8v5M12 16.5h.01M12 3l9 16H3L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
          <span className="contact__toast-message">{toast.message}</span>
          <button className="contact__toast-close" type="button" onClick={() => setToast(null)} aria-label="Dismiss notification">
            <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}
