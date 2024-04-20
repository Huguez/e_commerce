import Image from "next/image"

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { BsExclamationCircle } from "react-icons/bs";
import clsx from "clsx";
import { IoCartOutline } from "react-icons/io5";

const productosCart = [
   initialData.products[0],
   initialData.products[2],
   initialData.products[3],
]

interface propsI {
	params: {
		id: string;
	}
}

export default function OrdersPage( { params }: propsI ) {
	const { id } = params;




   return (<div className="flex justify-center items-center lg:px-5 md:px-2">
		<div className="flex flex-col w-9/12 md:w-full mb-10">
			
			<Title  title={ `Order #${ id }` } />

			<div className="grid md:grid-cols-2 gap-5">
				
				<div className="flex flex-col mt-5">

					<div className={ clsx( "flex items-center rounded-lg py-2 px-3.5 text-sm font-bold text-white mb-5",
						{
							"bg-red-500" : false,
							"bg-green-600" : true
						}
					) }>
						<IoCartOutline size={ 30 } />
						{/* <span className="mx-2">outstanding for pay</span> */}
						<p className="mx-2">order paid</p>
						
					</div>

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
							<div className={ clsx( "flex items-center justify-center rounded-lg py-2 px-3.5 text-sm font-bold text-white mb-5",
								{
									"bg-red-500" : false,
									"bg-green-600" : true
								}
							) }>
								<IoCartOutline size={ 30 } />
								{/* <span className="mx-2">outstanding for pay</span> */}
								<p className="mx-2">order paid</p>
								
							</div>
						</div>
					</div>
				</div>
				
			</div>

		</div>
	</div>
	);
 }