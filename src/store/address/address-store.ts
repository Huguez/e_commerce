import { AddressI } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StateI {
   address: AddressI,
   setAddress: ( param: AddressI ) => void;
}

const initialValuesAdress: AddressI = {
   name: '',
   lastname: '',
   address: '',
   addressOptional: undefined,
   codeZip:  '',
   city:     '',
   country:  '',
   phone:    '',
}

const initialValues: StateI = {
   address: initialValuesAdress,
   setAddress: ( param: AddressI ) => console.log( param ),
   
}

const addressStoreFC = create<StateI>()

export const useAddress = addressStoreFC( 
   persist( ( set, get ) => ({
      ...initialValues,
      setAddress: ( param: AddressI | any ) => {
         set( param  )
      },
   }), {
      name: "address-store"
   } )      
)
