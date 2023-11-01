import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { Category } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(
   _request: Request,
   { params: { categoryid } }: { params: { categoryid: string } }
) {
   try {
      if (!categoryid)
         return NextResponse.json("Category is required!", { status: 400 })

      const category = await prismadb.category.findUnique({
         where: {
            id: categoryid,
         },
         include: {
            billboard: true,
         }
      })

      return NextResponse.json(category, { status: 200 })
   } catch (error) {
      console.log("GET Error: ", error)
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
         status: 500,
      })
   }
}

export async function PATCH(
   request: Request,
   {
      params: { storeid, categoryid },
   }: { params: { storeid: string; categoryid: string } }
) {
   try {
      const { userId } = auth()
      const body = await request.json()

      const { name, billboardId }: Partial<Category> = body

      if (!userId) {
         return NextResponse.json("Unauthorized", {
            status: 401,
         })
      }
      if (!name) {
         return NextResponse.json("No name found!", {
            status: 400,
         })
      }

      if (!billboardId) {
         return NextResponse.json("No Billboard found!", {
            status: 400,
         })
      }

      if (!categoryid)
         return NextResponse.json("Category is required!", { status: 400 })

      if (!storeid) return NextResponse.json("No store found!", { status: 400 })

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json("Unauthorized!", { status: 403 })

      const categories = await prismadb.category.updateMany({
         where: {
            id: categoryid,
         },
         data: {
            name,
            billboardId,
         },
      })

      return NextResponse.json(categories, { status: 200 })
   } catch (error) {
      console.error("categories: PATCH: error:", error)
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      )
   }
}

export async function DELETE(
   _request: Request,
   {
      params: { storeid, categoryid },
   }: { params: { storeid: string; categoryid: string } }
) {
   try {
      const { userId } = auth()

      if (!userId) {
         return new NextResponse("Unauthorized", {
            status: 401,
         })
      }

      if (!categoryid)
         return NextResponse.json("Category is required!", { status: 400 })

      if (!storeid) return NextResponse.json("No store found!", { status: 400 })

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json("Unauthorized!", { status: 403 })

      const category = await prismadb.category.deleteMany({
         where: {
            id: categoryid,
         },
      })

      return NextResponse.json(category, { status: 200 })
   } catch (error) {
      console.log("DELETE Error: ", error)
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
         status: 500,
      })
   }
}
