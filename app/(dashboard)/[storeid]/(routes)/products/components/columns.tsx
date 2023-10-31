"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type productColumn = {
   id: string
   name: string
   price: string
   size: string
   color: string
   category: string
   isArchived: boolean
   isFeatured: boolean
   createdAt: string
}

export const columns: ColumnDef<productColumn>[] = [
   {
      accessorKey: "name",
      header: "Name",
   },
   {
      accessorKey: "price",
      header: "Price",
   },
   {
      accessorKey: "size",
      header: "Size",
   },
   {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => (
         <div className="flex items-center gap-x-2">
            {row.original.color}
            <div
               className="h-5 w-5 rounded-full border"
               style={{
                  backgroundColor: row.original.color,
                  borderColor: row.original.color,
               }}
            />
         </div>
      ),
   },
   {
      accessorKey: "category",
      header: "Category",
   },
   {
      accessorKey: "isFeatured",
      header: "Featured",
   },
   {
      accessorKey: "isArchived",
      header: "Archived",
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
