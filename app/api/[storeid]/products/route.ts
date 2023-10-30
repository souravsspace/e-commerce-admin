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

      const {
         name,
         price,
         images,
         categoryId,
         colorId,
         sizeId,
         isArchived,
         isFeatured,
      } = body

      if (!name)
         return NextResponse.json(
            { message: "Name is required" },
            { status: 400 }
         )
      if (!price)
         return NextResponse.json(
            { message: "Price is required" },
            { status: 400 }
         )
      if (!images || images.length === 0)
         return NextResponse.json(
            { message: "Images is required" },
            { status: 400 }
         )
      if (!categoryId)
         return NextResponse.json(
            { message: "Category is required" },
            { status: 400 }
         )
      if (!colorId)
         return NextResponse.json(
            { message: "Color is required" },
            { status: 400 }
         )
      if (!sizeId)
         return NextResponse.json(
            { message: "Size is required" },
            { status: 400 }
         )
      if (!isArchived)
         return NextResponse.json(
            { message: "Archived is required" },
            { status: 400 }
         )
      if (!isFeatured)
         return NextResponse.json(
            { message: "Featured is required" },
            { status: 400 }
         )

      if (!storeid)
         return NextResponse.json(
            { message: "Store is required" },
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

      const createProduct = await prismadb.product.create({
         data: {
            name,
            price,
            sizeId,
            colorId,
            isArchived,
            isFeatured,
            categoryId,
            storeId: storeid,
            images: {
               createMany: {
                  data: [...images.map((image: { imageUrl: string }) => image)],
               },
            },
         },
      })

      return NextResponse.json(createProduct, { status: 200 })
   } catch (error) {
      console.error("ProductPost: error:", error)
      return new Response(
         JSON.stringify({ message: "Internal server error" }),
         { status: 500 }
      )
   }
}

export async function GET(
   req: Request,
   { params: { storeid } }: { params: { storeid: string } }
) {
   try {
      const { searchParams } = new URL(req.url)
      const categoryId = searchParams.get("categoryid") || undefined
      const colorId = searchParams.get("colorid") || undefined
      const sizeId = searchParams.get("sizeid") || undefined
      const isFeatured = searchParams.get("isFeatured")

      if (!storeid)
         return NextResponse.json(
            { message: "Store id is required" },
            { status: 400 }
         )
      const products = await prismadb.product.findMany({
         where: {
            storeId: storeid,
            categoryId,
            colorId,
            sizeId,
            isFeatured: isFeatured ? true : undefined,
            isArchived: false,
         },
         include: {
            images: true,
            category: true,
            color: true,
            size: true,
         },
         orderBy: {
            createdAt: "desc",
         },
      })

      return NextResponse.json(products, { status: 200 })
   } catch (error) {
      console.error("ProductGET: error:", error)
      return new Response(
         JSON.stringify({ message: "Internal server error" }),
         { status: 500 }
      )
   }
}
