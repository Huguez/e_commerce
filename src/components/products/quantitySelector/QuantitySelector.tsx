import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

type MyReadonly<T> = {
   readonly [K in keyof T]: T[K]
}

interface propsI {
   selectQty: number;
   posted: boolean;
   onQtyChange: ( qty: number ) => void;
   MAX: MyReadonly<number>;
}

export const QuantitySelector = ({posted, selectQty, onQtyChange, MAX }: propsI) => {

   const add = () => {

      if ( selectQty < MAX ) {
         onQtyChange( selectQty+1 )
      }
   }

   const rest = (  ) => {
      
      if ( selectQty >= 1 ) {
         onQtyChange( selectQty-1 )
      }
   }

   return (
      <>
         {
            posted && !selectQty ?
            <span className='my-1 text-red-500 text-xs fade-in'> Select the quantity you want to add </span>
            : <span className="my-1" > &nbsp; </span>
         }
         {
            posted && selectQty < MAX ?
            <span className='my-1 text-red-500 text-xs fade-in'> Select the quantity not more than { MAX } </span>
            : <span className="my-1" > &nbsp; </span>
         }
         <div className="flex">
            <button onClick={ rest }>
               <IoRemoveCircleOutline size={ 25 } />
            </button>
            <p className="w-20 mx-1 px-5 bg-gray-200 text-center rounded-lg">
               { selectQty }
            </p>
            <button onClick={ add }>
               <IoAddCircleOutline size={ 25 } />
            </button>
         </div>
      </>
   )
}
