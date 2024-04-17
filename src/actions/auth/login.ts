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
      if ( ( error as any ).type === "CredentialsSignin" ) {
         return 'CredentialsSignin'
      }
      
      return 'unknow Error'
   }
}

export async function login( email:string, password:string ) {
   try {
      const resp = await signIn( 'credentials', { email, password } )
      
      // console.log( resp );
      
   } catch ( error ) {
      console.log( error );
      return {
         ok: false,
         msg: 'cannot log-in'
      }
   }
}