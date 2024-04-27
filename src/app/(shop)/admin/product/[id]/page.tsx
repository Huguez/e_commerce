import type { Metadata } from "next";
import { getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui";
import { Product } from "@/interfaces";

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

   const product = await getProductBySlug( slug )

   if( !product  && slug !== 'new' ){
      redirect("/admin/products")
      // notFound()
   }
   
   const title = slug ===  "new" ? "New Product" : "Edit Product"

   return (
      <>
         <Title title={title} />
         
         <ProductForm product={ product } />
      </>
   );
}