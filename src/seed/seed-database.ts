import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries"

async function main() {
   try {
      await prisma.productImage.deleteMany({})
      await prisma.product.deleteMany({})
      await prisma.category.deleteMany({})
      await prisma.user.deleteMany({})
      await prisma.country.deleteMany({})

      const { categories, products, users } = initialData

      await prisma.user.createMany( { 
         data: users as any,
      } )

      await prisma.country.createMany( { data: countries as any } )

      const categoriesData = categories.map( name => ({ name }) )

      await  prisma.category.createMany({
         data: categoriesData
      })
      
      const categoriesIds = await prisma.category.findMany( {} )

      const categoriesMap = categoriesIds.reduce( ( map, category ) => {
         map[ category.name.toLowerCase() ] = category.id
         return map
      }, {} as Record<string, string> )

      products.forEach( async ( product ) => {
         const { type, images, ...rest } = product
         
         const dbProduct = await prisma.product.create( {
            data: {
               ...rest,
               gender: rest.gender,
               categoryId: categoriesMap[type]
            }
         } )

         const imagesData = images.map( image => ({
            url: image,
            productId: dbProduct.id
         }) )

         await prisma.productImage.createMany( {
            data: imagesData
         } )

      } )
      
      console.log( "Seed excecuted!!!" );
   } catch( err ) {
      console.log( err );
   }
}



(() => {

   if ( process.env.NODE_ENV === 'production' ) {
      return;
   }
   main()

})();