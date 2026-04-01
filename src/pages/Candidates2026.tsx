import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type TableOptions,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  Constituency,
  Party,
  Region,
  Support,
  type Candidate,
} from "../data/Types26";
import {
  EMAIL_BODY_26,
  EMAIL_SUBJECT_26,
} from "../data/CandidateEmailTemplate26";
import { CamelCaseToSentence } from "../utils/camelCaseToSentence";
import { FullCandidateData26 } from "../data/Candidates2026";
import { GetPartyLogo } from "../utils/getPartyLogo";

const PARTY_SHORT_NAMES: Partial<Record<Party, string>> = {
  [Party.ScottishNationalParty]: "SNP",
  [Party.ScottishGreenParty]: "SGP",
  [Party.ScottishLiberalDemocrats]: "LibDems",
  [Party.ScottishConservativeParty]: "Conservatives",
  [Party.ScottishLabourParty]: "Labour",
};

const EMAIL_SUBJECT_PARAM_26 = encodeURIComponent(EMAIL_SUBJECT_26);
const EMAIL_BODY_PARAM_26 = encodeURIComponent(EMAIL_BODY_26).replace(
  /%0A/g,
  "%0D%0A",
);

const getPartyLabel = (party: Party): string =>
  PARTY_SHORT_NAMES[party] ?? CamelCaseToSentence(Party[party]);

const getPartyFullLabel = (party: Party): string =>
  CamelCaseToSentence(Party[party]);

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

  return "Not published";
};

function Candidates2026() {
  const [nameFilter, setNameFilter] = useState("");
  const [partyFilter, setPartyFilter] = useState<number | "">("");
  const [regionFilter, setRegionFilter] = useState<number | "">("");
  const [constituencyFilter, setConstituencyFilter] = useState("");

  // Memoize enum keys and candidate names to avoid recalculation on every render
  const uniqueNames = useMemo(
    () => Array.from(new Set(FullCandidateData26.map((c) => c.Name))).sort(),
    [],
  );

  const partyFilterOptions = useMemo(() => {
    const counts = new Map<number, number>();

    for (const candidate of FullCandidateData26) {
      counts.set(candidate.Party, (counts.get(candidate.Party) ?? 0) + 1);
    }

    return Array.from(counts.entries())
      .map(([party, total]) => ({
        party,
        total,
        label: getPartyFullLabel(party),
      }))
      .sort((a, b) => {
        if (b.total !== a.total) {
          return b.total - a.total;
        }

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
        FullCandidateData26.map((candidate) => getConstituencyKey(candidate))
          .filter((key) => key !== ""),
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
    for (const candidate of FullCandidateData26) {
      counts.set(candidate.Party, (counts.get(candidate.Party) ?? 0) + 1);
    }
    return Array.from(counts.entries())
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

  // Add party enum values here as manifesto pledges are confirmed.
  const inclusiveBanManifestoParties = useMemo(() => new Set<Party>(), []);

  const partyPledgeStats = useMemo(() => {
    const stats = new Map<number, { total: number; pledged: number }>();

    for (const candidate of FullCandidateData26) {
      const current = stats.get(candidate.Party) ?? { total: 0, pledged: 0 };
      current.total += 1;

      const isPledged =
        candidate.SupportBan === Support.Yes &&
        candidate.SupportLife === Support.Yes &&
        candidate.SupportHealthcare === Support.Yes;

      if (isPledged) {
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
        if (bHasPledges !== aHasPledges) {
          return bHasPledges - aHasPledges;
        }

        if (b.total !== a.total) {
          return b.total - a.total;
        }

        if (b.proportion !== a.proportion) {
          return b.proportion - a.proportion;
        }

        if (b.pledged !== a.pledged) {
          return b.pledged - a.pledged;
        }

        return a.label.localeCompare(b.label);
      });
  }, []);

  const filteredData = useMemo(
    () =>
      FullCandidateData26.filter((candidate) => {
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

        return nameMatch && partyMatch && regionMatch && constituencyMatch;
      }),
    [nameFilter, partyFilter, regionFilter, constituencyFilter],
  );

  const columnHelper = createColumnHelper<Candidate>();

  const columns = [
    columnHelper.accessor("Name", {
      header: () => "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("Email", {
      header: () => "Email your candidate",
      cell: (info) => {
        const email = info.getValue();
        if (!email) {
          return "";
        }

        return (
          <a
            href={`mailto:${email}?subject=${EMAIL_SUBJECT_PARAM_26}&body=${EMAIL_BODY_PARAM_26}`}
            className="email-button"
            aria-label={`Email ${email}`}
          >
            Email
          </a>
        );
      },
    }),
    columnHelper.accessor("Party", {
      header: () => "Party",
      cell: (info) => {
        const party = info.getValue();
        const partyLabel = Party[party];

        return (
          <div className="party">
            {GetPartyLogo(party)}
            <p>{CamelCaseToSentence(partyLabel)}</p>
          </div>
        );
      },
    }),
    columnHelper.accessor("SupportBan", {
      header: () => "Supports a Ban",
      cell: (info) => {
        const supportValue = info.getValue();
        const supportLabel = CamelCaseToSentence(Support[supportValue]);
        const supportClass =
          supportValue === Support.Yes
            ? "support-yes"
            : supportValue === Support.No
              ? "support-no"
              : "support-neutral";
        return <span className={supportClass}>{supportLabel}</span>;
      },
    }),
    columnHelper.accessor("SupportLife", {
      header: () => "Supports an Inclusive Society",
      cell: (info) => {
        const supportValue = info.getValue();
        const supportLabel = CamelCaseToSentence(Support[supportValue]);
        const supportClass =
          supportValue === Support.Yes
            ? "support-yes"
            : supportValue === Support.No
              ? "support-no"
              : "support-neutral";
        return <span className={supportClass}>{supportLabel}</span>;
      },
    }),
    columnHelper.accessor("SupportHealthcare", {
      header: () => "Supports Trans Healthcare",
      cell: (info) => {
        const supportValue = info.getValue();
        const supportLabel = CamelCaseToSentence(Support[supportValue]);
        const supportClass =
          supportValue === Support.Yes
            ? "support-yes"
            : supportValue === Support.No
              ? "support-no"
              : "support-neutral";
        return <span className={supportClass}>{supportLabel}</span>;
      },
    }),
    columnHelper.accessor("Region", {
      header: () => "Region",
      cell: (info) => {
        const region = info.getValue();
        return (
          <span className="nowrap-cell">
            {CamelCaseToSentence(
              region === undefined ? undefined : Region[region],
            )}
          </span>
        );
      },
    }),
    columnHelper.accessor("RegionRank", {
      header: () => "List Rank",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("Constituency", {
      header: () => "Constituency",
      cell: (info) => {
        return getConstituencyLabel(info.row.original);
      },
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
      <h2>Candidates 2026</h2>
      <div className="manifesto-tracker">
        <h3>Inclusive Ban In Manifesto</h3>
        <div className="manifesto-logo-grid manifesto-logo-grid-major">
          {partiesInData.slice(0, 6).map((item) => {
            const hasManifestoPledge = inclusiveBanManifestoParties.has(
              item.party,
            );
            return (
              <div key={item.party} className="manifesto-logo-item manifesto-logo-item-major">
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
            const hasManifestoPledge = inclusiveBanManifestoParties.has(
              item.party,
            );
            return (
              <div key={item.party} className="manifesto-logo-item">
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
      </div>
      <div className="party-pledge-tracker">
        <h3>Party Pledge Tracker</h3>
        <div className="party-pledge-grid">
          {partyPledgeStats.map((item) => (
            <div key={item.party} className="party-pledge-item">
              <p className="party-pledge-name">{item.label}</p>
              <p className="party-pledge-count">
                {item.pledged}/{item.total} pledged
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-controls">
        <div className="filter-input">
          <label htmlFor="nameInput">Name:</label>
          <input
            id="nameInput"
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
            list="candidateNames"
          />
          <datalist id="candidateNames">
            {uniqueNames.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>
        <div className="filter-input">
          <label htmlFor="partySelect">Party:</label>
          <select
            id="partySelect"
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
            {partyFilterOptions.map((option) => {
              return (
                <option key={option.party} value={option.party}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="filter-input">
          <label htmlFor="regionSelect">Region:</label>
          <select
            id="regionSelect"
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
          <label htmlFor="constituencySelect">Constituency:</label>
          <select
            id="constituencySelect"
            value={constituencyFilter}
            onChange={(e) => {
              setNameFilter("");
              setPartyFilter("");
              setRegionFilter("");
              setConstituencyFilter(e.target.value);
            }}
          >
            <option value="">All Constituencies</option>
            {constituencyFilterOptions.map((option) => {
              return (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              );
            })}
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
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>No candidate data available yet.</td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Candidates2026;
