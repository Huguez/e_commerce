import { Pagination, ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";
import { ValidGender } from "@/interfaces";
import { getPaginationProducts } from "@/actions";

interface props {
   params: {
      id: ValidGender;
   },
   searchParams: {
		page: number;
		take: number;
	}
};

export const relative = 43200;

export default async function GenderPage( { params, searchParams }:props ) {
   const { id:gender } = params;

	const page = searchParams.page ?? 1
	const take = searchParams.take ?? 12

   const { products, totalPages  } = await getPaginationProducts( { page, take, gender } )
   const url = `/gender/${ gender }/`

   if ( products.length === 0 ) { // this will be changing
		redirect( url )
	}

   return (
      <div>
         <Title title={ gender.toUpperCase() } subtitle={ `All ${ gender }'s products` } />

         <ProductsGrid 
            products={ products } 
         />

			<Pagination totalPages={totalPages} url={ url } />
      </div>
   );
}