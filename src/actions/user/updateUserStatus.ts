'use server'

import { auth } from "@/auth.config";
import { Status, UserI } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


interface updateUserStatusReturn {
   ok: boolean;
   userUpdate?: UserI;
   msg?: string;
}

export const updateUserStatus = async ( userId:string, status: Status ):Promise<updateUserStatusReturn> => {
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
            status: status
         }
      } )

      revalidatePath("/admin/users/")

      return {
         ok: true,
         userUpdate: userUpdate as UserI,
      }

   } catch (error) {
      console.log( error );
      return {
         ok: false,
         msg: "Error - updateUserStatus"
      }
   }
}