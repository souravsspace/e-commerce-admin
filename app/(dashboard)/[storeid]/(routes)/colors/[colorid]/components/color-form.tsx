"use client"

import AlertModel from "@/components/models/alert-model"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import toast from "react-hot-toast"
import axios from "axios"
import * as z from "zod"
import { ColorFormField } from "./color-form-field"

interface ColorFormProps {
   initialData: Color | null
}

const formSchema = z.object({
   name: z.string().min(1, { message: "Label is required." }),
   value: z.string().min(1, { message: "Value is required." }),
})

type ColorFormValues = z.infer<typeof formSchema>

export default function ColorForm({ initialData }: ColorFormProps) {
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const params = useParams()
   const router = useRouter()

   const title = initialData ? "Edit color" : "Create color"
   const description = initialData ? "Edit a color." : "Add new color."
   const toastMessage = initialData ? "Color updated!" : "Color created!"
   const action = initialData ? "Save changes" : "Create"

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
         name: "",
         value: "",
      },
   })

   const storeid = params.storeid
   const colorid = params.colorid
   const onSubmit = async (field_data: ColorFormValues) => {
      try {
         setLoading(true)
         if (initialData) {
            await axios.patch(`/api/${storeid}/colors/${colorid}`, field_data)
         } else {
            await axios.post(`/api/${storeid}/colors`, field_data)
         }
         router.refresh()
         toast.success(toastMessage)
         router.push(`/${storeid}/colors`)
      } catch (error) {
         toast.error("Something went wrong!")
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      try {
         setLoading(true)
         await axios.delete(`/api/${storeid}/colors/${colorid}`)
         router.refresh()
         toast.success(toastMessage)
         router.push(`/${storeid}/colors`)
      } catch (error) {
         toast.error(
            "Make sure you remove all categories that using this color."
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
                  color="sm"
                  onClick={() => setOpen(true)}
               >
                  <Trash className="h-4 w-4" />
               </Button>
            )}
         </div>
         <Separator />
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <ColorFormField loading={loading} action={action} form={form} />
            </form>
         </Form>
      </>
   )
}
