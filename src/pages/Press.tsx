import Press1 from "../assets/policy/Policy1.jpeg";
import Press2 from "../assets/policy/Policy2.jpeg";
import Press3 from "../assets/policy/Policy3.jpeg";
import Press4 from "../assets/policy/Policy4.jpeg";

function Press() {
  return (
    <div className="page-content">
      <h2>Policy Briefing</h2>
      <img className="policy" src={Press1} alt="first policy briefing image" />
      <img className="policy" src={Press2} alt="second policy briefing image" />
      <img className="policy" src={Press3} alt="third policy briefing image" />
      <img className="policy" src={Press4} alt="fourth policy briefing image" />
      <h2>Press Summary</h2>
      <p>
        <b>An End to Conversion Therapy is Scotland’s Future, </b>
      </p>
      <p>
        <b>
          <i>
            The manifestos of every party represented in the last term of
            parliament have committed to banning conversion therapy. There is
            now a clear consensus that Conversion Therapy must be banned in
            Scotland.
          </i>
        </b>
      </p>
      <p>
        Conversion therapy is to the forced conditioning against a person’s
        sexuality or gender identity. Conversion Therapy can happen in a wide
        variety of settings and can take many forms. In all forms however
        Conversion Therapy is deeply harmful. These abhorrent practices have
        damaged generations of LGBT+ young people and adults, often targeting
        them while they are at their most vulnerable.
      </p>
      <p>
        These archaic practices are based upon the misguided and bigoted notion
        that sexual and gender diversity is a disorder to be cured, rather than
        an intrinsic part of an individual’s identity. Conversion Therapy
        practices have no place in Scottish society or Scotland’s future. Yet,
        to date there is no legislation banning Conversion Therapy. Every day it
        remains legal and practiced openly in Scotland, the more harm caused to
        vulnerable LGBT+ people.
      </p>
      <p>
        The longer a ban on Conversion Therapy is delayed the more harm will be
        caused.
      </p>
      <p>
        <b>
          There is a cross-party consensus in favour of a ban on Conversion
          Therapy.
        </b>
      </p>
      <p>
        <ul>
          <li>
            With less than a week to go until the 2021 Scottish elections on May
            6th our Campaign has received over 200 pledges from election
            candidates, constituting 26% of all Candidates.
          </li>
          <li>
            Our Campaign has received endorsements from the Scottish Liberal
            Democrats and the Scottish Green Party.
          </li>
          <li>
            We have also secured manifesto pledges from all parties currently
            represented in the Scottish Parliament to End Conversion Therapy
            within the next parliamentary term.
          </li>
        </ul>
      </p>
      <p>
        With a strong consensus among the LGBT community, religious leaders and
        politicians, we hope that in the wake of this election – no matter the
        result – that the Scottish Government will act swiftly and
        authoritatively to end these cruel practices in Scotland.
      </p>
      <p>
        We hope that 2021 will be the year where Scotland brings about a
        comprehensive ban on all forms of Conversion Therapy on the basis of
        sexuality and gender identity.
      </p>
      <p>
        <b>Our LGBT+ Community demands and deserves nothing less.</b>
      </p>
    </div>
  );
}

export default Press;
