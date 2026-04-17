import { PARTY_COLORS } from "../../data/partyData";
import type { Party } from "../../data/Party";
import type { PartyPledgeStat } from "../../utils/candidateUtils";

interface PartyPledgeTrackerProps {
  stats: PartyPledgeStat[];
  onPartyClick: (party: number) => void;
  pledgeLabel?: string;
}

export function PartyPledgeTracker({
  stats,
  onPartyClick,
  pledgeLabel = "pledged",
}: PartyPledgeTrackerProps) {
  const totalPledged = stats.reduce((sum, item) => sum + item.pledged, 0);

  return (
    <div className="party-pledge-tracker">
      <h3>
        Party Pledge Tracker ({totalPledged} {pledgeLabel})
      </h3>
      <div className="party-pledge-grid">
        {stats.map((item) => (
          <div
            key={item.party}
            className="party-pledge-item"
            style={{
              borderColor: PARTY_COLORS[item.party as Party] ?? "#555",
            }}
            onClick={() => onPartyClick(item.party)}
          >
            <p className="party-pledge-name" title={item.label}>
              {item.label}
            </p>
            <p
              className="party-pledge-count"
              style={item.pledged === 0 ? { color: "#e74c3c" } : undefined}
            >
              {item.pledged}/{item.total} {pledgeLabel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
