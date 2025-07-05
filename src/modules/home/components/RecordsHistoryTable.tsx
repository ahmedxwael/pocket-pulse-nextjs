"use client";

import { DataTable } from "@/design-system/components";
import { TableCell, TableRow } from "@/design-system/components/ui/table";
import { Expense, Income } from "@/modules/records/types";
import { getAt } from "@/shared/utils/get-at";
import { ColumnDef, Row } from "@tanstack/react-table";

type RecordsHistoryTableProps = {
  data: Expense[] | Income[];
};

const columns: ColumnDef<Expense | Income>[] = [
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

function CustomRow({ row }: { row: Row<Expense | Income> }) {
  return (
    <TableRow className="p-2 text-center">
      <TableCell className="capitalize font-medium">
        {row.original.description}
      </TableCell>
      <TableCell>
        {row.original.category ? row.original.category?.name : "-"}
      </TableCell>
      <TableCell>{getAt(row.original.createdAt)}</TableCell>
    </TableRow>
  );
}
