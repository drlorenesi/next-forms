"use client";

import React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
  type PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Copy, FileSpreadsheet } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { downloadExcel } from "@/utils/exceUtils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
  });

  const copyToClipboard = () => {
    console.log("Botón Copiar clickeado");
  };

  const tableRef = React.useRef<HTMLTableElement | null>(null);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center py-2 gap-2">
        <div className="flex items-center gap-1 w-full sm:w-auto justify-center sm:justify-start">
          <div className="flex rounded-lg bg-muted p-1">
            <Select
              value={
                table.getState().pagination.pageSize === data.length
                  ? "all"
                  : table.getState().pagination.pageSize.toString()
              }
              onValueChange={(value) => {
                const size = value === "all" ? data.length : Number(value);
                table.setPageSize(size);
              }}
            >
              <SelectTrigger className="h-7 w-[110px] border-0 bg-transparent focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Seleccionar filas" />
              </SelectTrigger>
              <SelectContent side="top">
                {[15, 25, 50, "all"].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize === "all"
                      ? "Todas las filas"
                      : `${pageSize} filas`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              className="h-7 px-2 hover:bg-accent hover:text-accent-foreground"
              onClick={copyToClipboard}
            >
              <Copy className="h-3 w-3 mr-1" />
              <span>Copiar</span>
            </Button>
            <Button
              variant="ghost"
              className="h-7 px-2 hover:bg-accent hover:text-accent-foreground"
              onClick={() => downloadExcel(tableRef)}
            >
              <FileSpreadsheet className="h-3 w-3 mr-1" />
              <span>Excel</span>
            </Button>
          </div>
        </div>
        <div className="relative w-auto">
          <Input
            placeholder="Buscar..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(String(event.target.value))}
            className="max-w-sm"
          />
          {globalFilter && (
            <Button
              variant="ghost"
              onClick={() => setGlobalFilter("")}
              className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Limpiar búsqueda</span>
            </Button>
          )}
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table ref={tableRef}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-primary/5 border-b-2 border-primary/20"
              >
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={`py-1 text-left text-sm font-semibold text-foreground uppercase tracking-wider border-r last:border-r-0 ${
                      index === 0
                        ? "sticky left-0 z-20 bg-primary/5 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]"
                        : ""
                    }`}
                  >
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
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`hover:bg-muted/50 ${
                    rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"
                  }`}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell
                      key={cell.id}
                      className={`px-2 py-1.5 whitespace-nowrap border-r last:border-r-0 border-b ${
                        cellIndex === 0
                          ? `sticky left-0 z-10 ${
                              rowIndex % 2 === 0
                                ? "bg-background"
                                : "bg-muted/20"
                            } shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]`
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-primary/5 border-t border-primary/20">
              {table.getFooterGroups().map((footerGroup) => (
                <React.Fragment key={footerGroup.id}>
                  {footerGroup.headers.map((header, index) => (
                    <TableCell
                      key={header.id}
                      className={`px-2 py-2 font-semibold text-foreground uppercase tracking-wider border-r last:border-r-0 ${
                        index === 0
                          ? "sticky left-0 z-20 bg-primary/5 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]"
                          : ""
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </React.Fragment>
              ))}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2 py-2">
        <div className="flex-1 text-sm text-muted-foreground text-center sm:text-left">
          Mostrando{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          a{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          de {table.getFilteredRowModel().rows.length} resultados
        </div>
        <div className="space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-7 px-2 text-sm"
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-7 px-2 text-sm"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
