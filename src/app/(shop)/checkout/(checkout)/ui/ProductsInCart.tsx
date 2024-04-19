'use client'

import React, { useLayoutEffect, useState } from 'react'
import Image from "next/image"
import { Loading } from '@/components'
import { CartProduct } from '@/interfaces'
import { useCart } from '@/store'
import { redirect } from 'next/navigation'
import { currencyFormat } from '@/utils'

const MAX = 99

interface propsI {}

export const ProductsInCart = ( {}:propsI ) => {
	const { cart }= useCart( state => state )
	const [ loading, setLoading ] = useState<boolean>( true )

	useLayoutEffect( () => {
		setLoading( false )
	}, [] )

	if ( !loading && cart.length === 0 ) {
		redirect("/empty")
	}
	
	return (
		<>
			{
				!loading && cart.length > 0 && cart.map( ( p: CartProduct, index: number ) => (
					<div key={ `${index}-${p.id}-${ p.size }`  } className="flex mb-3 fade-in">
						<Image
							src={`/products/${ p.image }`}
							priority={ true }
							alt={ p.slug }
							width={100}
							height={100}
							style={{ height: "100px", width: "100px" }}
							className="mr-5 rounded"
						/>
						<div>
							<span>
								{ p.title } - { p.size } ({ p.qty })
							</span>
							<p className="font-bold" >{ currencyFormat( p.price ) }</p>
						</div>
					</div>
				) )
			}
			{ loading && cart.length === 0 && <Loading  width={ 20 } height={ 20 } /> }
		</>	
	)
}
