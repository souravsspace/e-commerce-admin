"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export default function MainNavItems({
   className,
   ...props
}: React.HTMLAttributes<HTMLElement>) {
   const pathname = usePathname()
   const params = useParams()

   const routes = [
      {
         href: `/${params.storeid}/settings`,
         label: "Settings",
         actuve: pathname === `/${params.storeid}/settings`,
      },
   ]

   return (
      <nav
         className={(cn("flex items-center space-x-4 lg:space-x-6"), className)}
      >
         {routes.map((route, index) => (
            <Link
               key={index}
               href={route.href}
               className={
                  (cn(
                     "text-sm font-medium transition-colors hover:text-primary",
                     route.actuve
                        ? "text-black dark:text-white"
                        : "text-muted-foreground"
                  ),
                  className)
               }
            >
               {route.label}
            </Link>
         ))}
      </nav>
   )
}
