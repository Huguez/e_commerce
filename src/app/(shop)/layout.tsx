import { TopMenu } from "@/components";

interface propsI { 
   children: React.ReactNode;
}

export default function ShopLayout({ children }: propsI ) {
   return (
      <main className="min-h-screen">

         <TopMenu /> 
         { children }
      </main>
   );
}