'use client'

import React, { useLayoutEffect, useState } from 'react'
import Image from "next/image"
import { Loading, ProductImage, QuantitySelector } from '@/components'
import { CartProduct } from '@/interfaces'
import { useCart } from '@/store'
import { IoBagRemoveOutline } from 'react-icons/io5'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const MAX = 99

interface propsI {}

export const ProductsInCart = ( {}:propsI ) => {
	const { cart, updateCart }= useCart( state => state )
	const [ loading, setLoading ] = useState<boolean>( true )


	useLayoutEffect( () => {
		setLoading( false )
	}, [] )


	const handleQty = ( p:CartProduct, amount: number ) => {
		updateCart( p, amount )
	}

	const handleDelete = ( p: CartProduct ) => {
		updateCart( p, 0 )
	}

	if ( cart.length === 0 ) {
		redirect("/empty")
	}

	
	return (
		<>
			{
				!loading && cart.length > 0 && cart.map( ( p: CartProduct, index: number ) => (
					<div key={ `${index}-${p.id}-${ p.size }`  } className="flex mb-3 fade-in">
						<ProductImage
							src={`/products/${ p.image }`}
							priority={ true }
							alt={ p.slug }
							width={100}
							height={100}
							style={{ height: "100px", width: "100px" }}
							className="mr-5 rounded"
						/>
						<div>
							<Link href={ `/product/${ p.slug }` } className='hover:underline'>
								{ p.title }
							</Link>
							<span> - { p.size } </span>
							<p className="">$ { ( p.price * p.qty ).toFixed( 2 ) }</p>
							<div className="flex items-center">
								<QuantitySelector 
									selectQty={ p.qty } 
									posted={false} 
									onQtyChange={ ( amount: number ) => handleQty( p, amount )  } 
									MAX={MAX} 
								/>
								<button onClick={() => handleDelete( p )} > <IoBagRemoveOutline className="text-red-700 mb-1 ml-4"  size={ 25 } /> </button>
							</div>
						</div>
					</div>
				) )
			}
			{ loading && cart.length === 0 && <Loading  width={ 20 } height={ 20 } /> }
		</>	
	)
}
