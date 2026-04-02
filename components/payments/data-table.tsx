"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const totalPages = Math.max(1, table.getPageCount())
  const currentPage = table.getState().pagination.pageIndex

  const maxPages = 2

  const start = Math.max(
    0,
    Math.min(
      currentPage - Math.floor(maxPages / 2),
      totalPages - maxPages
    )
  )

  const end = Math.min(totalPages, start + maxPages)

  return (
    <div className="flex flex-col  text-center max-w-7xl md:w-7xl ">


        <div className="bg-gray-50 py-2 md:py-5 rounded-md border w-full">

          <h1 className="m-3 md:m-5 text-center font-bold">
            {title}
          </h1>

<Table className=" table-fixed text-center md:table-fixed md:w-full  ">     
         <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-center whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                    className="hover:bg-gray-100 transition"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-center whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center h-24"
                  >
                    Nenhum Resultado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

        </div>
    

      {/* PAGINAÇÃO RESPONSIVA */}
      <div className="flex flex-wrap justify-between w-full  items-center gap-1 py-4">

        <button
          className="text-sm border px-1 py-1 rounded disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>

        {start > 0 && (
          <>
            <button
              className="text-sm border px-2 py-1 rounded"
              onClick={() => table.setPageIndex(0)}
            >
              1
            </button>
          </>
        )}

        {Array.from({ length: end - start }).map((_, i) => {
          const page = start + i

          return (
            <button
              key={page}
              onClick={() => table.setPageIndex(page)}
              className={`text-sm border px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-black text-white font-bold"
                  : "hover:bg-gray-200"
              }`}
            >
              {page + 1}
            </button>
          )
        })}

        {end < totalPages && (
          <>
            <button
              className="text-sm border px-2 py-1 rounded"
              onClick={() => table.setPageIndex(totalPages - 1)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className="text-sm border px-3 py-1 rounded disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </button>

      </div>

    </div>
  );
}