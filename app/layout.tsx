import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import ModelProvider from "@/provider/model-provider"
import ToastProvider from "@/provider/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "Admin Panel",
   description: "Ecommerce Admin Panel",
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <ClerkProvider>
         <html lang="en">
            <body className={inter.className}>
               <ToastProvider />
               <ModelProvider />
               {children}
            </body>
         </html>
      </ClerkProvider>
   )
}
