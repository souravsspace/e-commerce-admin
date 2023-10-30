import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
   req: Request,
   { params: { storeid } }: { params: { storeid: string } }
) {
   try {
      const body = await req.json()
      const { userId } = auth()
      if (!userId)
         return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

      const { name, billboardId } = body

      if (!name)
         return NextResponse.json(
            { message: "Name is required" },
            { status: 400 }
         )
      if (!billboardId)
         return NextResponse.json(
            { message: "Billboard url is required" },
            { status: 400 }
         )

      if (!storeid)
         return NextResponse.json(
            { message: "Store id is required" },
            { status: 400 }
         )

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json(
            { message: "Store does not exist" },
            { status: 404 }
         )

      const createCategory = await prismadb.category.create({
         data: {
            name,
            billboardId,
            storeId: storeid,
         },
      })

      return NextResponse.json(createCategory, { status: 200 })
   } catch (error) {
      console.error("CatecategoryPost: error:", error)
      return new Response(
         JSON.stringify({ message: "Internal server error" }),
         { status: 500 }
      )
   }
}

export async function GET(
   _req: Request,
   { params: { storeid } }: { params: { storeid: string } }
) {
   try {
      if (!storeid)
         return NextResponse.json(
            { message: "Store id is required" },
            { status: 400 }
         )
      const categories = await prismadb.category.findMany({
         where: {
            storeId: storeid,
         },
      })

      return NextResponse.json(categories, { status: 200 })
   } catch (error) {
      console.error("CatcategoryGET: error:", error)
      return new Response(
         JSON.stringify({ message: "Internal server error" }),
         { status: 500 }
      )
   }
}
