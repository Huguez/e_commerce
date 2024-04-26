
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface PropsI { 
   children: React.ReactNode; 
}

export default async function AdminLayout({ children }: PropsI ) {
   const session = await auth()
   
   if ( !session ) {
      redirect( "/" )
   }

   const isAuthenticated = !!session.user
   const isAdmin = isAuthenticated && session.user.role === 'admin'

   if ( !isAdmin ) {
      redirect( "/" )
   }

   return (
      <>
         { children }
      </>
   );
}