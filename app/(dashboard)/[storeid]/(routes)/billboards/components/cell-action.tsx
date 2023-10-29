import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { billboardColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import AlertModel from "@/components/models/alert-model"

interface CellActionProps {
   data: billboardColumn
}

export default function CellAction({ data }: CellActionProps) {
   const router = useRouter()
   const params = useParams()

   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const onCopy = (id: string) => {
      navigator.clipboard.writeText(id)
      toast.success("Copied to clipboard")
   }

   const onDelete = async () => {
      try {
         setLoading(true)
         await axios.delete(`/api/${params.storeid}/billboards/${data.id}`)
         router.refresh()
         toast.success("Billboard deleted successfully.")
      } catch (error) {
         toast.error(
            "Make sure you remove all categories that using this billboard."
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
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
         />
         <DropdownMenu>
            <DropdownMenuTrigger>
               <Button variant="ghost">
                  <MoreHorizontal className="h-5 w-5 p-0" />
                  <span className="sr-only">Open</span>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuLabel>Action</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={() => onCopy(data.id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Id
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() =>
                     router.push(`/${params.storeid}/billboards/${data.id}`)
                  }
               >
                  <Edit className="h-4 w-4 mr-2" />
                  Update
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setOpen(true)}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}
