import { ProductSlideShowMobile, QuantitySelector, SizeSelector } from "@/components";
import { ProductSlideShow } from "@/components/products/slideShow/ProductSlideShow";
import { monse } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface propsI {
	params: {
		id: string;
	}
}

export default function productPage( { params }:propsI ) {
	const { id } = params

	const product = initialData.products.find( p => p.slug === id )

	if ( !product ) {
		notFound()
	}

	return (
		<div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

			<div className="col-span-1 md:col-span-2"> 
				
				<ProductSlideShowMobile className="block md:hidden " images={ product.images } title={ product.title } />

				<ProductSlideShow className="hidden md:block" images={ product.images } title={ product.title } />

			</div>

			<div className="col-span-1 px-5 ">
				
				<h1 className={`${ monse.className } antialiased font-bold text-xl`}> 
					{ product.title } 
				</h1>
				
				<p className="text-lg mb-5" >$ { product.price.toFixed( 2 ) }</p>

				<SizeSelector selectSize={ product.sizes[1] } avialableSizes={ product.sizes } />

				<QuantitySelector selectQty={ 3 } />

				<button className="btn-primary my-5">
					Agregar al carrito
				</button>

				<h3 className="font-bold text-sm">Description</h3>
				<p className="font-light">
					{ product.description }
				</p>

			</div>

		</div>
	);
 }