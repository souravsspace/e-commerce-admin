import prismadb from "@/lib/prisma"
import BillboardClient from "./components/client"
import { billboardColumn } from "./components/columns"
import { format } from "date-fns"

export default async function BillboardPage({
   params: { storeid },
}: {
   params: {
      storeid: string
   }
}) {
   const billboards = await prismadb.billboard.findMany({
      where: {
         storeId: storeid,
      },
      orderBy: {
         createdAt: "desc",
      },
   })

   const formattedBillboard: billboardColumn[] = billboards.map((item) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 p-8">
            <BillboardClient data={formattedBillboard} />
         </div>
      </div>
   )
}
