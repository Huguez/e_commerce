import { IoAdd, IoAddCircleOutline, IoRemove, IoRemoveCircleOutline } from "react-icons/io5"

interface propsI {
   selectQty: number
}

export const QuantitySelector = ({selectQty}: propsI) => {
  return (
    <div className="flex">
      <button>
         <IoRemoveCircleOutline size={ 25 } />
      </button>
      <p className="w-20 mx-1 px-5 bg-gray-200 text-center rounded-lg">
         { selectQty }
      </p>
      <button>
         <IoAddCircleOutline size={ 25 } />
      </button>
    </div>
  )
}
