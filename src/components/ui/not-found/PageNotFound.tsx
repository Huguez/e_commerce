import { monse } from "@/config/fonts"
import Image from "next/image"
import Link from "next/link"

interface propsI {
   target?: string;
}

export const PageNotFound = ( { target = "Gender" }:propsI ) => {
   return (
      <div className="flex flex-col-reverse md:flex-row h-[400px]  w-full justify-center items-center align-middle">
         <div className="text-center px-5 mx-5">
            <h2 className={ monse.className + " antialiased text-9xl"}> 404 </h2>
            <p className="font-semibold text-xl my-2"> Oops, so sorry { target } don&lsquo;t found </p>
            <span className=""> Get back </span>
            <Link href="/">
               Home
            </Link>
         </div>

         <div className="px-5 mx-5">
            <Image 
               src={"/imgs/starman_750x750.png"}
               alt="starman e-commerce Huguez"
               width={400}
               height={400}
               className="p-5 sm:p-0"
            />
         </div>

      </div>
   )
}
