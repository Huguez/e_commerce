import { Product } from "@/interfaces";
import { ProductGridItem } from "@/components";

interface propsI {
   products: Product[];
}

export const ProductsGrid = ({ products }: propsI ) => {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mb-10 ">
         { products.filter( product => product.gender === "men" || product.gender === "unisex" )
            .map( ( item, index ) => (
            <ProductGridItem key={`${ item.slug }-${ index }`}  { ...item } />
         ) ) }
      </div>
   )
}
