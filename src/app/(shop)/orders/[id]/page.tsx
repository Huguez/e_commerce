
import Image from "next/image"

import { BsExclamationCircle } from "react-icons/bs";
import { TbMailbox } from "react-icons/tb";
import { FaCity, FaHome, FaUser } from "react-icons/fa";
import { IoCartOutline, IoPhonePortraitOutline } from "react-icons/io5";

import clsx from "clsx";

import { OrdersStatus, Title } from "@/components";
import { getOrderById } from "@/actions";
import { notFound, } from "next/navigation";
import { currencyFormat } from "@/utils";
import type { Metadata } from "next";
import { PayPalButton } from "./ui";

interface propsI {
	params: {
		id: string;
	}
}

export const metadata: Metadata = {
	title: "Order",
	description: "E-Commerce by Huguez, developed with Next.js",
 };
 

export default async function OrderIdPage( { params }: propsI ) {
	const { id } = params;

	const { order, productsInOrder } = await getOrderById( id )
	
	if ( !order ) {
		notFound()
	}
	

   return (
		<div className="flex justify-center items-center lg:px-5 md:px-2">
			<div className="flex flex-col w-9/12 md:w-full mb-10">

				<Title  title={ `Order #${ id }` } />

				<div className="grid md:grid-cols-2 gap-5 mt-6">
					
					<div className="flex flex-col ">

						{/* <div className={ clsx( "flex items-center rounded-lg py-2 px-3.5 text-sm font-bold text-white mb-5",
							{
								"bg-red-500" : !order.isPaid,
								"bg-green-600" : order.isPaid
							}
						) }>
							<IoCartOutline size={ 30 } />
							<p className="mx-2"> { order.isPaid ?  "Order paid" : "Outstanding for pay" } </p>
							
						</div>
						 */}
						<OrdersStatus isPaid={ order.isPaid ?? false } />

						{
							productsInOrder.map( ( p: any, index: number ) => (
								<div key={`${ index }-${ p.slug }-${ p.size }` } className="flex mb-3">
									<Image 
										src={`/products/${ p.image }`}
										alt={ p.slug }
										width={100}
										height={100}
										style={{ height: "100px", width: "100px" }}
										className="mr-5 rounded"
									/>
									<div>
										<p className="text-sm">{ p.title } ({ p.size }) </p>
										<p className="">{ currencyFormat( p.price ) } x { p.quantity }</p>
										<p className="font-bold"> Subtotal: { currencyFormat( p.quantity*p.price ) } </p>
									</div>
								</div>
							) )
						}
					</div>
					<div>
						<div className="bg-white rounded-xl shadow-xl p-7 sticky top-10 ">
							<h3 className="text-2xl mb-2 font-bold"> Address </h3>
							<div className="mb-7">
								<p className="text-xl flex items-center"> <FaUser size={20} className="mr-1" /> { `${ order.OrderAddress.name } ${ order.OrderAddress.lastname }` } </p>
								<p className="flex items-center "> <FaHome size={20} className="mr-2"/> { order.OrderAddress.address } </p>
								{ 
									!!order.OrderAddress.addressOptional &&
										<p className=""> <FaHome size={20} className="mr-2" /> {  order.OrderAddress.addressOptional }  </p>
								}
								<p className="flex items-center"> <FaCity size={20} className="mr-2" /> { order.OrderAddress.city } - { order.OrderAddress.country.name } </p>
								<p className="flex items-center"> <TbMailbox size={20} className="mr-2" /> { order.OrderAddress.codeZip } </p>
								<p className="flex items-center"> <IoPhonePortraitOutline size={20} className="mr-2"  />  { order.OrderAddress.phone } </p>
							</div>
							
							<div className="w-full  h-0.5 rounded-sm bg-gray-200 " />

							<h3 className="text-2xl font-bold mb-2 mt-5"> Order Summary </h3>

							<div className="grid grid-cols-2">
								<span> # Products </span>
								<span className="text-right"> { order.itemsInOrder } items </span>
								
								<span className="my-3">Shipping</span>
								<span className="my-3 text-right">Free</span>

								<span> Subtotal </span>
								<span className="text-right"> { currencyFormat( order.subtotal ) } </span>
								

								<span className="flex items-center"> sales Tax <BsExclamationCircle className="ml-1" size={15} /> </span>
								<span className="text-right"> { currencyFormat( order.tax ) } </span>
								
								<span className="mt-5 text-2xl"> Total: </span>
								<span className="mt-5 text-2xl text-right"> { currencyFormat( order.total ) } </span>
								
							</div>
							<div className="mt-5  w-full">
								{ order.isPaid ? 
									<OrdersStatus isPaid={ order.isPaid ?? false } /> : 
									<PayPalButton amount={ order.total } orderId={ order.id }  /> 
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
 }