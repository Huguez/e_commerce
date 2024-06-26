'use server'

import { auth } from "@/auth.config";
import { Role, UserI } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


interface updateUserRoleReturn {
   ok: boolean;
   msg?: string;
   userUpdate?: UserI;
}

export const updateUserRole = async ( userId: string, newRole: Role ): Promise<updateUserRoleReturn> => {
   try {
      const session  = await auth()

      if( session && session.user.role !== 'admin' ){
         return {
            ok: false,
            msg: "the user isn't a admin or not log-in"
         }
      }

      const userUpdate = await prisma.user.update( {
         where: { id: userId },
         data: {
            role: newRole
         }
      } )

      if ( !userUpdate ) {
         return {
            ok: false,
            msg: `user with id ${ userId } not exist`,
         }
      }

      revalidatePath( "/admin/users" )

      return {
         ok: true,
         userUpdate: userUpdate as UserI,
      }
   } catch (error) {
      console.log( error );
      return {
         ok: false,
         msg: "Error - updateUserRole"
      }
   }
}