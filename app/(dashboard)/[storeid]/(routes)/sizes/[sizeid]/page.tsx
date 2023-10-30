import prismadb from "@/lib/prisma"
import SizeForm from "./components/size-form"

type SizePageProps = {
   params: {
      sizeid: string
   }
}

export default async function SizePage({
   params: { sizeid },
}: SizePageProps) {
   const size = await prismadb.size.findUnique({
      where: {
         id: sizeid,
      },
   })

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 p-8">
            <SizeForm initialData={size} />
         </div>
      </div>
   )
}
