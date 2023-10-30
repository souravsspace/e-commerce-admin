import prismadb from "@/lib/prisma"
import { categoryColumn } from "./components/columns"
import { format } from "date-fns"
import CategoryClient from "./components/client"

export default async function CategoriesPage({
   params: { storeid },
}: {
   params: {
      storeid: string
   }
}) {
   const categories = await prismadb.category.findMany({
      where: {
         storeId: storeid,
      },
      include: {
         billboard: true,
      },
      orderBy: {
         createdAt: "desc",
      },
   })

   const formattedCategories: categoryColumn[] = categories.map((item) => ({
      id: item.id,
      name: item.name,
      billboardLabel: item.billboard.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 p-8">
            <CategoryClient data={formattedCategories} />
         </div>
      </div>
   )
}
