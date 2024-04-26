'use client'

import Link from 'next/link'
import { useLayoutEffect, useState } from 'react';
import { IoCardOutline } from 'react-icons/io5'
import { OrderI } from '@/interfaces';
import { Loading, Pagination } from '@/components';

interface ProsI {
   orderlist: OrderI[] | undefined;
   acum: number;
   totalPages: number;
}

export const TableOrders = ( { totalPages, acum, orderlist }:ProsI ) => {

   const [ loading, setLoading ] = useState<boolean>( true )
   const [ url, setUrl ] = useState<string>( "" )

   useLayoutEffect( () => {
      setLoading( false )
		setUrl( window.location.pathname )
   }, [] )

   if ( loading ) {
      return <div className="fle mb-10 mt-5  overflow-hidden">
         <Loading width={ 20 } height={ 20 } />
      </div>
   }


   return (
      <>
         <div className="mb-10 mt-5  border rounded-lg overflow-hidden">
				<table className="min-w-full  ">
					<thead className=" bg-blue-100">
						<tr>
							<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								#
							</th>
							<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								ID
							</th>
							<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								E-mail
							</th>
							<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Status
							</th>
							<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Options
							</th>
						</tr>
					</thead>
					<tbody className='bg-white'>
						{
							!!orderlist && orderlist.map( ( order, index ) => (
								<tr key={`${ index }-${ order.id }`} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
									
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ index+1+acum }</td>
                           
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ order.id.split("-")[0] }</td>
									
									<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{ ( order as any ).user.email }
									</td>
									<td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

										<IoCardOutline className={`${ order.isPaid ? "text-green-800" : "text-red-800" } `} />
										<span className={`${ order.isPaid ? "text-green-800" : "text-red-800" } mx-2`}> { order.isPaid ?  "Paid" : "awaiting for pay" } </span>

									</td>
									<td className="text-sm  text-gray-900 font-semibold px-6 ">
										<Link href={`/orders/${ order.id }`} className="hover:underline cursor-pointer">
										See order
										</Link>
									</td>

								</tr>
							) )
						}
					</tbody>
				</table>
         </div>
         
         <Pagination totalPages={ totalPages } url={ url.includes( "/admi" ) ? "/admin/orders/" : "/orders/" } />
      </>
   )
}
