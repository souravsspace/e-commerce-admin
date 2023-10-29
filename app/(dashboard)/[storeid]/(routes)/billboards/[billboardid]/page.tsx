import prismadb from "@/lib/prisma"
import BillboardForm from "./components/billboard-form"

type BillboardPageProps = {
   params: {
      billboardid: string
   }
}

export default async function BillboardPage({
   params: { billboardid },
}: BillboardPageProps) {
   const billboard = await prismadb.billboard.findUnique({
      where: {
         id: billboardid,
      },
   })

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 p-8">
            <BillboardForm initialData={billboard} />
         </div>
      </div>
   )
}
