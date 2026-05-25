import "./Navbar.css";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__inner container" aria-label="Main">
        <a href="#home" className="navbar__brand">
          YML
        </a>
        <ul className="navbar__links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
