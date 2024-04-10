
import Link from "next/link";

import { Title } from "@/components";
import { ProductsInCart } from "./ui/productsInCart";
import { Metadata } from "next";
import { OrderSummary } from "./ui/OrderSummary";

export const metadata: Metadata = {
   title: "Cart",
   description: "E-Commerce by Huguez, developed with Next.js",
}; 

export default async function CartPage() {
   
   
   return (
      <div className="flex justify-center items-center lg:px-5 md:px-2">
         <div className="flex flex-col w-9/12 md:w-full mb-10">
            
            <Title  title="Cart" />

            <div className="grid md:grid-cols-2 gap-5">
               <div className="flex flex-col mt-5">
                  <span className="text-xl">Add more items</span>

                  <Link href="/" className="underline mb-5" >
                     keep shopping
                  </Link>

                  <ProductsInCart  />

               </div>
               <div>
                  <OrderSummary />

               </div>
            </div>
         </div>
      </div>
   );
}