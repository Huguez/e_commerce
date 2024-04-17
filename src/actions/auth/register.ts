'use server'

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs"

export const signUpUser = async ( name: string, email: string, password: string ) => {
   try {
      const user = await prisma.user.create( {
         data: {
            name,
            email: email.toLowerCase(),
            password: await bcryptjs.hashSync( password )
         }, 
         select: {
            id: true,
            name: true,
            email: true,
         }
      } )

      return {
         ok: true,
         user,
         msg: 'user created'
      }
   } catch ( error ) {
      console.log( error );
      return {
         ok: false,
         msg: "Error user register"
      }
   }
}