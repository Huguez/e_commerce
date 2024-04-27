import { Title } from "@/components";
import type { Metadata } from "next";
import { ProductsTable } from "./ui";
import { getPaginationProducts } from "@/actions";

interface PropsI {
	searchParams: {
		page: number;
		take: number;
      search?: string;
	}
}

export const metadata: Metadata = {
	title: "Products list",
	description: "E-Commerce by Huguez, developed with Next.js",
};


export default async function ProductsAdminPage( { searchParams }: PropsI ) {
   const page = searchParams.page ?? 1
   const take = searchParams.take ?? 12

   const { totalPages, products,  } = await getPaginationProducts( { page, take } )

   return (
      <>
         <Title title={"List Products"}  />

         <ProductsTable acum={(page - 1) * take} products={ products } totalPages={ totalPages } />
      </> 
   );
}