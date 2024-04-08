'use server'

import { ValidGender } from "@/interfaces";
import prisma from "@/lib/prisma"


interface propsI{
	page?:number;
	take?:number
   gender?: ValidGender;
}


export const getPaginationProducts = async ( { page=1, take = 12, gender }: propsI ) => {
   try {

      if ( isNaN( Number( page ) )  || page < 1 ) page = 1;
      if ( isNaN( Number( take ) )  || take < 1 ) take = 12;
      

      let where: any;
      if ( !gender ) {
         where = {}
      }else{
         if ( gender === 'women' || gender === 'men' ) {
            where = {
               OR: [
                  {
                     gender
                  },
                  {
                     gender: 'unisex'
                  }
               ], 
            }
         }else{
            where = {
               gender
            }
         }
      }

      const products = await prisma.product.findMany({
         where,
         take,
         skip: ( page - 1 ) * take,
         include: {
            images: {
               take: 2,
               select: {
                  url: true
               }
            }
         }
      } );

      const totalCount = await prisma.product.count( { where } )

      return {
         currentPage: page,
         totalPages: Math.ceil( totalCount / take ),
         products: products.map( product => ({
            ...product,
            images: product.images.map( img => img.url )
         }) )
      };


   } catch (error) {
      console.log( error );
      throw new Error("getPaginationProducts")
   }
}