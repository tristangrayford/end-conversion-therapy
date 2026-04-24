import { useState, useMemo, useRef, useCallback } from "react";
import { Party } from "../../data/Party";
import { getPartyLabel } from "../../data/partyData";
import { GetPartyLogo } from "../../utils/getPartyLogo";
import type { PartyInData } from "../../utils/candidateUtils";

// Add party enum values here as manifesto pledges are confirmed.
const INCLUSIVE_BAN_PARTIES = new Set<Party>([Party.EqualityParty]);

const HOSTILE_PARTIES = new Set<Party>([
  Party.ScottishFamilyParty,
  Party.CommunistPartyOfBritain,
  Party.IndependenceForScotlandParty,
  Party.UkIndependenceParty,
  Party.AllianceForDemocracyAndFreedom,
  Party.AdvanceUK,
  Party.IndependentGreenVoice,
  Party.ChristianParty,
]);

const QUESTIONABLE_PARTIES = new Set<Party>([
  Party.ScottishLabourParty,
  Party.ScottishConservativeParty,
]);

const PARTIAL_PLEDGE_PARTIES = new Set<Party>([Party.ScottishGreenParty]);

const HOSTILE_QUESTIONABLE_PARTIES = new Set<Party>([Party.Reform]);

const PARTIAL_QUESTIONABLE_PARTIES = new Set<Party>([
  Party.ScottishLiberalDemocrats,
]);

const TICK_TICK_QUESTION_PARTIES = new Set<Party>([
  Party.ScottishNationalParty,
]);

const SINGLE_QUESTION_PARTIES = new Set<Party>([
  Party.AllianceToLiberateScotland,
  Party.ScottishCommonParty,
  Party.WorkersParty,
  Party.TradeUnionistAndSocialistCoalition,
  Party.SocialistLabourParty,
  Party.AnimalWelfareParty,
  Party.TheLiberalParty,
  Party.AbolishTheScottishParliamentParty,
]);

const RED_QUESTION_PARTIES = new Set<Party>([
  Party.ScottishLibertarianParty,
  Party.HeritageParty,
  Party.EdinburghEastLothianPeople,
  Party.FreedomAlliance,
]);

const MANIFESTO_TOOLTIPS = new Map<Party, string[]>([
  [
    Party.ScottishGreenParty,
    [
      "Calls for a comprehensive ban on conversion therapy covering all settings, such as religious, informal, community, family-based and therapeutic, with clear protections for affirming healthcare, and inclusive of trans, non-binary, and asexual identities. This ban will be backed by appropriate criminal and civil penalties, and a statutory right of survivors to support and advocacy.",
      "Calls on the UK Government to remove its block on much-needed Gender Recognition legislation and update it with international best practice HOWEVER lack of mention of trans inclusion in areas of everyday life such as workplaces and sport.",
      "Significant manifesto commitments to unlocking and improving provision of trans healthcare.",
    ],
  ],
  [
    Party.ScottishLabourParty,
    [
      "Only backs a conversion practices ban from Westminster, not from the Scottish Parliament.",
      'Actively hostile to LGBTQ+ lives in society, proposing deeply segregationist policy that would drive trans people out of public life everywhere from "the NHS, schools, sport, and everyday life".',
      "No mention at all of trans healthcare in the manifesto but proposing segregating trans people in the NHS. Ban on trans healthcare provision advanced by the UK Labour Government.",
    ],
  ],
  [
    Party.Reform,
    [
      "'Appalled at how the SNP have not protected local communities and women and girls in Scotland in preference to pursuing woke policies on immigration and gender.'",
      "No further mention of the community,",
    ],
  ],
  [
    Party.ScottishFamilyParty,
    [
      "Would ban gender transition and institute conversion practices through the NHS.",
      "Would ban inclusive education in schools and any gender non-conforming expression.",
    ],
  ],
  [
    Party.ScottishConservativeParty,
    [
      "No mention of conversion practices",
      "Seeks to end the collection of any information about trans people to support them",
      "Actively hostile and spreads misinformation and fear-mongering about trans people and gender recognition reform",
      "Hostile to inclusive education in schools",
    ],
  ],
  [
    Party.ScottishLiberalDemocrats,
    [
      "Supports banning all forms of conversion therapies and practices, working in partnership with the UK Government to achieve this. No mention of support for effors through the Scottish Parliament",
      "Supports inclusive education in schools, and Gender Recognition Reform at a UK level, but no further mention of responses to hostility to LGBTQ+ people in wider society",
      "No mention of trans healthcare",
    ],
  ],
  [
    Party.ScottishNationalParty,
    [
      "Supports an inclusive ban within the first year of the Scottish Parliament, with or without the support of the UK Government",
      "'We are committed to upholding and protecting the human rights of trans people as far as possible within our powers and we will do all we can to ensure that trans people’s identities are recognised and respected', also backs inclusive education",
      "No mention of trans healthcare",
    ],
  ],
  [Party.AllianceToLiberateScotland, ["Only have one policy on independence"]],
  [
    Party.CommunistPartyOfBritain,
    [
      "Only relevant policy is backing 'single sex spaces' in favour of segregation",
    ],
  ],
  [
    Party.IndependenceForScotlandParty,
    [
      "Only relevant policy is support for 'Women Speak Scotland' anti-trans group",
    ],
  ],
  [Party.ScottishCommonParty, ["No mention of the community in the manifesto"]],
  [
    Party.UkIndependenceParty,
    [
      "'The Party does not recognise any notion of transgenderism'",
      "Would repeal the GRA, actively hostile to the community and spreads dangerous misinformation and fearmongering about trans people in the manifesto",
    ],
  ],
  [Party.WorkersParty, ["No mention of the community in the manifesto"]],
  [
    Party.AllianceForDemocracyAndFreedom,
    [
      "Uses the 'biological males' trope as part of rejection of trans identities",
      "Actively hostile to Pride events and inclusive education",
    ],
  ],
  [Party.AdvanceUK, ["Compares LGBTQ+ identities to paedophilia"]],
  [Party.IndependentGreenVoice, ["Supportes segregation of trans people"]],
  [
    Party.ScottishLibertarianParty,
    [
      "Dogwhistle of 'politically motivated curriculums' and 'indocrinating children'",
      "Want to abolish the Hate Crimes Act, which would remove legal protections for LGBTQ+ people against hate crimes",
    ],
  ],
  [
    Party.TradeUnionistAndSocialistCoalition,
    [
      "No mention of community in manifesto but indivdiual candidates have their own platforms",
    ],
  ],
  [Party.SocialistLabourParty, ["No mention of community in manifesto"]],
  [
    Party.AnimalWelfareParty,
    ["No mention of community in manifesto", "Single issue party"],
  ],
  [
    Party.HeritageParty,
    [
      "Dogwhistle of 'transgender ideology'",
      "Want to abolish the Hate Crimes Act, which would remove legal protections for LGBTQ+ people against hate crimes",
    ],
  ],
  [
    Party.EqualityParty,
    [
      "No Scottish election manifesto but recent press statements are trans inclusive and supportive",
    ],
  ],
  [
    Party.ChristianParty,
    [
      "Condemn 'bias towards homosexuality', 'LGBT agenda' and 'imposition of homosexual and transexual principles' in education",
      "Compares LGBTQ+ identities to paedophilia and pornography",
      "Hostile to gender care through the NHS and even any research to support it",
    ],
  ],
  [
    Party.EdinburghEastLothianPeople,
    [
      "Suggest parents should be able to choose to not have their children taught about LGBTQ+ people in schools",
    ],
  ],
  [
    Party.TheLiberalParty,
    [
      "Very middle-of-the-road on all issues around LGTBTQ+ rights",
      "No mention of conversion therapy or trans healthcare",
    ],
  ],
  [
    Party.AbolishTheScottishParliamentParty,
    [
      "No manifesto or public statements on the community",
      "Single issue party",
    ],
  ],
  [
    Party.FreedomAlliance,
    [
      "Dogwhistles including 'sex-based rights' and 'identity-based extremist ideologies in education'",
    ],
  ],
]);

function getItemClassifications(party: number) {
  const hasManifestoPledge = INCLUSIVE_BAN_PARTIES.has(party);
  const isHostile = HOSTILE_PARTIES.has(party);
  const isQuestionable = QUESTIONABLE_PARTIES.has(party);
  const isPartialPledge = PARTIAL_PLEDGE_PARTIES.has(party);
  const isHostileQuestionable = HOSTILE_QUESTIONABLE_PARTIES.has(party);
  const isPartialQuestionable = PARTIAL_QUESTIONABLE_PARTIES.has(party);
  const isTickTickQuestion = TICK_TICK_QUESTION_PARTIES.has(party);
  const isSingleQuestion = SINGLE_QUESTION_PARTIES.has(party);
  const isRedQuestion = RED_QUESTION_PARTIES.has(party);
  const hasClassification =
    hasManifestoPledge ||
    isHostile ||
    isQuestionable ||
    isPartialPledge ||
    isHostileQuestionable ||
    isPartialQuestionable ||
    isTickTickQuestion ||
    isSingleQuestion ||
    isRedQuestion;

  return {
    hasManifestoPledge,
    isHostile,
    isQuestionable,
    isPartialPledge,
    isHostileQuestionable,
    isPartialQuestionable,
    isTickTickQuestion,
    isSingleQuestion,
    isRedQuestion,
    hasClassification,
  };
}

function ManifestoStatusIcons({
  hasManifestoPledge,
  isHostile,
  isQuestionable,
  isPartialPledge,
  isHostileQuestionable,
  isPartialQuestionable,
  isTickTickQuestion,
  isSingleQuestion,
  isRedQuestion,
}: {
  hasManifestoPledge: boolean;
  isHostile: boolean;
  isQuestionable: boolean;
  isPartialPledge: boolean;
  isHostileQuestionable: boolean;
  isPartialQuestionable: boolean;
  isTickTickQuestion: boolean;
  isSingleQuestion: boolean;
  isRedQuestion: boolean;
}) {
  return (
    <>
      {hasManifestoPledge && (
        <span className="manifesto-partial-icons">✅</span>
      )}
      {isHostile && <span className="manifesto-hostile-cross">✗</span>}
      {isQuestionable && (
        <span className="manifesto-questionable-icons">
          <span className="manifesto-qmark manifesto-qmark-grey">?</span>
          <span className="manifesto-cross-red">❌❌</span>
        </span>
      )}
      {isPartialPledge && (
        <span className="manifesto-partial-icons">
          ✅<span className="manifesto-qmark manifesto-qmark-green">?+</span>✅
        </span>
      )}
      {isHostileQuestionable && (
        <span className="manifesto-questionable-icons">
          <span className="manifesto-qmark manifesto-qmark-grey">?</span>
          <span className="manifesto-cross-red">❌</span>
          <span className="manifesto-qmark manifesto-qmark-grey">?</span>
        </span>
      )}
      {isPartialQuestionable && (
        <span className="manifesto-partial-icons">
          ✅<span className="manifesto-minus">−</span>✅
          <span className="manifesto-minus">−</span>
          <span
            className="manifesto-qmark manifesto-qmark-grey"
            style={{ marginLeft: "0.3rem" }}
          >
            ?
          </span>
        </span>
      )}
      {isTickTickQuestion && (
        <span className="manifesto-partial-icons">
          ✅✅
          <span
            className="manifesto-qmark manifesto-qmark-grey"
            style={{ marginLeft: "0.3rem" }}
          >
            ?
          </span>
        </span>
      )}
      {isSingleQuestion && (
        <span className="manifesto-qmark manifesto-qmark-grey">?</span>
      )}
      {isRedQuestion && (
        <span className="manifesto-qmark manifesto-qmark-red">?−</span>
      )}
    </>
  );
}

interface ManifestoTracker26Props {
  partiesInData: PartyInData[];
  onPartyClick: (party: number) => void;
}

export function ManifestoTracker26({
  partiesInData,
  onPartyClick,
}: ManifestoTracker26Props) {
  const [activeTooltipParty, setActiveTooltipParty] = useState<Party | null>(
    null,
  );
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = useCallback((party: Party) => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setActiveTooltipParty(party);
  }, []);

  const scheduleHide = useCallback((party: Party) => {
    hideTimeout.current = setTimeout(() => {
      setActiveTooltipParty((prev) => (prev === party ? null : prev));
    }, 150);
  }, []);

  const majorParties = useMemo(
    () => partiesInData.slice(0, 6),
    [partiesInData],
  );
  const minorParties = useMemo(() => partiesInData.slice(6), [partiesInData]);

  const majorPartySet = useMemo(() => new Set(majorParties.map(p => p.party)), [majorParties]);

  const renderTooltip = (parties: Set<Party>) => {
    if (!activeTooltipParty || !parties.has(activeTooltipParty) || !MANIFESTO_TOOLTIPS.has(activeTooltipParty)) return null;
    return (
      <div
        className="manifesto-tooltip manifesto-tooltip-active"
        onMouseEnter={() => showTooltip(activeTooltipParty)}
        onMouseLeave={() => scheduleHide(activeTooltipParty)}
      >
        <ul>
          {MANIFESTO_TOOLTIPS.get(activeTooltipParty)!.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      </div>
    );
  };

  const minorPartySet = useMemo(() => new Set(minorParties.map(p => p.party)), [minorParties]);

  return (
    <div className="manifesto-tracker">
      <h3>Inclusive Ban In Manifesto</h3>
      <div className="manifesto-logo-grid manifesto-logo-grid-major">
        {majorParties.map((item) => {
          const c = getItemClassifications(item.party);
          const tooltipItems = MANIFESTO_TOOLTIPS.get(item.party);
          const isTooltipActive = activeTooltipParty === item.party;
          return (
            <div
              key={item.party}
              className={`manifesto-logo-item manifesto-logo-item-major ${c.hasManifestoPledge ? "manifesto-logo-item-pledged" : ""} ${c.isHostile ? "manifesto-logo-item-hostile" : ""} ${c.isQuestionable ? "manifesto-logo-item-questionable" : ""} ${c.isPartialPledge ? "manifesto-logo-item-partial" : ""} ${c.isHostileQuestionable ? "manifesto-logo-item-hostile-questionable" : ""} ${c.isPartialQuestionable ? "manifesto-logo-item-partial-questionable" : ""} ${c.isTickTickQuestion ? "manifesto-logo-item-partial" : ""} ${c.isSingleQuestion ? "manifesto-logo-item-single-question" : ""} ${c.isRedQuestion ? "manifesto-logo-item-hostile-questionable" : ""} ${tooltipItems ? "manifesto-has-tooltip" : ""}`}
              onClick={() => {
                if (tooltipItems) {
                  setActiveTooltipParty(isTooltipActive ? null : item.party);
                } else {
                  setActiveTooltipParty(null);
                  onPartyClick(item.party);
                }
              }}
              onMouseEnter={() => tooltipItems && showTooltip(item.party)}
              onMouseLeave={() => tooltipItems && scheduleHide(item.party)}
            >
              <div
                className={`manifesto-logo ${c.hasClassification ? "" : "manifesto-logo-muted"}`}
                title={item.label}
              >
                {GetPartyLogo(item.party)}
              </div>
              <p>{item.label}</p>
              <ManifestoStatusIcons {...c} />
            </div>
          );
        })}
      </div>
      {renderTooltip(majorPartySet)}
      <div className="manifesto-logo-grid manifesto-logo-grid-minor">
        {minorParties.map((item) => {
          const c = getItemClassifications(item.party);
          const tooltipItems = MANIFESTO_TOOLTIPS.get(item.party);
          const isTooltipActive = activeTooltipParty === item.party;
          return (
            <div
              key={item.party}
              className={`manifesto-logo-item ${c.hasManifestoPledge ? "manifesto-logo-item-pledged" : ""} ${c.isHostile ? "manifesto-logo-item-hostile" : ""} ${c.isQuestionable ? "manifesto-logo-item-questionable" : ""} ${c.isPartialPledge ? "manifesto-logo-item-partial" : ""} ${c.isHostileQuestionable ? "manifesto-logo-item-hostile-questionable" : ""} ${c.isPartialQuestionable ? "manifesto-logo-item-partial-questionable" : ""} ${c.isTickTickQuestion ? "manifesto-logo-item-partial" : ""} ${c.isSingleQuestion ? "manifesto-logo-item-single-question" : ""} ${c.isRedQuestion ? "manifesto-logo-item-hostile-questionable" : ""} ${tooltipItems ? "manifesto-has-tooltip" : ""}`}
              onClick={() => {
                if (tooltipItems) {
                  setActiveTooltipParty(isTooltipActive ? null : item.party);
                } else {
                  setActiveTooltipParty(null);
                  onPartyClick(item.party);
                }
              }}
              onMouseEnter={() => tooltipItems && showTooltip(item.party)}
              onMouseLeave={() => tooltipItems && scheduleHide(item.party)}
              title={item.label}
            >
              <div
                className={`manifesto-logo ${c.hasClassification ? "" : "manifesto-logo-muted"}`}
                title={item.label}
              >
                {GetPartyLogo(item.party)}
              </div>
              <p>{getPartyLabel(item.party)}</p>
              <ManifestoStatusIcons {...c} />
            </div>
          );
        })}
      </div>
      {renderTooltip(minorPartySet)}
    </div>
  );
}
