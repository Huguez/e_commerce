'use client'

import React, { useLayoutEffect, useState } from 'react'
import Link from 'next/link';
import { FaBan, FaCheck, FaTimes } from 'react-icons/fa';

import { updateUserRole, updateUserStatus } from '@/actions';
import { Loading, Pagination } from '@/components';
import { Role, Status, UserI } from '@/interfaces';

interface ProsI {
	userList: UserI[];
	acum: number;
	totalPages: number;
}

export const UserTable = ( { userList, totalPages, acum }: ProsI ) => {
   const [ loading, setLoading ] = useState<boolean>( true )
   const [ url, setUrl ] = useState<string>( "" )

   useLayoutEffect( () => {
      setLoading( false )
		setUrl( window.location.pathname )
   }, [] )

	const handleRole = async ( id: string, role: string ) => {

		const { ok } = await updateUserRole( id, role as Role )

	}

	const handleStatus = async ( id: string, status: string ) => {
		const { ok } = await updateUserStatus( id, status as Status )
	}

   if ( loading ) {
      return <div className="fle mb-10 mt-5  overflow-hidden">
         <Loading width={ 20 } height={ 20 } />
      </div>
   }

	return <>
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
							Name
						</th>
						<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
							E-mail
						</th>
						<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
							Status
						</th>
						<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
							Role
						</th>
						<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
							Profile
						</th>
					</tr>
				</thead>
				<tbody className='bg-white'>
					{
						!!userList && userList.map( ( user, index ) => (
							<tr key={`${ index }-${ user.id }-${ user.name }`} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
								
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ index+1+acum }</td>
								
								<td title={ user.id } className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ user.id.split("-")[0] }...</td>
								
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{ user.name }
								</td>

								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{ user.email }
								</td>
								
								<td className="flex items-center text-sm  text-gray-900 font-semibold px-6 py-4 whitespace-nowrap capitalize">

									<select className='text-sm p-2 text-gray-600 rounded ' value={ user.status } onChange={ ( e ) => handleStatus( user.id, e.target.value ) }>
										<option value={'active'}>Verified/Active</option>
										<option value={'unverified'}>Unverified</option>
										<option value={'banned'}>Banned</option>
									</select>

									{ user.status.toString() === 'unverified' && <FaTimes className='text-yellow-600 ml-1 ' /> }
									{ user.status.toString() === 'active' && <FaCheck className='text-green-600 ml-1 ' /> }
									{ user.status.toString() === 'banned' && <FaBan className='text-red-600 ml-1 ' /> }
									
								</td>
								
								<td className="text-sm text-gray-900 font-semibold ">
									<select className='text-sm p-2 text-gray-600 rounded ' value={ user.role } onChange={ ( e ) => handleRole( user.id, e.target.value ) }>
										<option value={'customer'}>Customer</option>
										<option value={'admin'}>Admin</option>
									</select>
								</td>
								<td className='text-sm text-gray-900 font-semibold '>
									<Link href={`/`} className="hover:underline cursor-pointer ">
										See User
									</Link>
								</td>
							</tr>
						) )
					}
				</tbody>
			</table>
		</div>
		
		<Pagination totalPages={ totalPages } url={ "/admin/users/" } />
	</>
}
