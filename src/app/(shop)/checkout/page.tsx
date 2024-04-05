import Image from "next/image"
import Link from "next/link";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { BsExclamationCircle } from "react-icons/bs";

const productosCart = [
   initialData.products[2],
   initialData.products[3],
   initialData.products[2],
   initialData.products[3],
   initialData.products[2],
   initialData.products[3],
   initialData.products[2],
   initialData.products[3],
   initialData.products[2],
   initialData.products[3],
]


export default function CheckoutPage() {
	return (<div className="flex justify-center items-center lg:px-5 md:px-2">
		<div className="flex flex-col w-9/12 md:w-full mb-10">
			
			<Title  title="check order" />

			<div className="grid md:grid-cols-2 gap-5">
				<div className="flex flex-col mt-5">

					<span className="text-xl">check Items</span>

					<Link href="/cart" className="underline mb-5" >
						Edit Cart
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
									<p className="">$ { p.price.toFixed( 2 ) } x { 3 }</p>
									<p className="font-bold"> Subtotal: ${ 225.00 } </p>
								</div>
							</div>
						) )
					}
				</div>
				<div>
					<div className="bg-white rounded-xl shadow-xl p-7 sticky top-10 ">
						<h3 className="text-2xl mb-2 font-bold"> Address </h3>
						<div className="mb-10">
							<p className="text-xl"> Name Lastname </p>
							<p className=""> Av. Siempre Viva  </p>
							<p className=""> Col. Centro </p>
							<p className=""> Alcadia Cuautemoc  </p>
							<p className=""> Ciudad de Mexico  </p>
							<p className=""> CP. 123123  </p>
							<p className=""> Tel. 123123  </p>
						</div>
						
						<div className="w-full  h-0.5 rounded-sm bg-gray-200 mb-10" />

						<h3 className="text-2xl font-bold mb-2"> Order Summary </h3>

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

							<div className="flex items-center mb-5">
								<input type="checkbox"   />
								<p className="ml-1   text-xs">
									Accept <span className="underline"> terms and conditions </span> y <span className="underline"> privacy policy </span>
								</p>
							</div>

							<Link 
								className="flex btn-primary justify-center"
								href={"/orders/Wawa123"}
							> 
								Order
							</Link>
						</div>
					</div>
				</div>
				
			</div>

		</div>
	</div>
	);
}