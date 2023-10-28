import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

type Props = {
   children: React.ReactNode
}

export default async function SetupLayout({ children }: Props) {
   const { userId } = auth()
   if (!userId) redirect("/sign-in")

   const store = await prismadb.store.findFirst({
      where: {
         userId,
      },
   })

   if (store) redirect(`/${store.id}`)

   return <>{children}</>
}

// 1:56 hours
