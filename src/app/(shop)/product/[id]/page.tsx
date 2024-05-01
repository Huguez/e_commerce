import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSlideShowMobile, ProductSlideShow, StockLabel } from "@/components";
import { getProductBySlug } from "@/actions";
import { monse } from "@/config/fonts";
import { AddToCart } from "./ui/AddToCart";

interface propsI {
	params: {
		id: string;
	}
}

export async function generateMetadata( { params }: propsI ): Promise<Metadata> {
	const { id:slug } = params
	
	const product = await getProductBySlug( slug )
	
	const prod = process.env.NODE_ENV === 'production'
	const website = prod ? "https://e-commerce-by-huguez.vercel.app" : "http://localhost:3000"

	return {
		metadataBase: new URL( website ),
		title: product?.title ?? "Loading...",
		description: product?.description ??  "Loading...",
		openGraph: {
			title: product?.title ?? "Loading...",
			description: product?.description ??  "Loading...",
			images: [ ...( product?.images ? product?.images.map( img => `/products/${ img.url }` )  : [] ) ]
		},
		twitter: {
			site: 'huguez',
			title: 'E-commerce',
			description: product?.description ??  "Loading...",
			images: [ ...( product?.images ? product?.images.map( img => `/products/${ img.url }` ) : [] ) ]
		},
		
	}
}

export default async function productPage( { params }:propsI ) {
	const { id } = params

	const product = await getProductBySlug( id )

	if ( !product ) {
		notFound()
	}
	
	return (
		<div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

			<div className="col-span-1 md:col-span-2"> 
				
				<ProductSlideShowMobile className="block md:hidden " images={  product.images ? product.images.map( img => img.url ) : [] } title={ product.title } />

				<ProductSlideShow className="hidden md:block" images={ product.images ? product.images.map( img => img.url ) : [] } title={ product.title } />

			</div>

			<div className="col-span-1 px-5 ">
				
				<h1 className={`${ monse.className } antialiased font-bold text-xl`}> 
					{ product.title } 
				</h1>

				<StockLabel slug={ product.slug } />
				
				
				<p className="text-lg mb-5" >$ { product.price.toFixed( 2 ) }</p>

				<AddToCart product={ product } />

				<h3 className="font-bold text-sm">Description</h3>
				<p className="font-light">
					{ product.description }
				</p>

			</div>

		</div>
	);
 }