'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { SessionProvider } from "next-auth/react"


interface propsP {
   children: React.ReactNode
}

export const Providers = ( { children }: propsP ) => {

   const clientId = `${ process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }`
   
   const options = { clientId, intent: 'capture', currency: "USD" }
   
   return (
      <SessionProvider> 
         <PayPalScriptProvider options={ options }>
            { children }
         </PayPalScriptProvider>
      </SessionProvider>
   )
}
