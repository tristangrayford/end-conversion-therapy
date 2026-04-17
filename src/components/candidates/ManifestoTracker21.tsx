import { useMemo } from "react";
import { Party } from "../../data/Party";
import { getPartyLabel } from "../../data/partyData";
import { GetPartyLogo } from "../../utils/getPartyLogo";
import type { PartyInData } from "../../utils/candidateUtils";

const BAN_MANIFESTO_PARTIES = new Set<Party>([
  Party.ScottishGreenParty,
  Party.ScottishNationalParty,
  Party.ScottishLiberalDemocrats,
  Party.ScottishLabourParty,
  Party.ScottishConservativeParty,
]);

interface ManifestoTracker21Props {
  partiesInData: PartyInData[];
  onPartyClick: (party: number) => void;
}

export function ManifestoTracker21({
  partiesInData,
  onPartyClick,
}: ManifestoTracker21Props) {
  const majorParties = useMemo(
    () => partiesInData.slice(0, 6),
    [partiesInData],
  );
  const minorParties = useMemo(() => partiesInData.slice(6), [partiesInData]);

  return (
    <div className="manifesto-tracker">
      <h3>Ban In Manifesto</h3>
      <div className="manifesto-logo-grid manifesto-logo-grid-major">
        {majorParties.map((item) => {
          const hasManifestoPledge = BAN_MANIFESTO_PARTIES.has(item.party);
          return (
            <div
              key={item.party}
              className={`manifesto-logo-item manifesto-logo-item-major ${hasManifestoPledge ? "manifesto-logo-item-pledged" : ""}`}
              onClick={() => onPartyClick(item.party)}
            >
              <div
                className={`manifesto-logo ${hasManifestoPledge ? "" : "manifesto-logo-muted"}`}
                title={item.label}
              >
                {GetPartyLogo(item.party)}
              </div>
              <p>{item.label}</p>
            </div>
          );
        })}
      </div>
      <div className="manifesto-logo-grid manifesto-logo-grid-minor">
        {minorParties.map((item) => {
          const hasManifestoPledge = BAN_MANIFESTO_PARTIES.has(item.party);
          return (
            <div
              key={item.party}
              className={`manifesto-logo-item ${hasManifestoPledge ? "manifesto-logo-item-pledged" : ""}`}
              onClick={() => onPartyClick(item.party)}
            >
              <div
                className={`manifesto-logo ${hasManifestoPledge ? "" : "manifesto-logo-muted"}`}
                title={item.label}
              >
                {GetPartyLogo(item.party)}
              </div>
              <p>{getPartyLabel(item.party)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
