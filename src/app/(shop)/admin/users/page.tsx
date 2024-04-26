import { Title } from "@/components";
import type { Metadata } from "next";
import { UserTable } from "./ui";
import { getPaginatedUsers } from "@/actions";

interface PropsI{
	searchParams: {
		page: number;
		take: number;
      search?: string;
	}
}

export const metadata: Metadata = {
	title: "Users list",
	description: "E-Commerce by Huguez, developed with Next.js",
};

export default async function UsersAdminPage( { searchParams }:PropsI ) {

   const page = searchParams.page ?? 1
	const take = searchParams.take ?? 12
   const search = searchParams.search
   
   const { users, usersCount } = await getPaginatedUsers( { take, page, search } )

   return (
      <>
         <Title title="Users" />

         <UserTable userList={ users ?? [] } acum={ ( page-1 ) * take } totalPages={ usersCount }  />
      </>
   );
}