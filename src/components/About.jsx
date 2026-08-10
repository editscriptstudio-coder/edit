import "./About.css";

const stats = [
  { value: "3", label: "Years of experince" },
  { value: "50+", label: "Projects delivered" },
  { value: "10+", label: "Creators & brands" },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__grid">
        <div className="about__portrait">
          {/* Put a team or CEO photo at /public/about-photo.jpg */}
          <img
            src="/about-photo.png"
            alt="EditScriptStudio team at work"
            className="about__photo"
          />
        </div>

        <div className="about__copy">
          <span className="about__eyebrow">About us</span>
          <h2 className="about__heading">
            Creativity isnt our job, it's our obession          </h2>
          <p className="about__text">
            EditScriptStudio is a creative agency built for brands that refuse to be ordinary. We tranform ideas inti scroll-stopping content through powerful video editing, storytelling, and design. Every project is crafted with creativity, stratery and precison - because we dont just create content, we creat impact.
          </p>

          <div className="about__stats">
            {stats.map((s) => (
              <div className="about__stat" key={s.label}>
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}