"use client"

import { useEffect, useState, useTransition } from "react";
import { getStockBySlug } from "@/actions";
import { monse } from "@/config/fonts"

interface propsI {
   slug: string;
}

export const StockLabel = ( { slug }:propsI ) => {
   const [ isLoading, startTransition ] = useTransition()
   const [ stock, setStock ] = useState<number>( 0 )

   useEffect( () => {
      startTransition( async () => {
         const aux = await getStockBySlug( slug )
         setStock( aux )      
      } )
   }, [] )

   return (
      <>
         { !isLoading && !!stock ?
            <h3 className={`${ monse.className } antialiased font-bold text-sm my-1`}> 
               in Stock:  { stock }
            </h3> 
            : 
            <h3 className={`${ monse.className } my-1 rounded-lg md:bg-gray-200 bg-gray-50 animate-pulse`}> 
               &nbsp;
            </h3> 
         }
      </>
   )
}
