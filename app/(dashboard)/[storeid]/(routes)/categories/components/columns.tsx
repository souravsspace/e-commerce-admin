"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type categoryColumn = {
   id: string
   name: string
   billboardLabel: string
   createdAt: string
}

export const columns: ColumnDef<categoryColumn>[] = [
   {
      accessorKey: "name",
      header: "Name",
   },
   {
      accessorKey: "createdAt",
      header: "Date",
   },
   {
      accessorKey: "billboardLabel",
      header: "Billboard",
      cell: ({ row }) => row.original.billboardLabel,
   },
   {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
