"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { SquarePen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { User } from "@/types/user"
import { Badge } from "@/components/ui/badge"

export const getUserColumns = (
  onEdit: (user: User) => void,
  onDelete: (user: User) => void
): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="h-4 w-4 m-0 border-gray-300 bg-transparent data-[state=checked]:bg-gray-900 data-[state=checked]:text-white h-4 w-4 rounded"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="text-gray-800 font-normal block">{row.getValue("name")}</span>
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-gray-600 font-normal block">{row.getValue("email")}</span>
  },
  {
    accessorKey: "status",
    header: "User Status",
    cell: ({ row }) => {
      const status = row.original.status

      
      return (
        <Badge
          className={
            status === "active"
              ? "bg-green-100 text-green-700 px-4 py-1 text-xs font-semibold rounded-full"
              : "bg-red-100 text-red-700 px-4 py-1 text-xs font-semibold rounded-full"
          }
        >
          {status === "active" ? "Active" : "Inactive"}
        </Badge>
      )
    },
  },
  {
    id: "actions",

    header: () => (
      <div className="text-center mr-11">
        Actions
      </div>
    ),

    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex items-center justify-end gap-2 mr-4">
          <Button
            onClick={() => onEdit(user)}
            className="bg-[#1c1c1c] hover:bg-[#2d2d2d] text-white flex items-center gap-1.5 px-4 h-9 rounded text-xs font-semibold transition-colors border-0"
          >
            <SquarePen className="h-3.5 w-3.5" />
            Edit
          </Button>

          <Button
            onClick={() => onDelete(user)}
            className="bg-[#d81b60] hover:bg-[#c2185b] text-white flex items-center gap-1.5 px-4 h-9 rounded text-xs font-semibold transition-colors border-0"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      )
    },
  }
]