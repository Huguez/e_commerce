import { getOrderByUserIdList } from '@/actions';

import { Title, TableOrders} from '@/components';
import type { Metadata } from 'next';


interface propsOrders{
	searchParams: {
		page: number;
		take: number;
	}
}


export const metadata: Metadata = {
	title: "Orders list",
	description: "E-Commerce by Huguez, developed with Next.js",
};


export default async function OrdersPage( { searchParams }:propsOrders ) {

	const page = searchParams.page ?? 1
	const take = searchParams.take ?? 6
	
	const { totalPages, orderlist } = await getOrderByUserIdList( page, take )

	return (
		<>
			<Title title="My Orders list" />

			<TableOrders totalPages={ totalPages } orderlist={ orderlist } acum={ (page-1)*take } />			
		</>
	);
}