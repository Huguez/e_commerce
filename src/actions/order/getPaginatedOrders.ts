'use server'

import { auth } from "@/auth.config";
import { OrderI } from "@/interfaces";
import prisma from "@/lib/prisma";

interface getPaginatedOrdersReturn {
   ok: boolean;
   totalPages: number;
   orderlist?: OrderI [];
   msg?: string;
}

interface PropsI {
   page: number;
   take: number;
   search?: string;
}

export const getPaginatedOrders = async ( { page, take, search }: PropsI ) : Promise<getPaginatedOrdersReturn> => {
   try {
      
      const session = await auth()

      if ( session?.user.role !== 'admin' ) {
         throw new Error(`user ${session?.user.name} isn't ADMIN`)
      }

      if ( isNaN( Number( page ) ) || page < 1 ) page = 1;
      if ( isNaN( Number( take ) ) || take < 1 ) take = 6;

      let where = {}
      // if ( search !== "" ) {
      //    where = {
      //       name: {
      //          equals: search,
      //          mode: 'insensitive'
      //       },
      //       email:{
      //          not: {
      //             in: []
      //          }
      //       }

      //    }
      // }


      const orderlist = await prisma.order.findMany( {
         take,
         skip: ( page - 1 ) * take,
         // where,
         orderBy: {
            createdAt: 'desc',
         },
         include: {
            user: {
               select: {
                  email: true,
                  name: true,
               }
            }
         }
      } )

      const totalPages = await prisma.order.count( { where: {} } )

      return {
         ok: true,
         totalPages: Math.ceil( totalPages / take ),
         orderlist
      }
   } catch (error) {
      console.log( error );
      return {
         ok: false,
         msg: "Error - getPaginatedOrders",
         totalPages: 0
      }
   }
}