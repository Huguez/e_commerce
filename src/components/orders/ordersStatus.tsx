'use client'

import clsx from 'clsx';
import React from 'react'
import { IoCartOutline } from 'react-icons/io5';

interface PropsI {
	isPaid: boolean;
}


export const OrdersStatus = ({ isPaid }: PropsI ) => {
	return (
		<div className={ clsx( "flex items-center justify-center rounded-lg py-2 px-3.5 text-white mb-5",
			{
				"bg-red-500" : !isPaid,
				"bg-green-600" :isPaid
			}
		) }>
			<IoCartOutline size={ 30 } />
			<p className=" lg:text-lg  lg:font-medium font-light text-sm mx-2"> { isPaid ?  "Order paid" : "Outstanding for pay" }</p>
		</div>	
	)
}
