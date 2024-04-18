import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StateI {
   address: {
      name:     string;
      lastname: string;
      address:  string;
      addressOptional?:  string;
      codeZip:  string;
      city:     string;
      country:  string;
      phone:    string;
   },
   setAddress: ( param: StateI['address'] ) => void;
   
}

const initialValues: StateI = {
   address: {
      name: '',
      lastname: '',
      address: '',
      addressOptional: undefined,
      codeZip:  '',
      city:     '',
      country:  '',
      phone:    '',
   },
   setAddress: ( param: StateI['address'] ) => console.log( param ),

}


const addressStoreFC = create<StateI>()


export const useAddress = addressStoreFC( 
   persist( ( set, get ) => ({
      ...initialValues,
      setAddress: ( param: StateI['address'] | any ) => {
         set( param  )
      },

   }), {
      name: "address-store"
   } )      
)
