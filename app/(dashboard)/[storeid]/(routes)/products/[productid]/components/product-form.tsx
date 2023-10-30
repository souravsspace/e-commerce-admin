"use client"

import AlertModel from "@/components/models/alert-model"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Color, Image, Product, Size } from "@prisma/client"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import toast from "react-hot-toast"
import axios from "axios"
import * as z from "zod"
import { ProductFormField } from "./product-form-field"

interface ProductFormProps {
   initialData:
      | (Product & {
           images: Image[]
        })
      | null
   categories: Category[]
   colors: Color[]
   sizes: Size[]
}

const formSchema = z.object({
   name: z.string().min(1, { message: "Label is required." }),
   images: z
      .object({ imageUrl: z.string() })
      .array()
      .min(1, { message: "Image is required." }),
   price: z.coerce.number().min(1, { message: "Price is required." }),
   categoryId: z.string().min(1, { message: "Category is required." }),
   colorId: z.string().min(1, { message: "Color is required." }),
   sizeId: z.string().min(1, { message: "Size is required." }),
   isFeatured: z.boolean().default(false).optional(),
   isArchived: z.boolean().default(false).optional(),
})

export type ProductFormValues = z.infer<typeof formSchema>

export default function ProductForm({
   initialData,
   categories,
   sizes,
   colors,
}: ProductFormProps) {
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const params = useParams()
   const router = useRouter()

   const title = initialData ? "Edit product" : "Create product"
   const description = initialData ? "Edit a product." : "Add new product."
   const toastMessage = initialData ? "Product updated!" : "Product created!"
   const action = initialData ? "Save changes" : "Create"

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: initialData
         ? {
              ...initialData,
              price: parseFloat(String(initialData?.price)),
           }
         : {
              name: "",
              images: [],
              price: 0,
              categoryId: "",
              colorId: "",
              sizeId: "",
              isFeatured: false,
              isArchived: false,
           },
   })

   const storeid = params.storeid
   const productid = params.productid
   
   const onSubmit = async (field_data: ProductFormValues) => {
      try {
         setLoading(true)
         if (initialData) {
            await axios.patch(
               `/api/${storeid}/products/${productid}`,
               field_data
            )
         } else {
            await axios.post(`/api/${storeid}/products`, field_data)
         }
         router.refresh()
         toast.success(toastMessage)
         router.push(`/${storeid}/products`)
      } catch (error) {
         toast.error("Something went wrong!")
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      try {
         setLoading(true)
         await axios.delete(`/api/${storeid}/products/${productid}`)
         router.refresh()
         toast.success(toastMessage)
         router.push(`/${storeid}/products`)
      } catch (error) {
         toast.error(
            "Make sure you remove all categories that using this product."
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
               <ProductFormField
                  loading={loading}
                  action={action}
                  categories={categories}
                  colors={colors}
                  sizes={sizes}
                  form={form as any}
               />
            </form>
         </Form>
      </>
   )
}
