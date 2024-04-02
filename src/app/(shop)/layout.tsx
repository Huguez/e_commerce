
interface propsI { 
   children: React.ReactNode;
}

export default function ShopLayout({ children }: propsI ) {
   return (
      <main className="min-height-screen  bg-red-500">
         { children }
      </main>
   );
}