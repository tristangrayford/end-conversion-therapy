import { flexRender, type Table } from "@tanstack/react-table";

interface CandidatesTableProps<T> {
  table: Table<T>;
  columnCount: number;
  emptyMessage?: string;
}

export function CandidatesTable<T>({
  table,
  columnCount,
  emptyMessage,
}: CandidatesTableProps<T>) {
  const rows = table.getRowModel().rows;

  return (
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
        {rows.length === 0 && emptyMessage ? (
          <tr>
            <td colSpan={columnCount}>{emptyMessage}</td>
          </tr>
        ) : (
          rows.map((row) => (
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
  );
}
