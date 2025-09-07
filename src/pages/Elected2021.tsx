import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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
import { FullCandidateData } from "../data/Candidates2021";
import { CamelCaseToSentence } from "../utils/camelCaseToSentence";
import { GetPartyLogo } from "../utils/getPartyLogo";
import { useState } from "react";

function Elected2021() {
  const columnHelper = createColumnHelper<Candidate>();
  const [support, setStupport] = useState<Support | null>(null);
  const [data, setData] = useState(FullCandidateData.filter((c) => c.Elected));

  const onClickedSupport = () => {
    if (!support) {
      setStupport(Support.Yes);
      setData(
        FullCandidateData.filter((c) => c.Support == Support.Yes && c.Elected)
      );
    } else {
      setStupport(null);
      setData(FullCandidateData.filter((c) => c.Elected));
    }
  };

  const columns = [
    columnHelper.accessor("Name", {
      header: () => "Name",
      cell: (info) => info.getValue(),
      sortingFn: "alphanumeric",
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
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  };
  const table = useReactTable(options);
  return (
    <div className="page-content">
      <h2>Candidates 2021</h2>
      <button
        className={support == null ? "no-support" : "support"}
        onClick={() => onClickedSupport()}
      >
        Supported Us
      </button>
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

export default Elected2021;
