"use client"

import { generatePagination } from "@/utils";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface propPagination{
   totalPages: number;
   url: string;
}

export const Pagination = ( { totalPages, url }: propPagination ) => {

   const pathname = usePathname()
   
   const searchParams = useSearchParams()
   const pageString = searchParams.get( "page" ) ?? "1"
   
   const currentPage = isNaN( +pageString ) ? -1 : +pageString

   if ( currentPage === -1 ) {
      redirect( url )
   }

   const allPages = generatePagination( currentPage, totalPages )

   const createPageUrl = ( pageNumber: number | string ) => {
      const params = new URLSearchParams( searchParams )
      
      if ( pageNumber === "..." ) {
         return `${ pathname }?${ params.toString() }`
      }

      if ( +pageNumber <= 0 ) {
         return `${ pathname }`
      }

      if ( +pageNumber > totalPages ) {
         return `${ pathname }?${ params.toString() }`
      }

      params.set( 'page', pageNumber.toString() )

      return `${ pathname }?${ params.toString() }`
   }
   
   return (
      <div className="flex justify-center  mb-5">
         <nav aria-label="">
            <ul className="flex justify-center items-center list-style-none">

               <li className={`page-item  ${ (currentPage - 1) === 0 ? "cursor-not-allowed" : "" }`}  >
                  <Link href={ createPageUrl( currentPage - 1 ) } className={`page-item  ${ (currentPage - 1) === 0 ? "text-gray-400 pointer-events-none" : "hover:bg-gray-300 cursor-pointer" } page-link  relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded  `}>
                     <IoChevronBackOutline size={30} className=""  />
                  </Link>
               </li>

               { 
                  allPages.map( ( item, index ) => (
                     <li key={index+"-paginatin-"+pathname+"-"+item} className={`${ currentPage === item  ? "bg-gray-500 text-white" : "hover:bg-gray-300" } mx-1 cursor-pointer relative block py-1 px-3 border-0 outline-none transition-all duration-300 rounded `}>
                        <Link href={url+"/?page="+item}>
                           { item }
                        </Link>
                     </li>
                  ) )
               }

               <li className={`page-item   ${ currentPage === totalPages ? "cursor-not-allowed" : "" }`}>
                  <Link href={ createPageUrl( currentPage + 1 ) } className={`page-item ${ currentPage  === totalPages ? "text-gray-400 pointer-events-none" : "hover:bg-gray-300 cursor-pointer" } page-link  relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded  `}>
                     <IoChevronForwardOutline size={30} />
                  </Link>
               </li>
            </ul>
         </nav>
      </div>
   )
}