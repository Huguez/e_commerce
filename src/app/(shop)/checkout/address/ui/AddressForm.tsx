'use client'

import { useForm } from 'react-hook-form'
import { AddressI, countryI } from '@/interfaces';

import { useAddress } from '@/store';
import { useLayoutEffect, useState } from 'react';
import { deleteUserAddress, setUserAddres } from '@/actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface InputsForm {
   name:     string;
   lastname: string;
   address:  string;
   addressOptional?:  string;
   codeZip:  string;
   city:     string;
   country:  string;
   phone:    string;
   remember: boolean;
}

interface propsI { 
   countries: countryI[];
   userAddressStores?: Partial<AddressI>;
}


export const AddressForm = ( { countries, userAddressStores }:propsI ) => {
   const { handleSubmit, register, formState: {  isValid }, reset, setValue }  = useForm<InputsForm>( { defaultValues: { remember: true } }  ) //leer datos 
   const [ remember, setRemember ] = useState<boolean>(true)
   const router = useRouter()


   const { setAddress, } = useAddress()

   const { data: session } = useSession( { required: true } )

   const onSubmit = async ( data:InputsForm ) => {
      const { remember, ...rest }:InputsForm = data

      setAddress( rest )
      
      if ( session ) {
         const userId = session.user.id 
         let resp;
         if ( remember ) {
            resp = await setUserAddres( rest, userId )
         } else {
            resp = await deleteUserAddress( userId )
         }

         if ( resp.ok ) {
            router.push("/checkout")
         }

      }else {
         return;
      }
   }
   
   useLayoutEffect( () => {
      reset( userAddressStores )
   }, [] )


   return (
      <form onSubmit={ handleSubmit( onSubmit ) } className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">

         <div className="flex flex-col mb-2">
            <span>Name</span>
            <input 
               type="text" 
               className="p-2 border rounded-md bg-gray-200" { ...register("name", { required: true } ) }
            />
         </div>

         <div className="flex flex-col mb-2">
            <span>Lastname</span>
            <input 
               type="text" 
               className="p-2 border rounded-md bg-gray-200" { ...register("lastname", { required: true }) }
            />
         </div>

         <div className="flex flex-col mb-2">
            <span>Address</span>
            <input 
               type="text" 
               className="p-2 border rounded-md bg-gray-200" { ...register("address", { required: true }) }
            />
         </div>

         <div className="flex flex-col mb-2">
            <span>Second Address (optional)</span>
            <input 
               type="text" 
               className="p-2 border rounded-md bg-gray-200" { ...register("addressOptional", { required: false }) }
            />
         </div>


         <div className="flex flex-col mb-2">
            <span>Zip code</span>
            <input 
               type="number" 
               className="p-2 border rounded-md bg-gray-200" { ...register("codeZip", { required: true }) }
            />
         </div>

         <div className="flex flex-col mb-2">
            <span>City</span>
            <input 
               type="text" 
               className="p-2 border rounded-md bg-gray-200" { ...register("city", { required: true }) }
            />
         </div>

         <div className="flex flex-col mb-2">
            <span>Country</span>
            <select 
               className="p-2 border rounded-md bg-gray-200" { ...register("country", { required: true }) }
            >
               <option value=""> --- Select Country --- </option>
               { countries.map( ( { id, code, name }, index ) => (
                  <option key={`${ id }-${ name }-${ code }`} value={ code }>{name}</option>
               ) ) }
            </select>
         </div>

         <div className="flex flex-col mb-2">
            <span>Phone</span>
            <input 
               type="text" 
               className="p-2 border rounded-md bg-gray-200" { ...register("phone", { required: true }) }
            />
         </div>

         {/*  checkbox  */}
         <div className='flex flex-col mb-2'>

            <div className="flex flex-row items-center">
               <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="checkbox"
                  data-ripple-dark="true"
               >
                  <input
                     type="checkbox"
                     name=''
                     className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                     id="checkbox"
                     onChange={ ( e ) => {
                        const { checked } = e.target
                        setValue( 'remember', checked )
                        setRemember( checked )
                     } }
                     checked={ remember }
                  />
                  <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                     >
                        <path
                           fillRule="evenodd"
                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                           clipRule="evenodd"
                        >
                        </path>
                     </svg>
                  </div>
               </label>
               <span className=''>
                  Remember this address
               </span>
            </div>

            <div className="flex flex-row sm:mt-10">
               <button className={`${ isValid ? "btn-primary" : "btn-disabled" }  flex w-full justify-center`} type='submit' disabled={ !isValid } >
                  Next Step
               </button>
            </div>
         </div>
         
      </form>
   )
}
