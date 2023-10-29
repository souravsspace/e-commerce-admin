import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { Billboard } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(
   _request: Request,
   { params: { billboardid } }: { params: { billboardid: string } }
) {
   try {
      if (!billboardid)
         return NextResponse.json("Billboard is required!", { status: 400 })

      const billboard = await prismadb.billboard.findUnique({
         where: {
            id: billboardid,
         },
      })

      return NextResponse.json(billboard, { status: 200 })
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
      params: { storeid, billboardid },
   }: { params: { storeid: string; billboardid: string } }
) {
   try {
      const { userId } = auth()
      const body = await request.json()

      const { label, imageUrl }: Partial<Billboard> = body

      if (!userId) {
         return NextResponse.json("Unauthorized", {
            status: 401,
         })
      }
      if (!label) {
         return NextResponse.json("No label found!", {
            status: 400,
         })
      }

      if (!imageUrl) {
         return NextResponse.json("No image url found!", {
            status: 400,
         })
      }

      if (!billboardid)
         return NextResponse.json("Billboard is required!", { status: 400 })

      if (!storeid) return NextResponse.json("No store found!", { status: 400 })

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json("Unauthorized!", { status: 403 })

      const billboards = await prismadb.billboard.updateMany({
         where: {
            id: billboardid,
         },
         data: {
            label,
            imageUrl,
         },
      })

      return NextResponse.json(billboards, { status: 200 })
   } catch (error) {
      console.error("billboards: PATCH: error:", error)
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      )
   }
}

export async function DELETE(
   _request: Request,
   {
      params: { storeid, billboardid },
   }: { params: { storeid: string; billboardid: string } }
) {
   try {
      const { userId } = auth()

      if (!userId) {
         return new NextResponse("Unauthorized", {
            status: 401,
         })
      }

      if (!billboardid)
         return NextResponse.json("Billboard is required!", { status: 400 })

      if (!storeid) return NextResponse.json("No store found!", { status: 400 })

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json("Unauthorized!", { status: 403 })

      const billboard = await prismadb.billboard.deleteMany({
         where: {
            id: billboardid,
         },
      })

      return NextResponse.json(billboard, { status: 200 })
   } catch (error) {
      console.log("DELETE Error: ", error)
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
         status: 500,
      })
   }
}
