import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {

   return (
      <div className="flex justify-center items-center h-[400px]">

         <div className="grid sm:grid-cols-1  md:grid-cols-2 ">

            <div className="flex justify-center items-center ">
               <IoCartOutline className="mx-5" size={ 100 }/>
            </div>

            <div className="flex flex-col justify-center items-center">
               <h1 className="text-xl font-semibold"> Your cart is Empty </h1>

               <Link href={"/"} className="text-blue-300 text-4xl font-semibold hover:underline mt-2">
                  Get back
               </Link>
            </div>
         </div>

      </div>
   );
}