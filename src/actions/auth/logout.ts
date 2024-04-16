'use server'

import { signOut } from "@/auth.config"

export const logout = async () => {
   try {
      await signOut( { redirect: false } )

   } catch( error ){
      console.log( error )
   }
}