import { skills } from "../data/portfolio";
import "./Skills.css";

export default function Skills() {
  return (
    <div className="skills">
      <h3 className="skills__title">Technical skills</h3>
      <ul className="skills__grid">
        {skills.map((skill) => (
          <li key={skill} className="skills__item">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
