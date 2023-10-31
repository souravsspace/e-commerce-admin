"use client"
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Category, Color, Size } from "@prisma/client"
import { ProductFormValues } from "./product-form"
import { UseFormReturn } from "react-hook-form"

interface ProductFormFieldSelectProps {
   loading: boolean
   categories: Category[]
   colors: Color[]
   sizes: Size[]
   form: UseFormReturn<ProductFormValues>
}

export function ProductFormFieldSelect({
   loading,
   form,
   categories,
   colors,
   sizes,
}: ProductFormFieldSelectProps) {
   return (
      <>
         <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                     disabled={loading}
                     value={field.value}
                     onValueChange={field.onChange}
                     defaultValue={field.value}
                  >
                     <FormControl>
                        <SelectTrigger>
                           <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a category"
                           />
                        </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                        {categories.map((category) => (
                           <SelectItem key={category.id} value={category.id}>
                              {category.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <FormMessage />
               </FormItem>
            )}
         />
         <FormField
            name="colorId"
            control={form.control}
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                     disabled={loading}
                     value={field.value}
                     onValueChange={field.onChange}
                     defaultValue={field.value}
                  >
                     <FormControl>
                        <SelectTrigger>
                           <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a color"
                           />
                        </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                        {colors.map((color) => (
                           <SelectItem key={color.id} value={color.id}>
                              {color.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <FormMessage />
               </FormItem>
            )}
         />
         <FormField
            name="sizeId"
            control={form.control}
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                     disabled={loading}
                     value={field.value}
                     onValueChange={field.onChange}
                     defaultValue={field.value}
                  >
                     <FormControl>
                        <SelectTrigger>
                           <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a size"
                           />
                        </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                        {sizes.map((size) => (
                           <SelectItem key={size.id} value={size.id}>
                              {size.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <FormMessage />
               </FormItem>
            )}
         />
      </>
   )
}
