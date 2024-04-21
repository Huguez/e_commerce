'use server'

import { auth } from "@/auth.config";
import { OrderI } from "@/interfaces";
import prisma from "@/lib/prisma";

interface getOrderListReturn {
   totalPages: number;
   orderlist?: OrderI [];
   msg?: string;
}

export const getOrderList = async ( page: number = 1, take: number = 12 ): Promise<getOrderListReturn> => {
   try {

      if ( isNaN( Number( page ) ) || page < 1 ) page = 1;
      if ( isNaN( Number( take ) ) || take < 1 ) take = 6;
      
      const session = await auth()

      const userId = session?.user.id

      if ( !userId ) {
         throw new Error("Error - user unauthenticated")
      }
      
      const orderlist = await prisma.order.findMany({
         take,
         skip: ( page - 1 ) * take,
         where: {
            userId,
         },
         include: {
            user: {
               select: {
                  email: true,
                  name: true,
               }
            }
         }
      })

      const totalPages = await prisma.order.count( { where: {
         userId
      } } )

      return { 
         totalPages: Math.ceil( totalPages / take ),
         orderlist 
      }
   } catch ( error ) {
      console.log( error );
      return {
         msg: "Error - getOrderList",
         totalPages: 0
      }
   }
}