"use client"
import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,

} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/tables-components/pagination"
import { DataTableViewOptions } from "@/components/tables-components/column-vision"
import { Database } from "@/lib/types/supabase"
import CardDayDisplay from "@/components/shared/card-day-display"


interface DataTableProps<Day, TValue> {
  columns: ColumnDef<Day, TValue>[]
  data: Day[]
}

type Day = Database["public"]["Tables"]["days"]["Row"]



export function DataTable<Day, TValue>({
  columns,
  data,
}: DataTableProps<Day, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  
    const [rowSelection, setRowSelection] = React.useState({})
    const [selectedDayData, setSelectedDayData] = React.useState<Day | null>(null);


    const handleDayClick = (daySelected:Day) => {
      setSelectedDayData(daySelected);
    };
  

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  return (
    <div className='grid p-4 sm:px-6 sm:py-0  flex-1 items-start gap-4 md:gap-4 lg:grid-cols-3 xl:grid-cols-3' >
      <div className="grid auto-rows-max items-start gap-4 md:gap-4 lg:col-span-2">
        <div className="flex items-center">
          <Input
            placeholder="Rechercher dans les commentaires"
            value={(table.getColumn("commentary")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("commentary")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"

          />
          <DataTableViewOptions table={table}/>
          
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleDayClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>

                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Ajoutez un nouveau jour avec ⌘K
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            <DataTablePagination table={table} />
          </div>
        </div>
      </div>
              <CardDayDisplay daySelectedInfos={selectedDayData} />

    </div>
  )
}
 