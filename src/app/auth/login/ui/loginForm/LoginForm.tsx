'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions';
import { IoInformationCircleOutline } from 'react-icons/io5';


export const LoginForm = () => {
   const [ state, distpach ] = useFormState( authenticate, undefined )

   useEffect( () => {

      if ( state === 'success' ) {
         window.location.replace('/');
      }
      console.log( state );
   }, [state] )
   
   return (
      <form className="flex flex-col" action={distpach}>

         <input
            className="px-5 py-2 border bg-gray-200 rounded mb-5"
            name='email'
            type="email" 
            placeholder='E-mail'
            autoComplete='off'
            // value={ email }
            // onChange={hanldeChange}
         />

         <input
            className="px-5 py-2 border bg-gray-200 rounded mb-5"
            type="password" 
            name='password'
            autoComplete='off'
            placeholder='Password'
            // value={ password }
            // onChange={hanldeChange}
         />

         {
            state === "CredentialsSignin" && 
               <p className='fade-in text-md text-red-500 flex justify-cnter items-center pb-2' >
                  <IoInformationCircleOutline  className='h-5 w-5 text-red-500' />
                  Invalid credentials 
               </p>
         }

         <LoginButton label="Log-In" />

         <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
         </div>
         
         <Link href="/auth/register" className="btn-link text-center">
            Create a new account
         </Link>

      </form>
   )
}

function LoginButton( { label }: { label: string; } ) {
   const { pending } = useFormStatus();

   return (
      <button disabled={ pending } className={ `${ !pending ? "btn-primary" : "btn-disabled" } font-semibold ` } type='submit' aria-disabled={pending}>
         { label }
      </button>
   );
 }