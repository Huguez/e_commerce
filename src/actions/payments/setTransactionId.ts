'use server'

import prisma from "@/lib/prisma";

export const setTransactionId = async ( transactionId: string, orderId: string ) => {
   try {
      const order = await prisma.order.update( { 
         where: { id: orderId },
         data: { transactionId }
      } )

      if ( !order ) {
         return {
            ok: false,
            msg: `order with id: ${ orderId } don't found`
         }
      }

      return {
         ok: true,
         order,
      }

   } catch (error) {
      console.log( error );
      return {
         ok: false,
         msg: "Error - setTransactionId"
      }
   }
}