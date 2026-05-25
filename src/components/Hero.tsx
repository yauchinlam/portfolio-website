import { profile } from "../data/portfolio";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__inner container">
        <div className="hero__content">
          <p className="hero__eyebrow">Portfolio</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__headline">{profile.headline}</p>
          <p className="hero__tagline">{profile.tagline}</p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn-primary">
              View projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in touch
            </a>
          </div>
        </div>
        <div className="hero__photo-wrap">
          <img
            src="/profile.jpg"
            alt={`${profile.name} — professional headshot`}
            className="hero__photo"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              img.nextElementSibling?.classList.remove("hero__photo-fallback--hidden");
            }}
          />
          <div className="hero__photo-fallback hero__photo-fallback--hidden" aria-hidden>
            <span>YML</span>
          </div>
        </div>
      </div>
    </section>
  );
}
