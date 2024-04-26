import { getPaginatedOrders } from "@/actions";
import { TableOrders, Title } from "@/components";

interface propsOrders{
	searchParams: {
		page: number;
		take: number;
	}
}

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