import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { Color } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(
   _request: Request,
   { params: { colorid } }: { params: { colorid: string } }
) {
   try {
      if (!colorid)
         return NextResponse.json("Color is required!", { status: 400 })

      const color = await prismadb.color.findUnique({
         where: {
            id: colorid,
         },
      })

      return NextResponse.json(color, { status: 200 })
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
      params: { storeid, colorid },
   }: { params: { storeid: string; colorid: string } }
) {
   try {
      const { userId } = auth()
      const body = await request.json()

      const { name, value }: Partial<Color> = body

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

      if (!value) {
         return NextResponse.json("value is found!", {
            status: 400,
         })
      }

      if (!colorid)
         return NextResponse.json("Color is required!", { status: 400 })

      if (!storeid) return NextResponse.json("No store found!", { status: 400 })

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json("Unauthorized!", { status: 403 })

      const colors = await prismadb.color.updateMany({
         where: {
            id: colorid,
         },
         data: {
            name,
            value,
         },
      })

      return NextResponse.json(colors, { status: 200 })
   } catch (error) {
      console.error("colors: PATCH: error:", error)
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      )
   }
}

export async function DELETE(
   _request: Request,
   {
      params: { storeid, colorid },
   }: { params: { storeid: string; colorid: string } }
) {
   try {
      const { userId } = auth()

      if (!userId) {
         return new NextResponse("Unauthorized", {
            status: 401,
         })
      }

      if (!colorid)
         return NextResponse.json("Color is required!", { status: 400 })

      if (!storeid) return NextResponse.json("No store found!", { status: 400 })

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json("Unauthorized!", { status: 403 })

      const color = await prismadb.color.deleteMany({
         where: {
            id: colorid,
         },
      })

      return NextResponse.json(color, { status: 200 })
   } catch (error) {
      console.log("DELETE Error: ", error)
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
         status: 500,
      })
   }
}
