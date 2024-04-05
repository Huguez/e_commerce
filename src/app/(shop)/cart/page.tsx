import Image from "next/image"
import Link from "next/link";

import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { IoBagRemoveOutline } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";

const productosCart = [
   initialData.products[0],
   initialData.products[2],
   initialData.products[3],
   initialData.products[0],
   initialData.products[2],
   initialData.products[3],
   initialData.products[0],
   initialData.products[2],
   initialData.products[3],
]


export default function CartPage() {
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
                  {
                     productosCart.map( ( p ) => (
                        <div key={p.slug} className="flex mb-3">
                           <Image 
                              src={`/products/${ p.images[0] }`}
                              alt={ p.slug }
                              width={100}
                              height={100}
                              style={{ height: "100px", width: "100px" }}
                              className="mr-5 rounded"
                           />
                           <div>
                              <p>{ p.title }</p>
                              <p className="">$ { p.price.toFixed( 2 ) }</p>
                              <div className="flex items-center">
                                 <QuantitySelector selectQty={ 1 } />
                                 <button> <IoBagRemoveOutline className="text-red-700 mb-1 ml-4"  size={ 25 } /> </button>
                              </div>
                           </div>
                        </div>
                     ) )
                  }
               </div>
               <div>
               <div className="bg-white rounded-xl shadow-xl p-7 ">
                  <h2 className="text-2xl font-bold mb-2"> Order Summary </h2>

                  <div className="grid grid-cols-2">
                     <span> # Products </span>
                     <span className="text-right"> 3 items </span>
                     
                     <span className="my-6">item</span>
                     <span className="my-6 text-right">price</span>

                     <span className="my-6">Shipping</span>
                     <span className="my-6 text-right">Free</span>

                     <span> Subtotal </span>
                     <span className="text-right">$ 100.00 </span>
                     

                     <span className="flex items-center"> sales Tax <BsExclamationCircle className="ml-1" size={15} /> </span>
                     <span className="text-right">$ 15.00 </span>
                     
                     <span className="mt-5 text-2xl"> Total: </span>
                     <span className="mt-5 text-2xl text-right">$ 115.00 </span>
                     
                  </div>
                  <div className="mt-5 mb-2 w-full">
                     <Link 
                        className="flex btn-primary justify-center"
                        href={"/checkout/address"}
                     > 
                        Checkout
                     </Link>
                  </div>
               </div>
               </div>
               
            </div>

         </div>
      </div>
   );
}