"use client"

import AlertModel from "@/components/models/alert-model"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Category } from "@prisma/client"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import toast from "react-hot-toast"
import axios from "axios"
import * as z from "zod"
import { CatagoryFormField } from "./catagory-form-field"

interface CategoryFormProps {
   initialData: Category | null
   billboards: Billboard[]
}

const formSchema = z.object({
   name: z.string().min(1, { message: "Name is required." }),
   billboardId: z.string().min(1, { message: "Billboard is required." }),
})

type CategoryFormValues = z.infer<typeof formSchema>

export default function CategoryForm({
   initialData,
   billboards,
}: CategoryFormProps) {
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const params = useParams()
   const router = useRouter()

   const title = initialData ? "Edit Catagory" : "Create catagory"
   const description = initialData ? "Edit a catagory." : "Add new catagory."
   const toastMessage = initialData ? "Catagory updated!" : "Catagory created!"
   const action = initialData ? "Save changes" : "Create"

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
         name: "",
         billboardId: "",
      },
   })

   const storeid = params.storeid
   const categoryid = params.categoryid

   const onSubmit = async (field_data: CategoryFormValues) => {
      try {
         setLoading(true)
         if (initialData) {
            await axios.patch(
               `/api/${storeid}/categories/${categoryid}`,
               field_data
            )
         } else {
            await axios.post(`/api/${storeid}/categories`, field_data)
         }
         router.refresh()
         toast.success(toastMessage)
         router.push(`/${storeid}/categories`)
      } catch (error) {
         toast.error("Something went wrong!")
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      try {
         setLoading(true)
         await axios.delete(`/api/${storeid}/categories/${categoryid}`)
         router.refresh()
         toast.success("Catagory deleted!")
         router.push(`/${storeid}/categories`)
      } catch (error) {
         toast.error("Make sure you remove all products using this categories.")
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
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-4 w-full"
            >
               <CatagoryFormField
                  billboards={billboards}
                  loading={loading}
                  form={form}
               />
               <Button type="submit" disabled={loading} className="ml-auto">
                  {action}
               </Button>
            </form>
         </Form>
      </>
   )
}
