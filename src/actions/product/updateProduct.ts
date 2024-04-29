'use server'

import { Product, Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { v2 as cloudinary } from 'cloudinary';


const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, } = process.env
      
cloudinary.config({ 
  cloud_name: `${ CLOUD_NAME }`, 
  api_key:    `${ CLOUD_API_KEY }`, 
  api_secret: `${ CLOUD_API_SECRET }` 
});

const productSchema = z.object({
   id: z.string().uuid().optional().nullable(),
   title: z.string().min( 3 ).max( 225 ),
   slug: z.string().min( 3 ).max( 225 ),
   description: z.string(),
   price: z.coerce.number().min( 0 ).transform( val => Number( val.toFixed( 2 ) ) ),
   inStock: z.coerce.number().min( 0 ).transform( val => Number( val.toFixed( 0 ) ) ),
   categoryId: z.string().uuid(),
   sizes: z.coerce.string().transform( val => val.split(",") ),
   tags: z.string(),
   gender: z.nativeEnum( Gender ),
})

interface updateProductReturn {
   ok: boolean;
   product?: Product;
}

export const createOrUpdateProduct = async ( formData: FormData ) : Promise<updateProductReturn> => {
   try { 
      const dataF = Object.fromEntries( formData )
      const productParsed = productSchema.safeParse( dataF )

      if ( !productParsed.success ) {
         console.log( productParsed.error );
         return { 
            ok: false,
         }
      }

      const product = productParsed.data
      product.slug = product.slug.toLowerCase().replace( ' ', '-' ).trim() // / /g -> " "

      const { id, ...restProduct } = product

      const prismaTX = await prisma.$transaction( async ( tx ) => {

         let product: any;

         const arrayTags = restProduct.tags.split( ',' ).map( tag => tag.trim().toLowerCase() )
         const data = {
            ...restProduct,
            sizes: {
               set: restProduct.sizes as Size[]
            },
            tags: {
               set: arrayTags
            }
         } 

         if ( id ) {
            product = await tx.product.update( { where: { id }, data, include: { images: true } } )
         } else {
            product = await tx.product.create( { data, include: {
               images: true
            } } )
         }

         const images =  formData.getAll( "images" )

         if ( images.length > 0 ) {
            const urlImages = await uploadImages( images as File[] )

            if( !urlImages ){
               throw new Error("cannot updated images, rollback")
            }

            await prisma.productImage.createMany( {
               data: urlImages.map( img => ({ url: img!,  productId: product.id }) )
            } )

         }


         return {
            product
         }
      } )

      revalidatePath(`/admin/products/`)
      revalidatePath(`/admin/product/${ prismaTX.product.slug }`)
      revalidatePath(`/product/${ prismaTX.product.slug }`)
      revalidatePath(`/products`)

      return {
         ok: true,
         product: prismaTX.product,
      }
   } catch ( error ) {
      console.log( error );
      return {
         ok: false,
      }
   }
}

const uploadImages = async ( images: File[] ) => {
   try {

      const updateImagesPromise = images.map( async ( img ) => {
         try {
            const buffer = await img.arrayBuffer()
            const b64 = Buffer.from( buffer ).toString('base64')

            return cloudinary.uploader.upload( `data:${ img.type };base64,${ b64 }`, { folder: "e_commerce" } ).then( resp => resp.secure_url )   
         } catch (error) {
            console.log( error );
            return null
         }
      } )

      const updateImages = await Promise.all( updateImagesPromise )

      return updateImages

   } catch (error) {
      console.log( error );
      return null
   }
}