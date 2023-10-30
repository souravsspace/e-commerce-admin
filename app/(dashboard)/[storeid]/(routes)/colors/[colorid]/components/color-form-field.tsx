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
import { UseFormReturn } from "react-hook-form"
import { Color } from "@prisma/client"

interface ColorFormFieldProps {
   loading: boolean
   action: string
   form: UseFormReturn<Color, any, undefined>
}

export function ColorFormField({ loading, action, form }: ColorFormFieldProps) {
   return (
      <div className="space-y-4 w-full">
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
                           placeholder="Color name"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               name="value"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Value</FormLabel>
                     <FormControl>
                        <Input
                           disabled={loading}
                           placeholder="Color value"
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
