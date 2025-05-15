"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/design-system/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  classes?: {
    container?: string;
    cell?: string;
    header?: string;
    row?: string | ((row: Row<TData>) => string);
  };
  centered?: boolean;
  noResultsMessage?: string;
  renderCustomRow?: (row: Row<TData>, key?: number) => React.ReactNode;
  onRowClick?: (row: Row<TData>) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  classes: {
    container: containerCN,
    cell: cellCN,
    header: headerCN,
    row: rowCN,
  } = {},
  centered = false,
  noResultsMessage = "No results.",
  renderCustomRow,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderDefaultRow = (row: Row<TData>) => (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      className={cn(
        typeof rowCN === "function" ? rowCN(row) : rowCN,
        onRowClick && "cursor-pointer hover:bg-muted/50"
      )}
      onClick={() => onRowClick?.(row)}>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className={cn(centered && "text-center", cellCN)}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div className={cn("rounded-md border", containerCN)}>
      <Table className={className}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "text-primary font-semibold text-base",
                    centered && "text-center",
                    headerCN
                  )}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row, index) =>
                renderCustomRow
                  ? renderCustomRow(row, index)
                  : renderDefaultRow(row)
              )
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className={cn("h-24 text-center", cellCN)}>
                {noResultsMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
