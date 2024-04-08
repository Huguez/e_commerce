
import { getPaginationProducts } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface propsHome{
	searchParams: {
		page: number;
		take: number;
	}
}

export const relative = 43200;


export default  async function  Home( { searchParams }:propsHome ) {

	const page = searchParams.page ?? 1
	const take = searchParams.take ?? 12

	const { products, totalPages } = await getPaginationProducts( { page, take } )
	const url = "/"

	if ( products.length === 0 ) { // this will be changing
		redirect( url )
	}

	return (
		<>
			<Title title="Store" subtitle="All products" />

			<ProductsGrid products={ products } />

			<Pagination totalPages={totalPages} url={ url }/>
		</>
	);
}
