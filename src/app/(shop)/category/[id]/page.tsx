import { notFound } from "next/navigation";

interface props {
  params: {
    id: string;
  }
};


export default function CategoryPage( { params }:props ) {
   const { id } = params;

   if( id === "wawa" ){
      notFound()
   }


   return (
      <div>
         <h1>Hello Category { id }</h1>
      </div>
   );
}