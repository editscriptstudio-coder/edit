import { useState } from "react";
import "./Header.css";

const navigationItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Portfolio", "#portfolio"],
  ["Testimonials", "#testimonials"],
  ["Contact Us", "#contact"],
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <a className="site-header__brand" href="#home" onClick={closeMenu}>
        <img src="/Logo.png" alt="EditScriptStudio logo" className="site-header__logo-img" />
        <span className="site-header__name">EditScriptStudio</span>
      </a>

      <button
        className="site-header__menu-button"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        className={`site-header__nav ${isMenuOpen ? "site-header__nav--open" : ""}`}
      >
        {navigationItems.map(([label, href]) => (
          <a key={href} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
        <a className="site-header__mobile-cta" href="#contact" onClick={closeMenu}>
          Get Started
        </a>
      </nav>

      <a className="site-header__cta" href="#contact">
        Get Started
      </a>
    </header>
  );
}
