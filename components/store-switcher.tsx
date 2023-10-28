"use client"

import { Store } from "@prisma/client"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { useStoreModel } from "@/hooks/use-store-model"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
   Check,
   ChevronsUpDown,
   PlusCircle,
   Store as StoreIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
} from "@/components/ui/command"

type PopoverTiggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTiggerProps {
   items: Store[]
}

export default function StoreSwitcher({
   className,
   items = [],
}: StoreSwitcherProps) {
   const storeModel = useStoreModel()
   const params = useParams()
   const router = useRouter()

   const [open, setOpen] = useState(false)

   const formattedItems = items.map((item) => ({
      label: item.name,
      value: item.id,
   }))

   const onStoreSelect = (store: { lable: string; value: string }) => {
      setOpen(false)
      router.push(`/${store.value}`)
   }

   const currStore = formattedItems.find(
      (item) => item.value === params.storeid
   )

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               size="sm"
               role="combobox"
               aria-expanded={open}
               aria-label="Select a store"
               className={cn("w-52 justify-between", className)}
            >
               <StoreIcon className="w-4 h-4 mr-2" />
               <span>{currStore?.label}</span>
               <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-52 p-0">
            <Command>
               <CommandList>
                  <CommandInput placeholder="Search store..." />
                  <CommandEmpty>No store found!</CommandEmpty>
                  <CommandGroup>
                     {formattedItems.map((store) => (
                        <CommandItem
                           key={store.value}
                           onSelect={() =>
                              onStoreSelect({
                                 lable: store.label,
                                 value: store.value,
                              })
                           }
                        >
                           <StoreIcon className="w-4 h-4 mr-2" />
                           {store.label}
                           <Check
                              className={cn(
                                 "w-4 h-4 ml-auto",
                                 currStore?.value === store.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                 className
                              )}
                           />
                        </CommandItem>
                     ))}
                  </CommandGroup>
               </CommandList>
               <CommandSeparator />
               <CommandList>
                  <CommandGroup>
                     <CommandItem
                        onSelect={() => {
                           storeModel.onOpen()
                           setOpen(false)
                        }}
                     >
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Create store
                     </CommandItem>
                  </CommandGroup>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   )
}
