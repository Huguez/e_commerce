'use server'

import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getProductBySlug = async ( slug: string ) : Promise<Product | null> => {
   try {
      const product = await prisma.product.findFirst( {
         where: {
            slug
         },
         include: {
            images: {
               select: {
                  url: true,
                  id: true
               }
            }
         }
      } )

      if ( !product ) {
         return null;
      }

      return {
         ...product,
         images: product.images.map( img => ({url: img.url, id: img.id  }) )
      }

   } catch (error) {
      console.log( error );
      return null
   }
}