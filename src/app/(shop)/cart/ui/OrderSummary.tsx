'use client'

import React, { useLayoutEffect, useState } from 'react'
import Link from 'next/link';
import { BsExclamationCircle } from "react-icons/bs";
import { useCart } from '@/store';
import { CartProduct } from '@/interfaces';
import { currencyFormat } from '@/utils';

export const OrderSummary = () => {
   const { taxes, cart, counterProductsCart } = useCart()
   const [ loading, setLoading ] = useState<boolean>( true )

   const getTotal = ( flagTaxes: boolean = false ) => {
      const total = cart.reduce( ( total, item:CartProduct ) => ( item.price*item.qty ) + total , 0 )

      return flagTaxes ? total*( 1+taxes ) : total
   }
   
   useLayoutEffect( () => {
      setLoading( false )
   }, [] )
   
   return (
      <div className="bg-white rounded-xl shadow-xl p-7 sticky top-10 ">
         <h2 className="text-2xl font-bold mb-2"> Order Summary </h2>

         <div className="grid grid-cols-2">
            <span> # Products </span>
            {
               !loading ?
                  <span className="text-right"> { counterProductsCart() } items </span>
                  :
                  <span className='text-right rounded-lg md:bg-gray-200 bg-gray-50 animate-pulse'> &nbsp; </span>
            }
            
            <span className="mt-4">Items</span>
            <span className="mt-4 text-right">Price</span>
            {
               loading && cart.length === 0 && Array( 3 ).fill( null ).map( ( _: null, index: number ) => (
                  <React.Fragment key={`lofing-${ index }`}>
                     <p className='rounded-lg  md:bg-gray-200 bg-gray-50 animate-pulse'> &nbsp; </p>
                     <p className='rounded-lg  text-right  md:bg-gray-200 bg-gray-50 animate-pulse'> &nbsp; </p>
                  </React.Fragment>
               ) )
            }
            {
               !loading && cart.length > 0 && cart.map( ( item:CartProduct, index: number ) => (
                  <React.Fragment key={`${ item.title }-${ item.size }`}>
                     <span className="mt-1 text-gray-500 text-sm"> - { item.title } (x{ item.qty })</span>
                     <span className="mb-1 text-gray-500 text-sm text-right">{ currencyFormat( item.price*item.qty ) }</span>
                  </React.Fragment>
               ) )
            }

            <span className="my-4">Shipping</span>
            <span className="my-4 text-right">Free</span>
            
            <span> Subtotal </span>
            {
               !loading ? <span className="text-right">{ currencyFormat( getTotal( false ) ) } </span> :
                  <span className='text-right rounded-lg md:bg-gray-200 bg-gray-50 animate-pulse'> &nbsp; </span>
            }

            <span className="flex items-center"> sales Tax <BsExclamationCircle className="ml-1" size={15} /> </span>
            {
               !loading ? <span className="text-right">{ currencyFormat( taxes ) } </span> : 
               <span className='text-right rounded-lg md:bg-gray-200 bg-gray-50 animate-pulse'> &nbsp; </span>
            }
            
            
            <span className="mt-5 text-2xl"> Total: </span>
            {
               !loading ? <span className="mt-5 text-2xl text-right">{ currencyFormat( getTotal( true ) ) } </span> : 
                  <span className='text-right rounded-lg md:bg-gray-200 bg-gray-50 animate-pulse'> &nbsp; </span>
            }
            
            
         </div>
         <div className="mt-5 mb-2 w-full">
            <Link 
               className={`flex ${ cart.length === 0 ? "btn-disabled": "btn-primary" } justify-center`}
               href={"/checkout/address"}
            > 
               Checkout
            </Link>
         </div>
      </div>
   )
}
