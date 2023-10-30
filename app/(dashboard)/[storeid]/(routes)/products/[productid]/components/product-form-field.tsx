"use client"

import { Button } from "@/components/ui/button"
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/ui/image-upload"
import { UseFormReturn } from "react-hook-form"
import { ProductFormValues } from "./product-form"
import priceFormatter from "@/lib/price-formatter"
import { Category, Color, Product, Size } from "@prisma/client"
import { ProductFormFieldSelect } from "./product-form-field-select"
import { Checkbox } from "@/components/ui/checkbox"

interface ProductFormFieldProps {
   loading: boolean
   action: string
   categories: Category[]
   colors: Color[]
   sizes: Size[]
   form: UseFormReturn<ProductFormValues, any, undefined>
}

export function ProductFormField({
   loading,
   action,
   categories,
   sizes,
   colors,
   form,
}: ProductFormFieldProps) {
   return (
      <div className="space-y-4 w-full">
         <FormField
            name="images"
            control={form.control}
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                     <ImageUpload
                        value={field.value.map((image) => image.imageUrl)}
                        onChange={(imageUrl) =>
                           field.onChange([...field.value, { imageUrl }])
                        }
                        onRemove={(imageUrl) =>
                           field.onChange([
                              ...field.value.filter(
                                 (image) => image.imageUrl !== imageUrl
                              ),
                           ])
                        }
                        disabled={loading}
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />
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
                           placeholder="Product name"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               name="price"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Price</FormLabel>
                     <FormControl>
                        <Input
                           disabled={loading}
                           placeholder={priceFormatter(35)}
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <ProductFormFieldSelect
               loading={loading}
               categories={categories}
               sizes={sizes}
               colors={colors}
               form={form}
            />
            <FormField
               name="isFeatured"
               control={form.control}
               render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3  space-y-0 rounded-md border p-4">
                     <FormControl>
                        <Checkbox
                           checked={field.value}
                           onCheckedChange={field.onChange}
                        />
                     </FormControl>
                     <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                           Show this product on your homepage.
                        </FormDescription>
                     </div>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               name="isArchived"
               control={form.control}
               render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3  space-y-0 rounded-md border p-4">
                     <FormControl>
                        <Checkbox
                           checked={field.value}
                           onCheckedChange={field.onChange}
                        />
                     </FormControl>
                     <div className="space-y-1 leading-none">
                        <FormLabel>Archived</FormLabel>
                        <FormDescription>
                           This product will not be shown on your store.
                        </FormDescription>
                     </div>
                     <FormMessage />
                  </FormItem>
               )}
            />
         </div>
         <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="ml-auto">
               {action}
            </Button>
         </div>
      </div>
   )
}
