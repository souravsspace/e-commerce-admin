"use client"
import { Button } from "@/components/ui/button"
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/ui/image-upload"
import { UseFormReturn } from "react-hook-form"
import { Billboard } from "@prisma/client"

interface BillboardFormFieldProps {
   loading: boolean
   action: string
   form: UseFormReturn<Billboard, any, undefined>
}

export function BillboardFormField({
   loading,
   action,
   form,
}: BillboardFormFieldProps) {
   return (
      <div className="space-y-4 w-full">
         <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                     <ImageUpload
                        disabled={loading}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                        value={field.value ? [field.value] : []}
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />
         <div className="grid grid-cols-3 gap-8">
            <FormField
               name="label"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Label</FormLabel>
                     <FormControl>
                        <Input
                           disabled={loading}
                           placeholder="Billboard label"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
         </div>
         <Button type="submit" disabled={loading} className="ml-auto">
            {action}
         </Button>
      </div>
   )
}
