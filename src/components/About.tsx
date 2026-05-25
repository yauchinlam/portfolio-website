import { about, certifications, education } from "../data/portfolio";
import Skills from "./Skills";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About</h2>
        <p className="section-subtitle">
          Cloud architecture, secure systems, and AI integration in regulated
          environments.
        </p>
        <div className="about__grid">
          <div className="about__text">
            {about.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <ul className="about__meta">
              <li>
                <strong>Education:</strong> {education}
              </li>
              <li>
                <strong>Certifications:</strong>
                <ul>
                  {certifications.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <Skills />
        </div>
      </div>
    </section>
  );
}
