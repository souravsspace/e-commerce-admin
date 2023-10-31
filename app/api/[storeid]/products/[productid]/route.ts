import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(
   _request: Request,
   { params: { productid } }: { params: { productid: string } }
) {
   try {
      if (!productid)
         return NextResponse.json("Product is required!", { status: 400 })

      const product = await prismadb.product.findUnique({
         where: {
            id: productid,
         },
         include: {
            category: true,
            color: true,
            size: true,
            images: true,
         },
      })

      return NextResponse.json(product, { status: 200 })
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
      params: { storeid, productid },
   }: { params: { storeid: string; productid: string } }
) {
   try {
      const body = await request.json()
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
      const { userId } = auth()

      if (!userId) {
         return NextResponse.json("Unauthorized", {
            status: 401,
         })
      }

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

      if (!productid)
         return NextResponse.json("Product is required!", { status: 400 })

      if (!storeid) return NextResponse.json("No store found!", { status: 400 })

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json("Unauthorized!", { status: 403 })

      await prismadb.product.update({
         where: {
            id: productid,
         },
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
               deleteMany: {},
            },
         },
      })

      const products = await prismadb.product.update({
         where: {
            id: productid,
         },
         data: {
            images: {
               createMany: {
                  data: [...images.map((image: { imageUrl: string }) => image)],
               },
            },
         },
      })

      return NextResponse.json(products, { status: 200 })
   } catch (error) {
      console.error("products: PATCH: error:", error)
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      )
   }
}

export async function DELETE(
   _request: Request,
   {
      params: { storeid, productid },
   }: { params: { storeid: string; productid: string } }
) {
   try {
      const { userId } = auth()

      if (!userId) {
         return new NextResponse("Unauthorized", {
            status: 401,
         })
      }

      if (!productid)
         return NextResponse.json("Product is required!", { status: 400 })

      if (!storeid) return NextResponse.json("No store found!", { status: 400 })

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: storeid,
            userId,
         },
      })

      if (!storeByUserId)
         return NextResponse.json("Unauthorized!", { status: 403 })

      const product = await prismadb.product.deleteMany({
         where: {
            id: productid,
         },
      })

      return NextResponse.json(product, { status: 200 })
   } catch (error) {
      console.log("DELETE Error: ", error)
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
         status: 500,
      })
   }
}
