"use client"
import { useUI } from "@/store"
import clsx from "clsx"
import Link from "next/link"

import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleCircle, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const SideBar = () => {
   const { isSidebarShow, closeSidebar } = useUI( state => state )

   
   return (
      <div>
         { isSidebarShow && <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 " /> }
         { isSidebarShow && <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" onClick={closeSidebar} />  }
         
         <div 
            className={ 
               clsx( "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-500 ", 
               { "translate-x-full": !isSidebarShow } 
               ) 
            } 
         >
            <IoCloseOutline className="absolute top-5 right-5 cursor-pointer " size={ 30 } onClick={closeSidebar} />
            <nav className="relative mt-10 	">
               <IoSearchOutline  size={20} className="absolute top-2 left-2" />
               <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
               />

               <Link href={"/"} className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all ">
                  <IoPersonOutline size={ 30 } />
                  <span className="ml-3 text-xl "> Perfil </span>
               </Link>

               <Link href={"/"} className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all ">
                  <IoTicketOutline size={ 30 } />
                  <span className="ml-3 text-xl "> orders </span>
               </Link>

               <Link href={"/"} className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all ">
                  <IoLogInOutline size={ 30 } />
                  <span className="ml-3 text-xl "> sign-in </span>
               </Link>

               <Link href={"/"} className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all ">
                  <IoLogOutOutline size={ 30 } />
                  <span className="ml-3 text-xl "> Logout </span>
               </Link>

               <div className="w-full h-px bg-gray-200 my-5" />

               <Link href={"/"} className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all ">
                  <IoShirtOutline size={ 30 } />
                  <span className="ml-3 text-xl "> Products </span>
               </Link>

               <Link href={"/"} className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all ">
                  <IoPeopleCircle size={ 30 } />
                  <span className="ml-3 text-xl "> Customers </span>
               </Link>


            </nav>


         </div>

      </div>
   )
}