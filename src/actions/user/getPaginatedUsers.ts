'use server'

import { UserI } from "@/interfaces";
import prisma from "@/lib/prisma";

interface getPaginatedUsersReturn{
   ok: boolean;
   users?: UserI[];
   usersCount: number;
   msg?: string;
}

interface propsI { 
   take:    number;
   page:    number;
   search?: string;
}

export const getPaginatedUsers = async ( { take, page }: propsI ) : Promise<getPaginatedUsersReturn> => {
   try {
      if ( isNaN( Number( page ) )  || page < 1 ) page = 1;
      if ( isNaN( Number( take ) )  || take < 1 ) take = 12;
      
      const users = await prisma.user.findMany( {
         skip: ( page - 1 ) * take,
         take,
         orderBy:{
            name: 'desc'
         },
         include: {
            orders: true,
         }
      } )

      const usersCount = await prisma.user.count( {} )

      return  {
         ok: false,
         users: users as UserI[],
         usersCount: Math.ceil( usersCount / take ),
      }
   } catch ( error ) {
      console.log( error );
      
      return {
         ok: false,
         usersCount: 0,
         msg: "Error - getPaginatedUsers"
      }
   }
}