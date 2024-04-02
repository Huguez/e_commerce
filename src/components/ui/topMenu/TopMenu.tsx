import { monse } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

export const TopMenu = () => {
   return (
      <nav className='flex p-5 justify-between items-center w-full'>

         <div className=''>
            <Link href={"/"}>
               <span className={`${ monse.className } antialiased font-bold`} > e-commerce </span>
               <span> Shop </span>
            </Link>
         </div>

         <div className='hidden sm:block'>
            <Link href={"/category/men"} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'> Men's </Link>
            <Link href={"/category/women"} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'> women's </Link>
            <Link href={"/category/kid"} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'> kid's </Link>
         </div>

         <div className=' flex items-center '>
            
            <Link href={"/search"}>
               <IoSearchOutline className='w-7 h-7' />
            </Link>

            <Link href={"/cart"} className='mx-2'>
               <div className='relative'>
                  <span className='absolute text-xs text-white rounded-full px-1 font-bold -top-1 -right-1 bg-red-600 '>
                     { 3 }
                  </span>
                  <IoCartOutline className='w-7 h-7' />
               </div>
            </Link>

            <button className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 '>
               Menu
            </button>
         </div>

      </nav>
   )
}
