'use client'

import React from 'react'
import { Pagination, ProductImage } from '@/components';
import { Product } from '@/interfaces';
import Link from 'next/link';

interface PropsI{
   acum: number;
   products: Product[];
   totalPages: number;
}

export const ProductsTable = ( { products, totalPages }:PropsI ) => {
   
   return (
      <>
         <div className="mb-10 mt-5  border rounded-lg overflow-hidden">
            <table className="min-w-full  ">
               <thead className=" bg-blue-100">
                  <tr>
                     <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Image
                     </th>
                     <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Title
                     </th>
                     <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Price
                     </th>
                     <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Gender
                     </th>
                     <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Stock
                     </th>
                     <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Sizes
                     </th>
                  </tr>
               </thead>
               <tbody className='bg-white'>
                  {
                     products.map( ( product, index ) => (
                        <tr key={`${ index }-${ product.id }-${ product.slug }`} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <Link href={`/admin/product/${product.slug}`}>
                                 <ProductImage
                                    src={ product.images ? product.images[0] ? product.images[0].url : null : null }  
                                    alt={ product.slug }
                                    width={ 80 }
                                    height={ 80 }
                                 />
                                 
                              </Link>
                           </td>
                           
                           <td className="truncate max-w-[220px] text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap hover:underline">
                              <Link href={`/admin/product/${product.slug}`}>
                                 { product.title }
                              </Link>
                           </td>

                           <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              { product.price }
                           </td>
                           
                           <td className=" text-sm  text-gray-900 font-semibold px-6 py-4 whitespace-nowrap capitalize">
                              { product.gender }
                           </td>
                           
                           <td className="text-sm text-gray-900 font-semibold ">
                              { product.inStock }
                           </td>
                           <td className='text-sm text-gray-900 font-semibold '>
                              { product.sizes.toString() }
                           </td>
                        </tr>
                     ) )
                  }
               </tbody>
            </table>
         </div>
         
         <Pagination totalPages={ totalPages } url={ "/admin/products/" } />
      </>
   )
}
