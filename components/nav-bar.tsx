import { UserButton, auth } from "@clerk/nextjs"
import React from "react"
import MainNavItems from "@/components/main-nav-items"
import StoreSwitcher from "@/components/store-switcher"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prisma"

export default async function Navbar() {
   const { userId } = auth()

   if (!userId) redirect("/sign-in")

   const stores = await prismadb.store.findMany({
      where: {
         userId,
      }
   })

   return (
      <nav className="border-b">
         <main className="flex h-16 p-4 items-center">
            <StoreSwitcher items={stores} />
            <MainNavItems className="mx-6" />
            <section className="ml-auto flex items-center space-y-4">
               <UserButton afterSignOutUrl="/" />
            </section>
         </main>
      </nav>
   )
}
