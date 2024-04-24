'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import type { OnApproveActions, OnApproveData, CreateOrderData, CreateOrderActions } from "@paypal/paypal-js"
import { paypalCheckPayment, setTransactionId } from "@/actions";
import { revalidatePath } from "next/cache";

interface PropsI {
   orderId: string;
   amount: number;
}


export const PayPalButton = ( { amount, orderId }: PropsI ) => {

   const [{ isPending }] = usePayPalScriptReducer()

   const amountRunded = `${ ( Math.round( amount*100 ) ) / 100 }` 

   const creatOrder = async ( data: CreateOrderData, actions: CreateOrderActions ): Promise<string> =>  {

      const trasactionId = await actions.order.create( {
         intent: 'CAPTURE',
         purchase_units: [
            {
               invoice_id: orderId,
               amount: {
                  value: amountRunded,
                  currency_code: 'USD'
               }
            }
         ]
      } );

      const { ok } = await setTransactionId( trasactionId, orderId )

      if( !ok ){
         throw new Error( "Don't update order in creatOrder" )
      }


      return trasactionId
   }

   const onApprove  = async ( data: OnApproveData, actions: OnApproveActions): Promise<void> => {

      const details = await actions.order?.capture()
      
      if ( !details ) {
         return
      }

      await paypalCheckPayment( details.id )
      
   }

   if ( isPending ) {
      return (
         <div className="animate-pulse" > 
            <div className="h-11 bg-gray-300 rounded" />
            <div className="h-11 bg-gray-300 rounded mt-4" />
         </div>
      )
   }
   
   return (
      <PayPalButtons
         createOrder={ creatOrder }
         onApprove={ onApprove }
      />
   )
}