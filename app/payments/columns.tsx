"use client"

import { Button } from "@/components/ui/button"

import { ColumnDef } from "@tanstack/react-table"
import { Trash, Edit2Icon} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/tables-components/column-heander"
import { Database } from "@/lib/types/supabase"

import React from "react"
import { SupprDay } from "@/lib/actions/delete-actions"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import UpdateDays from "@/components/form/update-days"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type Day = Database["public"]["Tables"]["days"]["Row"]


export const columns: ColumnDef<Day>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
      
  },
  {
    accessorKey: "training",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entrainement" />
    ),
      
  },
  {
    accessorKey: "commentary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commentaires" />
    ),  
        enableSorting: false,

  },
  {
    id: "actions",
    cell: ({ row }) => {
      const day = row.original


          const handleDayClick = (dayID : string) => {
            SupprDay(dayID);
            window.location.reload();         

        }

      
      return (
        <div className=" flex text-right font-medium">
          <Sheet>
            <SheetTrigger className="ghost-like">
                <Edit2Icon className="h-4 w-4 m-2" />
              </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Mettre à jour {day.date}</SheetTitle>
                <SheetDescription>
                  
                  Test
                </SheetDescription>
              </SheetHeader>
              <UpdateDays day={day} />
            </SheetContent>
          </Sheet>
          <Button 
            variant="destructiveLight"
            size="icon"
            onClick= {() => handleDayClick(day.id)}
            className="ml-2"
          >
            <Trash className="h-4 w-4 m-2" />

          </Button>

        </div>
      )
    },
  },
]
