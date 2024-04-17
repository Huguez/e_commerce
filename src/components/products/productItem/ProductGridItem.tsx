"use client"
import { Product } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const ProductGridItem = ( { description, images, inStock, price, sizes, slug, tags, title, gender }:Product ) => {
   
   const [ displayImage, setDisplayImage ] = useState<string>( images[0] )

   return (
      <div className='overflow-hidden fade-in hover:text-blue-500 shadow-md rounded-lg' >

         <Link href={`/product/${ slug }`}>
            <Image
               src={ "/products/"+displayImage }
               alt={ description }
               className='w-full object-cover '
               width={500}
               height={500}
               priority={true}
               onMouseOver={ () => setDisplayImage( images[1] ) } 
               onMouseLeave={ () => setDisplayImage( images[0] ) }
            />
         </Link>

         <div className="flex flex-col p-4 ">
            <Link href={`/product/${ slug }`} className=''>
               { title }
            </Link>
            <span className='font-bold text-black'>${ price }</span>
         </div>
         
      </div>
   )
}
