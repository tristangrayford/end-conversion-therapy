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
} from "../data/Types";
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
        GetPartyLogo(info.getValue());
        CamelCaseToSentence(Party[info.getValue()]);
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
      cell: (info) =>
        info.getValue() == undefined
          ? "" // @ts-expect-error Type 'undefined' cannot be used as an index type
          : CamelCaseToSentence(Constituency[info.getValue()]),
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
                    header.getContext()
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

export default Candidates2026;
