"use client"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { productColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface ProductClientProps {
   data: productColumn[]
}

export default function ProductClient({ data }: ProductClientProps) {
   const router = useRouter()
   const params = useParams()

   return (
      <>
         <div className="flex items-center justify-between">
            <Heading
               title={`Product (${data.length})`}
               description="Manage product for your store"
            />
            <Button
               onClick={() => router.push(`/${params.storeid}/products/new`)}
            >
               <Plus className="mr-2 h-4 w-4" />
               Add Product
            </Button>
         </div>
         <Separator />
         <DataTable searchKey="name" columns={columns} data={data} />
         <Heading title="API" description="All API calls for product" />
         <Separator />
         <ApiList entityName="products" entityIdName="productid" />
      </>
   )
}
