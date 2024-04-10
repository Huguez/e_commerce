import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
   cart: CartProduct[];
   addProductToCart: ( p: CartProduct ) => void;
   counterProductsCart: ()=>number;
}

const useCartFunc = create<State>()

export const useCart = useCartFunc( 
   persist( ( set, get ) => ({
      cart: [],
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
      counterProductsCart: () => {
         const { cart } = get()
         
         const counter = cart.reduce( ( total, item ) =>  total + item.qty  , 0 );

         return counter
      }
   }) ,{
      name: "shopping-cart"
   } )
)

