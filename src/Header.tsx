import { useState } from "react";
import { NavLink } from "react-router";
import useOutsideClickOrScroll from "./utils/useOutsideClickOrScroll";
import logo from "./assets/ECT Scotland.png";

export function Header() {
  const [dropdownOpen21, set21DropDownOpen] = useState(false);
  const [dropdownOpen26, set26DropDownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClose = () => {
    set21DropDownOpen(false);
    set26DropDownOpen(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    handleClose();
  };

  const ref = useOutsideClickOrScroll<HTMLDivElement>(handleClose);
  const menuRef = useOutsideClickOrScroll<HTMLDivElement>(handleMenuClose);

  return (
    <>
      <h1 className="heading">End Conversion Therapy Scotland</h1>

      <nav className="header">
        <div className="header-top">
          <img className="header-logo" src={logo} />
          <span className="contact-section">
            <span className="contact-label">Contact Us:</span>
            <a
              className="contact-icon"
              href="mailto:endconversiontherapyscotland@gmail.com"
              aria-label="Email"
              title="Email"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M2 4h20v16H2V4zm2 2v.4l8 5 8-5V6H4zm16 2.6-8 5-8-5V18h16V8.6z" />
              </svg>
            </a>
            <a
              className="contact-icon"
              href="https://bsky.app/profile/endconversiontherapy.scot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bluesky"
              title="Bluesky"
            >
              <svg viewBox="0 0 600 530" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M135.72 44.03c66.49 49.92 138.02 151.14 164.28 205.46 26.26-54.32 97.79-155.54 164.28-205.46C512.21 8.01 590-19.87 590 68.87c0 17.72-10.16 148.79-16.12 170.07-20.74 73.98-96.22 92.87-163.36 81.43 117.31 19.97 147.14 86.1 82.69 152.23-122.36 125.59-175.85-31.49-189.55-71.74-2.51-7.38-3.69-10.83-3.71-7.9-.02-2.93-1.2.52-3.71 7.9-13.7 40.25-67.19 197.33-189.55 71.74-64.45-66.13-34.62-132.26 82.69-152.23-67.14 11.44-142.62-7.45-163.36-81.43C20.06 217.66 9.9 86.59 9.9 68.87c0-88.74 77.79-60.86 125.82-24.84z" />
              </svg>
            </a>
            <a
              className="contact-icon"
              href="https://www.instagram.com/ectscotland/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.2.05 1.8.25 2.2.41.6.22 1 .49 1.5.97s.75.9.97 1.5c.16.4.36 1 .41 2.2.06 1.2.07 1.6.07 4.8s0 3.6-.07 4.8c-.05 1.2-.25 1.8-.41 2.2a4 4 0 0 1-.97 1.5 4 4 0 0 1-1.5.97c-.4.16-1 .36-2.2.41-1.2.06-1.6.07-4.8.07s-3.6 0-4.8-.07c-1.2-.05-1.8-.25-2.2-.41a4 4 0 0 1-1.5-.97 4 4 0 0 1-.97-1.5c-.16-.4-.36-1-.41-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.05-1.2.25-1.8.41-2.2.22-.6.49-1 .97-1.5s.9-.75 1.5-.97c.4-.16 1-.36 2.2-.41C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-1.1.05-1.7.23-2.1.39-.53.2-.9.45-1.3.85s-.65.77-.85 1.3c-.16.4-.34 1-.39 2.1C2.54 8.48 2.53 8.85 2.53 12s.01 3.52.07 4.76c.05 1.1.23 1.7.39 2.1.2.53.45.9.85 1.3s.77.65 1.3.85c.4.16 1 .34 2.1.39 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.1-.05 1.7-.23 2.1-.39a3.5 3.5 0 0 0 1.3-.85 3.5 3.5 0 0 0 .85-1.3c.16-.4.34-1 .39-2.1.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.1-.23-1.7-.39-2.1a3.5 3.5 0 0 0-.85-1.3 3.5 3.5 0 0 0-1.3-.85c-.4-.16-1-.34-2.1-.39C15.52 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.94zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.15-2.06a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
              </svg>
            </a>
          </span>
          <button
            type="button"
            className="burger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div
          className={`nav-links${menuOpen ? " open" : ""}`}
          ref={menuRef}
          onClick={() => setMenuOpen(false)}
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/background" end>
            Background
          </NavLink>
          <NavLink to="/petition" end>
            Petition
          </NavLink>
          <p
            onClick={(e) => {
              e.stopPropagation();
              set26DropDownOpen(true);
            }}
          >
            Holyrood '26
          </p>
          {dropdownOpen26 && (
            <div className="dropdown" ref={ref}>
              <NavLink to="/holyrood26/candidates" end>
                Candidates
              </NavLink>
              <NavLink to="/holyrood26/request" end>
                Request
              </NavLink>
            </div>
          )}
          <p
            onClick={(e) => {
              e.stopPropagation();
              set21DropDownOpen(true);
            }}
          >
            Holyrood '21
          </p>
          {dropdownOpen21 && (
            <div className="dropdown" ref={ref}>
              <NavLink to="/holyrood21/candidates" end>
                Candidates
              </NavLink>
              <NavLink to="/holyrood21/msps" end>
                Elected MSPs
              </NavLink>
              <NavLink to="/holyrood21/request" end>
                Request
              </NavLink>
            </div>
          )}
          <NavLink to="/press" end>
            Press and Policy
          </NavLink>
        </div>
      </nav>
    </>
  );
}
