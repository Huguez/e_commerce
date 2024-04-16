
import { Footer, SideBar, TopMenu } from "@/components";

interface propsI { 
   children: React.ReactNode;
}

export default async function ShopLayout({ children }: propsI ) {

   return (
      <main className="min-h-screen">
         <TopMenu /> 
         <SideBar />
         <div className="px-0 sm:px-10">
            { children }
         </div>
         <Footer />
      </main>
   );
}