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

      const { label, imageUrl } = body

      if (!label)
         return NextResponse.json(
            { message: "Label is required" },
            { status: 400 }
         )
      if (!imageUrl)
         return NextResponse.json(
            { message: "Image url is required" },
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

      const billboard = await prismadb.billboard.findFirst({
         where: {
            label,
            storeId: storeid,
         },
      })

      if (billboard)
         return NextResponse.json(
            { message: "Billboard already exists" },
            { status: 409 }
         )

      const createStore = await prismadb.billboard.create({
         data: {
            label,
            imageUrl,
            storeId: storeid,
         },
      })

      return NextResponse.json(createStore, { status: 200 })
   } catch (error) {
      console.error("BillboardPost: error:", error)
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
      const billboards = await prismadb.billboard.findMany({
         where: {
            storeId: storeid,
         },
      })

      return NextResponse.json(billboards, { status: 200 })
   } catch (error) {
      console.error("BillboardPost: error:", error)
      return new Response(
         JSON.stringify({ message: "Internal server error" }),
         { status: 500 }
      )
   }
}
