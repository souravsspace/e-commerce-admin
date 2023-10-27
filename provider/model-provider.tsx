"use client"

import StoreModel from "@/components/models/store-model"
import { useState, useEffect } from "react"

export default function ModelProvider() {
   const [inMounted, setIsMounted] = useState(false)

   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (!inMounted) return null

   return <StoreModel />
}
