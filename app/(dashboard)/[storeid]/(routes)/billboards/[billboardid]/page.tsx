import prismadb from "@/lib/prisma"

type Props = {
   params: {
      billboardid: string
   }
}

export default async function BillboardPage({
   params: { billboardid },
}: Props) {
   const billboard = await prismadb.billboard.findUnique({
      where: {
         id: billboardid,
      },
   })

   return <div>BillboardPage {billboard?.label}</div>
}
