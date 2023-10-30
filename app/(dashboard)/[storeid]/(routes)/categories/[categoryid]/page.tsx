import prismadb from "@/lib/prisma"
import CategoryForm from "./components/catagory-form"

type CategoryPageProps = {
   params: {
      categoryid: string
      storeid: string
   }
}

export default async function CategoryPage({
   params: { categoryid, storeid },
}: CategoryPageProps) {
   const category = await prismadb.category.findUnique({
      where: {
         id: categoryid,
      },
   })
   const billboards = await prismadb.billboard.findMany({
      where: {
         storeId: storeid,
      },
   })

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 p-8">
            <CategoryForm initialData={category} billboards={billboards} />
         </div>
      </div>
   )
}
