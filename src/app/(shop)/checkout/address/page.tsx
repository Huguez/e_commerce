import { Metadata } from 'next';
import { Title } from '@/components';
import { AddressForm } from './ui';
import { countryI } from '@/interfaces';
import { getCountries } from '@/actions';

export const metadata: Metadata = {
   title: "Delivery address",
   description: "E-Commerce by Huguez, developed with Next.js",
};

export default async function NamePage() {

   const resp: countryI[] = await getCountries()

   return (
      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
         <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
            
            <Title title="Address" subtitle="Delivery address" />

            <AddressForm countries={ resp } />

         </div>
      </div>
   );
}