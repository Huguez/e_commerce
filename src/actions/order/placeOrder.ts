'use server'

import { auth } from "@/auth.config";
import type { AddressI, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
   productId: string;
   quantity: number;
   size: Size;
}

interface placeOrderReturn {
   ok: boolean;
   msg?: string;
   order?: any;
   orderAddress?: any;
   updateProducts?: any;
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
      
      const userId = session.user.id
      
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

      
      try {
         const prismaTx = await prisma.$transaction( async ( tx ) => {
         
            const updateProductsPromises = products.map( ( product ) => {
               const productQty = productsCart.filter( p => p.productId === product.id )
                  .reduce( ( acc, item ) => acc+item.quantity , 0 )
   
               if ( productQty === 0 ) {
                  throw new Error( `${ product.id }, doesn't has quantity ` )
               }
   
               return tx.product.update( {
                  where: {
                     id: product.id
                  },
                  data: {
                     inStock: {
                        decrement: productQty
                     }
                  }
               } )
            } )
   
            const updateProducts = await Promise.all( updateProductsPromises )
   
            updateProducts.forEach( ( up ) => {
               if ( up.inStock < 0 ) {
                  throw new Error(` ${ up.title } - sold out`)
               }
            } )
   
            const order = await tx.order.create( {
               data: {
                  userId: userId,
                  subtotal: subtotal,
                  total: total,
                  tax: tax,
                  itemsInOrder: itemsInOrder,
                  isPaid: false,
                  OrderItems: { 
                     createMany: {
                        data: productsCart.map( p => ( { 
                           productId: p.productId,
                           quantity: p.quantity, 
                           size: p.size,
                           price: products.find( prod => prod.id === p.productId )?.price ?? 0
                        } ) )
                     }
                  }
               }
            } )
            
            const { country:countryCode, ...restAddress } = address
            const respCountry = await tx.country.findFirst({
               where: {
                  code: countryCode,
               }
            } )

            if( !respCountry ){
               throw new Error("Error - Dont exist country for order")
            }

            
            const orderAddress = await tx.orderAddress.create( {
               data: {
                  name: restAddress.name,
                  lastname: restAddress.lastname,
                  address: restAddress.address,
                  addressOptional: restAddress.addressOptional,
                  codeZip: restAddress.codeZip,
                  city: restAddress.city,
                  phone: restAddress.phone,
                  countryId: respCountry.id,
                  orderId: order.id
               }
            } )
   
            return {
               order,
               orderAddress,
               updateProducts
            }
   
         } );
   
         return {
            ok: true,
            ...prismaTx,
         }
      } catch ( error ) {
         console.log( ( error as Error ).message  );
         return {
            ok: false,
            msg: "Error prisma transaction "
         }
      }
   } catch (error) {
      console.log( ( error as Error ).message  );
      return {
         ok: false,
         msg: "Error - createOrder"
      }
   }
}