'use server'

import { auth } from "@/auth.config";
import type { AddressI, Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { number } from "zod";

interface ProductToOrder {
   productId: string;
   quantity: number;
   size: Size;
}

interface placeOrderReturn {
   ok: boolean;
   msg?: string;
   orders?: any;
   subtotal?: number;
   tax?: number;
   total?: number;
   itemsInOrder?: number;
}

export const placeOrder = async ( productsCart: ProductToOrder[], address: AddressI ): Promise<placeOrderReturn> => {
   try {
      const session  = await auth()
      
      if ( !session ) {
         return {
            ok: false,
            msg: "Error - without user's session"
         }
      }
      
      // const userId = session.user.id
      
      const products = await prisma.product.findMany( {
         where:{
            id: {
               in: productsCart.map( p => p.productId )
            },
         }
      } )
      
      const itemsInOrder = productsCart.reduce( ( count, item ) => count + item.quantity, 0 )
      
      const { subtotal, tax, total } = productsCart.reduce( ( amounts, item ) => { 

         const productQty = item.quantity
         const product = products.find( p => p.id === item.productId )

         if ( !product ) {
            throw new Error(` Error ${ item.productId } don't exist - 500`)
         }

         const subTotal = productQty * product.price

         amounts.subtotal += subTotal
         amounts.tax += subTotal * 0.15
         amounts.total += subTotal * 1.15

         return amounts
      } , { subtotal: 0, tax: 0, total: 0 } )

      


      return {
         ok: true,
         orders: products,
         subtotal, 
         tax, 
         total,
         itemsInOrder,
      }
   } catch (error) {
      console.log( error );
      return {
         ok: false,
         msg: "Error - createOrder"
      }
   }
}