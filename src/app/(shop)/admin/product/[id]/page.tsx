import type { Metadata } from "next";
import { getAllCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { notFound, redirect } from "next/navigation";
import { ProductForm } from "./ui";

interface PropsI {
   params: {
      id: string;
   }
}

export async function generateMetadata(  { params }: PropsI ): Promise<Metadata> {
   const { id: slug } = params;
   
   const title = slug ===  "new" ? "New Product" : "Edit Product"
   
   return {
     title,
   }
 }
  

export default async function ProductBySlugPage( { params }:PropsI ) {
   const { id: slug } = params;

   const [ product, { categories } ] = await Promise.all( [ getProductBySlug( slug ), getAllCategories() ] )

   if( !product && slug !== 'new' ){
      notFound()
   }
   
   const title = slug ===  "new" ? "New Product" : "Edit Product"

   
   return (
      <>
         <Title title={title} />
         
         <ProductForm product={ product ?? {} } categories={categories} />
      </>
   );
}