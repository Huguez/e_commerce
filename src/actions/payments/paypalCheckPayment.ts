'use server'

import { OrderI, PaypalOrderResponcesI, PaypalTokenResponseI, PurchaseUnit } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface paypalCheckPaymentReturn {
   ok: boolean;
   message?: string;
}

const oauthURL =  `${ process.env.PAYPAL_OAUTH_URL ?? "" }` 
const orderURL = `${ process.env.PAYPAL_ORDERS_URL ?? "" }`

const clientId =  `${ process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "" }`
const secretKey = `${ process.env.NEXT_PUBLIC_PAYPAL_SECRET_KEY ?? "" }`


export const paypalCheckPayment = async ( transactionId: string | undefined ): Promise<paypalCheckPaymentReturn> => {
   try {
      if ( !transactionId ) {
         return {
            ok: false,
         }
      }

      const token: string | null = await getPaypalBasicToken();
      
      if ( !token ) {
         throw new Error("Error - there isn't token")
      }

      const order:PaypalOrderResponcesI | null = await verifyPaypalment( transactionId, token )
      
      if( !order ){
         throw new Error("there isn't Order");
      }
      
      const { status, purchase_units } = order
      
      if ( status !== 'COMPLETED' ) {
         return {
            ok: false,
            message: "Order not paid yet",
         }
      }

      const { invoice_id } = purchase_units[0]


      if ( status === 'COMPLETED' ) {
         
         const order = await prisma.order.update( { 
            where: { id: invoice_id, },
            data: { 
               isPaid: true,
               paidAt: new Date()
            }
         } )

         revalidatePath( `/orders/${ order.id }` )

         return { 
            ok: true,
         }
      }

      return { 
         ok: false,
      }
   } catch (error) {
      console.log( error );
      return { 
         ok: false,
      }
   }
}


const verifyPaypalment = async ( transactionId: string, token: string ): Promise< PaypalOrderResponcesI | null>  => {
   try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${ token }`);

      const requestOptions: RequestInit = {
         method: "GET",
         headers: myHeaders,
         cache: 'no-store'
      };

      const order: PaypalOrderResponcesI | null  = await fetch(`${orderURL}/${ transactionId }`, requestOptions ).then( resp => resp.json() ).catch( error => error )
      
      return order

   } catch (error) {
      console.log( error );
      throw new Error("Error - verifyPaypalment") 
   }
}

const getPaypalBasicToken = async () : Promise<string | null> => {
   try {
      const myHeaders = new Headers();
      const base64Token = btoa( `${ clientId }:${ secretKey }` ) //Buffer.from( `${ clientId }:${ secretKey }`, 'utf-8' ).toString( 'base64' )

      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", `Basic ${ base64Token }`);

      const urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "client_credentials");

      const requestOptions: RequestInit = {
         method: "POST",
         headers: myHeaders,
         body: urlencoded,
         cache: 'no-store'
      };

      const resp: PaypalTokenResponseI = await fetch( oauthURL, requestOptions  ).then( resp => resp.json() ).catch( error => error )

      return resp.access_token

   } catch ( error ) {
      console.log( error );
      throw new Error("Error - getPaypalBasicToken") 
   }
}