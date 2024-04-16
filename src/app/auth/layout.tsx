import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

 interface propsI { 
   children: React.ReactNode; 
}

export default async function AuthLayout({ children }: propsI) {

	const session = await auth()
	
	if ( session ) {
		redirect( "/" )
	}
	
	return (
		<div className="flex justify-center">
			<div className="w-full sm:w-[350px] px-10">
				{ children }
			</div>
		</div>
	);
}