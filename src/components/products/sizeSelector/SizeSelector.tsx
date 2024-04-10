import type { Size } from "@/interfaces"
import clsx from "clsx";

interface propsI {
	selectSize: Size | null;
	avialableSizes: Size[];
	posted: boolean;
	onSizeChanged: ( size: Size ) => void;
}

export const SizeSelector = ({ posted, selectSize, avialableSizes, onSizeChanged } : propsI ) => {
	
	return (
		<div className="my-3">
			<h3 className="font-bold"> Sizes: </h3>
			{
            posted && !selectSize ?
            <span className="text-red-500 text-xs fade-in my-2"> Select the size you want to add </span>
				: <span className="my-2"> &nbsp; </span>
         }
			<div className="flex">
				{
					avialableSizes.map( (s, index) => (
						<button 
							onClick={ () => onSizeChanged( s ) }
							className={
								clsx( "px-2 mx-1 hover:underline text-lg rounded" , {
									"bg-blue-600 text-white": s === selectSize
								} )
							}
							key={`${ index }-size-${ s }`} >
							{ s }
						</button>
					) )
				}
			</div>			
		</div>
	)
}
