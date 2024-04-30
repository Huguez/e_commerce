import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
   cart: CartProduct[];
   taxes: number;
   addProductToCart: ( p: CartProduct ) => void;
   updateCart: ( p: CartProduct, amount: number ) => void;
   counterProductsCart: () => number;
   clearCart : () => void;
}

export const useCart = create<State>()( 
   persist( ( set, get ) => ({
      cart: [],
      taxes: 0.15,
      addProductToCart: ( p: CartProduct ) => {
         const { cart } = get()
         
         const exist = cart.some( item => item.id === p.id && p.size === item.size )

         if( !exist ){
            cart.push( p )
            set( { cart: [ ...cart ] } )
            return 
         }

         const updateCart = cart.map( product => {
            if ( product.id === p.id ) {
               product.qty = product.qty + p.qty
            }
            return product
         } )

         set({ cart: updateCart })
      },
      updateCart: ( p: CartProduct, amount: number ) => {
         const { cart } = get()
         const exist = cart.some( item => item.id === p.id && p.size === item.size )

         if ( !exist ) {
            return;
         }

         if ( amount === 0 ) {
            const indexCart = cart.findIndex( item => item.id === p.id && item.size === p.size )
            const updateCart =  cart.filter( ( _, index: number ) => index !== indexCart )
            // console.log( cart );
            // console.log( updateCart );
            set({ cart: updateCart })
            return;
         }

         const updateCart = cart.map( product => {
            if ( product.id === p.id && product.size === p.size ) {
               product.qty = amount
            }
            return product
         } )

         set({ cart: updateCart })
      },
      counterProductsCart: () => {
         const { cart } = get()
         
         const counter = cart.reduce( ( total, item ) =>  total + item.qty  , 0 );

         return counter
      },
      clearCart: () => {
        set( { cart: [] } ) 
      },
   }) ,{
      name: "shopping-cart"
   } )
)