import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import SettingsForm from "./components/settings-form"

interface SettingsPageProps {
   params: {
      storeid: string
   }
}

export default async function SettingsPage({
   params: { storeid },
}: SettingsPageProps) {
   const { userId } = auth()
   if (!userId) redirect("/sign-in")

   const store = await prismadb.store.findFirst({
      where: {
         id: storeid,
         userId,
      },
   })
   if (!store) redirect("/")

   return (
      <div className="flex-col">
         <div className="p-8 pt-6 space-y-4 flex-1">
            <SettingsForm initialData={store} />
         </div>
      </div>
   )
}
