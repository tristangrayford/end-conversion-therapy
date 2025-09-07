import { useState } from "react";
import { NavLink } from "react-router";
import useOutsideClickOrScroll from "./utils/useOutsideClickOrScroll";
import logo from "./assets/ECT Scotland.png";

export function Header() {
  const [dropdownOpen21, set21DropDownOpen] = useState(false);

  const handleClose = () => {
    set21DropDownOpen(false);
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
        <NavLink to="/Background" end>
          Background
        </NavLink>
        <NavLink to="/Petition" end>
          Petition
        </NavLink>
        <NavLink to="/Holyrood26" end>
          Holyrood '26
        </NavLink>
        <p onClick={() => set21DropDownOpen(true)}>Holyrood '21</p>
        {dropdownOpen21 && (
          <div className="dropdown" ref={ref}>
            <NavLink to="/Holyrood21/Candidates" end>
              Candidates
            </NavLink>
            <NavLink to="/Holyrood21/MSPs" end>
              Elected MSPs
            </NavLink>
            <NavLink to="/Holyrood21/Request" end>
              Request
            </NavLink>
          </div>
        )}
        <NavLink to="/Press" end>
          Press and Policy
        </NavLink>
      </nav>
    </>
  );
}
