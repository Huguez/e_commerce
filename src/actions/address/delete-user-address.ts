'use server'

import prisma from "@/lib/prisma";

export const deleteUserAddress = async ( userId: string ) => {
   try {

      const hay = await prisma.userAddress.count({ where: { userId } })
      
      if ( hay === 0 ) {
         return {
            ok: true,
         }   
      }

      const resp = await prisma.userAddress.delete({
         where: {
            userId
         }
      })

      return {
         ok: true,
         msg: `Address ${ userId } Delete`,
         resp
      }

   } catch (error) {
      console.log( error );
      return {
         ok: false,
         msg: "Error - deleteUserAddress"
      }
   }
}