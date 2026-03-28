import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type TableOptions,
} from "@tanstack/react-table";
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
      cell: (info) => CamelCaseToSentence(Support[info.getValue()]),
    }),
    columnHelper.accessor("SupportLife", {
      header: () => "Supports an Inclusive Society",
      cell: (info) => CamelCaseToSentence(Support[info.getValue()]),
    }),
    columnHelper.accessor("SupportHealthcare", {
      header: () => "Supports Trans Healthcare",
      cell: (info) => CamelCaseToSentence(Support[info.getValue()]),
    }),
    columnHelper.accessor("Region", {
      header: () => "Region",
      cell: (info) => {
        const region = info.getValue();
        return CamelCaseToSentence(region === undefined ? undefined : Region[region]);
      },
    }),
    columnHelper.accessor("RegionRank", {
      header: () => "Rank",
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
    data: FullCandidateData26,
    getCoreRowModel: getCoreRowModel(),
  };
  const table = useReactTable(options);
  return (
    <div className="page-content">
      <h2>Candidates 2026</h2>
      <b>TBC</b>
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
