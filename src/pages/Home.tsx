import { NavLink } from "react-router";

function Home() {
  return (
    <div className="page-content">
      <h2>Welcome</h2>
      <p>Welcome to the End Conversion Therapy Scotland Campaign</p>
      <p>
        If you're looking for information on our campaign find it at{" "}
        <NavLink to="/background" end>
          Background
        </NavLink>{" "}
        or for the press summary{" "}
        <NavLink to="/press" end>
          Press
        </NavLink>
      </p>
      <p>
        If you're looking for the Holyrood 2026 candidates and their pledges
        head to:{" "}
        <NavLink to="/holyrood26/candidates" end>
          Candidates
        </NavLink>
      </p>
      <p>
        If you're looking for the Holyrood 2021 candidates and their pledges
        head to:{" "}
        <NavLink to="/holyrood21/candidates" end>
          2021 Candidates
        </NavLink>{" "}
        and for those who were elected:{" "}
        <NavLink to="/holyrood21/msps" end>
          MSPs
        </NavLink>
      </p>
      <p>
        For the 2020 Scottish Parliamentary Petition that kicked off our
        campaign:{" "}
        <NavLink to="/petition" end>
          Petition
        </NavLink>
      </p>
    </div>
  );
}

export default Home;
