'use client'

import { SessionProvider } from "next-auth/react"
import React from "react"

interface propsP {
   children: React.ReactNode
}

export const Provider = ( { children }: propsP ) => {
   
   return (
      <SessionProvider> 
         { children }
      </SessionProvider>
   )
}
