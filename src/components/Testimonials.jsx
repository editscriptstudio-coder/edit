import "./Testimonials.css";

const testimonials = [
  {
    quote: "Watch time jumped right after switching. Finally posting on schedule too.",
    name: "Anusha",
    role: "YouTube Creator",
    initial: "A",
  },
  {
    quote: "Two reels hit 100K views in the first week. Pacing just hits different now.",
    name: "Mahesh",
    role: "Reels Creator",
    initial: "M",
  },
  {
    quote: "I hand over messy footage and somehow get back a story people watch.",
    name: "Namratha",
    role: "Vlogger",
    initial: "N",
  },
  {
    quote: "Walkthroughs finally look premium. Clients trust the listing before they even visit.",
    name: "Teja",
    role: "Real Estate",
    initial: "T",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__inner">
        <span className="testimonials__eyebrow">Testimonials</span>
        <h2 className="testimonials__heading">What clients say.</h2>

        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <div className="testimonials__card" key={t.name + t.role}>
              <svg className="testimonials__quote-mark" viewBox="0 0 32 24" fill="none" aria-hidden="true">
                <path
                  d="M0 24V14.4C0 5.6 5.4 0.6 13.4 0L14.6 3.4C9.6 4.6 7 7.8 7 12H13.4V24H0ZM18.4 24V14.4C18.4 5.6 23.8 0.6 31.8 0L33 3.4C28 4.6 25.4 7.8 25.4 12H31.8V24H18.4Z"
                  fill="#5B3DF0"
                  fillOpacity="0.15"
                />
              </svg>
              <p className="testimonials__quote">{t.quote}</p>
              <div className="testimonials__person">
                <span className="testimonials__avatar">{t.initial}</span>
                <div className="testimonials__person-meta">
                  <span className="testimonials__name">{t.name}</span>
                  <span className="testimonials__role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}