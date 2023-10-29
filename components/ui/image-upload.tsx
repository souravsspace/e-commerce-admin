"use client"

import { useEffect, useState } from "react"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
   disabled?: boolean
   onChange: (string: String) => void
   onRemove: (string: String) => void
   value: string[]
}

export default function ImageUpload({
   disabled,
   onChange,
   onRemove,
   value,
}: ImageUploadProps) {
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)
   }, [])

   const onUpload = (results: any) => {
      onChange(results.info.secure_url)
   }

   if (!mounted) return null
   return (
      <main>
         <div className="flex gap-4 mb-4 items-center">
            {value.map((url) => (
               <div
                  key={url}
                  className="relative w-52 h-52 rounded-md overflow-hidden"
               >
                  <div className="absolute top-2 right-2 z-10">
                     <Button
                        type="button"
                        variant="destructive"
                        onClick={() => onRemove(url)}
                     >
                        <Trash className="h-4 w-4" />
                     </Button>
                  </div>
                  <Image fill className="object-cover" alt="Image" src={url} />
               </div>
            ))}
         </div>
         <CldUploadWidget onUpload={onUpload} uploadPreset="lseprfi8">
            {({ open }) => {
               const onClick = () => {
                  open()
               }

               return (
                  <Button
                     type="button"
                     variant="secondary"
                     disabled={disabled}
                     onClick={onClick}
                  >
                     <ImagePlus className="h-4 w-4 mr-2" />
                     Upload Image
                  </Button>
               )
            }}
         </CldUploadWidget>
      </main>
   )
}
