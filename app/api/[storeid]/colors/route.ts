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

      const { name, value } = body

      if (!name)
         return NextResponse.json(
            { message: "Name is required" },
            { status: 400 }
         )
      if (!value)
         return NextResponse.json(
            { message: "Value is required" },
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

      const color = await prismadb.color.findFirst({
         where: {
            name,
            value,
            storeId: storeid,
         },
      })

      if (color)
         return NextResponse.json(
            { message: "Color already exists" },
            { status: 409 }
         )

      const createStore = await prismadb.color.create({
         data: {
            name,
            value,
            storeId: storeid,
         },
      })

      return NextResponse.json(createStore, { status: 200 })
   } catch (error) {
      console.error("ColorPost: error:", error)
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
      const colors = await prismadb.color.findMany({
         where: {
            storeId: storeid,
         },
      })

      return NextResponse.json(colors, { status: 200 })
   } catch (error) {
      console.error("ColorPost: error:", error)
      return new Response(
         JSON.stringify({ message: "Internal server error" }),
         { status: 500 }
      )
   }
}
