import { QuantitySelector, SizeSelector } from "@/components";
import { monse } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { SwiperSlide, Swiper } from "swiper/react";
import 'swiper/css';

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
				<Swiper
					spaceBetween={50}
					slidesPerView={3}
					onSlideChange={() => console.log('slide change')}
					onSwiper={(swiper) => console.log(swiper)}
				>
					<SwiperSlide>Slide 1</SwiperSlide>
					<SwiperSlide>Slide 2</SwiperSlide>
					<SwiperSlide>Slide 3</SwiperSlide>
					<SwiperSlide>Slide 4</SwiperSlide>
					...
				</Swiper>
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