import { getPaginatedOrders } from "@/actions";
import { TableOrders, Title } from "@/components";
import type { Metadata } from "next";

interface propsOrders{
	searchParams: {
		page: number;
		take: number;
	}
}

export const metadata: Metadata = {
	title: "Customers Orders",
	description: "E-Commerce by Huguez, developed with Next.js",
};


export default async function OrdersAdminPage( { searchParams }:propsOrders ) {
   
   const page = searchParams.page ?? 1
	const take = searchParams.take ?? 6
	
   const { ok,  orderlist, totalPages, } = await getPaginatedOrders( { page, take } )


   return (
      <>
         <Title title={"All Customers orders"}  />

         <TableOrders orderlist={ orderlist } acum={ (page-1)*take } totalPages={totalPages}  />
      </>
   );
}