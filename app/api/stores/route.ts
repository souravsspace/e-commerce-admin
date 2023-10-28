import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
   try {
      const body = await req.json()
      const { userId } = auth()
      if (!userId)
         return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

      const { name } = body

      const sameName = await prismadb.store.findFirst({
         where: {
            name: name,
            userId: userId,
         },
      })

      if (sameName)
         return NextResponse.json(
            { message: "Name already exists" },
            { status: 400 }
         )

      if (!name)
         return NextResponse.json(
            { message: "Name is required" },
            { status: 400 }
         )

      const createStore = await prismadb.store.create({
         data: {
            name: name,
            userId: userId,
         },
      })
      return NextResponse.json(createStore, { status: 200 })
   } catch (error) {
      console.error("stores/route.ts: POST: error:", error)
      return new Response(
         JSON.stringify({ message: "Internal server error" }),
         { status: 500 }
      )
   }
}
