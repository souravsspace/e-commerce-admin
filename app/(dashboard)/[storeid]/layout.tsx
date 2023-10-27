import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

type Props = {
   children: React.ReactNode
   params: {
      storeid: string
   }
}

export default async function DashBoardlayout({
   children,
   params: { storeid },
}: Props) {
   const { userId } = auth()

   if (!userId) redirect("/sigin-in")

   const store = await prismadb.store.findFirst({
      where: {
         id: storeid,
         userId,
      },
   })
   if (!store) redirect("/")

   return (
      <main>
         <nav>The navbar</nav>
         {children}
      </main>
   )
}
