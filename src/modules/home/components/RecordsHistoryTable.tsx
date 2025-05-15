"use client";

import { DataTable } from "@/design-system/components";
import { TableCell, TableRow } from "@/design-system/components/ui/table";
import { cn } from "@/lib/utils";
import { Type } from "@/modules/records/components";
import { Record } from "@/modules/records/types";
import { getAt } from "@/shared/utils/get-at";
import { ColumnDef, Row } from "@tanstack/react-table";

type RecordsHistoryTableProps = {
  data: Record[];
};

const columns: ColumnDef<Record>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "type",
    header: "Type",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
];

export function RecordsHistoryTable({ data }: RecordsHistoryTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      centered
      renderCustomRow={(row, key) => <CustomRow key={key} row={row} />}
    />
  );
}

function CustomRow({ row }: { row: Row<Record> }) {
  return (
    <TableRow className="p-2 text-center">
      <TableCell className="capitalize font-medium">
        {row.original.description}
      </TableCell>
      <TableCell
        className={cn(
          row.original.type === "EXPENSE" ? "text-red-500" : "text-green-500"
        )}>
        {row.original.type === "EXPENSE"
          ? `- $${row.original.amount}`
          : `$${row.original.amount}`}
      </TableCell>
      <TableCell>
        {row.original.category ? row.original.category?.name : "-"}
      </TableCell>
      <TableCell className="flex justify-center">
        <Type record={row.original} />
      </TableCell>
      <TableCell>{getAt(row.original.createdAt)}</TableCell>
    </TableRow>
  );
}
