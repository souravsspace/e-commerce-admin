import prismadb from "@/lib/prisma"
import ColorsClient from "./components/client"
import { format } from "date-fns"
import { ColorColumn } from "./components/columns"

export default async function ColorsPage({
   params: { storeid },
}: {
   params: {
      storeid: string
   }
}) {
   const colors = await prismadb.color.findMany({
      where: {
         storeId: storeid,
      },
      orderBy: {
         createdAt: "desc",
      },
   })

   const formattedColors: ColorColumn[] = colors.map((item) => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 p-8">
            <ColorsClient data={formattedColors} />
         </div>
      </div>
   )
}
