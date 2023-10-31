import prismadb from "@/lib/prisma"
import ProductClient from "./components/client"
import { productColumn } from "./components/columns"
import { format } from "date-fns"
import priceFormatter from "@/lib/price-formatter"

export default async function ProductPage({
   params: { storeid },
}: {
   params: {
      storeid: string
   }
}) {
   const products = await prismadb.product.findMany({
      where: {
         storeId: storeid,
      },
      include: {
         category: true,
         size: true,
         color: true,
      },
      orderBy: {
         createdAt: "desc",
      },
   })

   const formattedProduct: productColumn[] = products.map((item) => ({
      id: item.id,
      name: item.name,
      price: priceFormatter(item.price.toNumber()),
      isArchived: item.isArchived,
      category: item.category.name,
      isFeatured: item.isFeatured,
      size: item.size.value,
      color: item.color.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 p-8">
            <ProductClient data={formattedProduct} />
         </div>
      </div>
   )
}
