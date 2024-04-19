'use client'

import { useLayoutEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { Loading } from "@/components";
import { useAddress, useCart } from "@/store";
import { currencyFormat, } from "@/utils";
import clsx from "clsx";
import { placeOrder } from "@/actions";

export const PlaceOrder = () => {
   const [ loading, setLoading ] = useState( true )
   const [ isPlacingOrder, setIsPlacingOrder ] = useState<boolean>(false)

   const { cart, taxes, counterProductsCart } = useCart( state => state )
   const { setAddress:_, ...address }:any = useAddress( state => state )

   useLayoutEffect( () => {
      setLoading( false )
   }, [] )

   const onPlaceOrder = async () => {
      setIsPlacingOrder( true )
      
      const productToOrder = cart.map( ( { id, size, qty } ) => ({
         productId: id,
         size,
         quantity: qty,
      }) )
      
      const resp = await placeOrder( productToOrder, address )
      
      console.log( resp );

      setIsPlacingOrder( false )
   }

   if ( loading ) {
      return <div className="bg-white rounded-xl shadow-xl p-7 sticky top-10 ">
         <h3 className="text-2xl mb-2 font-bold"> Address </h3>
         <Loading width={20} height={20}  />
      </div>
   }

   const total = ( flagTaxes: boolean = false ) => {
      let acum = 0;

      cart.forEach( ( item ) => {
         console.log(  );
         acum += item.qty * item.price
      } )
      
      return !flagTaxes ? acum : acum * (1+taxes) ;
   }

   return (
      <div className="bg-white rounded-xl shadow-xl p-7 sticky top-10 ">
         <h3 className="text-2xl mb-2 font-bold"> Address </h3>

         <div className="">
            <p className="text-xl"> { address.name } { address.lastname } </p>
            <p className=""> { address.address }  </p>
            { address.addressOptional ? <p className=""> { address.addressOptional } </p> : null } 
            <p className=""> { address.city } - { address.country } </p>
            <p className=""> { address.codeZip } </p>
            <p className=""> { address.phone } </p>
         </div>
         
         <div className="w-full  h-0.5 rounded-sm bg-gray-200 my-5" />

         <h3 className="text-2xl font-bold mb-2"> Order Summary </h3>

         <div className="grid grid-cols-2">
            <span> # Products </span>
            <span className="text-right"> { counterProductsCart() } items </span>
            
            <span className="my-6">Shipping</span>
            <span className="my-6 text-right">Free</span>

            <span> Subtotal </span>
            <span className="text-right">{ currencyFormat( total() ) }</span>
            

            <span className="flex items-center"> sales Tax <BsExclamationCircle className="ml-1" size={15} /> </span>
            <span className="text-right">{ currencyFormat( taxes ) }</span>
            
            <span className="mt-5 text-2xl"> Total: </span>
            <span className="mt-5 text-2xl text-right">{ currencyFormat( total( true ) )  } </span>
            
         </div>

         <div className="mt-5 mb-2 w-full">

            <div className="flex items-center mb-5">
               <input type="checkbox"   />
               <p className="ml-1   text-xs">
                  Accept <span className="underline"> terms and conditions </span> y <span className="underline"> privacy policy </span>
               </p>
            </div>

            {/* <p className="text-red-500"> Error </p> */}
            <button
               onClick={ onPlaceOrder }
               className={`${
                  clsx( {
                     'btn-primary': !isPlacingOrder,
                     'btn-disabled py-10': isPlacingOrder
                  } )
               } flex justify-center w-full outline-none`}
            >
               { isPlacingOrder ? <Loading width={ 5 } height={ 5 } backgroundColor="white" /> : 'Order' }
            </button>
         </div>
      </div>
   );
}