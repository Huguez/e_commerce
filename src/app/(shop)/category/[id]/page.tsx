import { ProductsGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { ValidGender } from "@/interfaces";

interface props {
   params: {
      id: ValidGender;
   }
};

const products = initialData.products


export default function CategoryPage( { params }:props ) {
   const { id } = params;

   if( ![ "men", "women", "kid" ].includes( id ) ){
      notFound()
   }
   
   return (
      <div>
         <Title title={id.toUpperCase()} subtitle={ `All ${ id }'s products` } />

         <ProductsGrid 
            products={ products.filter( item => "kid" === id  ? item.gender === id : item.gender !== "kid" && ( item.gender === "unisex" || item.gender === id ) )} 
         />
      </div>
   );
}