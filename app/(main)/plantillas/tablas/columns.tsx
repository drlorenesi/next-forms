"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { SortableColumnHeader } from "./sortable-column-header";

// This is the type for our data
export type SalesData = {
  canal: string;
  total_ventas_siva: number;
  total_nc_valor_siva: number;
  total: number;
};

export const columns: ColumnDef<SalesData>[] = [
  {
    accessorKey: "canal",
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Canal" />
    ),
    footer: () => <div className="font-bold">Total</div>,
  },
  {
    accessorKey: "total_ventas_siva",
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Ventas S/IVA" />
    ),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("total_ventas_siva"));
      const formatted = new Intl.NumberFormat("es-GT", {
        style: "currency",
        currency: "GTQ",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    footer: ({ table }) => {
      const total = table
        .getFilteredRowModel()
        .rows.reduce(
          (sum, row) => sum + Number(row.getValue("total_ventas_siva")),
          0
        );
      return (
        <div className="text-right font-bold">
          {new Intl.NumberFormat("es-GT", {
            style: "currency",
            currency: "GTQ",
          }).format(total)}
        </div>
      );
    },
  },
  {
    accessorKey: "total_nc_valor_siva",
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="NC S/IVA" />
    ),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("total_nc_valor_siva"));
      const formatted = new Intl.NumberFormat("es-GT", {
        style: "currency",
        currency: "GTQ",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    footer: ({ table }) => {
      const total = table
        .getFilteredRowModel()
        .rows.reduce(
          (sum, row) => sum + Number(row.getValue("total_nc_valor_siva")),
          0
        );
      return (
        <div className="text-right font-bold">
          {new Intl.NumberFormat("es-GT", {
            style: "currency",
            currency: "GTQ",
          }).format(total)}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("es-GT", {
        style: "currency",
        currency: "GTQ",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    footer: ({ table }) => {
      const total = table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + Number(row.getValue("total")), 0);
      return (
        <div className="text-right font-bold">
          {new Intl.NumberFormat("es-GT", {
            style: "currency",
            currency: "GTQ",
          }).format(total)}
        </div>
      );
    },
  },
];
