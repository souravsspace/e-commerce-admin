import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { orderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface OrderClientProps {
   data: orderColumn[]
}

export default function OrderClient({ data }: OrderClientProps) {
   return (
      <>
         <Heading
            title={`Orders (${data.length})`}
            description="Manage order for your store"
         />
         <Separator />
         <DataTable searchKey="products" columns={columns} data={data} />
      </>
   )
}
