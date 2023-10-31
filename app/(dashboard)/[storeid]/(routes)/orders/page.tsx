import prismadb from "@/lib/prisma"
import OrderClient from "./components/client"
import { orderColumn } from "./components/columns"
import { format } from "date-fns"
import priceFormatter from "@/lib/price-formatter"

export default async function OrderPage({
   params: { storeid },
}: {
   params: {
      storeid: string
   }
}) {
   const orders = await prismadb.order.findMany({
      where: {
         storeId: storeid,
      },
      include: {
         orderItems: {
            include: {
               product: true,
            },
         },
      },
      orderBy: {
         createdAt: "desc",
      },
   })

   const formattedOrder: orderColumn[] = orders.map((item) => ({
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems
         .map((orderItem) => orderItem.product.name)
         .join(", "),
      totalPrice: priceFormatter(
         item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
         }, 0)
      ),
      isPaid: item.isPaid,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 p-8">
            <OrderClient data={formattedOrder} />
         </div>
      </div>
   )
}
