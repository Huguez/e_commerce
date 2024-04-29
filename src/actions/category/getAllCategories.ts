'use server'

import { CategoryI } from "@/interfaces";
import prisma from "@/lib/prisma";


interface getAllCategories {
   ok:          boolean;
   msg?:        string;
   categories?: CategoryI[]; 
}


export const getAllCategories = async (): Promise<any> => {
   try {
      const categories = await prisma.category.findMany({
         orderBy:{
            name: "asc"
         }
      })

      return {
         ok: true,
         categories
      }

   } catch (error) {
      console.log( error );
      return {
         ok: false,
         msg: "Error - getAllCategories"
      }
   }
}