import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs"
import { z } from "zod"
import prisma from "./lib/prisma";

export const authConfig: NextAuthConfig = {
   pages: {
      signIn: "/auth/login",
      newUser: "/auth/register",
   },
   callbacks: {
      jwt: async ( { token, user, } ) => {
         if ( user ) {
            token.data = user
         }
         
         return token
      },
      session: async ( { session, token, user } ) =>{
         // console.log( { session, token, user } );
         session.user = token.data as any
         return session
      },
      // authorized: async ( { auth, request: { nextUrl } } ) => {
      //    // console.log( auth );
      //    // console.log( nextUrl );
      //    // const isLogged = !!auth?.user

      //    // const isOnDashboard = nextUrl.pathname.startsWith( '/' )

      //    // if ( isOnDashboard ) {
      //    //    if ( isLogged ) return true
      //    //    return false
      //    // }else if ( isLogged ) {
      //    //    return Response.redirect( new URL( '/', nextUrl ) )
      //    // }

      //    return true
      // }
   },
   providers: [
      Credentials( {
         async authorize( credentials ) {

            const parsedCredentials: any = z.object( {
               email:    z.string().email(),
               password: z.string().min( 5 )
            } ).safeParse( credentials )

            if ( !parsedCredentials.success ) return null;

            const { email, password } = parsedCredentials.data

            const user = await prisma.user.findUnique( {
               where: {
                  email
               }
            } )

            if ( !user ) {
               return null
            }

            const same = await bcryptjs.compareSync( password, user.password )

            if ( !same ) {
               return null
            }

            const { password: _, ...rest } = user

            return rest
         },
      } ),
   ]
}

export const { auth, signIn, signOut, handlers } = NextAuth( authConfig )