import type { Size } from "@/interfaces"
import clsx from "clsx";


interface propsI {
	selectSize: Size;
	avialableSizes: Size[];
}


export const SizeSelector = ({ selectSize, avialableSizes } : propsI ) => {

	return (
		<div className="my-5">

			<h3 className="font-bold mb-4"> Sizes: </h3>
			<div className="flex">
				{
					avialableSizes.map( (s, index) => (
						<button className={
							clsx( "px-2 mx-1 hover:underline text-lg rounded" , {
								"bg-blue-600 text-white": s === selectSize
							} )
						} key={`${ index }-size-${ s }`} >
							{ s }
						</button>
					) )
				}
			</div>			
		</div>
	)
}
