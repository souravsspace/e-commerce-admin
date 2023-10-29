"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Copy, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

type Props = {
   title: string
   description: string
   variant: "admin" | "public"
}

const textMap: Record<Props["variant"], string> = {
   admin: "Admin",
   public: "Public",
}

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
   admin: "destructive",
   public: "secondary",
}

export default function ApiAlert({
   title,
   description,
   variant = "public",
}: Props) {
   const onCopy = () => {
      navigator.clipboard.writeText(description)
      toast.success("Copied to clipboard!")
   }

   return (
      <Alert>
         <Server className="h-4 w-4" />
         <AlertTitle>
            {title}
            <Badge variant={variantMap[variant]} className="ml-2">
               {textMap[variant]}
            </Badge>
         </AlertTitle>
         <AlertDescription className="mt-4 flex items-center justify-between">
            <code className="relative bg-muted font-mono px-[0.3rem] py-[0.2rem] font-semibold text-sm">
               {description}
            </code>
            <Button variant="outline" size="sm" onClick={onCopy}>
               <Copy className="h-4 w-4" />
            </Button>
         </AlertDescription>
      </Alert>
   )
}
