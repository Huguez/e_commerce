'use server'

import { AddressI } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddres = async ( addres: AddressI, userId: string ) => {
   try {

      const resp = await createOrReplaceAddress( addres, userId )

      return {
         ok: true,
         addres: resp
      }

   } catch ( error ) {
      console.log( error );
      return {
         ok: false,
         msg: "the user addres don't save"
      }
   }
}

const createOrReplaceAddress = async ( address: AddressI, userId: string ) => {
   try {

      const storeAddress = await prisma.userAddress.findUnique( {
         where: {
            userId
         }
      } )
      
      const countryAux = await prisma.country.findFirst({
         where: {
            code: address.country 
         }
      })


      const addressToSave = {
         userId,
         address: address.address,
         addressOptional: address.addressOptional,
         countryId: countryAux? countryAux.id : "",
         city: address.city,
         name: address.name,
         lastname: address.lastname,
         phone: address.phone,
         codeZip: address.codeZip,
      }

      if ( !storeAddress ) {
         const newAddress = await prisma.userAddress.create( { 
            data: addressToSave
         } );

         return newAddress
      }

      const updateAddress = await prisma.userAddress.update( {
         where: { userId },
         data: addressToSave,
      } )
      
      return updateAddress

   } catch (error) {
      console.log( error );
      throw new Error("Error in createOrReplaceAddress")
   }
}