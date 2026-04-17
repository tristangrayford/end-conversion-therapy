import type { Dispatch, SetStateAction } from "react";
import type {
  PartyFilterOption,
  ConstituencyFilterOption,
} from "../../utils/candidateUtils";

interface CandidateFilterControlsProps {
  idPrefix: string;
  nameFilter: string;
  setNameFilter: Dispatch<SetStateAction<string>>;
  partyFilter: number | "";
  setPartyFilter: Dispatch<SetStateAction<number | "">>;
  regionFilter: number | "";
  setRegionFilter: Dispatch<SetStateAction<number | "">>;
  constituencyFilter: string;
  setConstituencyFilter: Dispatch<SetStateAction<string>>;
  supportFilter: boolean;
  setSupportFilter: Dispatch<SetStateAction<boolean>>;
  uniqueNames: string[];
  partyOptions: PartyFilterOption[];
  regionOptions: { value: number; label: string }[];
  constituencyOptions: ConstituencyFilterOption[];
}

export function CandidateFilterControls({
  idPrefix,
  nameFilter,
  setNameFilter,
  partyFilter,
  setPartyFilter,
  regionFilter,
  setRegionFilter,
  constituencyFilter,
  setConstituencyFilter,
  supportFilter,
  setSupportFilter,
  uniqueNames,
  partyOptions,
  regionOptions,
  constituencyOptions,
}: CandidateFilterControlsProps) {
  return (
    <div className="filter-controls">
      <div className="filter-input">
        <button
          className={supportFilter ? "support" : "no-support"}
          onClick={() => setSupportFilter((prev) => !prev)}
        >
          Supported Us
        </button>
      </div>
      <div className="filter-input">
        <label htmlFor={`nameInput${idPrefix}`}>Name:</label>
        <input
          id={`nameInput${idPrefix}`}
          type="text"
          placeholder="Search candidate..."
          value={nameFilter}
          onFocus={() => {
            if (nameFilter && uniqueNames.includes(nameFilter)) {
              setNameFilter("");
            }
          }}
          onChange={(e) => {
            setNameFilter(e.target.value);
            setPartyFilter("");
            setRegionFilter("");
            setConstituencyFilter("");
          }}
          list={`candidateNames${idPrefix}`}
        />
        <datalist id={`candidateNames${idPrefix}`}>
          {uniqueNames.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </div>
      <div className="filter-input">
        <label htmlFor={`partySelect${idPrefix}`}>Party:</label>
        <select
          id={`partySelect${idPrefix}`}
          value={partyFilter}
          onChange={(e) => {
            setNameFilter("");
            setConstituencyFilter("");
            setPartyFilter(e.target.value === "" ? "" : Number(e.target.value));
          }}
        >
          <option value="">All Parties</option>
          {partyOptions.map((option) => (
            <option key={option.party} value={option.party}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-input">
        <label htmlFor={`regionSelect${idPrefix}`}>Region:</label>
        <select
          id={`regionSelect${idPrefix}`}
          value={regionFilter}
          onChange={(e) => {
            setNameFilter("");
            setConstituencyFilter("");
            setRegionFilter(
              e.target.value === "" ? "" : Number(e.target.value),
            );
          }}
        >
          <option value="">All Regions</option>
          {regionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-input">
        <label htmlFor={`constituencySelect${idPrefix}`}>Constituency:</label>
        <select
          id={`constituencySelect${idPrefix}`}
          value={constituencyFilter}
          onChange={(e) => {
            setNameFilter("");
            setPartyFilter("");
            setRegionFilter("");
            setConstituencyFilter(e.target.value);
          }}
        >
          <option value="">All Constituencies</option>
          {constituencyOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
