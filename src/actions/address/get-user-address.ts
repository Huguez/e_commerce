import prisma from "@/lib/prisma";

export const getUserAddress = async ( userId: string ) => {
   try {

      const resp = await prisma.userAddress.findUnique({
         where: {
            userId
         }
      })

      if ( !resp ) {
         return {
            ok : false,
            address: null
         }
      }

      const { countryId, ...data } = resp

      const country = await prisma.country.findUnique( {
         where: {
            id: countryId
         }
      } )

      const address = {
         country: country?.code,
         ...data
      }

      return {
         ok: true,
         address,
      }
   } catch (error) {
      console.log( error );
      return {
         ok: false,
         msg: "cannot get user address"
      }
   }
}