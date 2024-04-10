"use client"

import React, { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { monse } from '@/config/fonts'
import { useCart, useUI } from '@/store'

export const TopMenu = () => {

   const totalItem = useCart( state => state.counterProductsCart() )
   const { openSidebar } = useUI( state => state )

   const [ loaded, setLoaded ] = useState( false )

   
   useLayoutEffect( () => {
      setLoaded( true )
   }, [] )

   return (
      <nav className='flex p-5 justify-between items-center w-full'>

         <div className=''>
            <Link href={"/"}>
               <span className={`${ monse.className } antialiased font-bold`} > e-commerce </span>
               <span> Shop </span>
            </Link>
         </div>

         <div className='hidden sm:block'>
            <Link href={"/gender/men"} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'> Men's </Link>
            <Link href={"/gender/women"} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'> women's </Link>
            <Link href={"/gender/kid"} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'> kid's </Link>
         </div>

         <div className=' flex items-center '>
            
            <Link href={"/search"}>
               <IoSearchOutline className='w-7 h-7' />
            </Link>

            <Link href={"/cart"} className='mx-2'>
               <div className='relative'>
                  { loaded && totalItem > 0 &&
                     <span className='absolute text-xs text-white rounded-full px-1 fade-in font-bold -top-1 -right-1 bg-red-600'>
                        { totalItem }
                     </span>
                  }
                  <IoCartOutline className='w-7 h-7' />
               </div>
            </Link>

            <button className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 ' onClick={ openSidebar }>
               Menu
            </button>
         </div>

      </nav>
   )
}
