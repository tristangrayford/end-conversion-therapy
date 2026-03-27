import { useState } from "react";
import { NavLink } from "react-router";
import useOutsideClickOrScroll from "./utils/useOutsideClickOrScroll";
import logo from "./assets/ECT Scotland.png";

export function Header() {
  const [dropdownOpen21, set21DropDownOpen] = useState(false);
  const [dropdownOpen26, set26DropDownOpen] = useState(false);

  const handleClose = () => {
    set21DropDownOpen(false);
    set26DropDownOpen(false);
  };

  const ref = useOutsideClickOrScroll<HTMLDivElement>(handleClose);

  return (
    <>
      <h1 className="heading">End Conversion Therapy Scotland</h1>

      <nav className="header">
        <img className="header-logo" src={logo} />
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/background" end>
          Background
        </NavLink>
        <NavLink to="/petition" end>
          Petition
        </NavLink>
        <p onClick={() => set26DropDownOpen(true)}>Holyrood '26</p>
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
        <p onClick={() => set21DropDownOpen(true)}>Holyrood '21</p>
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
      </nav>
    </>
  );
}
