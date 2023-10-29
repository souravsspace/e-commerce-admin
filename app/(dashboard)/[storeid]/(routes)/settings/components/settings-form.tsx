"use client"

import AlertModel from "@/components/models/alert-model"
import Heading from "@/components/ui/Heading"
import ApiAlert from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import useOrigin from "@/hooks/use-origin"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface SettingsFormProps {
   initialData: Store
}

const formSchema = z.object({
   name: z.string().min(1, { message: "Name is required." }),
})

type SettingFormValues = z.infer<typeof formSchema>

export default function SettingsForm({ initialData }: SettingsFormProps) {
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const params = useParams()
   const router = useRouter()
   const origin = useOrigin()

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: initialData,
   })

   const storeid = params.storeid
   const onSubmit = async (field_data: SettingFormValues) => {
      try {
         setLoading(true)
         await axios.patch(`/api/stores/${storeid}`, field_data)
         router.refresh()
         toast.success("Store updated!")
      } catch (error) {
         toast.error("Something went wrong!")
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      try {
         setLoading(true)
         await axios.delete(`/api/stores/${storeid}`)
         router.refresh()
         toast.success("Store deleted!")
         router.push("/")
      } catch (error) {
         toast.error("Make sure you remove all product and categories first!")
      } finally {
         setLoading(false)
         setOpen(false)
      }
   }

   return (
      <>
         <AlertModel
            isOpen={open}
            loading={loading}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
         />
         <div className="flex items-center justify-between">
            <Heading title="Settings" description="Manage store preferences." />
            <Button
               disabled={loading}
               variant="destructive"
               size="sm"
               onClick={() => setOpen(true)}
            >
               <Trash className="h-4 w-4" />
            </Button>
         </div>
         <Separator />
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-4 w-full"
            >
               <div className="grid grid-cols-3 gap-8">
                  <FormField
                     name="name"
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="Store name"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <Button type="submit" disabled={loading} className="ml-auto">
                  Save Changes
               </Button>
            </form>
         </Form>
         <Separator />
         <ApiAlert
            title="NEXT_PUBLIC_API_URL"
            description={`${origin}/api/${params.storeid}`}
            variant="public"
         />
      </>
   )
}
