'use client'

import { createOrUpdateProduct, deleteImagesProduct } from "@/actions";
import { ProductImage } from "@/components";
import { CategoryI, Gender, Product, ProductImage as ProductImageI, Size } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  product: Partial<Product>;
  categories: CategoryI[];
}

const sizes = [ "XS", "S", "M", "L", "XL", "XXL" ];

interface FormInputs {
   title:       string;
   slug:        string;
   description: string;
   price:       number;
   inStock:     number;
   categoryId:  string;
   sizes:       string[];
   tags:         string;
   gender:      Gender;
   images?:    FileList;
}



export const ProductForm = ({ product, categories }: Props) => {
   const router = useRouter()

   const [ loading, setLoading ] = useState<boolean>( true )

   const { handleSubmit, getValues, setValue,
      watch, register, formState:{ isValid,  } } = useForm<FormInputs>( { defaultValues:{ ...product, images: undefined, tags: product.tags?.join(", ") ?? "" } } )
   
   
   useLayoutEffect( () => {
      setLoading( false )
      watch('sizes')
   }, [watch] )

   const onSizeChange = ( size: Size ) => {
      const mySizes = new Set( getValues("sizes") )

      mySizes.has( size ) ? mySizes.delete( size ) : mySizes.add( size )

      setValue( 'sizes', Array.from( mySizes ) )

      return;
   }

   const onSubmit = async ( data: FormInputs ) => {
      const { images, ...productToSave } = data
      const formData = new FormData()
      
      if ( product.id ) {
         formData.append( 'id', product.id ?? null )
      }

      formData.append( 'title',       productToSave.title  )
      formData.append( 'slug',        productToSave.slug )
      formData.append( 'description', productToSave.description )
      formData.append( 'price',       productToSave.price.toString() )
      formData.append( 'inStock',     productToSave.inStock.toString() )
      formData.append( 'sizes',       productToSave.sizes.toString() )
      formData.append( 'tags',        productToSave.tags )
      formData.append( 'categoryId',  productToSave.categoryId )
      formData.append( 'gender',      productToSave.gender );

      if ( images ) {
         for( let i = 0; i < images.length; i++  ){
            formData.append( "images", images[i] )
         }
      }

      const { ok } = await createOrUpdateProduct( formData )

      if ( !ok ) {
         console.log( "No se hizo" );
         return    
      }

      console.log( "mensaje de exito" );
      router.replace(`/admin/product/${ product.slug }`)
   }

   return (
      <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3" onSubmit={ handleSubmit( onSubmit ) }>
         <div className="w-full">
            <div className="flex flex-col mb-2">
               <span>Título</span>
               <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register("title", { required: true } ) } />
            </div>

            <div className="flex flex-col mb-2">
               <span>Slug</span>
               <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register("slug", { required: true }) } />
            </div>

            <div className="flex flex-col mb-2">
               <span>Descripción</span>
               <textarea
               rows={5}
               className="p-2 border rounded-md bg-gray-200" { ...register( "description", { required: true } ) } 
               ></textarea>
            </div>

            <div className="flex flex-col mb-2">
               <span>Price</span>
               <input type="number" className="p-2 border rounded-md bg-gray-200" step="0.01" min={0.1} { ...register( "price", { required: true } ) } />
            </div>

            <div className="flex flex-col mb-2">
               <span>Tags</span>
               <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register("tags", { required: true } ) } />
            </div> 

            <div className="flex flex-col mb-2">
               <span>Gender</span>
               <select className="p-2 border rounded-md bg-gray-200" { ...register( "gender", { required: true } ) } >
                  <option value="">[Seleccione]</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kid">Kid</option>
                  <option value="unisex">Unisex</option>
               </select>
            </div>

            <div className="flex flex-col mb-2">
               <span>Categories</span>
               <select className="p-2 border rounded-md bg-gray-200" { ...register( "categoryId", { required: true } ) } >
                  <option value="">[Seleccione]</option>
                  { categories.map( ( cate ) => (
                     <option key={cate.id} value={ cate.id }>{cate.name}</option>
                  ) ) }
               </select>
            </div>

            <button className={`${ isValid ? "btn-primary" : "btn-disabled" } w-full`} type="submit" disabled={ !isValid }>
               Save
            </button>
         </div>

         <div className="w-full">
            <div className="flex flex-col mb-2">
               <span>Stock</span>
               <input type="number" className="p-2 border rounded-md bg-gray-200" min={1} { ...register("inStock", { required: true } ) } />
            </div>

            <div className="flex flex-col">

               <span>Tallas</span>
               <div className="flex flex-wrap">
                  {
                     sizes.map( size => (
                        <div key={ size }
                           onClick={ () => onSizeChange( ( size as Size ) ) }
                           className={`${ !!getValues( 'sizes' ) && getValues( 'sizes' ).includes( ( size as Size ) ) && "bg-blue-500 text-white" } flex items-center justify-center w-10 h-10 mr-2 border rounded-md hover:cursor-pointer hover:border-sky-500` } >
                           <span>{ size }</span>
                        </div>
                     ) )
                  }
               </div>

               <div className="flex flex-col mb-2">
                  <span>Fotos</span>
                  <input 
                     { ...register( "images" ) }
                     type="file"
                     multiple 
                     className="p-2 border rounded-md bg-gray-200" 
                     accept="image/png, image/jpeg, image/jpg"
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ">
                  {
                     !loading && !!product && product.images?.map( ( img, index ) => (
                        <div key={`${ img }-${ index }`} className="">
                           <ProductImage 
                              src={ img.url }
                              alt={ img.url }
                              width={ 580 }
                              height={ 580 }
                              className="rounded shadow-md mb-0.5"
                           />
                           <button onClick={ () => deleteImagesProduct( img.id, img.url ) } className="btn-danger flex sm:text-center items-center gap-2 w-full" type="button">
                              <FaTrashAlt className="" />
                              Delete
                           </button>
                        </div>
                     ) )
                  }
               </div>

            </div>
         </div>
      </form>
   );
};