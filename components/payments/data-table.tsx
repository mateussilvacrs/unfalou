"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  enableDate?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  enableDate = false,
}: DataTableProps<TData, TValue>) {

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  // ✅ limpa sorting apenas quando quantidade muda
  useEffect(() => {
    setSorting([]);
  }, [data.length]);

  // ✅ evita re-render infinito
  const safeSorting = useMemo(() => {
    return sorting.filter((s) =>
      columns.some(
        (col) =>
          "accessorKey" in col && col.accessorKey === s.id
      )
    );
  }, [sorting, columns]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting: safeSorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: "includesString",

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const totalPages = Math.max(1, table.getPageCount());
  const currentPage = table.getState().pagination.pageIndex;

  const maxPages = 5;

  const start = Math.max(
    0,
    Math.min(
      currentPage - Math.floor(maxPages / 2),
      totalPages - maxPages
    )
  );

  const end = Math.min(totalPages, start + maxPages);

  return (
    <div className="max-w-7xl mx-auto">

      <div className="bg-white rounded-xl shadow-sm border p-4">

        <h1 className="text-lg md:text-xl font-bold text-center mb-4">
          {title}
        </h1>

        {/* 🔍 FILTRO + SORT */}
        <div className="flex flex-col md:flex-row gap-2 justify-center md:items-center mb-4">

          <input
            type="text"
            placeholder="Buscar usuário..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="border px-3 py-2 rounded-md w-full md:w-64"
          />

          {enableDate && (() => {
            const hasHora = columns.some(
              (col) =>
                "accessorKey" in col && col.accessorKey === "hora"
            );

            if (!hasHora) return null;

            return (
<>
  {/* DATA */}
  <Button
    onClick={() =>
      setSorting([
        {
          id: "hora",
          desc: sorting[0]?.id === "hora"
            ? !sorting[0]?.desc
            : false,
        },
      ])
    }
    className="text-sm px-3 py-2 border rounded-md hover:opacity-80 hover:cursor-pointer transition duration-300"


  >
    {sorting[0]?.id === "hora" && sorting[0]?.desc
      ? "Mais novos"
      : "Mais antigos"}
  </Button>

  {/* ALFABÉTICO */}
  <Button
    onClick={() =>
      setSorting([
        {
          id: "username",
          desc: sorting[0]?.id === "username"
            ? !sorting[0]?.desc
            : false,
        },
      ])
    }
    className="text-sm px-3 py-2 border rounded-md hover:opacity-80 hover:cursor-pointer transition duration-300"
  >
    {sorting[0]?.id === "username" && sorting[0]?.desc
      ? "Z → A"
      : "A → Z"}
  </Button>
  <Button
  onClick={() => {
    setGlobalFilter("");
    setSorting([]);
  }}
  disabled={!globalFilter && sorting.length === 0}
    className="text-sm px-3 py-2 border bg-[#000000ea] rounded-md hover:opacity-80 hover:cursor-pointer transition duration-300"
>
  Resetar filtros
</Button>
</>

            );
          })()}

        </div>

        <div className="overflow-x-auto">
          <Table className="table-fixed w-full text-sm">

            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-center text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap"
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-center whitespace-nowrap"
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
                    className="text-center h-24 text-gray-500"
                  >
                    Nenhum resultado encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </div>
      </div>

      {/* PAGINAÇÃO */}
      <div className="flex flex-wrap justify-center items-center gap-2 py-6">

        <button
          className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-100 transition disabled:opacity-40"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Voltar
        </button>

        {start > 0 && (
          <>
            <button
              className="px-3 py-1.5 rounded-md border hover:bg-gray-100"
              onClick={() => table.setPageIndex(0)}
            >
              1
            </button>
            {start > 1 && <span className="px-1">...</span>}
          </>
        )}

        {Array.from({ length: end - start }).map((_, i) => {
          const page = start + i;

          return (
            <button
              key={page}
              onClick={() => table.setPageIndex(page)}
              className={`px-3 py-1.5 rounded-md border transition ${
                currentPage === page
                  ? "bg-black text-white scale-105 shadow-sm"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {page + 1}
            </button>
          );
        })}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-1">...</span>}
            <button
              className="px-3 py-1.5 rounded-md border hover:bg-gray-100"
              onClick={() =>
                table.setPageIndex(totalPages - 1)
              }
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-100 transition disabled:opacity-40"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </button>

      </div>
    </div>
  );
}