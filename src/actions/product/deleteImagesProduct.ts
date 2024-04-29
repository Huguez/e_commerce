'use server'
import * as cloud from "@/lib/cloudinary"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export const deleteImagesProduct = async ( imageId: number, imageUrl: string ) => {
   try {
      if ( !imageUrl.startsWith( 'http' ) ) {
         return {
            ok: false
         }
      }

      const aux = imageUrl.split("/").pop()?.split(".")
      const imgName = aux![0]
      const imgExt = aux![1]

      await cloud.destroy( imgName )

      const deleteImage = await prisma.productImage.delete( {
         where: {
            id: imageId
         },
         select:{
            product: {
               select:{
                  slug: true,
               }
            }
         }
      } )
      
      revalidatePath( `/admin/product/${ deleteImage.product.slug }` )
      revalidatePath( `/product/${ deleteImage.product.slug }` )
      revalidatePath( `/admin/products/` )

      return {
         ok: true,
      }

   } catch ( error ) {
      console.log( error );
      return {
         ok: false,
      }
   }
}