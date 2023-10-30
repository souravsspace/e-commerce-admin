"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type ColorColumn = {
   id: string
   name: string
   value: string
   createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
   {
      accessorKey: "name",
      header: "Name",
   },
   {
      accessorKey: "value",
      header: "Value",
   },
   {
      accessorKey: "createdAt",
      header: "date",
   },
   {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
