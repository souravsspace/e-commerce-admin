import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { Store } from "@prisma/client"
import { NextResponse } from "next/server"

export async function PATCH(
   request: Request,
   { params: { storeid } }: { params: { storeid: string } }
) {
   try {
      const { userId } = auth()
      const body = await request.json()

      const { name }: Partial<Store> = body

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
      if (!storeid) {
         return NextResponse.json("No store found!", {
            status: 400,
         })
      }

      const store = await prismadb.store.updateMany({
         where: {
            id: storeid,
            userId: userId,
         },
         data: {
            name: name,
         },
      })

      return NextResponse.json(store, { status: 200 })
   } catch (error) {
      console.error("stores/route.ts: POST: error:", error)
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      )
   }
}

export async function DELETE(
   _request: Request,
   { params: { storeid } }: { params: { storeid: string } }
) {
   try {
      const { userId } = auth()

      if (!userId) {
         return new NextResponse("Unauthorized", {
            status: 401,
         })
      }
      if (!storeid) {
         return new NextResponse("No store found!", {
            status: 400,
         })
      }

      const store = await prismadb.store.deleteMany({
         where: {
            id: storeid,
            userId,
         },
      })

      return NextResponse.json(store, { status: 200 })
   } catch (error) {
      console.log("DELETE Error: ", error)
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
         status: 500,
      })
   }
}
