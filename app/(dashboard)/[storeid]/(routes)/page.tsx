import prismadb from "@/lib/prisma"
import React from "react"

type Props = {
   params: {
      storeid: string
   }
}

export default async function DashboardPage({ params: { storeid } }: Props) {
   const store = await prismadb.store.findFirst({
      where: {
         id: storeid,
      },
   })

   return (
      <>
         <p>Active Store - {store?.name}</p>
      </>
   )
}
