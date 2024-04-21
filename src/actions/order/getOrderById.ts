'use server'

import { auth } from "@/auth.config";
import { OrderAddressI, OrderI, countryI } from "@/interfaces";
import prisma from "@/lib/prisma";

type MergeOrderT = OrderI & { OrderAddress: OrderAddressI & { country: countryI; }  } | null

interface getOrderByIdReturn {
   msg?: string;   
   order?: MergeOrderT;
   productsInOrder?: any
}

export const getOrderById = async ( orderId: string ): Promise<getOrderByIdReturn> => {
   try {
      const order: any = await prisma.order.findUnique( {
         where: {
            id: orderId
         },
         include: {
            OrderAddress: {
               include: {
                  country: true,
               }
            },
            OrderItems: {
               include: {
                  product: {
                     include: {
                        images: true
                     }
                  }
               }
            }
         }
      } )

      if ( !order ) {
         throw new Error("Error - order don't found")
      }

      const session = await auth()
      
      if ( session?.user.id !== order.userId ) {
         throw new Error(`Error - order: ${ order.id } doesn't belong to user: ${ session?.user.id }` )
      }

      const productsInOrder = order.OrderItems.map( ( item: any ) => ({
         id: item.product.id,
         quantity: item.quantity,
         price: item.price,
         size: item.size,
         title: item.product.title,
         image: item.product.images[0].url,
         slug: item.product.slug,
      }) )

      return {
         order,
         productsInOrder,
      }
   } catch (error) {
      console.log( error );
      return { 
         msg: "Error - getOrderById"
      }
   }
}