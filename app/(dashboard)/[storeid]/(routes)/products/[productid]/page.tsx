import prismadb from "@/lib/prisma"
import ProductForm from "./components/product-form"

type ProductPageProps = {
   params: {
      storeid: string
      productid: string
   }
}

export default async function ProductPage({
   params: { productid, storeid },
}: ProductPageProps) {
   const product = await prismadb.product.findUnique({
      where: {
         id: productid,
      },
      include: {
         images: true,
      },
   })

   const categories = await prismadb.category.findMany({
      where: {
         storeId: storeid,
      },
   })

   const colors = await prismadb.color.findMany({
      where: {
         storeId: storeid,
      },
   })

   const sizes = await prismadb.size.findMany({
      where: {
         storeId: storeid,
      },
   })

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 p-8">
            <ProductForm
               initialData={product}
               categories={categories}
               colors={colors}
               sizes={sizes}
            />
         </div>
      </div>
   )
}
