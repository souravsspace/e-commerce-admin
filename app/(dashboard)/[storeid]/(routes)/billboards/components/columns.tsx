"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type billboardColumn = {
   id: string
   label: string
   createdAt: string
}

export const columns: ColumnDef<billboardColumn>[] = [
   {
      accessorKey: "label",
      header: "Label",
   },
   {
      accessorKey: "createdAt",
      header: "Date",
   },
   {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
