import prismadb from "@/lib/prisma"
import ColorForm from "./components/color-form"

type ColorPageProps = {
   params: {
      colorid: string
   }
}

export default async function ColorPage({
   params: { colorid },
}: ColorPageProps) {
   const color = await prismadb.color.findUnique({
      where: {
         id: colorid,
      },
   })

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 p-8">
            <ColorForm initialData={color} />
         </div>
      </div>
   )
}
