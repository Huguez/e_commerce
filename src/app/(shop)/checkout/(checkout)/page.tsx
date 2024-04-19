
import Link from "next/link";

import { Title } from "@/components";
import { BsExclamationCircle } from "react-icons/bs";
import { PlaceOrder, ProductsInCart } from "./ui";


export default async function CheckoutPage() {


	return (
		<div className="flex justify-center items-center lg:px-5 md:px-2">
			<div className="flex flex-col w-9/12 md:w-full mb-10">
				
				<Title  title="check order" />

				<div className="grid md:grid-cols-2 gap-5">
					<div className="flex flex-col mt-5">

						<span className="text-xl">check Items</span>

						<Link href="/cart" className="underline mb-5" >
							Edit Cart
						</Link>

						<ProductsInCart />

					</div>
					<div>
						<PlaceOrder />
					</div>
				</div>
			</div>
		</div>
	);
}