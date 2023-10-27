import { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <main className="flex justify-center items-center min-h-screen">
         {children}
      </main>
   )
}
