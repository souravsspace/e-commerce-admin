"use client"

import AlertModel from "@/components/models/alert-model"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import toast from "react-hot-toast"
import axios from "axios"
import * as z from "zod"
import { BillboardFormField } from "./billboard-form-field"

interface BillboardFormProps {
   initialData: Billboard | null
}

const formSchema = z.object({
   label: z.string().min(1, { message: "Label is required." }),
   imageUrl: z.string().url({ message: "Invalid URL." }),
})

type BillboardFormValues = z.infer<typeof formSchema>

export default function BillboardForm({ initialData }: BillboardFormProps) {
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const params = useParams()
   const router = useRouter()

   const title = initialData ? "Edit billboard" : "Create billboard"
   const description = initialData ? "Edit a billboard." : "Add new billboard."
   const toastMessage = initialData
      ? "Billboard updated!"
      : "Billboard created!"
   const action = initialData ? "Save changes" : "Create"

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
         label: "",
         imageUrl: "",
      },
   })

   const storeid = params.storeid
   const billboardid = params.billboardid
   const onSubmit = async (field_data: BillboardFormValues) => {
      try {
         setLoading(true)
         if (initialData) {
            await axios.patch(
               `/api/${storeid}/billboards/${billboardid}`,
               field_data
            )
         } else {
            await axios.post(`/api/${storeid}/billboards`, field_data)
         }
         router.refresh()
         toast.success(toastMessage)
         router.push(`/${storeid}/billboards`)
      } catch (error) {
         toast.error("Something went wrong!")
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      try {
         setLoading(true)
         await axios.delete(`/api/${storeid}/billboards/${billboardid}`)
         router.refresh()
         toast.success(toastMessage)
         router.push(`/${storeid}/billboards`)
      } catch (error) {
         toast.error(
            "Make sure you remove all categories that using this billboard."
         )
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
            <Heading title={title} description={description} />
            {initialData && (
               <Button
                  disabled={loading}
                  variant="destructive"
                  size="sm"
                  onClick={() => setOpen(true)}
               >
                  <Trash className="h-4 w-4" />
               </Button>
            )}
         </div>
         <Separator />
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <BillboardFormField
                  loading={loading}
                  action={action}
                  form={form}
               />
            </form>
         </Form>
      </>
   )
}
