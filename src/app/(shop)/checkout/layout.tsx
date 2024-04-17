import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface propsL { 
   children: React.ReactNode; 
}

export default async function CheckoutLayout( { children }: propsL ) {
   const session = await auth()

   if ( !session ) {
      redirect("/auth/login?redirectTo='/checkout/'")
   }

   return <>
      { children }
   </>
}