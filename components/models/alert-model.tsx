import { useEffect, useState } from "react"
import Model from "@/components/ui/model"
import { Button } from "@/components/ui/button"

type Props = {
   isOpen: boolean
   onClose: () => void
   onConfirm: () => void
   loading: boolean
}

export default function AlertModel({
   isOpen,
   onClose,
   onConfirm,
   loading,
}: Props) {
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) return null

   return (
      <Model
         title="Are you sure?"
         description="This action can't be undone!"
         isOpen={isOpen}
         onClose={onClose}
      >
         <div className="pt-6 space-x-2 flex items-end justify-end w-full">
            <Button disabled={loading} variant="outline" onClick={onClose}>
               Cancel
            </Button>
            <Button
               disabled={loading}
               variant="destructive"
               onClick={onConfirm}
            >
               Delete
            </Button>
         </div>
      </Model>
   )
}
