"use client"
import { Product } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const ProductGridItem = ( { description, images,  price, slug, title, }:Product ) => {
   
   const aux = !!images ? images[0] : "/imgs/placeholder.jpg"
   const aux2 = !!images ? images[1] : "/imgs/placeholder.jpg"
   

   const [ displayImage, setDisplayImage ] = useState<string>( aux as string )

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
               onMouseOver={ () => setDisplayImage( aux as string ) } 
               onMouseLeave={ () => setDisplayImage( aux2 as string ) }
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
