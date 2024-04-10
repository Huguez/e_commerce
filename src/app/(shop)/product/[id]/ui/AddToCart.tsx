'use client'

import React, { useState } from 'react'
import { useCart } from '@/store';
import { QuantitySelector, SizeSelector } from '@/components'
import { CartProduct, Product, Size } from '@/interfaces'

interface propsI {
   product: Product;
}

export const AddToCart = ( { product  }: propsI ) => {

   const [size, setSize] = useState<Size | null>( null )
   const [ qty, setQty ] = useState<number>( 0 )
   const [ posted, setPosted ] = useState( false );

   const { cart, addProductToCart } = useCart()

   const MAX = 9;

   const addCart = () => {
      setPosted( true )
      if ( !qty || !size || ( qty > MAX ) ) {
         return;
      }

      const cartProduct :CartProduct = {
         id: product.id,
         slug: product.slug,
         title: product.title,
         price: product.price,
         qty,
         size,
         image: product.images[0],
      }

      addProductToCart( cartProduct )

      setPosted( false )
      setQty( 0 )
      setSize( null )
   }

   return (
      <>
         <SizeSelector posted={posted} onSizeChanged={setSize} selectSize={ size } avialableSizes={ product.sizes } />
         
         <QuantitySelector posted={posted} onQtyChange={setQty} selectQty={ qty } MAX={MAX} />

         <button onClick={addCart} className="btn-primary my-5">
            Agregar al carrito
         </button>
      </>
   )
}
