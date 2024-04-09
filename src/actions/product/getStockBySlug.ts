'use server'

import prisma from "@/lib/prisma";

export const getStockBySlug = async ( slug: string ):Promise<number> => {
   try {
      const product = await prisma.product.findFirst( {
         where: {
            slug
         }
      } )

      const stock = product?.inStock ?? 0
   
      return stock
   } catch (error) {
      console.log( error );
      return 0;
   }
}