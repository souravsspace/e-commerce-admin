"use client"

import * as z from "zod"
import Model from "@/components/ui/model"
import { useStoreModel } from "@/hooks/use-store-model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
// import { redirect } from "next/navigation"
// import { useRouter } from "next/navigation"

const formSchema = z.object({
   name: z.string().min(1, { message: "Store name is required" }),
})

type FormValues = z.infer<typeof formSchema>

export default function StoreModel() {
   const { isOpen, onClose } = useStoreModel()
   const [loading, setLoading] = useState(false)

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
      },
   })

   // const router = useRouter()
   const onSubmit = async (values: FormValues) => {
      try {
         setLoading(true)
         const res = await axios.post("/api/stores", values)
         toast.success("Store created successfully!")
         // router.replace(`/${res.data.id}`)
         window.location.assign(`/${res.data.id}`)
         // redirect(`/${res.data.id}`)
      } catch (error) {
         toast.error("Something went wrong!")
      } finally {
         setLoading(false)
      }
   }

   return (
      <Model
         title="Create store"
         description="Add new store to manage products and categories"
         isOpen={isOpen}
         onClose={onClose}
      >
         <main>
            <div className="space-y-4 py-2 pb-4">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                 <Input
                                    disabled={loading}
                                    {...field}
                                    placeholder="Store name"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <div className="pt-5 space-x-2 flex justify-end items-center">
                        <Button
                           disabled={loading}
                           variant="outline"
                           onClick={onClose}
                        >
                           Cancel
                        </Button>
                        <Button disabled={loading} type="submit">
                           Continue
                        </Button>
                     </div>
                  </form>
               </Form>
            </div>
         </main>
      </Model>
   )
}
