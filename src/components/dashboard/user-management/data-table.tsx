"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import type {
  ColumnDef,
  SortingState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  globalFilter: string
  setGlobalFilter: (value: string) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  globalFilter,
  setGlobalFilter,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },

    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,

    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-0">

        <div className="flex-1 overflow-y-auto">
          <Table className="w-full border-collapse">

            <TableHeader className="bg-[#d9dee2] hover:bg-[#d9dee2] border-b border-gray-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="h-9 border-b border-gray-200 bg-white hover:bg-gray-50/40"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-9 px-3 py-1 text-[#333333] font-bold text-sm text-left align-middle"
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
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="h-9 px-3 py-1 text-sm text-gray-800 align-middle"
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
                    className="h-32 bg-white"
                  >
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      No users found.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between p-4 bg-white text-sm font-medium text-gray-600 border-t border-gray-100">

          <div className="text-gray-700">
            Showing{" "}
            {table.getFilteredRowModel().rows.length === 0
              ? 0
              : table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                1}{" "}
            -{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length}
          </div>

          <div className="flex items-center gap-16 gap-6">

            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs font-semibold whitespace-nowrap">
                Rows per page
              </span>

              <Select
                value={String(table.getState().pagination.pageSize)}
                onValueChange={(value) =>
                  table.setPageSize(Number(value))
                }
              >
                <SelectTrigger className="h-8 w-[65px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem className="text-xs" value="5">5</SelectItem>
                  <SelectItem className="text-xs" value="10">10</SelectItem>
                  <SelectItem className="text-xs" value="20">20</SelectItem>
                  <SelectItem className="text-xs" value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Pagination>
              <PaginationContent>

                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      table.previousPage()
                    }}
                    className={
                      !table.getCanPreviousPage()
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                <PaginationItem>
                  <span className="px-3 text-sm font-medium">
                    {table.getState().pagination.pageIndex + 1}
                  </span>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      table.nextPage()
                    }}
                    className={
                      !table.getCanNextPage()
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

              </PaginationContent>
            </Pagination>

          </div>
        </div>

      </CardContent>
    </Card>
  )
}