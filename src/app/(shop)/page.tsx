
import { ProductsGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products


export default function Home() {
  return (
    <>
      <Title title="Men's" subtitle="All products" />

      <ProductsGrid products={products} />
    </>
  );
}
