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
import { CamelCaseToSentence } from "../utils/camelCaseToSentence";
import { FullCandidateData26 } from "../data/Candidates2026";
import { GetPartyLogo } from "../utils/getPartyLogo";

function Candidates2026() {
  const [nameFilter, setNameFilter] = useState("");
  const [partyFilter, setPartyFilter] = useState<number | "">("");
  const [regionFilter, setRegionFilter] = useState<number | "">("");

  // Memoize enum keys and candidate names to avoid recalculation on every render
  const uniqueNames = useMemo(
    () => Array.from(new Set(FullCandidateData26.map((c) => c.Name))).sort(),
    [],
  );

  const partyKeys = useMemo(
    () => Object.keys(Party).filter((key) => isNaN(Number(key))),
    [],
  );

  const regionKeys = useMemo(
    () => Object.keys(Region).filter((key) => isNaN(Number(key))),
    [],
  );

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

        return nameMatch && partyMatch && regionMatch;
      }),
    [nameFilter, partyFilter, regionFilter],
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
        return CamelCaseToSentence(
          region === undefined ? undefined : Region[region],
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
        const constituency = info.getValue();
        return CamelCaseToSentence(
          constituency === undefined ? undefined : Constituency[constituency],
        );
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
              setPartyFilter(
                e.target.value === "" ? "" : Number(e.target.value),
              );
            }}
          >
            <option value="">All Parties</option>
            {partyKeys.map((key) => {
              const partyIndex = Party[key as keyof typeof Party];
              return (
                <option key={partyIndex} value={partyIndex}>
                  {CamelCaseToSentence(key)}
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
