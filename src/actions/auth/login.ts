'use server'

import { signIn } from "@/auth.config"

export async function authenticate( prevSate: string | undefined, formData: FormData ){
   try {
      
      await signIn( "credentials", {
         redirect: false,
         ...Object.fromEntries( formData ),
      } );

      return 'success'

   } catch ( error ) {
      if ( ( error as Error ).message.includes( "credentialsSignin" ) ) {
         return 'credentialsSignin'
      }

      return 'unknow Error'
   }
}