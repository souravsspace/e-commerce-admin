"use client"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export default function BillboardClient() {
   const router = useRouter()
   const params = useParams()

   return (
      <>
         <div className="flex items-center justify-between">
            <Heading
               title="Billboard (0)"
               description="Manage billboard for your store"
            />
            <Button
               onClick={() => router.push(`/${params.storeid}/billboards/new`)}
            >
               <Plus className="mr-2 h-4 w-4" />
               Add Billboard
            </Button>
         </div>
         <Separator />
      </>
   )
}
