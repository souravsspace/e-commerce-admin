import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { Size } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(
   _request: Request,
   { params: { sizeid } }: { params: { sizeid: string } }
) {
   try {
      if (!sizeid)
         return NextResponse.json("Size is required!", { status: 400 })

      const size = await prismadb.size.findUnique({
         where: {
            id: sizeid,
         },
      })

      return NextResponse.json(size, { status: 200 })
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
      params: { storeid, sizeid },
   }: { params: { storeid: string; sizeid: string } }
) {
   try {
      const { userId } = auth()
      const body = await request.json()

      const { name, value }: Partial<Size> = body

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

      if (!sizeid)
         return NextResponse.json("Size is required!", { status: 400 })

      if (!storeid) return NextResponse.json("No store found!", { status: 400 })

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json("Unauthorized!", { status: 403 })

      const sizes = await prismadb.size.updateMany({
         where: {
            id: sizeid,
         },
         data: {
            name,
            value,
         },
      })

      return NextResponse.json(sizes, { status: 200 })
   } catch (error) {
      console.error("sizes: PATCH: error:", error)
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      )
   }
}

export async function DELETE(
   _request: Request,
   {
      params: { storeid, sizeid },
   }: { params: { storeid: string; sizeid: string } }
) {
   try {
      const { userId } = auth()

      if (!userId) {
         return new NextResponse("Unauthorized", {
            status: 401,
         })
      }

      if (!sizeid)
         return NextResponse.json("Size is required!", { status: 400 })

      if (!storeid) return NextResponse.json("No store found!", { status: 400 })

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json("Unauthorized!", { status: 403 })

      const size = await prismadb.size.deleteMany({
         where: {
            id: sizeid,
         },
      })

      return NextResponse.json(size, { status: 200 })
   } catch (error) {
      console.log("DELETE Error: ", error)
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
         status: 500,
      })
   }
}
