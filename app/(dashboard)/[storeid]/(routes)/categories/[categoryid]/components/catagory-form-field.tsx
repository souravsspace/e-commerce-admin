"use client"

import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Billboard, Category } from "@prisma/client"
import { UseFormReturn } from "react-hook-form"

interface CatagoryFormFieldProps {
   loading: boolean
   billboards: Billboard[]
   form: UseFormReturn<Category, any, undefined>
}

export function CatagoryFormField({
   form,
   billboards,
   loading,
}: CatagoryFormFieldProps) {
   return (
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
                        placeholder="Catagory label"
                        {...field}
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />
         <FormField
            name="billboardId"
            control={form.control}
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Billboard</FormLabel>
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
                              placeholder="Select a billboard"
                           />
                        </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                        {billboards.map((billboard) => (
                           <SelectItem key={billboard.id} value={billboard.id}>
                              {billboard.label}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <FormMessage />
               </FormItem>
            )}
         />
      </div>
   )
}
