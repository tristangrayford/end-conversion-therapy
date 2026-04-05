import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type TableOptions,
} from "@tanstack/react-table";
import { Constituency, Region, Support, type Candidate } from "../data/Types21";
import { Party } from "../data/Party";
import {
  PARTY_COLORS,
  getPartyLabel,
  getPartyFullLabel,
} from "../data/partyData";
import { FullCandidateData } from "../data/Candidates2021";
import { CamelCaseToSentence } from "../utils/camelCaseToSentence";
import { GetPartyLogo } from "../utils/getPartyLogo";
import { useMemo, useState } from "react";

const getConstituencyKey = (candidate: Candidate): string => {
  if (candidate.Constituency !== undefined) {
    if (typeof candidate.Constituency === "number") {
      return `constituency:${Constituency[candidate.Constituency] ?? ""}`;
    }
    return `constituency:${String(candidate.Constituency)}`;
  }
  if (candidate.Region !== undefined) {
    return `region:${Region[candidate.Region] ?? ""}`;
  }
  return "";
};

const getConstituencyLabel = (candidate: Candidate): string => {
  if (candidate.Constituency !== undefined) {
    const constituencyLabel =
      typeof candidate.Constituency === "number"
        ? Constituency[candidate.Constituency]
        : String(candidate.Constituency);
    return CamelCaseToSentence(constituencyLabel);
  }
  if (candidate.Region !== undefined) {
    return CamelCaseToSentence(Region[candidate.Region]);
  }
  return "";
};

function Candidates2021() {
  const [nameFilter, setNameFilter] = useState("");
  const [partyFilter, setPartyFilter] = useState<number | "">("");
  const [regionFilter, setRegionFilter] = useState<number | "">("");
  const [constituencyFilter, setConstituencyFilter] = useState("");
  const [supportFilter, setSupportFilter] = useState(false);

  const filterByParty = (party: number) => {
    setNameFilter("");
    setRegionFilter("");
    setConstituencyFilter("");
    setPartyFilter((prev) => (prev === party ? "" : party));
  };

  const uniqueNames = useMemo(
    () => Array.from(new Set(FullCandidateData.map((c) => c.Name))).sort(),
    [],
  );

  const partyFilterOptions = useMemo(() => {
    const counts = new Map<number, number>();
    for (const candidate of FullCandidateData) {
      counts.set(candidate.Party, (counts.get(candidate.Party) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([party, total]) => ({
        party,
        total,
        label: getPartyFullLabel(party),
      }))
      .sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        return a.label.localeCompare(b.label);
      });
  }, []);

  const regionKeys = useMemo(
    () => Object.keys(Region).filter((key) => isNaN(Number(key))),
    [],
  );

  const constituencyFilterOptions = useMemo(() => {
    return Array.from(
      new Set(
        FullCandidateData.map((candidate) =>
          getConstituencyKey(candidate),
        ).filter((key) => key !== ""),
      ),
    )
      .map((key) => ({
        key,
        label: CamelCaseToSentence(key.replace(/^constituency:|^region:/, "")),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const partiesInData = useMemo(() => {
    const counts = new Map<number, number>();
    for (const candidate of FullCandidateData) {
      counts.set(candidate.Party, (counts.get(candidate.Party) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .filter(([party]) => party !== Party.Independent)
      .map(([party, total]) => ({
        party,
        label: CamelCaseToSentence(Party[party]),
        total,
      }))
      .sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        return a.label.localeCompare(b.label);
      });
  }, []);

  const banManifestoParties = useMemo(
    () =>
      new Set<Party>([
        Party.ScottishGreenParty,
        Party.ScottishNationalParty,
        Party.ScottishLiberalDemocrats,
        Party.ScottishLabourParty,
        Party.ScottishConservativeParty,
      ]),
    [],
  );

  const partyPledgeStats = useMemo(() => {
    const stats = new Map<number, { total: number; pledged: number }>();
    for (const candidate of FullCandidateData) {
      const current = stats.get(candidate.Party) ?? { total: 0, pledged: 0 };
      current.total += 1;
      if (candidate.Support === Support.Yes) {
        current.pledged += 1;
      }
      stats.set(candidate.Party, current);
    }
    return Array.from(stats.entries())
      .map(([party, counts]) => ({
        party,
        label: getPartyLabel(party),
        total: counts.total,
        pledged: counts.pledged,
        proportion: counts.total === 0 ? 0 : counts.pledged / counts.total,
      }))
      .sort((a, b) => {
        const aHasPledges = a.pledged > 0 ? 1 : 0;
        const bHasPledges = b.pledged > 0 ? 1 : 0;
        if (bHasPledges !== aHasPledges) return bHasPledges - aHasPledges;
        if (b.total !== a.total) return b.total - a.total;
        if (b.proportion !== a.proportion) return b.proportion - a.proportion;
        if (b.pledged !== a.pledged) return b.pledged - a.pledged;
        return a.label.localeCompare(b.label);
      });
  }, []);

  const partyPledgeRank = useMemo(() => {
    const rank = new Map<number, number>();
    partyPledgeStats.forEach((item, index) => rank.set(item.party, index));
    return rank;
  }, [partyPledgeStats]);

  const filteredData = useMemo(
    () =>
      FullCandidateData.filter((candidate) => {
        const nameMatch = candidate.Name.toLowerCase().includes(
          nameFilter.toLowerCase(),
        );
        const partyMatch =
          partyFilter === "" || candidate.Party === partyFilter;
        const regionMatch =
          regionFilter === "" ||
          (candidate.Region !== undefined && candidate.Region === regionFilter);
        const candidateConstituencyKey = getConstituencyKey(candidate);
        const constituencyMatch =
          constituencyFilter === "" ||
          candidateConstituencyKey === constituencyFilter;
        const supportMatch =
          !supportFilter || candidate.Support === Support.Yes;
        return (
          nameMatch &&
          partyMatch &&
          regionMatch &&
          constituencyMatch &&
          supportMatch
        );
      }).sort((a, b) => {
        const aRank = partyPledgeRank.get(a.Party) ?? Infinity;
        const bRank = partyPledgeRank.get(b.Party) ?? Infinity;
        if (aRank !== bRank) return aRank - bRank;
        if (
          a.Region !== undefined &&
          b.Region !== undefined &&
          a.Region === b.Region
        ) {
          return (a.RegionRank ?? Infinity) - (b.RegionRank ?? Infinity);
        }
        return 0;
      }),
    [
      nameFilter,
      partyFilter,
      regionFilter,
      constituencyFilter,
      supportFilter,
      partyPledgeRank,
    ],
  );

  const columnHelper = createColumnHelper<Candidate>();

  const columns = [
    columnHelper.accessor("Name", {
      header: () => "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("Party", {
      header: () => "Party",
      cell: (info) => {
        return (
          <div className="party">
            {GetPartyLogo(info.getValue())}
            <p>{CamelCaseToSentence(Party[info.getValue()])}</p>
          </div>
        );
      },
    }),
    columnHelper.accessor("Support", {
      header: () => "Support",
      cell: (info) => CamelCaseToSentence(Support[info.getValue()]),
    }),
    columnHelper.accessor("Region", {
      header: () => "Region",
      cell: (info) =>
        info.getValue() == undefined
          ? "" // @ts-expect-error Type 'undefined' cannot be used as an index type
          : CamelCaseToSentence(Region[info.getValue()]),
    }),
    columnHelper.accessor("RegionRank", {
      header: () => "Rank",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("Constituency", {
      header: () => "Constituency",
      cell: (info) => getConstituencyLabel(info.row.original),
    }),
    columnHelper.accessor("Statement", {
      header: () => "Statement",
      cell: (info) => info.getValue(),
    }),
  ];
  const options: TableOptions<Candidate> = {
    columns: columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
  };
  const table = useReactTable(options);
  return (
    <div className="page-content">
      <h2>Candidates 2021</h2>
      <div className="manifesto-tracker">
        <h3>Ban In Manifesto</h3>
        <div className="manifesto-logo-grid manifesto-logo-grid-major">
          {partiesInData.slice(0, 6).map((item) => {
            const hasManifestoPledge = banManifestoParties.has(item.party);
            return (
              <div
                key={item.party}
                className={`manifesto-logo-item manifesto-logo-item-major ${hasManifestoPledge ? "manifesto-logo-item-pledged" : ""}`}
                onClick={() => filterByParty(item.party)}
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
          {partiesInData.slice(6).map((item) => {
            const hasManifestoPledge = banManifestoParties.has(item.party);
            return (
              <div
                key={item.party}
                className={`manifesto-logo-item ${hasManifestoPledge ? "manifesto-logo-item-pledged" : ""}`}
                onClick={() => filterByParty(item.party)}
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
      <div className="party-pledge-tracker">
        <h3>
          Party Pledge Tracker (
          {partyPledgeStats.reduce((sum, item) => sum + item.pledged, 0)}{" "}
          pledged)
        </h3>
        <div className="party-pledge-grid">
          {partyPledgeStats.map((item) => (
            <div
              key={item.party}
              className="party-pledge-item"
              style={{
                borderColor: PARTY_COLORS[item.party as Party] ?? "#555",
              }}
              onClick={() => filterByParty(item.party)}
            >
              <p className="party-pledge-name" title={item.label}>
                {item.label}
              </p>
              <p
                className="party-pledge-count"
                style={item.pledged === 0 ? { color: "#e74c3c" } : undefined}
              >
                {item.pledged}/{item.total} supported
              </p>
            </div>
          ))}
        </div>
      </div>
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
          <label htmlFor="nameInput21">Name:</label>
          <input
            id="nameInput21"
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
            list="candidateNames21"
          />
          <datalist id="candidateNames21">
            {uniqueNames.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>
        <div className="filter-input">
          <label htmlFor="partySelect21">Party:</label>
          <select
            id="partySelect21"
            value={partyFilter}
            onChange={(e) => {
              setNameFilter("");
              setConstituencyFilter("");
              setPartyFilter(
                e.target.value === "" ? "" : Number(e.target.value),
              );
            }}
          >
            <option value="">All Parties</option>
            {partyFilterOptions.map((option) => (
              <option key={option.party} value={option.party}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-input">
          <label htmlFor="regionSelect21">Region:</label>
          <select
            id="regionSelect21"
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
            {regionKeys.map((key) => {
              const regionIndex = Region[key as keyof typeof Region];
              return (
                <option key={regionIndex} value={regionIndex}>
                  {CamelCaseToSentence(key)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="filter-input">
          <label htmlFor="constituencySelect21">Constituency:</label>
          <select
            id="constituencySelect21"
            value={constituencyFilter}
            onChange={(e) => {
              setNameFilter("");
              setPartyFilter("");
              setRegionFilter("");
              setConstituencyFilter(e.target.value);
            }}
          >
            <option value="">All Constituencies</option>
            {constituencyFilterOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="candidates-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Candidates2021;
