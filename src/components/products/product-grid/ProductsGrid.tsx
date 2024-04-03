import { Product } from "@/interfaces";

interface propsI {
   products: Product[];
}

export const ProductsGrid = ({ products }: propsI ) => {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mb-10 ">
         { products.map( ( item, index ) => (
            <span key={`${ item.title }-${item.title}-${ index }`}> { item.title } </span>
         ) ) }
      </div>
   )
}
