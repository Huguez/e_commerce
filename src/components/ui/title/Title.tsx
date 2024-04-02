import { monse } from '@/config/fonts';
import { subtle } from 'crypto';
import React from 'react'

interface props {
   title:      string;
   subtitle?:  string;
   className?: string;
}

export const Title = ( { title, subtitle, className }: props ) => {
   return (
      <div className={ `mt-3 ${ className }` }> 
         <h1 className={`${ monse.className }  antialiased text-4xl font-semibold mt-8`}> { title } </h1>
         { subtitle && <h3 className='text-xl my-3'> { subtitle } </h3> }
      </div>
      
   )
}
